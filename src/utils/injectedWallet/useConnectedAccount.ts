"use client";
import { useQuery } from "@tanstack/react-query";

import { useMounted } from "../react/useMounted";

export function useConnectedAccount() {
  const mounted = useMounted();

  return useQuery({
    queryFn: () => connectWallet(),
    queryKey: ["wallet:account"],
    enabled: mounted,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

async function connectWallet(): Promise<{ address: string | null }> {
  if (window.ethereum) {
    const accounts: string[] | null = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts && accounts.length > 0 ? accounts[0] : null;

    return { address };
  } else {
    throw new Error("No Ethereum Wallet");
  }
}
