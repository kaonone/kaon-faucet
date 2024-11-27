"use server";
import { formatEther } from "ethers";
import redis from "../utils/redis";
import getBalance from "../utils/getBalance";

type Stats = {
  availableBalance: number;
  payoutsNumber: number;
  payoutsTotalAmount: number;
};

// TODO
export async function getStats(): Promise<Stats> {
  let payoutsNumber = 0;
  const count = await redis.get("COUNT");
  if (count !== null){ 
    payoutsNumber = parseInt(count);
  }

  let payoutsTotalAmount = 0;
  const total = await redis.get("TOTAL");
  if (total !== null){ 
    payoutsTotalAmount = parseInt(total);
  }

  let availableBalance = 0;
  const balance = await getBalance();
  let temp = formatEther(balance.toString());
  console.log(temp);
  availableBalance = parseInt(formatEther(availableBalance.toString()));

  return {
    availableBalance,
    payoutsNumber,
    payoutsTotalAmount,
  };
}
