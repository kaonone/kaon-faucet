"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Button,
  Grid2 as Grid,
  NoSsr,
  Typography,
  styled,
} from "@mui/material";

import { formatNumber } from "../../../../utils/format/formatNumber";
import { receiveGas } from "../../../../api/receiveGas";
import { Modal } from "../ui/Modal";
import { Card } from "../ui/FaucetCard";
import { InfoSection } from "../ui/InfoSection";
import { FaucetFormSubmitData } from "../FaucetForm/FaucetForm";

type Props = {
  formData: FaucetFormSubmitData;
  onClose: () => void;
};

export function ConfirmReceivingModal(props: Props) {
  const {
    formData: { amount, evmAddress, kaonAddress },
    onClose,
  } = props;

  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>("");

  const handleVerificationSuccess = async (token: string, ekey: string) => {
    setHCaptchaToken(token);
  };

  const receiveMutation = useMutation({
    mutationFn: async () => {
      if (!hCaptchaToken) {
        throw new Error("Something wrong with HCaptcha, try again later");
      }

      const result = await receiveGas({
        amount,
        address: evmAddress,
        hCaptchaToken: hCaptchaToken,
      });

      if (result.error) {
        throw new Error(result.message);
      }
    },
  });

  return (
    <Modal
      open
      helpHref="/#TODO"
      onClose={receiveMutation.isIdle ? onClose : undefined}
      title={
        <Typography variant="h5">
          Receive {formatNumber(amount)} KAON
        </Typography>
      }
    >
      {receiveMutation.isIdle ? (
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
                onVerify={(token, ekey) =>
                  handleVerificationSuccess(token, ekey)
                }
              />
            </HCaptchaBox>
          </NoSsr>

          <Button
            fullWidth
            variant="contained"
            disabled={!hCaptchaToken}
            onClick={() => receiveMutation.mutate()}
          >
            Confirm
          </Button>
        </Grid>
      ) : (
        <Typography>Waiting</Typography>
      )}
    </Modal>
  );
}

const HCaptchaBox = styled("div")({
  display: "flex",
  justifyContent: "center",

  "& > div": {
    display: "flex",
  },
});
