"use server";
import wallet from "../utils/wallet";

type Address = {
  address: string;
};

/*
 * Get the address of the wallet funding the faucet
 * @returns {Address} - The address of the wallet funding the faucet
 */
export async function getFundingAddress(): Promise<Address> {
  const address = await wallet.getAddress();
  return { address };
}
