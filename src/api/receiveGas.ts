"use server";
import { isAddress } from "ethers";
import { verify } from "hcaptcha";

import canRecieve from "../utils/canRecieve";
import transferCoin from "../utils/transferCoin";
import redis from "../utils/redis";

type Message = {
  message: string;
  error?: true;
};

type Params = { address: string, hcaptchaToken: string };

/*
 * Transfer coin to address. This is native token ie ETH
 * @param {string} address - The address to transfer to
 * @param {string} hcaptchaToken - The token from the hcaptcha
 * @returns {Message} - The message to display to the user, either error message or transaction hash
 */
export async function receiveGas({ address, hcaptchaToken }: Params): Promise<Message> {
  // if invalid address
  if (!isAddress(address)) return { message: "Invalid Address", error: true };

  // verify the captcha
  const verified = await verify(process.env.HCAPTCHA_SECRET as string, hcaptchaToken);
  // if invalid captcha, return 401
  if (!verified.success) return { message: "Invalid Captcha", error: true };

  // if cooldown is enough to recieve funds
  const recieved = await canRecieve(address);
  // if not enough time has passed
  if (!recieved.success) return { message: recieved.message, error: true };

  // transfer coin
  const transfer = await transferCoin(address);
  // if transfer was unsuccessful
  if (!transfer.success) return { message: transfer.message, error: true };

  // update the last transfer timestamp to now
  await redis.set(address, Math.floor(Date.now() / 1000));

  // transfer is successful
  return { message: transfer.message };
}
