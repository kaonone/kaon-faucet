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
import { useQuery } from "@tanstack/react-query";

import { getTxStatus } from "../../../../api/getTxStatus";
import { KAON_NETWORK } from "../../../../constants";
import { KaonLoader } from "../../../ui/KaonLoader";
import { RunMutationButton } from "../../../ui/RunMutationButton";
import { RightTopArrowIcon } from "../../../icons/RightTopArrowIcon";
import { InfoIcon } from "../../../icons/InfoIcon";
import { InfoSection } from "../ui/InfoSection";
import { FaucetFormSubmitData } from "../FaucetForm/types";
import { useAddKaonNetworkToWallet } from "../../../../utils/injectedWallet";

type ReceivingStatusProps = {
  txHash: string | null;
  formData: FaucetFormSubmitData;
};

export function ReceivingStatus(props: ReceivingStatusProps) {
  const { txHash, formData } = props;
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

  const errorMessage =
    (txStatusQuery.isError &&
      (txStatusQuery.error?.message || String(txStatusQuery.error))) ||
    (txStatusQuery.data === "FAILED" && "Transaction failed, try again");

  const isLoading =
    !errorMessage &&
    (txStatusQuery.isPending || txStatusQuery.data === "PENDING");

  const isSuccessful =
    !errorMessage && !isLoading && txStatusQuery.data === "SUCCESSFUL";

  return (
    <Grid container spacing={3} direction="column">
      {!!errorMessage && (
        <Alert severity="error" icon={<InfoIcon fontSize="inherit" />}>
          {errorMessage}
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
                  size="small"
                  href={`${KAON_NETWORK.blockExplorerUrl}/tx/${txHash}`}
                  target="_blank"
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
