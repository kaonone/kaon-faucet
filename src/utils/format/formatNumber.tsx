const DEFAULT_PRECISION = 0;

export function formatNumber(
  value: number,
  precision: number = DEFAULT_PRECISION,
  minimumFractionDigits: number = DEFAULT_PRECISION
): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: precision,
  });
}
