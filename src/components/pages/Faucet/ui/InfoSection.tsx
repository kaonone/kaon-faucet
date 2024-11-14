"use client";
import React from "react";
import { Grid2 as Grid, Typography, styled } from "@mui/material";

type InfoSectionProps = {
  title: string;
  content: string[];
  action?: React.ReactNode;
};

export function InfoSection(props: InfoSectionProps) {
  const { action, content, title } = props;

  return (
    <Grid container spacing="10px">
      <Typography variant="h5">{title}</Typography>
      <Grid container spacing={3}>
        {content.map((value, index) => (
          <InfoContent key={index}>{value}</InfoContent>
        ))}
      </Grid>
      {action}
    </Grid>
  );
}

const InfoContent = styled("p")(({ theme }) => ({
  ...theme.typography.h3,
  margin: 0,
  color: "rgba(102, 101, 101, 1)",
}));
