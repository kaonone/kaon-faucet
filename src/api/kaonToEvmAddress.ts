"use server";

import { getProviderErrorMsg, provider } from "../utils/wallet";

type Result =
  | {
      message: string;
      error: true;
    }
  | {
      evmAddress: string;
      error?: undefined;
    };

type Params = { kaonAddress: string };

export async function kaonToEvmAddress({
  kaonAddress,
}: Params): Promise<Result> {
  try {
    const evmAddress = await provider.send("kaon_gethexaddress", [kaonAddress]);

    return { evmAddress };
  } catch (error) {
    return {
      error: true,
      message: getProviderErrorMsg(error),
    };
  }
}
