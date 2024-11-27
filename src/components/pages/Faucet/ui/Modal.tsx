"use client";
import React from "react";
import {
  Grid2 as Grid,
  Card as MuiCard,
  Modal as MuiModal,
  styled,
} from "@mui/material";

import { TabLink } from "../../../ui/TabLink";
import { BackButton } from "../../../ui/BackButton";

type ModalProps = {
  children: React.ReactElement;
  open: boolean;
  title?: React.ReactNode;
  helpHref?: string; // TODO remove if unused
  onClose?: () => void;
};

export function Modal(props: ModalProps) {
  const { children, open, title, helpHref, onClose } = props;
  const renderNav = !!title || !!helpHref || onClose;

  return (
    <InternalModal open={open} onClose={onClose}>
      <ModalContent variant="outlined">
        {renderNav && (
          <ModalNav container spacing={3} alignItems="center">
            {title}
            <Grid
              container
              flexGrow={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              {helpHref && (
                <HelpLinkBox>
                  <TabLink href={helpHref} external>
                    Get help
                  </TabLink>
                </HelpLinkBox>
              )}
              {onClose && <BackButton onClick={onClose} />}
            </Grid>
          </ModalNav>
        )}
        {children}
      </ModalContent>
    </InternalModal>
  );
}

const InternalModal = styled(MuiModal)({
  overflow: "auto",

  "& .MuiModal-backdrop": {
    backgroundColor: "rgba(248, 246, 243, 0.9)",
  },
});

const ModalNav = styled(Grid)({
  marginBottom: 24,
});

const HelpLinkBox = styled("div")({
  "& a": {
    color: "rgb(153, 143, 135)",
  },

  "& a:hover": {
    color: "rgb(58, 58, 58)",
  },
});

const ModalContent = styled(MuiCard)({
  position: "relative",
  top: 186,
  left: "50%",
  transform: "translateX(-50%)",
  width: `min(420px, 100vw)`,
  padding: "22px 20px",
});
