"use server";

import { provider } from "../utils/wallet";

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
  // return { evmAddress: "0x5Cefde75A7Df3c6Da72c25587ECE41553506743B" };

  // TODO: maybe need to add address format validation

  try {
    const evmAddress = await provider.send("kaon_gethexaddress", [kaonAddress]);

    return { evmAddress };
  } catch (error) {
    return {
      error: true,
      message:
        (error as any)?.info?.error?.message ||
        (error as any)?.message ||
        String(error),
    };
  }
}
