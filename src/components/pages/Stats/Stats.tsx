"use client";
import React from "react";
import {
  Button,
  Card as MuiCard,
  Grid2 as Grid,
  Typography,
  styled,
} from "@mui/material";
import NextLink from "next/link";

import { PageCardContainer } from "../../layout/PageCardContainer";
import { formatNumber } from "../../../utils/format/formatNumber";
import { makeFaucetPageHref } from "../../../routes";

type StatsProps = {
  availableBalance: number;
  payoutsNumber: number;
  payoutsTotalAmount: number;
};

export function Stats({
  availableBalance,
  payoutsNumber,
  payoutsTotalAmount,
}: StatsProps) {
  return (
    <PageCardContainer elevation={0}>
      <Grid container spacing="36px" direction="column">
        <Card variant="outlined">
          <Grid container spacing="36px" direction="column" alignItems="center">
            <Grid
              container
              spacing="4px"
              direction="column"
              alignItems="center"
            >
              <Typography variant="h4">Balance</Typography>
              <StatValue>{formatNumber(availableBalance, 2, 0)} KAON</StatValue>
            </Grid>
            <Grid
              container
              spacing="4px"
              direction="column"
              alignItems="center"
            >
              <Typography variant="h4">Already Paid</Typography>
              <StatValue>
                {formatNumber(payoutsTotalAmount, 2, 0)} with{" "}
                {formatNumber(payoutsNumber)} payouts
              </StatValue>
            </Grid>
          </Grid>
        </Card>
        <Button
          fullWidth
          LinkComponent={NextLink}
          variant="contained"
          href={makeFaucetPageHref()}
        >
          Faucet
        </Button>
      </Grid>
    </PageCardContainer>
  );
}

const Card = styled(MuiCard)({
  padding: "26px 26px 30px",
});

const StatValue = styled("p")(({ theme }) => ({
  ...theme.typography.h3,
  margin: 0,
  color: "rgb(102, 101, 101)",
}));
