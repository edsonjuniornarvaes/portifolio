"use client";

import { useEffect, useState, type ReactNode } from "react";
import styled from "styled-components";

const Fl = styled.div<{ $d: number; $a: number }>`
  position: absolute; animation: fl ${(p) => 6 + p.$d}s ease-in-out ${(p) => -p.$d}s infinite; --amp: ${(p) => p.$a}px;
  @keyframes fl { 50% { transform: translateY(calc(var(--amp) * -1)); } }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

/** Objeto que flutua devagar (sem arrastar, sem borda de adesivo). */
export function Floater({ children, style, delay = 0, amp = 8 }: { children: ReactNode; style: React.CSSProperties; delay?: number; amp?: number }) {
  return <Fl $d={delay} $a={amp} style={style}>{children}</Fl>;
}

/** Notebook de perfil, em degradê suave. */
export function Laptop({ w = 128 }: { w?: number }) {
  return (
    <svg width={w} height={(w * 96) / 140} viewBox="0 0 140 96" aria-hidden style={{ display: "block", filter: "drop-shadow(0 14px 14px rgba(0,0,0,0.4))" }}>
      <defs>
        <linearGradient id="lp-lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a3f48" /><stop offset="1" stopColor="#23262c" /></linearGradient>
        <linearGradient id="lp-base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#dfe3e8" /><stop offset="1" stopColor="#a5abb4" /></linearGradient>
        <linearGradient id="lp-scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0f2a24" /><stop offset="1" stopColor="#1c1735" /></linearGradient>
      </defs>
      <rect x="14" y="4" width="112" height="72" rx="7" fill="url(#lp-lid)" />
      <rect x="19" y="9" width="102" height="62" rx="3.5" fill="url(#lp-scr)" />
      <g fontFamily="var(--font-jetbrains), monospace" fontSize="5.4">
        <text x="25" y="23" fill="#c792ea">const</text><text x="44" y="23" fill="#82aaff">app</text><text x="56" y="23" fill="#fff">=</text><text x="63" y="23" fill="var(--accent)">build()</text>
        <text x="25" y="33" fill="#7fdbca">ship</text><text x="40" y="33" fill="#fff">(app)</text>
      </g>
      <rect x="25" y="44" width="38" height="16" rx="3" fill="var(--accent)" opacity=".9" /><rect x="68" y="44" width="26" height="16" rx="3" fill="#fff" opacity=".1" />
      <path d="M4 78h132l-5 10a6 6 0 0 1-5.4 3.4H14.4A6 6 0 0 1 9 88L4 78Z" fill="url(#lp-base)" />
      <rect x="56" y="78" width="28" height="3.6" rx="1.8" fill="#8b919a" />
    </svg>
  );
}

/** Xícara de café com vapor animado. */
export function Coffee({ w = 84 }: { w?: number }) {
  return (
    <svg width={w} height={(w * 100) / 84} viewBox="0 0 84 100" aria-hidden style={{ display: "block", overflow: "visible", filter: "drop-shadow(0 12px 12px rgba(0,0,0,0.4))" }}>
      <defs>
        <linearGradient id="cf-body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f4efe7" /><stop offset="1" stopColor="#cfc6b8" /></linearGradient>
        <style>{`.steam{stroke-dasharray:14 40;animation:steam 3.2s ease-in-out infinite}.steam.b{animation-delay:-1.1s}.steam.c{animation-delay:-2.1s}@keyframes steam{0%{stroke-dashoffset:40;opacity:0}30%{opacity:.8}100%{stroke-dashoffset:-8;opacity:0}}@media (prefers-reduced-motion:reduce){.steam{animation:none;opacity:.5}}`}</style>
      </defs>
      <ellipse cx="38" cy="90" rx="36" ry="7" fill="#b9b0a2" />
      <path d="M10 44h56v22c0 14-11 24-28 24S10 80 10 66V44Z" fill="url(#cf-body)" />
      <path d="M66 52h6c7 0 11 4 11 10s-4 10-11 10h-8" fill="none" stroke="#e3dccf" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="38" cy="44" rx="28" ry="6" fill="#3a2314" /><ellipse cx="38" cy="43.4" rx="23" ry="3.8" fill="#7b4a2b" />
      <path d="M10 62h56v4c0 14-11 24-28 24S10 80 10 66v-4Z" fill="var(--accent)" opacity=".9" />
      <g fill="none" stroke="#e8eef2" strokeWidth="3" strokeLinecap="round" opacity=".85">
        <path className="steam" d="M28 36c-5-6 5-8 0-16" /><path className="steam b" d="M40 36c-5-6 5-8 0-16" /><path className="steam c" d="M52 36c-5-6 5-8 0-16" />
      </g>
    </svg>
  );
}

/** Relógio digital pequeno (horário de Brasília), com os dois pontos piscando. */
export function DigitalClock() {
  const [t, setT] = useState<[string, string] | null>(null);
  useEffect(() => {
    const f = () => {
      const [h, m] = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Sao_Paulo" }).format(new Date()).split(":");
      setT([h, m]);
    };
    f();
    const id = setInterval(f, 10_000);
    return () => clearInterval(id);
  }, []);
  return (
    <Clock role="timer" aria-label={t ? `${t[0]}:${t[1]}` : undefined}>
      <span>{t ? t[0] : "--"}</span><i>:</i><span>{t ? t[1] : "--"}</span>
    </Clock>
  );
}

const Clock = styled.div`
  display: inline-flex; align-items: center; gap: 3px; padding: 7px 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.95rem; font-weight: 500; letter-spacing: 0.04em; font-variant-numeric: tabular-nums;
  color: var(--accent); background: color-mix(in srgb, var(--card) 80%, transparent); border: 1px solid var(--line); box-shadow: inset 0 0 12px color-mix(in srgb, var(--accent) 10%, transparent);
  i { font-style: normal; animation: blink 1.2s steps(1) infinite; }
  @keyframes blink { 50% { opacity: 0.2; } }
  @media (prefers-reduced-motion: reduce) { i { animation: none; } }
`;
