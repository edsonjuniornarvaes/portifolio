"use client";

import { useRef, useState, type ReactNode } from "react";
import styled from "styled-components";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

const useMotionValueTransform = useTransform;
import { play } from "@/lib/sound";

const Box = styled.div`
  position: absolute; touch-action: none; user-select: none; -webkit-user-select: none; cursor: grab; pointer-events: auto;
  &:active { cursor: grabbing; }
  .stack { position: relative; }
  .layer { position: absolute; inset: 0; }
  .base { position: relative; }
  .shadow { filter: drop-shadow(0 2px 1px rgba(0,0,0,0.25)) drop-shadow(0 14px 16px rgba(0,0,0,0.35)); }
  /* verso do adesivo: o desenho vira papel branco, com um degradê de luz */
  .flap { filter: brightness(0) invert(0.96) drop-shadow(0 6px 8px rgba(0,0,0,0.4)); }
  .flap-sheen { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: multiply; background: linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.16)); }
  @media (max-width: 760px) { zoom: 0.8; }
`;

/**
 * Adesivo de verdade: ao passar o mouse, a ponta de cima começa a descolar; se você puxar para baixo,
 * ele descola mais (aparece o verso branco) e, ao soltar, gruda de volta. Funciona com qualquer desenho recortado.
 * `h` é a altura do desenho, em px.
 */
export default function PeelSticker({ children, h, style, rot = 0, label }: { children: ReactNode; h: number; style: React.CSSProperties; rot?: number; label: string }) {
  const peel = useMotionValue(0); // 0 a 1 (fração da altura que já descolou)
  const p = useSpring(peel, { stiffness: 220, damping: 20 });
  const [drag, setDrag] = useState(false);
  const start = useRef(0);

  const baseClip = useMotionTemplate`inset(${useMotionValueTransform(p, (v) => v * 100)}% 0 0 0)`;
  const flapClip = useMotionTemplate`inset(0 0 ${useMotionValueTransform(p, (v) => (1 - v) * 100)}% 0)`;
  const fold = useMotionValueTransform(p, (v) => `${v * h}px`);

  return (
    <Box
      style={{ ...style, transform: `rotate(${rot}deg)` }}
      role="img"
      aria-label={label}
      onPointerEnter={() => { if (!drag) { peel.set(0.22); play("peel"); } }}
      onPointerLeave={() => { if (!drag) peel.set(0); }}
      onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); start.current = e.clientY; setDrag(true); play("peel"); }}
      onPointerMove={(e) => { if (drag) peel.set(Math.max(0.12, Math.min(0.78, 0.22 + (e.clientY - start.current) / h))); }}
      onPointerUp={() => { setDrag(false); peel.set(0); play("pop"); }}
      onPointerCancel={() => { setDrag(false); peel.set(0); }}
    >
      <div className="stack shadow">
        <motion.div className="base" style={{ clipPath: baseClip }}>{children}</motion.div>
        <motion.div className="layer flap" style={{ clipPath: flapClip, scaleY: -1, transformOrigin: useMotionTemplate`0px ${fold}` }}>
          {children}
          <div className="flap-sheen" />
        </motion.div>
      </div>
    </Box>
  );
}

const W = { fill: "#fff", stroke: "#fff", strokeWidth: 10, strokeLinejoin: "round" as const };

export function MacBookSticker() {
  return (
    <svg width="190" height="129" viewBox="0 0 250 170" aria-hidden style={{ display: "block" }}>
      <defs>
        <clipPath id="mb-s"><rect x="40" y="19" width="170" height="106" rx="5" /></clipPath>
        <linearGradient id="mb-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6e8ec" /><stop offset="1" stopColor="#a9aeb7" /></linearGradient>
        <linearGradient id="mb-w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#10231f" /><stop offset="1" stopColor="#1e1633" /></linearGradient>
        <linearGradient id="mb-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".4" /><stop offset=".42" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <path d="M32 12h186a8 8 0 0 1 8 8v112H24V20a8 8 0 0 1 8-8Z M8 134h234l-6 22a8 8 0 0 1-8 6H22a8 8 0 0 1-8-6Z" {...W} />
      <path d="M32 12h186a8 8 0 0 1 8 8v112H24V20a8 8 0 0 1 8-8Z" fill="#2a2c31" />
      <g clipPath="url(#mb-s)">
        <rect x="40" y="19" width="170" height="106" fill="url(#mb-w)" />
        <g fontFamily="var(--font-jetbrains), monospace" fontSize="8">
          <text x="50" y="40" fill="#c792ea">const</text><text x="82" y="40" fill="#82aaff">app</text><text x="100" y="40" fill="#fff">=</text><text x="110" y="40" fill="var(--accent)">&quot;Edson&quot;</text>
          <text x="50" y="56" fill="#c792ea">build</text><text x="78" y="56" fill="#fff">(</text><text x="84" y="56" fill="#ffcb6b">iPhone</text><text x="114" y="56" fill="#fff">,</text><text x="120" y="56" fill="#ffcb6b">Android</text><text x="154" y="56" fill="#fff">)</text>
          <text x="50" y="72" fill="#7fdbca">deploy</text><text x="86" y="72" fill="#fff">()</text>
        </g>
        <rect x="50" y="86" width="64" height="24" rx="6" fill="var(--accent)" opacity=".95" /><rect x="120" y="86" width="40" height="24" rx="6" fill="#fff" opacity=".12" />
        <rect width="250" height="170" fill="url(#mb-g)" />
      </g>
      <circle cx="125" cy="16" r="1.6" fill="#555" />
      <path d="M8 134h234l-6 22a8 8 0 0 1-8 6H22a8 8 0 0 1-8-6Z" fill="url(#mb-b)" />
      <rect x="100" y="134" width="50" height="6" rx="3" fill="#8c919a" />
    </svg>
  );
}

export function CoffeeSticker() {
  return (
    <svg width="100" height="106" viewBox="0 0 132 140" aria-hidden style={{ display: "block" }}>
      <defs><linearGradient id="cf-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e9d9c8" /></linearGradient></defs>
      <path d="M22 50h66v32c0 20-13 36-33 36S22 102 22 82V50Z" {...W} />
      <path d="M88 58h12c10 0 16 6 16 14s-6 14-16 14H86" fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round" />
      <path d="M88 60h12c8 0 13 5 13 12s-5 12-13 12H85" fill="none" stroke="#e9d9c8" strokeWidth="7" strokeLinecap="round" />
      <path d="M22 50h66v32c0 20-13 36-33 36S22 102 22 82V50Z" fill="url(#cf-c)" />
      <path d="M22 70h66v12c0 20-13 36-33 36S22 102 22 82V70Z" fill="var(--accent)" opacity=".92" />
      <text x="55" y="97" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="17" fontWeight="700" fill="#04130d">{"</>"}</text>
      <ellipse cx="55" cy="50" rx="33" ry="7" fill="#3a2314" /><ellipse cx="55" cy="49" rx="27" ry="4.4" fill="#7b4a2b" />
      <path d="M43 34c-6-6 6-10 0-18M58 34c-6-6 6-10 0-18M73 34c-6-6 6-10 0-18" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarSticker({ size = 150 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "#fff", padding: Math.round(size * 0.045) }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/edson-pixel.webp" alt="" draggable={false} style={{ width: "100%", height: "100%", display: "block", borderRadius: "50%", imageRendering: "pixelated", pointerEvents: "none" }} />
    </div>
  );
}
