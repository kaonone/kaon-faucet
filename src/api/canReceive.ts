"use server";
import { redis } from "../utils/redis";
import { getTxStatus } from "./getTxStatus";

type CanReceive = {
  success: boolean;
  message: string;
};

/*
 * Check if the address can transfer. Must wait for cooldown to pass
 * @param {string} address - The address to check
 * @returns {CanRecieve} - The result of the check
 */
export async function canReceive(evmAddress: string): Promise<CanReceive> {
  // get timestamp in seconds
  const lastReceive = await redis.getLastReceive(evmAddress.toLowerCase());
  // if address never been transfered to
  if (lastReceive === null) return { success: true, message: "🚢" };

  // last receive date in seconds
  const lastReceiveTimestamp = lastReceive.date.getTime() / 1000;
  // now in seconds
  const now = Math.floor(Date.now() / 1000);
  // cooldown in seconds
  const coolDown = parseInt(process.env.COOLDOWN_HOURS as string) * 60 * 60;
  // if asked for funds after cooldown
  if (now >= lastReceiveTimestamp + coolDown)
    return { success: true, message: "🚢" };

  const txStatus = await getTxStatus(lastReceive.txHash);
  // if asked for funds after transaction failed
  if (txStatus === "FAILED") return { success: true, message: "🚢" };

  // TODO: use days.js to format left time
  // calculate time left in hours
  const timeLeft = Math.ceil((lastReceiveTimestamp + coolDown - now) / 60 / 60);

  return {
    success: false,
    message: `Please wait ${timeLeft} hours before requesting again`,
  };
}
