"use client";
import { UseMutationResult } from "@tanstack/react-query";

export type ReceiveMutation = UseMutationResult<
  void,
  Error,
  {
    hCaptchaToken: string;
  },
  unknown
>;
