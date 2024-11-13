"use client";
import React from "react";
import {
  Alert as MuiAlert,
  Button,
  Card,
  CircularProgress,
  Grid2 as Grid,
  Input,
  Typography,
  styled,
  SvgIcon,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // TODO: update
import { useForm } from "@tanstack/react-form";

import { canReceive } from "../../../api/canReceive";
import { evmToKaonAddress } from "../../../api/evmToKaonAddress";
import { kaonToEvmAddress } from "../../../api/kaonToEvmAddress";
import { KaonSlider } from "../../ui/KaonSlider";

type FormData = {
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
        {(field) => {
          const { value } = field.state;

          if (!value) {
            return (
              <AddressCard variant="outlined">
                <AddressCardButtonsHeader>
                  <Typography variant="h4">Send to</Typography>
                  <InfoIcon />
                </AddressCardButtonsHeader>
                <Grid container spacing={1} wrap="wrap">
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                      field.handleChange({ type: "evm", value: "" })
                    }
                  >
                    Ethereum wallet address
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                      field.handleChange({ type: "kaon", value: "" })
                    }
                  >
                    Native KAON wallet address
                  </Button>
                </Grid>
              </AddressCard>
            );
          }

          const { type } = value;
          const title = `${type === "evm" ? "eth" : "kaon"} wallet address`;
          const placeholder = type === "evm" ? "0x1f98..." : "arGj3m...";

          return (
            <>
              <AddressCard variant="outlined">
                <AddressCardInputHeader>
                  <Typography variant="h4">{title}</Typography>
                  <ChangeTypeButton
                    variant="text"
                    onClick={() => field.handleChange(null)}
                  >
                    Change
                  </ChangeTypeButton>
                </AddressCardInputHeader>

                <AddressInput
                  fullWidth
                  disableUnderline
                  placeholder={placeholder}
                  value={value.value}
                  onChange={(event) =>
                    field.handleChange({ type, value: event.target.value })
                  }
                />
              </AddressCard>
              <InputInfoCard>
                <InfoIcon />
                <Typography variant="body1">
                  Tokens will be sent on Kaon testnet
                </Typography>
              </InputInfoCard>
            </>
          );
        }}
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

const AddressCard = styled(Card)({
  padding: "12px 15px 15px",
  borderColor: "rgb(240, 236, 229)",
});

const AddressCardHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 16,

  "& svg": {
    fontSize: 16,
    color: "rgb(153, 143, 135)",
  },
});

const AddressInput = styled(Input)({
  "& .MuiInput-input": {
    paddingBottom: 3,
  },
});

const InputInfoCard = styled("div")({
  marginTop: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  backgroundColor: "rgb(248, 246, 243)",
  borderRadius: 4,
  padding: "12px 16px",
  minHeight: 75,

  "& svg": {
    fontSize: 24,
    color: "rgba(153, 143, 135)",
  },
});

const AddressCardButtonsHeader = styled(AddressCardHeader)({
  marginBottom: 14,
});

const AddressCardInputHeader = styled(AddressCardHeader)({
  marginBottom: 6,
});

const ChangeTypeButton = styled(Button)({
  marginRight: -8,
  color: "rgb(153, 143, 135)",
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
