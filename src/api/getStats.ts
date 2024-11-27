"use server";
import { formatEther } from "ethers";
import { redis } from "../utils/redis";
import getFaucetAvailableBalance from "../utils/getFaucetAvailableBalance";

type Stats = {
  availableBalance: number;
  payoutsNumber: number;
  payoutsTotalAmount: number;
};

export async function getStats(): Promise<Stats> {
  const payoutsNumber = await redis.getPayoutsNumber().catch(() => null);
  const payoutsTotalAmount = await redis.getPayoutsTotalAmount().catch(() => null);

  const balance = await getFaucetAvailableBalance().catch(() => null);
  const availableBalance = parseInt(formatEther(balance ?? 0));

  return {
    availableBalance,
    payoutsNumber: payoutsNumber ?? 0,
    payoutsTotalAmount: payoutsTotalAmount ?? 0,
  };
}
