"use client";
import { useMutation } from "@tanstack/react-query";

import { KAON_NETWORK } from "../../constants";

export function useAddKaonNetworkToWallet() {
  return useMutation({ mutationFn: addKaonNetworkToWallet });
}

async function addKaonNetworkToWallet() {
  if (window.ethereum) {
    const params = {
      chainId: toHex(KAON_NETWORK.id), // A 0x-prefixed hexadecimal string
      chainName: KAON_NETWORK.name,
      nativeCurrency: KAON_NETWORK.nativeCurrency,
      rpcUrls: [KAON_NETWORK.rpcUrl],
      blockExplorerUrls: [KAON_NETWORK.blockExplorerUrl],
      iconUrls: [KAON_NETWORK.iconUrl],
    };

    const result = await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [params],
    });

    return result;
  } else {
    throw new Error("No Ethereum Wallet");
  }
}

const toHex = (num: number) => {
  return "0x" + num.toString(16);
};
