"use client";

import styled from "styled-components";
import type { HTMLAttributes, ReactNode } from "react";

const Frame = styled.div<{ $tilt?: number; $hue?: "mint" | "violet" | "warm" }>`
  --edge: ${(p) =>
    p.$hue === "violet"
      ? "linear-gradient(90deg, #7c5cff, #c4a1ff)"
      : p.$hue === "warm"
        ? "linear-gradient(90deg, #ffb86b, #ff7eb6)"
        : "linear-gradient(90deg, #2eebaa, #06b6d4 55%, #a5f3fc)"};
  position: relative;
  transform: rotate(${(p) => p.$tilt ?? 0}deg);
  transition: transform 0.35s ease, filter 0.35s ease;
  border-radius: 6px;
  background: var(--paper);
  padding: 2px;
  background-image: var(--edge);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  &:hover { transform: rotate(0deg) translateY(-4px); }
  .bar { display: flex; gap: 5px; padding: 6px 10px; }
  .bar i { width: 11px; height: 11px; border: 2px solid var(--paper); display: block; }
  .body { background: var(--paper); border-radius: 0 0 4px 4px; overflow: hidden; }
`;

/** Moldura de janela retrô: barra com três quadradinhos e borda em degradê. */
export default function WindowFrame({
  children,
  tilt,
  hue,
  ...rest
}: { children: ReactNode; tilt?: number; hue?: "mint" | "violet" | "warm" } & HTMLAttributes<HTMLDivElement>) {
  return (
    <Frame $tilt={tilt} $hue={hue} {...rest}>
      <div className="bar" aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className="body">{children}</div>
    </Frame>
  );
}
