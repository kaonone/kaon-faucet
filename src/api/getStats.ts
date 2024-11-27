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
  const payoutsNumber = await redis.getPayoutsNumber();
  const payoutsTotalAmount = await redis.getPayoutsTotalAmount();

  const balance = await getFaucetAvailableBalance();
  const availableBalance = parseInt(formatEther(balance));

  return {
    availableBalance,
    payoutsNumber,
    payoutsTotalAmount,
  };
}
