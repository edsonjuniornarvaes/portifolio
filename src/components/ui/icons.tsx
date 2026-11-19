import type { SVGProps } from "react";

/** Setas e chevrons em traço fino, no lugar dos caracteres de texto (→ ← ↗), para ficarem todos iguais. */
const base = (p: SVGProps<SVGSVGElement>) => ({ viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, style: { display: "inline-block", verticalAlign: "-0.2em", flex: "none", ...p.style }, ...p });

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>;
export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>;
export const ChevronRight = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="m9.5 5.5 6.5 6.5-6.5 6.5" /></svg>;
export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="m14.5 5.5-6.5 6.5 6.5 6.5" /></svg>;
export const ChevronUp = (p: SVGProps<SVGSVGElement>) => <svg {...base(p)}><path d="m5.5 14.5 6.5-6.5 6.5 6.5" /></svg>;
