"use client";

import styled from "styled-components";

const Wrap = styled.div`
  position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
  i {
    position: absolute; width: 62vmax; height: 62vmax; border-radius: 50%; will-change: transform;
    background: radial-gradient(circle at 50% 50%, var(--c) 0%, transparent 62%);
  }
  .a { --c: color-mix(in srgb, var(--accent) 13%, transparent); top: -26vmax; left: -18vmax; animation: driftA 42s ease-in-out infinite alternate; }
  .b { --c: color-mix(in srgb, var(--accent-2) 11%, transparent); right: -24vmax; top: 18vh; animation: driftB 50s ease-in-out infinite alternate; }
  .c { --c: rgba(124, 92, 255, 0.09); bottom: -30vmax; left: 22vw; animation: driftC 58s ease-in-out infinite alternate; }
  .dots {
    position: absolute; inset: 0; opacity: 0.55;
    background-image: radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--ink) 16%, transparent) 1px, transparent 1.4px);
    background-size: 30px 30px;
    mask-image: radial-gradient(ellipse 80% 55% at 50% 0%, #000, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 55% at 50% 0%, #000, transparent 75%);
  }
  @keyframes driftA { to { transform: translate3d(14vmax, 10vmax, 0) scale(1.08); } }
  @keyframes driftB { to { transform: translate3d(-12vmax, -8vmax, 0) scale(1.12); } }
  @keyframes driftC { to { transform: translate3d(-16vmax, -9vmax, 0) scale(1.05); } }
  @media (prefers-reduced-motion: reduce) { i { animation: none; } }
`;

/** Fundo: três manchas de cor em deriva lenta e uma grade de pontos que some para baixo. */
export default function Backdrop() {
  return (
    <Wrap aria-hidden>
      <i className="a" />
      <i className="b" />
      <i className="c" />
      <span className="dots" />
    </Wrap>
  );
}
