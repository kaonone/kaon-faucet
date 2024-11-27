"use server";
import { formatEther } from "ethers";
import redis from "../utils/redis";
import getBalance from "../utils/getBalance";

type Stats = {
  availableBalance: number;
  payoutsNumber: number;
  payoutsTotalAmount: number;
};

export async function getStats(): Promise<Stats> {
  let payoutsNumber = 0;
  const count = await redis.get("COUNT");
  if (count !== null) {
    payoutsNumber = parseInt(count);
  }

  let payoutsTotalAmount = 0;
  const total = await redis.get("TOTAL");
  if (total !== null) {
    payoutsTotalAmount = parseInt(total);
  }

  const balance = await getBalance();
  const availableBalance = parseInt(formatEther(balance));

  return {
    availableBalance,
    payoutsNumber,
    payoutsTotalAmount,
  };
}
