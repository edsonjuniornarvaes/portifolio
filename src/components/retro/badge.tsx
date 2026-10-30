"use client";

import styled, { keyframes } from "styled-components";

const spin = keyframes`to { transform: rotate(360deg); }`;

const Wrap = styled.div`
  position: relative;
  width: 132px;
  height: 132px;
  margin: 26px auto 0;
  .ring { position: absolute; inset: 0; animation: ${spin} 28s linear infinite; }
  .ring text { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0; text-transform: uppercase; fill: var(--ink); }
  .ring .dot { fill: var(--accent); }
  .core {
    position: absolute; inset: 30px; border-radius: 50%; display: grid; place-items: center;
    border: 2px solid var(--accent-ink);
    background: color-mix(in srgb, var(--accent) 10%, var(--paper));
    font-family: var(--font-mono); font-weight: 700; font-size: 1.05rem; color: var(--accent-ink);
    box-shadow: 0 0 26px var(--glow);
    transition: transform 0.3s ease;
  }
  &:hover .core { transform: scale(1.08) rotate(-6deg); }
  @media (prefers-reduced-motion: reduce) { .ring { animation: none; } }
`;

/** Selo redondo com texto girando ao redor de um </>. */
export default function Badge() {
  return (
    <Wrap role="img" aria-label="Feito por humano, escrito em TypeScript">
      <svg className="ring" viewBox="0 0 132 132" aria-hidden>
        <defs>
          <path id="badge-circle" d="M66,66 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
        </defs>
        <text>
          <textPath href="#badge-circle" startOffset="0" textLength="318" lengthAdjust="spacing">
            feito por humano · escrito em TypeScript ·
          </textPath>
        </text>
      </svg>
      <div className="core">{"</>"}</div>
    </Wrap>
  );
}
