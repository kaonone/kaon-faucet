"use client";
import { SvgIcon as MuiSvgIcon, styled, SvgIconProps } from "@mui/material";

export function ShortLogo(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 21 26">
      <path
        d="M16.58 1.88V0H4.38v1.88h12.2zM10.52 4.87C4.33 4.87 0 9.37 0 15.46 0 21.54 4.33 26 10.52 26 16.7 26 21 21.54 21 15.46c0-6.08-4.3-10.59-10.48-10.59zm-4.9 3.48c1.1-1.5 2.75-2.23 4.9-2.23 2.15 0 3.79.72 4.89 2.23 1.1 1.52 1.68 3.84 1.68 7.07 0 3.24-.57 5.55-1.67 7.04-1.1 1.5-2.73 2.19-4.9 2.19-2.17 0-3.82-.7-4.92-2.2-1.11-1.5-1.69-3.8-1.69-7.03 0-3.23.59-5.55 1.7-7.07z"
        fill="currentColor"
      />
      <path
        d="M10.55 23.1a2.7 2.7 0 1 0 0-5.43 2.7 2.7 0 0 0 0 5.42z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

const SvgIcon = styled(MuiSvgIcon)({
  width: "0.81em",
  height: "1em",
});
