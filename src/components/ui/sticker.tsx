"use client";

import { useRef, type ReactNode } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { play } from "@/lib/sound";

const Wrap = styled(motion.div)`
  position: absolute; left: var(--x); top: var(--y); cursor: grab; touch-action: none; user-select: none; -webkit-user-select: none; pointer-events: auto;
  &:active { cursor: grabbing; }
  .inner { position: relative; transform-origin: 50% 50%; transform: scale(var(--k, 1)); filter: drop-shadow(0 10px 16px rgba(0,0,0,0.35)); transition: filter 0.2s ease; }
  &:active .inner { filter: drop-shadow(0 22px 26px rgba(0,0,0,0.45)); }
  .holo { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: color-dodge; opacity: 0.55;
    background: linear-gradient(115deg, transparent 20%, #ff7bd5 32%, #7bd3ff 44%, #fff7a1 56%, #9bff9b 68%, transparent 80%);
    background-size: 260% 260%; background-position: var(--hx, 30%) var(--hy, 30%); }
  @media (max-width: 760px) { --k: 0.72; left: var(--mx); top: var(--my); }
`;

/**
 * Adesivo que se arrasta e solta com inércia. O brilho "holográfico" segue o ponteiro.
 * `holo` liga o brilho; o `children` é o desenho do adesivo (com borda branca, como um adesivo recortado).
 */
export default function Sticker({ children, at, mobile, rot = 0, holo = false, label, constraints }: { children: ReactNode; at: [string, string]; mobile: [string, string]; rot?: number; holo?: boolean; label: string; constraints: React.RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const vx = useMotionValue(0);
  const tilt = useSpring(vx, { stiffness: 220, damping: 18 });
  const rotate = useTransform(tilt, (v) => rot + Math.max(-18, Math.min(18, v / 28)));

  const shine = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--hy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <Wrap
      ref={ref}
      style={{ rotate, ...({ "--x": at[0], "--y": at[1], "--mx": mobile[0], "--my": mobile[1] } as object) }}
      drag
      dragConstraints={constraints}
      dragElastic={0.18}
      dragMomentum
      whileDrag={{ scale: 1.1, zIndex: 20 }}
      whileHover={{ scale: 1.04 }}
      onDragStart={() => play("peel")}
      onDrag={(_, i) => vx.set(i.velocity.x)}
      onDragEnd={() => { vx.set(0); play("pop"); }}
      onPointerMove={shine}
      role="img"
      aria-label={label}
    >
      <div className="inner">
        {children}
        {holo && <div className="holo" />}
      </div>
    </Wrap>
  );
}

/* ---------- desenhos dos adesivos (todos originais, em SVG) ---------- */

const outline = { stroke: "#fff", strokeWidth: 9, strokeLinejoin: "round" as const, paintOrder: "stroke" as const };

export function PhoneSticker({ src }: { src: string }) {
  return (
    <svg width="132" height="244" viewBox="0 0 132 244" aria-hidden>
      <defs><clipPath id="stk-ph"><rect x="9" y="9" width="114" height="226" rx="22" /></clipPath></defs>
      <rect x="4" y="4" width="124" height="236" rx="28" fill="#fff" />
      <rect x="9" y="9" width="114" height="226" rx="22" fill="#111" />
      <g clipPath="url(#stk-ph)">
        <image href={src} x="12" y="12" width="108" height="220" preserveAspectRatio="xMidYMin slice" />
      </g>
      <rect x="48" y="15" width="36" height="9" rx="4.5" fill="#000" />
    </svg>
  );
}

export function BrowserSticker() {
  return (
    <svg width="210" height="150" viewBox="0 0 210 150" aria-hidden>
      <rect x="4" y="4" width="202" height="142" rx="16" fill="#fff" />
      <rect x="9" y="9" width="192" height="132" rx="12" fill="#14161a" />
      <rect x="9" y="9" width="192" height="24" rx="12" fill="#23262d" />
      <rect x="9" y="21" width="192" height="12" fill="#23262d" />
      <circle cx="24" cy="21" r="4" fill="#ff5f57" /><circle cx="37" cy="21" r="4" fill="#febc2e" /><circle cx="50" cy="21" r="4" fill="#28c840" />
      <rect x="22" y="48" width="86" height="12" rx="4" fill="#f3f1ec" /><rect x="22" y="66" width="62" height="12" rx="4" fill="#f3f1ec" />
      <rect x="22" y="88" width="104" height="6" rx="3" fill="#5b6170" /><rect x="22" y="100" width="80" height="6" rx="3" fill="#5b6170" />
      <rect x="22" y="116" width="46" height="16" rx="8" fill="#ff6a3d" />
      <rect x="128" y="46" width="62" height="86" rx="10" fill="#ff6a3d" opacity=".9" />
    </svg>
  );
}

