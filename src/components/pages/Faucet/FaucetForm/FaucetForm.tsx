"use client";
import React from "react";
import {
  Alert as MuiAlert,
  Button,
  CircularProgress,
  styled,
  SvgIcon,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";

import { canReceive } from "../../../../api/canReceive";
import { evmToKaonAddress } from "../../../../api/evmToKaonAddress";
import { kaonToEvmAddress } from "../../../../api/kaonToEvmAddress";
import { KaonSlider } from "../../../ui/KaonSlider";
import { InfoIcon } from "../../../icons/InfoIcon";
import { AddressField } from "./AddressField";

export type FormData = {
  amount: number;
  address: {
    type: "evm" | "kaon";
    value: string;
  } | null;
};

export type FaucetFormSubmitData = {
  amount: number;
  evmAddress: string;
  kaonAddress: string;
};

const SLIDER_STEP = 1;
const SLIDER_MIN = 1;
const SLIDER_MAX = 1000;

export function FaucetForm({
  onSubmit,
}: {
  onSubmit: (data: FaucetFormSubmitData) => void;
}) {
  const form = useForm<FormData>({
    defaultValues: { address: null, amount: 500 },
    async onSubmit({ formApi, value: { address, amount } }) {
      if (!address || !address.value) {
        return formApi.setErrorMap({ onSubmit: "Address field is required" });
      }

      let evmAddress: string;
      let kaonAddress: string;
      if (address.type === "evm") {
        evmAddress = address.value;
        const kaonConverted = await evmToKaonAddress({ evmAddress });

        if (kaonConverted.error) {
          return formApi.setErrorMap({ onSubmit: kaonConverted.message });
        }

        kaonAddress = kaonConverted.kaonAddress;
      } else {
        kaonAddress = address.value;
        const evmConverted = await kaonToEvmAddress({ kaonAddress });

        if (evmConverted.error) {
          return formApi.setErrorMap({ onSubmit: evmConverted.message });
        }

        evmAddress = evmConverted.evmAddress;
      }

      const canReceiveResponse = await canReceive(evmAddress);

      if (!canReceiveResponse.success) {
        return formApi.setErrorMap({ onSubmit: canReceiveResponse.message });
      }

      onSubmit({ amount, evmAddress, kaonAddress });
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <FormRoot onSubmit={handleSubmit}>
      <form.Field name="amount">
        {(field) => (
          <SliderBox>
            <KaonSlider
              value={field.state.value}
              onChange={(_, value) => {
                field.handleChange(
                  typeof value === "number" ? value : value[0]
                );
              }}
              step={SLIDER_STEP}
              min={SLIDER_MIN}
              max={SLIDER_MAX}
            />
          </SliderBox>
        )}
      </form.Field>

      <form.Field name="address">
        {(field) => <AddressField field={field} />}
      </form.Field>

      <form.Subscribe
        selector={({ canSubmit, isSubmitting, values: { address } }) => ({
          canSubmit,
          isSubmitting,
          hasAddressType: !!address,
          hasAddress: !!address?.value,
        })}
      >
        {({ canSubmit, isSubmitting, hasAddressType, hasAddress }) =>
          hasAddressType && (
            <SubmitButton
              fullWidth
              variant="contained"
              type="submit"
              disabled={!canSubmit}
              startIcon={isSubmitting && <SvgIcon fontSize="inherit" />}
              endIcon={isSubmitting && <CircularProgress size="1em" />}
            >
              {hasAddress ? "Receive KAON" : "Enter an address"}
            </SubmitButton>
          )
        }
      </form.Subscribe>

      <form.Subscribe
        selector={({ errorMap: { onSubmit } }) => ({
          submitError: onSubmit,
        })}
      >
        {({ submitError }) =>
          !!submitError &&
          typeof submitError === "string" && (
            <Alert severity="error" icon={<InfoIcon fontSize="inherit" />}>
              {submitError}
            </Alert>
          )
        }
      </form.Subscribe>
    </FormRoot>
  );
}

const FormRoot = styled("form")({});

const SliderBox = styled("div")({
  marginBottom: 36,
});

const SubmitButton = styled(Button)({
  marginTop: 36,
});

const Alert = styled(MuiAlert)(({ theme }) => ({
  marginTop: 8,
  "& .MuiAlert-message": {
    ...theme.typography.body1,
  },
}));
