const FORMAT_PRECISION = 0;

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: FORMAT_PRECISION,
    maximumFractionDigits: FORMAT_PRECISION,
  });
}
