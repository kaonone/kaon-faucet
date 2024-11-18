"use client";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Button,
  Grid2 as Grid,
  NoSsr,
  Typography,
  styled,
} from "@mui/material";

import { Card } from "../ui/FaucetCard";
import { InfoSection } from "../ui/InfoSection";
import { FaucetFormSubmitData } from "../FaucetForm/types";
import { ReceiveMutation } from "./types";

type RequestConfirmationProps = {
  formData: FaucetFormSubmitData;
  receiveMutation: ReceiveMutation;
};

export function RequestConfirmation(props: RequestConfirmationProps) {
  const { formData, receiveMutation } = props;
  const { evmAddress, kaonAddress } = formData;

  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);

  return (
    <Grid container spacing={3} direction="column">
      <Card>
        <Grid container direction="column" spacing={1}>
          <Typography variant="h4">Eth Wallet Address</Typography>
          <Typography variant="body1">{evmAddress}</Typography>
        </Grid>
      </Card>

      <Card>
        <Grid container direction="column" spacing={1}>
          <Typography variant="h4">Kaon Wallet Address</Typography>
          <Typography variant="body1">{kaonAddress}</Typography>
        </Grid>
      </Card>

      <InfoSection
        content={[
          "Copy such as: When using the Faucet a Kaon testnet address will be generated linked to your ETH Wallet address. Tokens will be sent to both? and you can access them through an EVM wallet such as metamask using your ETH address.",
        ]}
      />

      <InfoSection
        title="Payment Batches"
        content={[
          "Faucet tokens are released as a cron task in 1 to 10 minutes.",
        ]}
      />

      <NoSsr>
        <HCaptchaBox>
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
            onVerify={setHCaptchaToken}
          />
        </HCaptchaBox>
      </NoSsr>

      <Button
        fullWidth
        variant="contained"
        disabled={!hCaptchaToken}
        onClick={() =>
          receiveMutation.mutate({ hCaptchaToken: hCaptchaToken! })
        }
      >
        Confirm
      </Button>
    </Grid>
  );
}

const HCaptchaBox = styled("div")({
  display: "flex",
  justifyContent: "center",

  "& > div": {
    display: "flex",
  },
});
