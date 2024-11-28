"use client";
import { useState, useEffect } from "react";

export function useMounted({
  onMount,
}: { onMount?: () => void } = {}): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    mounted && onMount?.();
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mounted;
}
