"use client";

import styled from "styled-components";

const Tv = styled.div`
  position: relative;
  width: min(100%, 360px);
  transform: rotate(3deg);
  transition: transform 0.4s ease;
  &:hover { transform: rotate(0deg) scale(1.02); }
  .shell {
    position: relative; padding: 18px 54px 18px 18px; border-radius: 26px;
    background:
      radial-gradient(circle at 1px 1px, rgba(0,0,0,0.55) 1.2px, transparent 1.6px) 0 0 / 5px 5px,
      linear-gradient(135deg, #2eebaa, #06b6d4 60%, #c4a1ff);
    box-shadow: 10px 12px 0 -2px color-mix(in srgb, var(--accent-2) 55%, transparent), 0 30px 70px rgba(0,0,0,0.45);
  }
  .screen { position: relative; border-radius: 18px; overflow: hidden; aspect-ratio: 4 / 5; background: #0a0f0e; border: 3px solid rgba(0,0,0,0.6); }
  .screen img { width: 100%; height: 100%; object-fit: cover; object-position: center 18%; display: block; filter: contrast(1.08) saturate(1.05); }
  /* trama de pontos (halftone) por cima da foto */
  .screen::after {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.5) 1px, transparent 1.4px) 0 0 / 4px 4px;
    mix-blend-mode: multiply;
  }
  .screen.flat::after { background: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.22) 1px, transparent 1.4px) 0 0 / 4px 4px; }
  .screen.flat img { object-position: center top; filter: none; }
  .screen::before {
    content: ""; position: absolute; inset: 0; z-index: 2; pointer-events: none;
    background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0 1px, transparent 1px 3px);
  }
  .knobs { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); display: grid; gap: 14px; }
  .knobs i { display: block; width: 24px; height: 24px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff, #0a2a22 70%); border: 2px solid rgba(0,0,0,0.5); }
  .knobs b { display: block; width: 24px; height: 6px; border-radius: 3px; background: rgba(0,0,0,0.55); }
  .label {
    position: absolute; left: -10px; bottom: -14px; padding: 6px 12px; border-radius: 999px; font-size: 0.74rem;
    background: color-mix(in srgb, var(--paper) 85%, transparent); backdrop-filter: blur(8px); border: 1px solid var(--line);
    display: inline-flex; align-items: center; gap: 8px; transform: rotate(-3deg);
  }
  .label span { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: tvping 2.2s ease-out infinite; }
  @keyframes tvping { 0% { box-shadow: 0 0 0 0 #4ade80; } 80%, 100% { box-shadow: 0 0 0 8px transparent; } }
  @media (prefers-reduced-motion: reduce) { .label span { animation: none; } }
`;

/** Retrato numa TV antiga, com trama de pontos (halftone). */
export default function TvPortrait({ src, alt, flat }: { src: string; alt: string; flat?: boolean }) {
  return (
    <Tv>
      <div className="shell">
        <div className={`screen${flat ? " flat" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
        </div>
        <div className="knobs" aria-hidden>
          <i />
          <i />
          <b />
          <b />
        </div>
      </div>
      <div className="label">
        <span /> disponível para projetos
      </div>
    </Tv>
  );
}
