"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export function TanstackProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
