"use client";
import React, { useState } from "react";
import {
  Button,
  Grid2 as Grid,
  IconButton,
  Input,
  Typography,
  styled,
} from "@mui/material";
import { FieldApi } from "@tanstack/react-form";

import { InfoIcon } from "../../../icons/InfoIcon";
import { Card } from "../ui/FaucetCard";
import { AddressInfoModal } from "./AddressInfoModal";

import type { FormData } from "./FaucetForm";

type AddressFieldProps = {
  field: FieldApi<FormData, "address">;
};

export function AddressField(props: AddressFieldProps) {
  const { field } = props;
  const { value } = field.state;
  const [infoOpened, setInfoOpened] = useState(false);

  if (!value) {
    return (
      <Card
        title="Send to"
        titleMargin="medium"
        action={
          <InfoIconButton size="small" onClick={() => setInfoOpened(true)}>
            <GreyInfoIcon fontSize="inherit" />
          </InfoIconButton>
        }
      >
        <AddressInfoModal
          open={infoOpened}
          onClose={() => setInfoOpened(false)}
        />

        <Grid container spacing={1} wrap="wrap">
          <Button
            fullWidth
            variant="outlined"
            onClick={() => field.handleChange({ type: "evm", value: "" })}
          >
            Ethereum wallet address
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => field.handleChange({ type: "kaon", value: "" })}
          >
            Native KAON wallet address
          </Button>
        </Grid>
      </Card>
    );
  }

  const { type } = value;
  const title = `${type === "evm" ? "eth" : "kaon"} wallet address`;
  const placeholder = type === "evm" ? "0x1f98..." : "arGj3m...";

  return (
    <>
      <Card
        title={title}
        titleMargin="small"
        action={
          <ChangeTypeButton
            variant="text"
            onClick={() => field.handleChange(null)}
          >
            Change
          </ChangeTypeButton>
        }
      >
        <AddressInput
          fullWidth
          disableUnderline
          placeholder={placeholder}
          value={value.value}
          onChange={(event) =>
            field.handleChange({ type, value: event.target.value })
          }
        />
      </Card>

      <InputInfoCard>
        <GreyInfoIcon />
        <Typography variant="body1">
          Tokens will be sent on Kaon testnet
        </Typography>
      </InputInfoCard>
    </>
  );
}

const InfoIconButton = styled(IconButton)({
  fontSize: 16,
});

const ChangeTypeButton = styled(Button)({
  marginRight: -8,
  color: "rgb(153, 143, 135)",
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
});

const GreyInfoIcon = styled(InfoIcon)({
  color: "rgba(153, 143, 135)",
});
