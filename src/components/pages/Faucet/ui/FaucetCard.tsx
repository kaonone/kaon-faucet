"use client";
import React from "react";
import { Card as MuiCard, Typography, styled } from "@mui/material";
import { makeCssVars } from "../../../../utils/makeCssVars";

type CardProps = {
  title: string;
  titleMargin: "small" | "medium";
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function Card(props: CardProps) {
  const { children, title, titleMargin, action } = props;

  return (
    <InternalCard
      variant="outlined"
      style={makeCssVars({
        "--faucet-card_header-m": titleMargin === "small" ? "6px" : "14px",
      })}
    >
      <CardHeader>
        <Typography variant="h4">{title}</Typography>
        {action}
      </CardHeader>
      {children}
    </InternalCard>
  );
}

const InternalCard = styled(MuiCard)({
  padding: "12px 15px 15px",
  borderColor: "rgb(240, 236, 229)",
});

const CardHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 16,
  marginBottom: "var(--faucet-card_header-m)",
});
