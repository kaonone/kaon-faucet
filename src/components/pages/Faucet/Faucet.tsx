"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";

import { PageCardContainer } from "../../layout/PageCardContainer";
import { FaucetForm, FaucetFormSubmitData } from "./FaucetForm";

export function Faucet() {
  const [formData, setFormData] = useState<FaucetFormSubmitData | null>(null);

  // const [hcaptchaToken, setHcaptchaToken] = useState("");
  // const handleVerificationSuccess = async (token: string, ekey: string) => {
  //   // set hcaptcha token
  //   setHcaptchaToken(token);
  // };

  return (
    <PageCardContainer elevation={0}>
      {!formData && <FaucetForm onSubmit={setFormData} />}
      {formData && (
        <div>
          Confirm content
          {/* <NoSsr>
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
              onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
            />
          </NoSsr> */}
          <Button onClick={() => setFormData(null)}>Close confirmation</Button>
        </div>
      )}
    </PageCardContainer>
  );
}
