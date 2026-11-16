"use client";

import { useRef, type ReactNode } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { play } from "@/lib/sound";

const Wrap = styled(motion.div)`
  position: absolute; left: var(--x); top: var(--y); cursor: grab; touch-action: none; user-select: none; -webkit-user-select: none; pointer-events: auto;
  &:active { cursor: grabbing; }
  .inner { position: relative; transform-origin: 50% 50%; transform: scale(var(--k, 1)); filter: drop-shadow(0 2px 1px rgba(0,0,0,0.25)) drop-shadow(0 14px 18px rgba(0,0,0,0.35)); }
  @media (max-width: 760px) { --k: 0.78; left: var(--mx); top: var(--my); }
`;

/**
 * Adesivo que dá para descolar: ao passar o mouse, o canto de baixo levanta (e faz o barulhinho de descolar);
 * ao arrastar, ele sai do lugar, balança e solta com inércia.
 */
export default function Sticker({ children, at, mobile, rot = 0, label, constraints }: { children: ReactNode; at: [string, string]; mobile: [string, string]; rot?: number; label: string; constraints: React.RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const vx = useMotionValue(0);
  const tilt = useSpring(vx, { stiffness: 220, damping: 18 });
  const rotate = useTransform(tilt, (v) => rot + Math.max(-18, Math.min(18, v / 28)));

  return (
    <Wrap
      ref={ref}
      style={{ rotate, transformPerspective: 600, transformOrigin: "0% 0%", ...({ "--x": at[0], "--y": at[1], "--mx": mobile[0], "--my": mobile[1] } as object) }}
      drag
      dragConstraints={constraints}
      dragElastic={0.18}
      dragMomentum
      whileHover={{ rotateX: -16, rotateY: 14, scale: 1.04 }}
      whileDrag={{ rotateX: -22, rotateY: 18, scale: 1.1, zIndex: 20 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onHoverStart={() => play("peel")}
      onDragStart={() => play("peel")}
      onDrag={(_, i) => vx.set(i.velocity.x)}
      onDragEnd={() => { vx.set(0); play("pop"); }}
      role="img"
      aria-label={label}
    >
      <div className="inner">
        {children}
      </div>
    </Wrap>
  );
}

const W = { fill: "#fff", stroke: "#fff", strokeWidth: 10, strokeLinejoin: "round" as const };

export function MacBookSticker() {
  return (
    <svg width="250" height="170" viewBox="0 0 250 170" aria-hidden>
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
          <text x="50" y="40" fill="#c792ea">const</text><text x="82" y="40" fill="#82aaff">app</text><text x="100" y="40" fill="#fff">=</text><text x="110" y="40" fill="#2eebaa">&quot;Edson&quot;</text>
          <text x="50" y="56" fill="#c792ea">build</text><text x="78" y="56" fill="#fff">(</text><text x="84" y="56" fill="#ffcb6b">iPhone</text><text x="114" y="56" fill="#fff">,</text><text x="120" y="56" fill="#ffcb6b">Android</text><text x="154" y="56" fill="#fff">)</text>
          <text x="50" y="72" fill="#7fdbca">deploy</text><text x="86" y="72" fill="#fff">()</text>
        </g>
        <rect x="50" y="86" width="64" height="24" rx="6" fill="#2eebaa" opacity=".95" /><rect x="120" y="86" width="40" height="24" rx="6" fill="#fff" opacity=".12" />
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
    <svg width="132" height="140" viewBox="0 0 132 140" aria-hidden>
      <defs><linearGradient id="cf-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e9d9c8" /></linearGradient></defs>
      <path d="M22 50h66v32c0 20-13 36-33 36S22 102 22 82V50Z" {...W} />
      <path d="M88 58h12c10 0 16 6 16 14s-6 14-16 14H86" fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round" />
      <path d="M88 60h12c8 0 13 5 13 12s-5 12-13 12H85" fill="none" stroke="#e9d9c8" strokeWidth="7" strokeLinecap="round" />
      <path d="M22 50h66v32c0 20-13 36-33 36S22 102 22 82V50Z" fill="url(#cf-c)" />
      <path d="M22 70h66v12c0 20-13 36-33 36S22 102 22 82V70Z" fill="#2eebaa" opacity=".92" />
      <text x="55" y="97" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="17" fontWeight="700" fill="#04130d">{"</>"}</text>
      <ellipse cx="55" cy="50" rx="33" ry="7" fill="#3a2314" /><ellipse cx="55" cy="49" rx="27" ry="4.4" fill="#7b4a2b" />
      <path d="M43 34c-6-6 6-10 0-18M58 34c-6-6 6-10 0-18M73 34c-6-6 6-10 0-18" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
