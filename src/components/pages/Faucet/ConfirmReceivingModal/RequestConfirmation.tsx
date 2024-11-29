"use client";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Grid2 as Grid, NoSsr, Typography, styled } from "@mui/material";

import { RunMutationButton } from "../../../ui/RunMutationButton";
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
          "Kaon supports addresses in Bitcoin format and in EVM format. Addresses above represents the same account.",
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

      <div>
        <RunMutationButton
          mutation={receiveMutation}
          variables={{ hCaptchaToken: hCaptchaToken! }}
          buttonProps={{
            fullWidth: true,
            variant: "contained",
            disabled: !hCaptchaToken,
          }}
        >
          Confirm
        </RunMutationButton>
      </div>
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
