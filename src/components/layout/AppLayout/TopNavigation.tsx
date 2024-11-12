"use client";
import React from "react";
import { Grid2 as Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";

import { TabLink } from "../../ui/TabLink";
import { IconLink } from "../../ui/IconLink";
import { DiscordIcon } from "../../icons/DiscordIcon";

const DOCS_HREF = "https://kaon.gitbook.io/technical";
const ROADMAP_HREF =
  "https://kaonone.notion.site/cbe36d62bf8c4981aadd2acb26093ad9?v=a7c3f50e4ce848e1908d8225aad0cb4c&pvs=4";
const GITHUB_HREF = "https://github.com/kaonone";
const HIRING_HREF =
  "https://kaonone.notion.site/Hiring-4a0e2a181cbf40a8a0e56ac4fb4fa678?pvs=4";

const DISCORD_HREF = "https://discord.gg/xGdaBvn";
const TELEGRAM_HREF = "https://t.me/kaonlabs";
const TWITTER_HREF = "https://x.com/kaonlabs";

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
        <TabLink external href={DOCS_HREF}>
          Docs
        </TabLink>
        <TabLink external href={ROADMAP_HREF}>
          Roadmap
        </TabLink>
        <TabLink
          external
          href={GITHUB_HREF}
          icon={<GitHubIcon fontSize="inherit" />}
        >
          Github
        </TabLink>
        <TabLink external href={HIRING_HREF}>
          We&apos;re hiring!
        </TabLink>
      </Grid>
      <Grid container size="auto">
        <IconLink
          external
          href={DISCORD_HREF}
          icon={<DiscordIcon fontSize="inherit" />}
        />
        <IconLink
          external
          href={TELEGRAM_HREF}
          icon={<TelegramIcon fontSize="inherit" />}
        />
        <IconLink
          external
          href={TWITTER_HREF}
          icon={<XIcon fontSize="inherit" />}
        />
      </Grid>
    </Grid>
  );
}
