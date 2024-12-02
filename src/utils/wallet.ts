import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL as string
);

export function getProviderErrorMsg(error: unknown): string {
  const msg = String(
    (error as any)?.info?.error?.message || (error as any)?.message || error
  );

  if (msg.toLowerCase().includes("timeout exceeded")) {
    return "The node is temporarily unavailable. Please try again soon";
  }

  if (msg.includes("eth_sendRawTransaction") && msg.includes("verify error")) {
    return "There are temporarily problems with the faucet account. Please try again soon";
  }

  return msg;
}

export const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY as string,
  provider
);
