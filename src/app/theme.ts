"use client";
import { createTheme } from "@mui/material/styles";

const fontFamily = "var(--font-family)";

export const theme = createTheme({
  cssVariables: true,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1536,
    },
  },
  typography: {
    h1: {
      fontFamily,
      fontSize: 36,
      fontWeight: 500,
      lineHeight: "53px",
      letterSpacing: "0.27px",
      textTransform: "none",
    },
    h2: {
      fontFamily,
      fontSize: 16,
      fontWeight: 500,
      lineHeight: "26px",
      letterSpacing: "0.20px",
      textTransform: "none",
    },
    h3: {
      fontFamily,
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "26px",
      letterSpacing: "0.20px",
      textTransform: "none",
    },
    h4: {
      fontFamily,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: "26px",
      letterSpacing: "0.27px",
      textTransform: "uppercase",
    },
    h5: {
      fontFamily,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: "26px",
      letterSpacing: "0.20px",
      textTransform: "none",
    },
    button: {
      fontFamily,
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "24px",
      letterSpacing: "0.72px",
      textTransform: "none",
    },
    body1: {
      fontFamily,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "26px",
      letterSpacing: "0.20px",
      textTransform: "none",
    },
    tabLink: {
      fontFamily,
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "26px",
      letterSpacing: "0.20px",
      textTransform: "uppercase",
    },
    small: {
      fontFamily,
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "12px",
      letterSpacing: "0.27px",
      textTransform: "uppercase",
    },
    h6: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    body2: undefined,
    caption: undefined,
    overline: undefined,
  },
  palette: {
    background: {
      default: "rgb(248, 246, 243)",
      paper: "rgb(255, 255, 255)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root, body": {
          height: "100%",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          small: "span",
          tabLink: "span",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 2,
          padding: "7px 0",
        },
        rail: {
          backgroundColor: "rgb(153, 143, 135)",
        },
        track: {
          zIndex: 1,
          backgroundColor: "rgb(58, 58, 58)",
          borderColor: "rgb(58, 58, 58)",
        },
        thumb: {
          backgroundColor: "rgb(58, 58, 58)",
          width: 8,
          height: 8,
          borderRadius: 1.5,
          boxShadow: "0px 0px 0px 4px rgba(153, 143, 135, 1)",

          "&::after": {
            width: 24,
            height: 24,
          },

          "&::before": {
            boxShadow: "none",
          },

          "&:hover, &.Mui-focusVisible, &.Mui-active": {
            boxShadow: "0px 0px 0px 5px rgba(153, 143, 135, 1)",
          },
        },
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    tabLink: React.CSSProperties;
    small: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    tabLink?: React.CSSProperties;
    small?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    tabLink: true;
    small: true;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body2: false;
    caption: false;
    overline: false;
  }
}
