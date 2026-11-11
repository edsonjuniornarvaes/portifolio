"use client";

import styled from "styled-components";

const Win = styled.div`
  position: relative; width: 100%; aspect-ratio: 16 / 10.5; border-radius: 14px; overflow: hidden; background: color-mix(in srgb, var(--card) 92%, var(--c));
  border: 1px solid color-mix(in srgb, var(--ink) 16%, transparent); box-shadow: 0 50px 90px -34px rgba(0,0,0,0.7);
  .bar { display: flex; align-items: center; gap: 6px; padding: 9px 12px; background: color-mix(in srgb, var(--ink) 6%, var(--card)); border-bottom: 1px solid var(--line); }
  .bar i { width: 9px; height: 9px; border-radius: 50%; background: var(--line); }
  .bar i:nth-child(1) { background: #ff5f57; } .bar i:nth-child(2) { background: #febc2e; } .bar i:nth-child(3) { background: #28c840; }
  .bar span { margin-left: 10px; flex: 1; max-width: 62%; padding: 3px 12px; border-radius: 99px; background: color-mix(in srgb, var(--ink) 7%, transparent); font-family: var(--font-mono); font-size: 0.62rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .page { padding: 4.5% 5%; display: grid; gap: 5%; }
  .nav { display: flex; align-items: center; gap: 3%; }
  .nav .logo { width: 11%; height: 9px; border-radius: 3px; background: var(--c); }
  .nav .l { width: 8%; height: 6px; border-radius: 3px; background: color-mix(in srgb, var(--ink) 18%, transparent); }
  .nav .sp { flex: 1; }
  .nav .btn { width: 11%; height: 12px; border-radius: 99px; background: color-mix(in srgb, var(--c) 70%, transparent); }
  .hero { display: grid; grid-template-columns: 1.2fr 1fr; gap: 6%; align-items: center; }
  .hero .t { display: grid; gap: 7px; }
  .hero .b { height: 11px; border-radius: 4px; background: color-mix(in srgb, var(--ink) 80%, transparent); }
  .hero .b.m { height: 6px; background: color-mix(in srgb, var(--ink) 22%, transparent); }
  .hero .cta { width: 34%; height: 14px; border-radius: 99px; background: var(--c); margin-top: 4px; }
  .hero .img { aspect-ratio: 1.15; border-radius: 10px; background: linear-gradient(135deg, color-mix(in srgb, var(--c) 80%, #000), color-mix(in srgb, var(--c) 25%, transparent)); }
  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4%; }
  .cards div { aspect-ratio: 1.5; border-radius: 8px; background: color-mix(in srgb, var(--ink) 8%, transparent); border: 1px solid var(--line); }
  .shimmer { position: absolute; inset: 0; background: linear-gradient(100deg, transparent 35%, color-mix(in srgb, var(--ink) 9%, transparent) 50%, transparent 65%); transform: translateX(-100%); animation: shim 4.5s ease-in-out infinite; pointer-events: none; }
  @keyframes shim { 55%, 100% { transform: translateX(100%); } }
  @media (prefers-reduced-motion: reduce) { .shimmer { display: none; } }
`;

/** Janela de navegador desenhada (esqueleto de página) na cor do projeto: no lugar de prints de site. */
export default function WebWire({ color = "#2eebaa", url = "meusite.com" }: { color?: string; url?: string }) {
  return (
    <Win style={{ ["--c" as string]: color }} aria-hidden>
      <div className="bar"><i /><i /><i /><span>{url}</span></div>
      <div className="page">
        <div className="nav"><span className="logo" /><span className="l" /><span className="l" /><span className="l" /><span className="sp" /><span className="btn" /></div>
        <div className="hero">
          <div className="t"><span className="b" /><span className="b" style={{ width: "72%" }} /><span className="b m" /><span className="b m" style={{ width: "80%" }} /><span className="cta" /></div>
          <div className="img" />
        </div>
        <div className="cards"><div /><div /><div /></div>
      </div>
      <div className="shimmer" />
    </Win>
  );
}
