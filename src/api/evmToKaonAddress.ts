"use server";

import { isAddress } from "ethers";
import { provider } from "../utils/wallet";

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

  // return { kaonAddress: "aws5EADN6j7sszZYjWBAZDThW1qpK1TH13" };

  try {
    const kaonAddress = await provider.send("fromhexaddress", [evmAddress]);

    return { kaonAddress };
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
