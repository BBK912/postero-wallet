import Emittery, { UnsubscribeFn } from "emittery";
import { Inject, Injectable } from '@nestjs/common';

import {
  IBalance,
  IBalanceRepository,
  ISlowWallet,
  ISlowWalletFactory,
  IWalletRepository,
  IWalletService,
  WalletServiceEvent,
} from './interfaces';
import { Types } from '../types';
import { ICryptoService } from '../crypto/interfaces';
import Wallet from "../crypto/Wallet";
import { IDbService } from "../db/interfaces";
import { IOpenLibraService } from "../open-libra/interfaces";
import { ICoinRepository } from "../coin/interfaces";
import AccountAddress from "../crypto/AccountAddress";

@Injectable()
class WalletService implements IWalletService {
  @Inject(Types.IBalanceRepository)
  private readonly balanceRepository: IBalanceRepository;

  setWalletLabel(walletId: string, label: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getWallet(walletId: string): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }

  getWalletPrivateKey(walletId: string): Promise<Uint8Array> {
    throw new Error('Method not implemented.');
  }

  @Inject(Types.IDbService)
  private readonly dbService: IDbService;

  @Inject(Types.ICryptoService)
  private readonly cryptoService: ICryptoService;

  @Inject(Types.IOpenLibraService)
  private readonly openLibraService: IOpenLibraService;

  @Inject(Types.ICoinRepository)
  private readonly coinRepository: ICoinRepository;

  @Inject(Types.IWalletRepository)
  private readonly walletRepository: IWalletRepository;

  @Inject(Types.ISlowWalletFactory)
  private readonly slowWalletFactory: ISlowWalletFactory;

  private eventEmitter = new Emittery();

  public async newWallet(): Promise<Wallet> {
    const cryptoWallet = await this.cryptoService.newWallet();
    const address = await this.openLibraService.getOriginatingAddress(
      cryptoWallet.authenticationKey.bytes,
    );
    cryptoWallet.accountAddress = new AccountAddress(address);
    const wallet = await this.walletRepository.saveWallet(cryptoWallet);
    this.eventEmitter.emit(WalletServiceEvent.NewWallet, wallet);
    return wallet;
  }

  public async syncWallet(id: string) {
    const wallet = await this.walletRepository.getWallet(id);
    if (wallet) {
      const resources = await this.openLibraService.getAccountResources(
        wallet.accountAddress,
      );

      for (const resource of resources) {
        if (resource.type.startsWith('0x1::coin::CoinStore<')) {
          const coinType = resource.type.substring(
            '0x1::coin::CoinStore<'.length,
            resource.type.length - 1,
          );

          const data = resource.data as {
            coin: { value: string };
          };

          const coin = await this.coinRepository.getOrCreateCoin(coinType);

          await this.dbService
            .db('balances')
            .insert({
              coinId: coin.id,
              walletId: wallet.id,
              amount: data.coin.value,
            })
            .onConflict(['coinId', 'walletId'])
            .merge(['amount']);
        } else if (resource.type === '0x1::slow_wallet::SlowWallet') {
          const slowWallet = resource.data as {
            transferred: string;
            unlocked: string;
          };

          await this.dbService
            .db('slow_wallets')
            .insert({
              walletId: wallet.id,
              transferred: slowWallet.transferred,
              unlocked: slowWallet.unlocked,
            })
            .onConflict(['walletId'])
            .merge(['transferred', 'unlocked']);
        }
      }
    }
  }

  public async deleteWallet(id: string) {
    await this.dbService.db('wallets').where('id', id).del();
    this.eventEmitter.emit(WalletServiceEvent.WalletRemoved, id);
  }

  public on(
    eventName: WalletServiceEvent,
    listener: (eventData: any) => void | Promise<void>,
  ): UnsubscribeFn {
    return this.eventEmitter.on(eventName, listener);
  }

  public async getWalletBalances(walletId: string): Promise<IBalance[]> {
    return this.balanceRepository.getBalances(walletId);
  }

  public async importWallet(mnemonic: string): Promise<Wallet> {
    const cryptoWallet = await this.cryptoService.walletFromMnemonic(mnemonic);
    const address = await this.openLibraService.getOriginatingAddress(
      cryptoWallet.authenticationKey.bytes,
    );
    cryptoWallet.accountAddress = new AccountAddress(address);
    const wallet = await this.walletRepository!.saveWallet(cryptoWallet);
    await this.syncWallet(wallet.id);

    this.eventEmitter.emit(WalletServiceEvent.NewWallet, wallet);

    return wallet;
  }

  public async getSlowWallet(
    walletId: string,
  ): Promise<ISlowWallet | undefined> {
    const res = await this.dbService
      .db('slow_wallets')
      .where('walletId', walletId)
      .first();
    if (res) {
      return this.slowWalletFactory.getSlowWallet(
        res.transferred,
        res.unlocked,
      );
    }
    return undefined;
  }
}

export default WalletService;
