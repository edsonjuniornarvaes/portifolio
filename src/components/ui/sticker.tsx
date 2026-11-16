"use client";

import { useRef, type ReactNode } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { play } from "@/lib/sound";

const Wrap = styled(motion.div)`
  position: absolute; left: var(--x); top: var(--y); cursor: grab; touch-action: none; user-select: none; -webkit-user-select: none; pointer-events: auto;
  &:active { cursor: grabbing; }
  .inner { position: relative; transform-origin: 50% 50%; transform: scale(var(--k, 1)); filter: drop-shadow(0 2px 1px rgba(0,0,0,0.25)) drop-shadow(0 14px 18px rgba(0,0,0,0.35)); transition: filter 0.2s ease; }
  &:active .inner { filter: drop-shadow(0 22px 26px rgba(0,0,0,0.45)); }
  .holo { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: color-dodge; opacity: 0.55;
    background: linear-gradient(115deg, transparent 20%, #ff7bd5 32%, #7bd3ff 44%, #fff7a1 56%, #9bff9b 68%, transparent 80%);
    background-size: 260% 260%; background-position: var(--hx, 30%) var(--hy, 30%); }
  @media (max-width: 760px) { &.hm { display: none; } --k: 0.72; left: var(--mx); top: var(--my); }
`;

/**
 * Adesivo que se arrasta e solta com inércia. O brilho "holográfico" segue o ponteiro.
 * `holo` liga o brilho; o `children` é o desenho do adesivo (com borda branca, como um adesivo recortado).
 */
