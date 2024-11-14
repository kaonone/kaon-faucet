"use client";
import React from "react";
import { Slider as MuiSlider, Typography, styled } from "@mui/material";

import { formatNumber } from "../../utils/format/formatNumber";
import { ShortLogo } from "./ShortLogo";

type KaonSliderProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (event: Event, value: number | number[]) => void;
};

export function KaonSlider({
  onChange,
  value,
  min,
  max,
  step,
}: KaonSliderProps) {
  return (
    <Root>
      <TopBox>
        <ShortLogo fontSize="inherit" />
        <Value>{formatNumber(value)}</Value>
      </TopBox>
      <Slider
        value={value}
        step={step}
        min={min}
        max={max}
        valueLabelDisplay="off"
        onChange={onChange}
      />
      <BottomBox>
        <Typography variant="tabLink">{formatNumber(min)} min</Typography>
        <Typography variant="tabLink">{formatNumber(max)} max</Typography>
      </BottomBox>
    </Root>
  );
}

const Root = styled("div")({});

const TopBox = styled("div")({
  fontSize: 26,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
  color: "rgba(58, 58, 58, 1)",
});

const Slider = styled(MuiSlider)({ display: "block" });

const BottomBox = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 4,
  color: "rgba(153, 143, 135, 1)",
});

const Value = styled("span")(({ theme }) => ({
  ...theme.typography.h1,
  fontSize: "1.38em",
  lineHeight: "0.72em",
  marginBottom: "-0.1em",
}));
