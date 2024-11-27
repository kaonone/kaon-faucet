import { wallet, provider } from "./wallet";

/*
 * Get available balance for the faucet
 */
export default async function getFaucetAvailableBalance(): Promise<bigint> {
  return await provider.getBalance(wallet.address);
}
