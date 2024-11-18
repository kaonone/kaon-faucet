"use client";
import {
  Button,
  ButtonProps,
  CircularProgress,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
    <Button
      {...buttonProps}
      disabled={mutation.isPending || buttonProps.disabled}
      onClick={(event) => {
        mutation.mutate(variables);
        buttonProps.onClick && buttonProps.onClick(event);
      }}
      startIcon={
        mutation.isIdle || mutation.isPaused ? null : (
          <SvgIcon fontSize="inherit" />
        )
      }
      endIcon={
        mutation.isIdle || mutation.isPaused ? null : (
          <>
            {mutation.isPending && <CircularProgress size="1em" />}
            {!mutation.isPending && mutation.isSuccess && (
              <CheckIcon fontSize="inherit" />
            )}
            {!mutation.isPending && mutation.isError && (
              <Tooltip
                title={
                  (mutation.error as Error)?.message || String(mutation.error)
                }
              >
                <ErrorOutlineIcon fontSize="inherit" />
              </Tooltip>
            )}
          </>
        )
      }
    >
      {children}
    </Button>
  );
}
