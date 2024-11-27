"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Typography } from "@mui/material";

import { formatNumber } from "../../../../utils/format/formatNumber";
import { receiveGas } from "../../../../api/receiveGas";
import { HELP_URL } from "../../../../constants";
import { FaucetFormSubmitData } from "../FaucetForm/types";
import { Modal } from "../ui/Modal";
import { RequestConfirmation } from "./RequestConfirmation";
import { ReceivingStatus } from "./ReceivingStatus";

type Props = {
  formData: FaucetFormSubmitData;
  onClose: () => void;
};

export function ConfirmReceivingModal(props: Props) {
  const { formData, onClose } = props;
  const { amount, evmAddress } = formData;

  const [txHash, setTxHash] = useState<string | null>(null);

  const receiveMutation = useMutation({
    mutationFn: async ({ hCaptchaToken }: { hCaptchaToken: string }) => {
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

      setTxHash(result.txHash);
    },
  });

  return (
    <Modal
      open
      helpHref={HELP_URL}
      onClose={receiveMutation.isIdle ? onClose : undefined}
      title={
        <Typography variant="h5">
          Receive {formatNumber(amount)} KAON
        </Typography>
      }
    >
      {receiveMutation.isIdle ? (
        <RequestConfirmation
          receiveMutation={receiveMutation}
          formData={formData}
        />
      ) : (
        <ReceivingStatus
          txHash={txHash}
          receiveMutation={receiveMutation}
          formData={formData}
        />
      )}
    </Modal>
  );
}
