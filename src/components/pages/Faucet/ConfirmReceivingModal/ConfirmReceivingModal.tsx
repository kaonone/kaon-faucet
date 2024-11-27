"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";

import { formatNumber } from "../../../../utils/format/formatNumber";
import { receiveGas } from "../../../../api/receiveGas";
import { getTxStatus } from "../../../../api/getTxStatus";
import { HELP_URL, KAON_NETWORK } from "../../../../constants";
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
      window
        .open(`${KAON_NETWORK.blockExplorerUrl}/tx/${result.txHash}`, "_blank")
        ?.focus();
    },
  });

  const txStatusQuery = useQuery({
    queryKey: ["txStatus", txHash],
    queryFn: () => {
      return getTxStatus(txHash!);
    },
    enabled: !!txHash,
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
      {receiveMutation.isIdle ? (
        <RequestConfirmation
          receiveMutation={receiveMutation}
          formData={formData}
        />
      ) : (
        <ReceivingStatus
          txHash={txHash}
          receiveMutation={receiveMutation}
          txStatusQuery={txStatusQuery}
          formData={formData}
        />
      )}
    </Modal>
  );
}
