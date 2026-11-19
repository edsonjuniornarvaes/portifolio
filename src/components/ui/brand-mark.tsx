import { useId } from "react";

/**
 * Marca do EJ Sistemas: quadrado arredondado em degradê (cor de destaque do site) com um </> grosso e redondo.
 * O traço do meio é a barra do "/" e, inclinado, também lembra o "J" da sigla.
 */
export default function BrandMark({ size = 38, title }: { size?: number; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} style={{ display: "block", flex: "none" }}>
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
        <linearGradient id={`gl${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".38" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="19" fill={`url(#bg${id})`} />
      <rect width="64" height="64" rx="19" fill={`url(#gl${id})`} />
      <g fill="none" stroke="var(--on-accent, #04130d)" strokeWidth="6.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 23 11 32l10 9" />
        <path d="M43 23l10 9-10 9" />
        <path d="M35 16 29 48" />
      </g>
    </svg>
  );
}
