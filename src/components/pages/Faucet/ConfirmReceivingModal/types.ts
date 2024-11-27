"use client";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { TxStatus } from "../../../../api/getTxStatus";

export type ReceiveMutation = UseMutationResult<
  void,
  Error,
  {
    hCaptchaToken: string;
  },
  unknown
>;

export type TxStatusQuery = UseQueryResult<TxStatus, Error>;
