"use client";
import React from "react";
import { Grid2 as Grid } from "@mui/material";

import { makeFaucetPageHref, makeStatsPageHref } from "../../../routes";
import { TabLink } from "../../ui/TabLink";

const TESTNET_EXPLORER_HREF = "https://explorer.testnet.kaon.one/";

export function BottomNavigation() {
  return (
    <Grid
      component="nav"
      container
      spacing={5}
      justifyContent="space-between"
      alignItems="center"
    >
      <TabLink href={makeFaucetPageHref()}>Faucet</TabLink>
      <TabLink href={makeStatsPageHref()}>Stats</TabLink>
      <TabLink external href={TESTNET_EXPLORER_HREF}>
        Testnet explorer
      </TabLink>
    </Grid>
  );
}
