"use client";
import React, { ReactNode } from "react";
import { styled } from "@mui/material";
import NextLink from "next/link";

type IconLinkProps = {
  href: string;
  external?: true;
  icon: ReactNode;
};

export function IconLink({ href, external, icon }: IconLinkProps) {
  const Root = external ? InternalIconLinkRoot : ExternalIconLinkRoot;

  return (
    <Root href={href} target={!external ? "_blank" : undefined}>
      {icon}
    </Root>
  );
}

const ExternalIconLinkRoot = styled("a")(() => ({
  fontSize: 24,
  color: "black",
  textDecoration: "none",
  display: "flex",

  "&:hover": {
    color: "rgba(102, 101, 101, 1)",
  },
}));

const InternalIconLinkRoot = ExternalIconLinkRoot.withComponent(NextLink);
