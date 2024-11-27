"use client";
import React from "react";
import { useStore } from "@tanstack/react-store";

import { PageCardContainer } from "../../layout/PageCardContainer";
import { FaucetForm } from "./FaucetForm/FaucetForm";
import { ConfirmReceivingModal } from "./ConfirmReceivingModal/ConfirmReceivingModal";
import { useFaucetStore } from "./useFaucetStore";

export function Faucet() {
  const { resetStore, setFormData, setTxHash, store } = useFaucetStore();
  const { formData, txHash } = useStore(store);

  return (
    <PageCardContainer elevation={0}>
      {!formData && <FaucetForm onSubmit={setFormData} />}
      {formData && (
        <ConfirmReceivingModal
          txHash={txHash}
          formData={formData}
          onClose={resetStore}
          onTxHash={setTxHash}
        />
      )}
    </PageCardContainer>
  );
}
