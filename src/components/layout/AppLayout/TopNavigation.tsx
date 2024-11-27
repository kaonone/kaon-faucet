"use client";
import React from "react";
import { Grid2 as Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";

import {
  DISCORD_URL,
  DOCS_URL,
  GITHUB_URL,
  HIRING_URL,
  ROADMAP_URL,
  TELEGRAM_URL,
  TWITTER_URL,
} from "../../../constants";
import { TabLink } from "../../ui/TabLink";
import { IconLink } from "../../ui/IconLink";
import { DiscordIcon } from "../../icons/DiscordIcon";

export function TopNavigation() {
  return (
    <Grid
      component="nav"
      container
      spacing={5}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid container size="auto">
        <TabLink external href={DOCS_URL}>
          Docs
        </TabLink>
        <TabLink external href={ROADMAP_URL}>
          Roadmap
        </TabLink>
        <TabLink
          external
          href={GITHUB_URL}
          icon={<GitHubIcon fontSize="inherit" />}
        >
          Github
        </TabLink>
        <TabLink external href={HIRING_URL}>
          We&apos;re hiring!
        </TabLink>
      </Grid>
      <Grid container size="auto">
        <IconLink
          external
          href={DISCORD_URL}
          icon={<DiscordIcon fontSize="inherit" />}
        />
        <IconLink
          external
          href={TELEGRAM_URL}
          icon={<TelegramIcon fontSize="inherit" />}
        />
        <IconLink
          external
          href={TWITTER_URL}
          icon={<XIcon fontSize="inherit" />}
        />
      </Grid>
    </Grid>
  );
}
