"use client";
import React, { useState } from "react";

import { PageCardContainer } from "../../layout/PageCardContainer";
import { FaucetForm } from "./FaucetForm/FaucetForm";
import { FaucetFormSubmitData } from "./FaucetForm/types";
import { ConfirmReceivingModal } from "./ConfirmReceivingModal/ConfirmReceivingModal";

export function Faucet() {
  const [formData, setFormData] = useState<FaucetFormSubmitData | null>(null);

  return (
    <PageCardContainer elevation={0}>
      {!formData && <FaucetForm onSubmit={setFormData} />}
      {formData && (
        <ConfirmReceivingModal
          formData={formData}
          onClose={() => setFormData(null)}
        />
      )}
    </PageCardContainer>
  );
}
