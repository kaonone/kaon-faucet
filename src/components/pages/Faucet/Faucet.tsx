"use client";
import React, { FormEvent, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { NoSsr, Slider, styled } from "@mui/material";

import { receiveGas } from "../../../api/receiveGas";
import SuccessModal from "../../SuccessModal";
import ErrorModal from "../../ErrorModal";
import { PageCardContainer } from "../../layout/PageCardContainer";

export function Faucet() {
  const [size, setSize] = useState(500);

  const [isDisabled, setIsDisabled] = useState(true);
  const [hcaptchaToken, setHcaptchaToken] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerificationSuccess = async (token: string, ekey: string) => {
    // set hcaptcha token
    setHcaptchaToken(token);
    // enable submit button
    setIsDisabled(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // disable submit button
    setIsDisabled(true);
    // send request to faucet
    const data = await receiveGas({
      address: event.currentTarget.address.value,
      hcaptchaToken,
    });
    // if error
    if (data.error) return setErrorMessage(data.message);
    // success!
    setSuccessMessage(data.message);
  };

  return (
    <PageCardContainer elevation={0}>
      <FormRoot onSubmit={handleSubmit}>
        <KaonSlider
          value={size}
          onChange={(_, value) => {
            setSize(typeof value === "number" ? value : value[0]);
          }}
        />
        <input
          id="address"
          name="address"
          type="string"
          required
          placeholder="0xdD4c825203f97984e7867F11eeCc813A036089D1"
        />
        <NoSsr>
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
            onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
          />
        </NoSsr>
        <button disabled={isDisabled} type="submit">
          Request Funds
        </button>
      </FormRoot>
      <SuccessModal message={successMessage} />
      <ErrorModal message={errorMessage} />
    </PageCardContainer>
  );
}

const FormRoot = styled("form")({});

function KaonSlider({
  onChange,
  value,
}: {
  value: number;
  onChange: (event: Event, value: number | number[]) => void;
}) {
  return (
    <Slider
      value={value}
      step={1}
      min={1}
      max={1000}
      valueLabelDisplay="off"
      onChange={onChange}
    />
  );
}
