"use server";

import { isAddress } from "ethers";
import { getProviderErrorMsg, provider } from "../utils/wallet";

type Result =
  | {
      message: string;
      error: true;
    }
  | {
      kaonAddress: string;
      error?: undefined;
    };

type Params = { evmAddress: string };

export async function evmToKaonAddress({
  evmAddress,
}: Params): Promise<Result> {
  if (!isAddress(evmAddress)) {
    return { error: true, message: "Invalid ETH wallet address" };
  }

  try {
    const kaonAddress = await provider.send("kaon_fromhexaddress", [
      evmAddress,
    ]);

    return { kaonAddress };
  } catch (error) {
    return {
      error: true,
      message: getProviderErrorMsg(error),
    };
  }
}
