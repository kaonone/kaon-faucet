"use client";

import { useMutation } from "@tanstack/react-query";
import { Typography } from "@mui/material";

import { formatNumber } from "../../../../utils/format/formatNumber";
import { receiveGas } from "../../../../api/receiveGas";
import { HELP_URL, KAON_NETWORK } from "../../../../constants";
import { FaucetFormSubmitData } from "../FaucetForm/types";
import { Modal } from "../ui/Modal";
import { RequestConfirmation } from "./RequestConfirmation";
import { ReceivingStatus } from "./ReceivingStatus";

type Props = {
  txHash: string | null;
  formData: FaucetFormSubmitData;
  onClose: () => void;
  onTxHash: (txHash: string) => void;
};

export function ConfirmReceivingModal(props: Props) {
  const { formData, txHash, onClose, onTxHash } = props;
  const { amount, evmAddress } = formData;

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

      onTxHash(result.txHash);
      window
        .open(`${KAON_NETWORK.blockExplorerUrl}/tx/${result.txHash}`, "_blank")
        ?.focus();
    },
  });

  return (
    <Modal
      open
      helpHref={HELP_URL}
      onClose={
        receiveMutation.isIdle || receiveMutation.isError || txHash
          ? onClose
          : undefined
      }
      title={
        <Typography variant="h5">
          Receive {formatNumber(amount)} KAON
        </Typography>
      }
    >
      {!txHash ? (
        <RequestConfirmation
          receiveMutation={receiveMutation}
          formData={formData}
        />
      ) : (
        <ReceivingStatus txHash={txHash} formData={formData} />
      )}
    </Modal>
  );
}
