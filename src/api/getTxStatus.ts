"use server";
import { provider } from "../utils/wallet";

export type TxStatus = "PENDING" | "SUCCESSFUL" | "FAILED";

export async function getTxStatus(hash: string): Promise<TxStatus> {
  const receipt = await provider.getTransactionReceipt(hash).catch(() => null);

  if (!receipt) {
    return "PENDING";
  }

  return receipt.status === 0 ? "FAILED" : "SUCCESSFUL";
}
