import { Transaction, parseEther } from "ethers";
import { wallet, provider } from "./wallet";

type TransferCoin =
  | {
      success: false;
      message: string;
    }
  | {
      success: true;
      txHash: string;
    };

/*
 * Transfer coin to address. This is native token ie ETH
 * @param {string} address - The address to transfer to
 */
export default async function transferCoin(
  address: string,
  amount: number
): Promise<TransferCoin> {
  try {
    const transaction = await sendTransaction({
      to: address,
      value: parseEther(amount.toString()),
    });
    return {
      success: true,
      txHash: transaction.hash,
    };
  } catch (error) {
    console.warn("transferCoin failed", error);
    return {
      success: false,
      message: "The node is temporarily unavailable. Please try again soon",
    };
  }
}

// Necessary because the Kaon network uses non-standard tx hashes
// and wallet.sendTransaction not working
async function sendTransaction(tx: { to: string; value: bigint }) {
  const pop = await wallet.populateTransaction(tx);
  delete pop.from;
  const txObj = Transaction.from(pop);
  const hash = await provider._perform({
    method: "broadcastTransaction",
    signedTransaction: await wallet.signTransaction(txObj),
  });
  return { hash };
}
