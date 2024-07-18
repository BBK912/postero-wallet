import { Svg, Path } from "react-native-svg";
import { IconProps } from "./types";

export function Download01Icon({ size = 24, color = "#000000" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M21,14 C21.5522847,14 22,14.4477153 22,15 L22,16.2 C22,18.5012242 21.9553277,19.047948 21.5640238,19.8159565 C21.1805458,20.5686455 20.5686455,21.1805458 19.8159757,21.5640141 C19.047948,21.9553277 18.5012242,22 16.2,22 L7.8,22 C5.49873942,22 4.95199625,21.9553266 4.1840671,21.5640206 C3.43138723,21.1805404 2.8194605,20.5686448 2.4359547,19.8159536 C2.0446692,19.0479341 2,18.5012152 2,16.2 L2,15 C2,14.4477153 2.44771525,14 3,14 C3.55228475,14 4,14.4477153 4,15 L4.00091114,16.6635358 C4.00753483,18.1773473 4.05280312,18.5837857 4.21799107,18.9080184 C4.40972219,19.2843212 4.71565879,19.5902423 5.09204501,19.782006 C5.44709125,19.9629234 5.90086058,20 7.8,20 L16.2,20 C18.0991758,20 18.5528925,19.9629272 18.9080435,19.7819762 C19.2843545,19.5902542 19.5902542,19.2843545 19.7819859,18.9080243 C19.9629272,18.5528925 20,18.0991758 20,16.2 L20,15 C20,14.4477153 20.4477153,14 21,14 Z"
        fill={color}
        fillRule="nonzero"
      />
      <Path
        d="M12,2 C12.5522847,2 13,2.44771525 13,3 L13,12.584 L16.2928932,9.29289322 C16.6533772,8.93240926 17.2206082,8.90467972 17.6128994,9.20970461 L17.7071068,9.29289322 C18.0976311,9.68341751 18.0976311,10.3165825 17.7071068,10.7071068 L12.7071068,15.7071068 C12.6812547,15.7329588 12.6539938,15.757402 12.625449,15.7803112 L12.616,15.786 L12.594,15.802 L12.5360882,15.844312 L12.52,15.853 L12.5114029,15.8596192 L12.483,15.874 L12.4397747,15.8983588 L12.422,15.905 L12.4039426,15.9150783 L12.37,15.927 L12.3372588,15.9417014 L12.311,15.949 L12.2918437,15.9566726 L12.265,15.962 L12.2292908,15.9735893 L12.2,15.978 L12.1764315,15.9844021 L12.148,15.987 L12.1166211,15.9932723 L12.085,15.995 L12.0590314,15.9982669 L12.033,15.998 L12,16 L11.967,15.998 L11.9409686,15.9982669 L11.913,15.995 L11.8833789,15.9932723 L11.851,15.987 L11.8235685,15.9844021 L11.799,15.978 L11.7707092,15.9735893 L11.734,15.962 L11.7081563,15.9566726 L11.688,15.949 L11.6627412,15.9417014 L11.629,15.927 L11.5960574,15.9150783 L11.577,15.905 L11.5602253,15.8983588 L11.516,15.874 L11.4885971,15.8596192 L11.479,15.853 L11.4639118,15.844312 L11.405,15.802 L11.3871006,15.7902954 L11.383,15.786 L11.374551,15.7803112 C11.3460062,15.757402 11.3187453,15.7329588 11.2928932,15.7071068 L6.29289322,10.7071068 C5.90236893,10.3165825 5.90236893,9.68341751 6.29289322,9.29289322 C6.68341751,8.90236893 7.31658249,8.90236893 7.70710678,9.29289322 L11,12.585 L11,3 C11,2.48716416 11.3860402,2.06449284 11.8833789,2.00672773 L12,2 Z"
        fill={color}
        fillRule="nonzero"
      />
    </Svg>
  );
}
