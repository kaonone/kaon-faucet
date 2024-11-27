"use client";
import {
  Button,
  Alert as MuiAlert,
  Grid2 as Grid,
  IconButton,
  Card as MuiCard,
  SvgIcon,
  Typography,
  styled,
} from "@mui/material";

import { KaonLoader } from "../../../ui/KaonLoader";
import { RightTopArrowIcon } from "../../../icons/RightTopArrowIcon";
import { InfoIcon } from "../../../icons/InfoIcon";
import { InfoSection } from "../ui/InfoSection";
import { FaucetFormSubmitData } from "../FaucetForm/types";
import { ReceiveMutation, TxStatusQuery } from "./types";
import { RunMutationButton } from "../../../ui/RunMutationButton";
import { KAON_NETWORK } from "../../../../constants";
import { useKaonNetworkToWallet } from "./useKaonNetworkToWallet";

type ReceivingStatusProps = {
  txHash: string | null;
  formData: FaucetFormSubmitData;
  receiveMutation: ReceiveMutation;
  txStatusQuery: TxStatusQuery;
};

export function ReceivingStatus(props: ReceivingStatusProps) {
  const { receiveMutation, txStatusQuery, txHash, formData } = props;
  const { evmAddress } = formData;
  const addNetworkMutation = useKaonNetworkToWallet();

  const errorMessage =
    (receiveMutation.isError &&
      (receiveMutation.error?.message || String(receiveMutation.error))) ||
    (txStatusQuery.isError &&
      (txStatusQuery.error?.message || String(txStatusQuery.error))) ||
    (txStatusQuery.data === "FAILED" && "Transaction failed, try again");

  const isLoading =
    !errorMessage &&
    (receiveMutation.isIdle ||
      receiveMutation.isPending ||
      txStatusQuery.isPending ||
      txStatusQuery.data === "PENDING");

  const isSuccessful =
    !errorMessage && !isLoading && txStatusQuery.data === "SUCCESSFUL";

  return (
    <Grid container spacing={3} direction="column">
      {!!errorMessage && (
        <Alert severity="error" icon={<InfoIcon fontSize="inherit" />}>
          {(receiveMutation.error && receiveMutation.error.message) ||
            String(receiveMutation.error)}
        </Alert>
      )}

      {(isLoading || isSuccessful) && (
        <MuiCard variant="outlined">
          <LoaderGrid
            container
            spacing={3}
            direction="column"
            alignItems="center"
          >
            <KaonLoader />
            <Grid container spacing={1}>
              {txHash && <TxHashButtonBalancer fontSize="inherit" />}
              <Typography variant="h2">
                {isSuccessful ? "Executed on testnet" : "Processing on testnet"}
              </Typography>
              {txHash && (
                <TxHashButton
                  component="a"
                  href={`${KAON_NETWORK.blockExplorerUrl}/tx/${txHash}`}
                  size="small"
                >
                  <RightTopArrowIcon fontSize="inherit" />
                </TxHashButton>
              )}
            </Grid>
          </LoaderGrid>
        </MuiCard>
      )}

      <InfoSection
        content={["This can take anywhere between 1 and 10 minutes."]}
      />

      <InfoSection
        title="Testnet explorer"
        content={[
          "Your address will show tokens on testnet once released from the facuet.",
        ]}
        action={
          <Button
            href={`${KAON_NETWORK.blockExplorerUrl}/address/${evmAddress}`}
            variant="outlined"
            endIcon={<RightTopArrowIcon fontSize="small" />}
          >
            View wallet on Testnet Explorer
          </Button>
        }
      />

      <InfoSection
        title="View in Wallet"
        content={[
          "Add the KAON testnet as a custom network on your EVM wallet such as Metamask. Tokens will not show instantly but when released from the testnet faucet.",
        ]}
        action={
          <Button
            href="/#TODO"
            variant="outlined"
            endIcon={<RightTopArrowIcon fontSize="small" />}
          >
            Detailed Instructions
          </Button>
        }
      />

      <RunMutationButton
        mutation={addNetworkMutation}
        variables={undefined}
        buttonProps={{
          fullWidth: true,
          variant: "contained",
        }}
      >
        Add Kaon testnet on Metamask
      </RunMutationButton>
    </Grid>
  );
}

const TxHashButton = styled(IconButton<"a">)({
  padding: 4,
});

const TxHashButtonBalancer = styled(SvgIcon)({
  fontSize: 26,
});

const LoaderGrid = styled(Grid)({
  fontSize: 60,
  margin: 42,
});

const Alert = styled(MuiAlert)(({ theme }) => ({
  marginTop: 8,
  "& .MuiAlert-message": {
    ...theme.typography.body1,
  },
}));
