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
          title="Kaon Testnet Supports Both, EVM-Compatible Ethereum Wallets and the Native Kaon Wallet"
          content={[
            "You can send testnet tokens to either an ERC-20 wallet address or a native Kaon wallet address.",
          ]}
        />

        <InfoSection
          title="Sending to an Ethereum Wallet Address"
          content={[
            "On the Kaon blockchain, an EVM address can be represented as a Bitcoin invoice address for P2PKH. Test tokens will be accessible through any EVM-compatible wallet (eg. MetaMask) using the same Ethereum address.",
          ]}
        />

        <InfoSection
          title="Sending to a Native Kaon Wallet Address"
          content={[
            "Using the native Kaon wallet allows for direct interaction with the Kaon blockchain, enabling access to all of its unique functionalities.",
          ]}
        />
      </Grid>
    </Modal>
  );
}

const GreyInfoIcon = styled(InfoIcon)({
  color: "rgba(153, 143, 135)",
});
