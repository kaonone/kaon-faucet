"use client";
import {
  Button,
  Grid2 as Grid,
  Card as MuiCard,
  Typography,
  styled,
  Link,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getTxStatus } from "../../../../api/getTxStatus";
import { KAON_NETWORK } from "../../../../constants";
import { useAddKaonNetworkToWallet } from "../../../../utils/injectedWallet";
import { KaonLoader } from "../../../ui/KaonLoader";
import { RunMutationButton } from "../../../ui/RunMutationButton";
import { RightTopArrowIcon } from "../../../icons/RightTopArrowIcon";
import { FailedTxIcon } from "../../../icons/FailedTxIcon";
import { ExecutedTxIcon } from "../../../icons/ExecutedTxIcon";
import { InfoSection } from "../ui/InfoSection";
import { FaucetFormSubmitData } from "../FaucetForm/types";

type ReceivingStatusProps = {
  txHash: string | null;
  formData: FaucetFormSubmitData;
};

export function ReceivingStatus(props: ReceivingStatusProps) {
  const { txHash, formData } = props;
  const [txHashDelayed, setTxHashDelayed] = useState<string | null>(null);
  const { evmAddress } = formData;
  const addNetworkMutation = useAddKaonNetworkToWallet();

  const txStatusQuery = useQuery({
    queryKey: ["txStatus", txHash],
    queryFn: () => {
      return getTxStatus(txHash!);
    },
    enabled: !!txHash,
    refetchInterval: 5_000,
  });

  useEffect(() => {
    if (txHash) {
      const timeoutId = window.setTimeout(
        () => setTxHashDelayed(txHash),
        60 * 1000
      );
      return () => window.clearTimeout(timeoutId);
    }
  }, [txHash]);

  const status = txStatusQuery.data || "PENDING";
  const isError = status === "FAILED";
  const isSuccessful = status === "SUCCESSFUL";
  const isLoading = status === "PENDING";

  const txHashToDisplay = isError || isSuccessful ? txHash : txHashDelayed;

  return (
    <Grid container spacing={3} direction="column">
      <MuiCard variant="outlined">
        <StatusGrid
          container
          spacing={3}
          direction="column"
          alignItems="center"
        >
          {isLoading && <KaonLoader />}
          {isSuccessful && <ExecutedTxIcon fontSize="inherit" />}
          {isError && <FailedTxIcon fontSize="inherit" />}

          <Grid container spacing={0} direction="column" alignItems="center">
            <Typography variant="h2">
              {isLoading && "Pending the transaction to be accepted"}
              {isSuccessful && "Transaction executed"}
              {isError && "Transaction failed, try again"}
            </Typography>
            {txHashToDisplay && (
              <TxHashTypography variant="body1">
                The transaction hash is{" "}
                <Link
                  href={`${KAON_NETWORK.blockExplorerUrl}/tx/${txHashToDisplay}`}
                  target="_blank"
                >
                  {txHashToDisplay.slice(0, 6)}...{txHashToDisplay.slice(-4)}
                </Link>
              </TxHashTypography>
            )}
          </Grid>
        </StatusGrid>
      </MuiCard>

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

      <div>
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
      </div>
    </Grid>
  );
}

const StatusGrid = styled(Grid)({
  fontSize: 60,
  margin: 42,
});

const TxHashTypography = styled(Typography)({
  color: "rgb(102, 101, 101)",

  "& a": {
    color: "rgb(102, 101, 101)",
  },
});