export function CoffeeSticker() {
  return (
    <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden>
      <g {...outline} fill="#fff">
        <path d="M22 46h66v34c0 18-13 32-33 32S22 98 22 80V46Z" />
        <path d="M88 54h12c10 0 16 6 16 14s-6 14-16 14H86" fill="none" strokeWidth="19" />
      </g>
      <path d="M22 46h66v34c0 18-13 32-33 32S22 98 22 80V46Z" fill="#7b4a2b" />
      <path d="M88 56h12c8 0 13 5 13 12s-5 12-13 12H85" fill="none" stroke="#7b4a2b" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="55" cy="46" rx="33" ry="7" fill="#3a2314" />
      <path d="M42 30c-6-6 6-10 0-18M58 30c-6-6 6-10 0-18M74 30c-6-6 6-10 0-18" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".9" />
    </svg>
  );
}

export function SparkSticker() {
  const star = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
  return (
    <div style={{ position: "relative", width: 120, height: 120 }} aria-hidden>
      <div style={{ position: "absolute", inset: 0, background: "#fff", clipPath: star }} />
      <div style={{ position: "absolute", inset: 9, clipPath: star, background: "conic-gradient(from 200deg, #ff6a3d, #ffd36b, #7bd3ff, #c792ea, #ff6a3d)" }} />
    </div>
  );
}

export function BubbleSticker({ text }: { text: string }) {
  return (
    <svg width="150" height="104" viewBox="0 0 150 104" aria-hidden>
      <path d="M26 10h98c10 0 16 6 16 16v34c0 10-6 16-16 16H78l-26 22 2-22H26c-10 0-16-6-16-16V26c0-10 6-16 16-16Z" fill="#fff" />
      <path d="M26 16h98c6 0 10 4 10 10v34c0 6-4 10-10 10H72l-16 14 1-14H26c-6 0-10-4-10-10V26c0-6 4-10 10-10Z" fill="#ff6a3d" />
      <text x="75" y="55" textAnchor="middle" fontFamily="var(--font-hand), cursive" fontSize="36" fontWeight="700" fill="#1a0802">{text}</text>
    </svg>
  );
}

export function PhotoSticker({ src }: { src: string }) {
  return (
    <div style={{ width: 136, height: 136, borderRadius: "50%", background: "#fff", padding: 6 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" draggable={false} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", display: "block", pointerEvents: "none" }} />
    </div>
  );
}

export function PixSticker() {
  return (
    <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden>
      <circle cx="56" cy="56" r="52" fill="#fff" />
      <circle cx="56" cy="56" r="44" fill="#32bcad" />
      <g transform="rotate(45 56 56)" fill="none" stroke="#fff" strokeWidth="6" strokeLinejoin="round">
        <rect x="38" y="38" width="36" height="36" rx="8" />
      </g>
      <text x="56" y="63" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="19" fontWeight="800" fill="#fff">PIX</text>
    </svg>
  );
}

/** Gema: as cores "refletem" conforme o ponteiro passa por cima (usa --hx/--hy do adesivo). */
export function GemSticker() {
  const gem = "polygon(22% 4%, 78% 4%, 98% 36%, 50% 98%, 2% 36%)";
  return (
    <div style={{ position: "relative", width: 120, height: 112 }} aria-hidden>
      <div style={{ position: "absolute", inset: 0, background: "#fff", clipPath: gem }} />
      <div style={{ position: "absolute", inset: 7, clipPath: gem, background: "linear-gradient(120deg, #7bd3ff, #c792ea 25%, #ffffff 40%, #ff9ad5 58%, #7bffd8 78%, #7bd3ff)", backgroundSize: "320% 320%", backgroundPosition: "var(--hx, 30%) var(--hy, 30%)" }} />
      <svg viewBox="0 0 120 112" width="120" height="112" style={{ position: "absolute", inset: 0 }}>
        <g fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M8 40h104M27 8l22 32 11 52 11-52 22-32M49 40l11-32 11 32" />
        </g>
      </svg>
    </div>
  );
}
