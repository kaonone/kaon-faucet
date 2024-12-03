"use server";
import { isAddress } from "ethers";
import { verify } from "hcaptcha";

import { canReceive } from "./canReceive";
import transferCoin from "../utils/transferCoin";
import { redis } from "../utils/redis";
import { MAX_TO_RECEIVE, MIN_TO_RECEIVE } from "../constants";

type Message =
  | {
      message: string;
      error: true;
    }
  | {
      txHash: string;
      error?: false;
    };

type Params = {
  address: string;
  hCaptchaToken: string;
  amount: number;
};

/*
 * Transfer coin to address. This is native token ie ETH
 * @param {string} address - The address to transfer to
 * @param {string} hCaptchaToken - The token from the hCaptcha
 * @returns {Message} - The message to display to the user, either error message or transaction hash
 */
export async function receiveGas({
  amount,
  address,
  hCaptchaToken,
}: Params): Promise<Message> {
  // if invalid address
  if (!isAddress(address)) return { message: "Invalid Address", error: true };

  // if invalid amount
  if (amount < MIN_TO_RECEIVE)
    return {
      message: `Invalid amount. Should be more than ${MIN_TO_RECEIVE}`,
      error: true,
    };
  if (amount > MAX_TO_RECEIVE)
    return {
      message: `Invalid amount. Should be less than ${MIN_TO_RECEIVE}`,
      error: true,
    };

  // verify the captcha
  const verified = await verify(
    process.env.HCAPTCHA_SECRET as string,
    hCaptchaToken
  );
  // if invalid captcha, return 401
  if (!verified.success) return { message: "Invalid Captcha", error: true };

  // if cooldown is enough to recieve funds
  const recieved = await canReceive(address);
  // if not enough time has passed
  if (!recieved.success) return { message: recieved.message, error: true };

  // transfer coin
  const transfer = await transferCoin(address, amount);
  // if transfer was unsuccessful
  if (!transfer.success) return { message: transfer.message, error: true };

  // update stats
  await redis.incrPayoutsNumber();
  await redis.incrbyPayoutsTotalAmount(amount);

  // update the last transfer timestamp and tx hash
  await redis.updateLastReceive(address, new Date(), transfer.txHash);

  // transfer is successful
  return { txHash: transfer.txHash };
}
