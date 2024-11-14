"use client";
import {
  IconButton as MuiIconButton,
  IconButtonProps,
  SvgIcon as MuiSvgIcon,
  styled,
} from "@mui/material";

export function BackButton(props: IconButtonProps) {
  return (
    <IconButton {...props} disableRipple>
      <SvgIcon viewBox="0 0 35 28" fontSize="inherit">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.08 11.75a3.18 3.18 0 0 0 0 4.5L11.9 27.07c.6.6 1.41.93 2.25.93h15.76A5.1 5.1 0 0 0 35 22.9V5.1A5.1 5.1 0 0 0 29.9 0H14.16c-.84 0-1.65.34-2.25.93L1.08 11.75z"
          fill="#F8F6F3"
        />
        <path
          d="M17.94 9.11c.16.07.3.17.42.3l2.91 2.91 2.92-2.91a1.27 1.27 0 1 1 1.8 1.8l-2.92 2.91L26 17.04a1.28 1.28 0 1 1-1.8 1.8l-2.92-2.92-2.91 2.92a1.27 1.27 0 1 1-1.8-1.8l2.92-2.92-2.92-2.92a1.27 1.27 0 0 1 1.38-2.09z"
          fill="#CCCAC8"
        />
      </SvgIcon>
    </IconButton>
  );
}

const SvgIcon = styled(MuiSvgIcon)({
  width: "1.25em",
  height: "1em",
});

const IconButton = styled(MuiIconButton)({
  padding: 0,
  fontSize: 28,
});
