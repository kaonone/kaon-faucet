"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";

import { PageCardContainer } from "../../layout/PageCardContainer";
import { FaucetForm, FaucetFormSubmitData } from "./FaucetForm/FaucetForm";
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
