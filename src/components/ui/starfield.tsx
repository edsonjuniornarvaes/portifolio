"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const Layer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  span {
    position: absolute;
    width: var(--s);
    height: var(--s);
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.1;
    animation: twinkle var(--d) ease-in-out infinite;
    animation-delay: var(--delay);
  }
  span.w { background: var(--ink); }
  @keyframes twinkle { 0%, 100% { opacity: 0.08; transform: scale(1); } 50% { opacity: 0.55; transform: scale(1.4); } }
  @media (prefers-reduced-motion: reduce) { span { animation: none; opacity: 0.25; } }
`;

/** Pseudo-aleatório determinístico (evita diferença entre servidor e cliente). */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/** Céu de estrelinhas discreto no fundo do site. */
export default function Starfield() {
  const pathname = usePathname();
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        left: `${(rand(i + 1) * 100).toFixed(2)}%`,
        top: `${(rand(i + 101) * 100).toFixed(2)}%`,
        s: `${(1 + rand(i + 201) * 2).toFixed(1)}px`,
        d: `${(3 + rand(i + 301) * 5).toFixed(1)}s`,
        delay: `${(rand(i + 401) * 6).toFixed(1)}s`,
        white: i % 4 === 0,
      })),
    [],
  );
  if (pathname.startsWith("/adminaccess")) return null;
  return (
    <Layer aria-hidden>
      {stars.map((st, i) => (
        <span
          key={i}
          className={st.white ? "w" : undefined}
          style={{ left: st.left, top: st.top, ["--s" as string]: st.s, ["--d" as string]: st.d, ["--delay" as string]: st.delay }}
        />
      ))}
    </Layer>
  );
}
