"use client";
import React from "react";
import {
  Container as MuiContainer,
  Grid2 as Grid,
  styled,
} from "@mui/material";

import { FullLogo } from "../../ui/FullLogo";
import { TopNavigation } from "./TopNavigation";
import { BottomNavigation } from "./BottomNavigation";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="lg" disableGutters>
      <TopNavigationBox>
        <TopNavigation />
      </TopNavigationBox>

      <Content>
        <ContentHeader>
          <FullLogo fontSize="inherit" />
        </ContentHeader>
        {children}
      </Content>

      <BottomNavigationBox>
        <BottomNavigation />
      </BottomNavigationBox>
    </Container>
  );
}

const Container = styled(MuiContainer)({
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
});

const TopNavigationBox = styled("div")({
  margin: "32px 32px 0",
  minHeight: 26,
});

const Content = styled("div")({
  margin: "32px 32px 0",
  flexGrow: 1,
});

const ContentHeader = styled("div")({
  display: "flex",
  justifyContent: "center",
  fontSize: 30,
  maxWidth: 380,
  paddingBottom: 32,
  margin: "0 auto 32px",
  borderBottom: "2px solid black",
});

const BottomNavigationBox = styled("nav")({
  margin: "32px",
  display: "flex",
  justifyContent: "center",
});

const Link = styled(Grid)({});
