"use server";

import { validate } from "bitcoin-address-validation";
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

  if (!validate(kaonAddress)) {
    return { error: true, message: "Invalid KAON wallet address" };
  }

  try {
    const evmAddress = await provider.send("gethexaddress", [kaonAddress]);

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
