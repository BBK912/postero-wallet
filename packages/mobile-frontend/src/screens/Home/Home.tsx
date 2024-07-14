import { FC, useRef } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { StackScreenProps } from "@react-navigation/stack";

import { useWallets } from "../Wallets/hook";
import { ModalStackParams } from "../params";
import Wallets from "../Wallets";
import ContextMenu, { ContextMenuHandle } from "./ContextMenu";
import CogIcon from "../../icons/CogIcon";

const Home: FC<StackScreenProps<ModalStackParams, "Main">> = ({
  route,
  navigation,
}) => {
  const contextMenu = useRef<ContextMenuHandle>(null);
  const wallets = useWallets();

  let totalLocked = 0;
  let totalUnlocked = 0;

  if (wallets) {
    for (const wallet of wallets) {
      const libraBalance = wallet.balances.find(
        (it) => it.coin.symbol === "LIBRA"
      );
      if (libraBalance === undefined) {
        continue;
      }

      const libraAmount = parseInt(libraBalance.amount, 10);
      const slowWallet = wallet.slowWallet;

      if (slowWallet) {
        const unlocked = parseInt(slowWallet.unlocked, 10);
        const locked = libraAmount - unlocked;
        totalUnlocked += unlocked;
        totalLocked += locked;
      } else {
        totalUnlocked += libraAmount;
      }
    }
  }

  if (totalLocked) {
    totalLocked /= 1e6;
  }
  if (totalUnlocked) {
    totalUnlocked /= 1e6;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw.style("p-2")}>
        <View style={tw.style("pb-2 flex-row justify-between")}>
          <TouchableOpacity
            onPress={() => {
              contextMenu.current?.open();
            }}
          >
            <CogIcon color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={tw.style("flex-row mb-2")}>
          <View style={tw.style("basis-1/2 pr-2")}>
            <View style={tw.style("p-2 rounded-md bg-white")}>
              <Text style={tw.style("text-gray-500 text-base leading-6")}>
                Balance
              </Text>
              <Text
                style={tw.style("text-black text-xl leading-6 font-semibold")}
              >
                {`Ƚ ${totalUnlocked.toLocaleString()}`}
              </Text>
            </View>
          </View>

          <View style={tw.style("basis-1/2", "p-2 rounded-md bg-white mb-2")}>
            <Text style={tw.style("text-gray-500 text-base leading-6")}>
              Locked
            </Text>
            <Text
              style={tw.style("text-black text-xl leading-6 font-semibold")}
            >
              {`Ƚ ${totalLocked.toLocaleString()}`}
            </Text>
          </View>
        </View>
      </View>

      <Wallets />

      <ContextMenu ref={contextMenu} />
    </SafeAreaView>
  );
};

export default Home;