export default function Sticker({ children, at, mobile, rot = 0, holo = false, label, constraints }: { children: ReactNode; at: [string, string]; mobile: [string, string] | null; rot?: number; holo?: boolean; label: string; constraints: React.RefObject<HTMLElement | null> }) {
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
      className={mobile ? undefined : "hm"}
      style={{ rotate, ...({ "--x": at[0], "--y": at[1], "--mx": mobile?.[0], "--my": mobile?.[1] } as object) }}
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

/* ---------- desenhos dos adesivos (todos originais, em SVG, com borda branca de adesivo recortado) ---------- */

const W = { fill: "#fff", stroke: "#fff", strokeWidth: 10, strokeLinejoin: "round" as const };

/** Brilho de vidro por cima de uma forma (use dentro de um clipPath). */
const Gloss = ({ id }: { id: string }) => (
  <>
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".42" /><stop offset=".42" stopColor="#fff" stopOpacity="0" /></linearGradient></defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </>
);

/** iPhone: com a tela de um app (src) ou com papel de parede colorido e relógio. */
export function IPhoneSticker({ src, tone = "a", id = "ip" }: { src?: string; tone?: "a" | "b"; id?: string }) {
  const c1 = tone === "a" ? "#ff7a4d" : "#5b7cff";
  const c2 = tone === "a" ? "#7a3cff" : "#27d3b0";
  return (
    <svg width="122" height="244" viewBox="0 0 122 244" aria-hidden>
      <defs>
        <clipPath id={`${id}-c`}><rect x="9" y="9" width="104" height="226" rx="22" /></clipPath>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d9dce2" /><stop offset=".5" stopColor="#8d929b" /><stop offset="1" stopColor="#c8ccd3" /></linearGradient>
        <linearGradient id={`${id}-w`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient>
      </defs>
      <rect x="5" y="5" width="112" height="234" rx="28" {...W} />
      <rect x="5" y="5" width="112" height="234" rx="28" fill={`url(#${id}-f)`} />
      <rect x="8" y="8" width="106" height="228" rx="24" fill="#0b0b0d" />
      <g clipPath={`url(#${id}-c)`}>
        {src ? <image href={src} x="9" y="9" width="104" height="226" preserveAspectRatio="xMidYMin slice" /> : (
          <>
            <rect x="9" y="9" width="104" height="226" fill={`url(#${id}-w)`} />
            <circle cx="30" cy="190" r="46" fill="#fff" opacity=".14" /><circle cx="96" cy="120" r="34" fill="#fff" opacity=".1" />
            <text x="61" y="84" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="42" fontWeight="600" fill="#fff">9:41</text>
            <text x="61" y="104" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="9" fill="#fff" opacity=".85">segunda, 16 de novembro</text>
            <rect x="26" y="210" width="70" height="4" rx="2" fill="#fff" opacity=".8" />
          </>
        )}
        <Gloss id={`${id}-g`} />
      </g>
      <rect x="40" y="16" width="42" height="11" rx="5.5" fill="#000" />
      <rect x="116" y="70" width="3" height="26" rx="1.5" fill="#8d929b" /><rect x="3" y="62" width="3" height="16" rx="1.5" fill="#8d929b" /><rect x="3" y="86" width="3" height="28" rx="1.5" fill="#8d929b" />
    </svg>
  );
}

export function MacBookSticker() {
  return (
    <svg width="250" height="170" viewBox="0 0 250 170" aria-hidden>
      <defs>
        <clipPath id="mb-s"><rect x="40" y="19" width="170" height="106" rx="5" /></clipPath>
        <linearGradient id="mb-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6e8ec" /><stop offset="1" stopColor="#a9aeb7" /></linearGradient>
        <linearGradient id="mb-w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1b1f2a" /><stop offset="1" stopColor="#2c1a3a" /></linearGradient>
      </defs>
      <path d="M32 12h186a8 8 0 0 1 8 8v112H24V20a8 8 0 0 1 8-8Z M8 134h234l-6 22a8 8 0 0 1-8 6H22a8 8 0 0 1-8-6Z" {...W} />
      <path d="M32 12h186a8 8 0 0 1 8 8v112H24V20a8 8 0 0 1 8-8Z" fill="#2a2c31" />
      <g clipPath="url(#mb-s)">
        <rect x="40" y="19" width="170" height="106" fill="url(#mb-w)" />
        <g fontFamily="var(--font-jetbrains), monospace" fontSize="8">
          <text x="50" y="40" fill="#c792ea">const</text><text x="82" y="40" fill="#82aaff">app</text><text x="100" y="40" fill="#fff">=</text><text x="110" y="40" fill="#ff8a65">&quot;Edson&quot;</text>
          <text x="50" y="56" fill="#c792ea">build</text><text x="78" y="56" fill="#fff">(</text><text x="84" y="56" fill="#ffcb6b">iPhone</text><text x="114" y="56" fill="#fff">,</text><text x="120" y="56" fill="#ffcb6b">Android</text><text x="154" y="56" fill="#fff">)</text>
          <text x="50" y="72" fill="#7fdbca">deploy</text><text x="86" y="72" fill="#fff">()</text>
        </g>
        <rect x="50" y="86" width="64" height="24" rx="6" fill="#ff6a3d" opacity=".95" /><rect x="120" y="86" width="40" height="24" rx="6" fill="#fff" opacity=".12" />
        <Gloss id="mb-g" />
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
      <defs>
        <linearGradient id="cf-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e9d9c8" /></linearGradient>
      </defs>
      <path d="M22 50h66v32c0 20-13 36-33 36S22 102 22 82V50Z" {...W} />
      <path d="M88 58h12c10 0 16 6 16 14s-6 14-16 14H86" fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round" />
      <path d="M88 60h12c8 0 13 5 13 12s-5 12-13 12H85" fill="none" stroke="#e9d9c8" strokeWidth="7" strokeLinecap="round" />
      <path d="M22 50h66v32c0 20-13 36-33 36S22 102 22 82V50Z" fill="url(#cf-c)" />
      <path d="M22 70h66v12c0 20-13 36-33 36S22 102 22 82V70Z" fill="#ff6a3d" opacity=".92" />
      <text x="55" y="97" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="17" fontWeight="700" fill="#fff">{"</>"}</text>
      <ellipse cx="55" cy="50" rx="33" ry="7" fill="#3a2314" /><ellipse cx="55" cy="49" rx="27" ry="4.4" fill="#7b4a2b" />
      <path d="M43 34c-6-6 6-10 0-18M58 34c-6-6 6-10 0-18M73 34c-6-6 6-10 0-18" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function KeySticker({ label = "⌘" }: { label?: string }) {
  return (
    <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden>
      <defs>
        <linearGradient id="ky-t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a4d55" /><stop offset="1" stopColor="#25272c" /></linearGradient>
      </defs>
      <rect x="6" y="6" width="100" height="100" rx="26" {...W} />
      <rect x="9" y="9" width="94" height="94" rx="23" fill="#16171a" />
      <rect x="15" y="12" width="82" height="82" rx="19" fill="url(#ky-t)" />
      <rect x="15" y="12" width="82" height="30" rx="15" fill="#fff" opacity=".09" />
      <text x="56" y="68" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="44" fontWeight="600" fill="#f3f1ec">{label}</text>
    </svg>
  );
}

export function CodeSticker() {
  return (
    <svg width="150" height="86" viewBox="0 0 150 86" aria-hidden>
      <defs><linearGradient id="cd-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff6a3d" /><stop offset="1" stopColor="#ff3d77" /></linearGradient></defs>
      <rect x="6" y="6" width="138" height="74" rx="37" {...W} />
      <rect x="10" y="10" width="130" height="66" rx="33" fill="url(#cd-g)" />
      <rect x="10" y="10" width="130" height="30" rx="15" fill="#fff" opacity=".18" />
      <text x="75" y="55" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="30" fontWeight="800" fill="#fff">{"</>"}</text>
    </svg>
  );
}

export function WifiSticker() {
  return (
    <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden>
      <defs><linearGradient id="wf-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5b7cff" /><stop offset="1" stopColor="#27d3b0" /></linearGradient></defs>
      <circle cx="56" cy="56" r="52" fill="#fff" />
      <circle cx="56" cy="56" r="45" fill="url(#wf-g)" />
      <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round">
        <path d="M26 48a42 42 0 0 1 60 0" /><path d="M36 59a28 28 0 0 1 40 0" /><path d="M46 70a14 14 0 0 1 20 0" />
      </g>
      <circle cx="56" cy="80" r="4.5" fill="#fff" />
    </svg>
  );
}

export function SparkSticker() {
  const star = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
  return (
    <div style={{ position: "relative", width: 112, height: 112 }} aria-hidden>
      <div style={{ position: "absolute", inset: 0, background: "#fff", clipPath: star, borderRadius: 8 }} />
      <div style={{ position: "absolute", inset: 9, clipPath: star, background: "linear-gradient(120deg, #ff6a3d, #ffd36b, #7bd3ff, #c792ea, #ff7bd5, #ff6a3d)", backgroundSize: "320% 320%", backgroundPosition: "var(--hx, 30%) var(--hy, 30%)" }} />
    </div>
  );
}

export function BubbleSticker({ text }: { text: string }) {
  return (
    <svg width="150" height="104" viewBox="0 0 150 104" aria-hidden>
      <defs><linearGradient id="bb-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff8a5c" /><stop offset="1" stopColor="#ff5a2c" /></linearGradient></defs>
      <path d="M32 8h86c14 0 24 8 24 22v26c0 14-10 22-24 22H78l-26 22 2-22H32C18 78 8 70 8 56V30C8 16 18 8 32 8Z" {...W} />
      <path d="M32 8h86c14 0 24 8 24 22v26c0 14-10 22-24 22H78l-26 22 2-22H32C18 78 8 70 8 56V30C8 16 18 8 32 8Z" fill="url(#bb-g)" />
      <text x="75" y="55" textAnchor="middle" fontFamily="var(--font-hand), cursive" fontSize="38" fontWeight="700" fill="#1a0802">{text}</text>
    </svg>
  );
}

export function PhotoSticker({ src }: { src: string }) {
  return (
    <div style={{ width: 132, height: 132, borderRadius: "50%", background: "#fff", padding: 6 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" draggable={false} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", display: "block", pointerEvents: "none" }} />
    </div>
  );
}

export function PixSticker() {
  return (
    <svg width="104" height="104" viewBox="0 0 112 112" aria-hidden>
      <circle cx="56" cy="56" r="52" fill="#fff" />
      <circle cx="56" cy="56" r="45" fill="#32bcad" />
      <g transform="rotate(45 56 56)" fill="none" stroke="#fff" strokeWidth="6" strokeLinejoin="round"><rect x="38" y="38" width="36" height="36" rx="9" /></g>
      <text x="56" y="63" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="19" fontWeight="800" fill="#fff">PIX</text>
    </svg>
  );
}

/** Gema: as cores "refletem" conforme o ponteiro passa por cima (usa --hx/--hy do adesivo). */
export function GemSticker() {
  return (
    <svg width="124" height="116" viewBox="0 0 124 116" aria-hidden>
      <defs>
        <clipPath id="gm-c"><path d="M28 10h68l22 32-56 66L6 42z" /></clipPath>
        <linearGradient id="gm-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9be4ff" /><stop offset=".35" stopColor="#d4b3ff" /><stop offset=".6" stopColor="#ffffff" /><stop offset="1" stopColor="#8fffe0" /></linearGradient>
      </defs>
      <path d="M28 10h68l22 32-56 66L6 42z" {...W} />
      <g clipPath="url(#gm-c)">
        <rect width="124" height="116" fill="url(#gm-g)" />
        <path d="M6 42h112M28 10l18 32 16 66 16-66 18-32M46 42l16-32 16 32" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M28 10h68l-18 32H46z" fill="#fff" opacity=".35" />
      </g>
    </svg>
  );
}
