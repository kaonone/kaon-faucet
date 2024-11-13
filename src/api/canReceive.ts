"use server";
import redis from "../utils/redis";

type CanReceive = {
  success: boolean;
  message: string;
};

/*
 * Check if the address can transfer. Must wait for cooldown to pass
 * @param {string} address - The address to check
 * @returns {CanRecieve} - The result of the check
 */
export async function canReceive(
  evmAddress: string
): Promise<CanReceive> {
  // get timestamp in seconds
  const lastReceive = await redis.get(evmAddress.toLowerCase());
  // if address never been transfered to
  if (lastReceive === null) return { success: true, message: "🚢" };
  // now in seconds
  const now = Math.floor(Date.now() / 1000);
  // cooldown in seconds
  const cooldown = parseInt(process.env.COOLDOWN_HOURS as string) * 60 * 60;
  // if asked for funds after cooldown
  if (now >= parseInt(lastReceive) + cooldown)
    return { success: true, message: "🚢" };
  // calculate time left in hours
  const timeLeft = Math.ceil(
    (parseInt(lastReceive) + cooldown - now) / 60 / 60
  );

  return {
    success: false,
    message: `Please wait ${timeLeft} hours before requesting again`,
  };
}
