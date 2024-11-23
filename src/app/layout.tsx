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

const faucet_description = "Kaon is a Bitcoin and UTXO native blockchain with cross-chain composability. Our mission is to create a stronger fidelity of on-chain transfers of Bitcoin assets. The result is a decentralized consensus layer that not only offers the first cryptographically secure mirrored BTC, but is also bridge-less and oracle-less to make Bitcoin ecosystem interoperability secure, composable and scalable."

export const metadata: Metadata = {
  metadataBase: new URL("https://faucet.testnet.kaon.one/"),
  title: "Kaon Faucet",
  applicationName: "Kaon Faucet",
  authors: [{ name: "Kaon Labs" }],
  creator: "Kaon Labs",
  publisher: "Kaon Labs",
  generator: 'Next.js',
  keywords: ["Kaon", "Testnet", "Faucet", "Blockchain", "Bitcoin", "EVM"],
  formatDetection: {
    telephone: false,
  },
  description: faucet_description,
  openGraph: {
    title: "Kaon Faucet",
    description: faucet_description,
    url: "https://kaon.one/",
    siteName: "Kaon Faucet",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaon Faucet",
    description: faucet_description,
    siteId: "935139646224371712",
    creator: "@kaonlabs",
    creatorId: "935139646224371712",
  },
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
