"use client";
import React from "react";
import { Grid2 as Grid } from "@mui/material";

import { KAON_NETWORK } from "../../../constants";
import { makeFaucetPageHref, makeStatsPageHref } from "../../../routes";
import { TabLink } from "../../ui/TabLink";

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
      <TabLink external href={KAON_NETWORK.blockExplorerUrl}>
        Testnet explorer
      </TabLink>
    </Grid>
  );
}
