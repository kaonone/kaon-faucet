"use client";
import { useEffect, useMemo } from "react";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Store } from "@tanstack/react-store";

import { makeFaucetPageHref } from "../../../routes";
import { FaucetFormSubmitData } from "./FaucetForm/types";

type FaucetStoreState = {
  formData: FaucetFormSubmitData | null;
  txHash: string | null;
};

export function useFaucetStore() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    store.store.setState(() => makeStoreStateFromSearch(searchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const store = useMemo(() => {
    const store = new Store<FaucetStoreState>(
      makeStoreStateFromSearch(searchParams)
    );

    const updateSearchParams = (state: FaucetStoreState) => {
      const nextSearch = new URLSearchParams();

      if (state.formData) {
        nextSearch.set("amount", String(state.formData.amount));
        nextSearch.set("evm_address", state.formData.evmAddress);
        nextSearch.set("kaon_address", state.formData.kaonAddress);
      }
      state.txHash && nextSearch.set("tx_hash", state.txHash);

      router.push(`${makeFaucetPageHref()}?${nextSearch.toString()}`);
    };

    return {
      store,
      resetStore: () => {
        store.setState(() => ({ formData: null, txHash: null }));
        updateSearchParams(store.state);
      },
      setFormData: (formData: FaucetFormSubmitData) => {
        store.setState((state) => ({ ...state, formData }));
        updateSearchParams(store.state);
      },
      setTxHash: (txHash: string) => {
        store.setState((state) => ({ ...state, txHash }));
        updateSearchParams(store.state);
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store;
}

function makeStoreStateFromSearch(
  searchParams: ReadonlyURLSearchParams
): FaucetStoreState {
  const rawAmount = searchParams.get("amount");
  const evmAddress = searchParams.get("evm_address");
  const kaonAddress = searchParams.get("kaon_address");
  const txHash = searchParams.get("tx_hash");

  const amount =
    rawAmount && !isNaN(parseInt(rawAmount)) ? parseInt(rawAmount) : null;

  return {
    formData:
      evmAddress && kaonAddress && amount
        ? { evmAddress, kaonAddress, amount }
        : null,
    txHash,
  };
}
