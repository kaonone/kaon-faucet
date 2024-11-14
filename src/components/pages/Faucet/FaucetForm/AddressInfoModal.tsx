"use client";
import React from "react";
import { Grid2 as Grid, styled } from "@mui/material";

import { InfoIcon } from "../../../icons/InfoIcon";
import { InfoSection } from "../ui/InfoSection";
import { Modal } from "../ui/Modal";

export function AddressInfoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} title={<GreyInfoIcon />} onClose={onClose}>
      <Grid container spacing={3} direction="column">
        <InfoSection
          title="Ethereum Wallet Address or Native Kaon Wallet Address"
          content={[
            "You can send testnet tokens to either an Ethereum wallet address or a native Kaon wallet address.",
            "Further copy explaining what happens when you send tokens to either including details and education such as:",
            "”It’s good for positioning, because we aren’t Ethereum-fork, not even close, we just support its features”",
          ]}
        />

        <InfoSection
          title="Kaon Chain Payments"
          content={[
            "Copy such as: When using the Faucet a Kaon testnet address will be generated linked to your ETH Wallet address. Tokens will be sent to this address and you can access them through an EVM wallet such as metamask using your ETH address.",
          ]}
        />

        <InfoSection
          title="Payment Batches"
          content={["Payments are made in 3 minute batches as a cron task."]}
        />
      </Grid>
    </Modal>
  );
}

const GreyInfoIcon = styled(InfoIcon)({
  color: "rgba(153, 143, 135)",
});
