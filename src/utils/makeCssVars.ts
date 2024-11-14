export function makeCssVars(
  vars: Record<`--${string}`, string | number>
): React.CSSProperties {
  return vars as React.CSSProperties;
}
