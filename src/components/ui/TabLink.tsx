"use client";
import React, { ReactNode } from "react";
import { styled } from "@mui/material";
import NextLink from "next/link";

type TabLinkProps = {
  href: string;
  external?: true;
  icon?: ReactNode;
  children: ReactNode;
};

export function TabLink({ children, href, external, icon }: TabLinkProps) {
  const Root = external ? InternalTabLinkRoot : ExternalTabLinkRoot;

  return (
    <Root href={href} target={external ? "_blank" : undefined}>
      {icon && <TabLinkIcon>{icon}</TabLinkIcon>}
      <span>{children}</span>
    </Root>
  );
}

const ExternalTabLinkRoot = styled("a")(({ theme }) => ({
  ...theme.typography.tabLink,
  color: "black",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 8,

  "&:hover": {
    color: "rgba(102, 101, 101, 1)",
    textDecoration: "underline",
  },
}));

const InternalTabLinkRoot = ExternalTabLinkRoot.withComponent(NextLink);

const TabLinkIcon = styled("div")({
  display: "flex",
  fontSize: 13,
  marginTop: -2,
});
