"use client";
import {
  Alert as MuiAlert,
  Button,
  ButtonProps,
  CircularProgress,
  styled,
  SvgIcon,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { UseMutationResult } from "@tanstack/react-query";

type RunMutationProps<
  TData = unknown,
  TError = Error,
  TVariables = unknown,
  TContext = unknown
> = {
  mutation: UseMutationResult<TData, TError, TVariables, TContext>;
  variables: TVariables;
  children: React.ReactNode;
  buttonProps?: ButtonProps;
};

export function RunMutationButton<
  TData = unknown,
  TError = Error,
  TVariables = unknown,
  TContext = unknown
>({
  mutation,
  variables,
  children,
  buttonProps = {},
}: RunMutationProps<TData, TError, TVariables, TContext>) {
  return (
    <>
      <Button
        {...buttonProps}
        disabled={mutation.isPending || buttonProps.disabled}
        onClick={(event) => {
          mutation.mutate(variables);
          buttonProps.onClick && buttonProps.onClick(event);
        }}
        startIcon={
          (mutation.isPending || mutation.isSuccess) && (
            <SvgIcon fontSize="inherit" />
          )
        }
        endIcon={
          (mutation.isPending || mutation.isSuccess) &&
          (mutation.isPending ? (
            <CircularProgress size="1em" />
          ) : (
            <CheckIcon fontSize="inherit" />
          ))
        }
      >
        {children}
      </Button>
      {!mutation.isPending && mutation.isError && (
        <Alert severity="error">
          {(mutation.error as any)?.message || String(mutation.error)}
        </Alert>
      )}
    </>
  );
}

const Alert = styled(MuiAlert)({
  marginTop: 8,
});
