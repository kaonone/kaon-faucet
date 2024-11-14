import { Metadata } from "next";
import { Heebo } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "./theme";
import { TanstackProvider } from "./providers";

const fontFamily = Heebo({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family",
});

export const metadata: Metadata = {
  title: "Kaon Faucet",
  // description: "TODO: description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className={`${fontFamily.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <TanstackProvider>
              <CssBaseline />
              <AppLayout>{children}</AppLayout>
            </TanstackProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
