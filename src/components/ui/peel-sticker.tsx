"use client";

import { useRef, useState, type ReactNode } from "react";
import styled from "styled-components";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { play } from "@/lib/sound";
import { MemojiAvatar } from "@/components/ui/avatar";

const Box = styled(motion.div)`
  position: absolute; touch-action: none; user-select: none; -webkit-user-select: none; cursor: grab; pointer-events: auto;
  &:active { cursor: grabbing; }
  .stack { position: relative; }
  .layer { position: absolute; inset: 0; }
  .base { position: relative; }
  .shadow { filter: drop-shadow(0 2px 1px rgba(0,0,0,0.25)) drop-shadow(0 14px 16px rgba(0,0,0,0.35)); }
  .lifted { filter: drop-shadow(0 4px 3px rgba(0,0,0,0.25)) drop-shadow(0 26px 28px rgba(0,0,0,0.45)); }
  /* verso do adesivo: o desenho vira papel branco */
  .flap { filter: brightness(0) invert(0.96) drop-shadow(0 6px 8px rgba(0,0,0,0.4)); }
  .flap-sheen { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: multiply; background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.16)); }
  @media (max-width: 760px) { zoom: 0.8; }
`;

/**
 * Adesivo de verdade. Segure e puxe para baixo: ele descola (aparece o verso branco).
 * Puxe mais um pouco e ele solta de vez: leve para outro canto e solte, e ele gruda ali.
 * Se soltar antes de descolar por inteiro, ele gruda de volta no mesmo lugar. `h` é a altura do desenho, em px.
 */
export default function PeelSticker({ children, h, style, rot = 0, label }: { children: ReactNode; h: number; style: React.CSSProperties; rot?: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const peel = useMotionValue(0); // fração da altura já descolada
  const p = useSpring(peel, { stiffness: 220, damping: 20 });
  const ox = useMotionValue(0), oy = useMotionValue(0);
  const lift = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const [mode, setMode] = useState<"idle" | "peel" | "carry">("idle");
  const g = useRef({ sx: 0, sy: 0, ax: 0, ay: 0, aox: 0, aoy: 0, carried: false });

  const baseClip = useMotionTemplate`inset(${useTransform(p, (v) => v * 100)}% 0 0 0)`;
  const flapClip = useMotionTemplate`inset(0 0 ${useTransform(p, (v) => (1 - v) * 100)}% 0)`;
  const fold = useTransform(p, (v) => `${v * h}px`);
  const scale = useTransform(lift, (v) => 1 + v * 0.08);
  const tilt = useTransform(lift, (v) => rot + v * 3);
  const THRESH = 0.5;

  return (
    <Box
      ref={ref}
      style={{ ...style, x: ox, y: oy, scale, rotate: tilt }}
      role="img"
      aria-label={label}
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        g.current = { sx: e.clientX, sy: e.clientY, ax: 0, ay: 0, aox: ox.get(), aoy: oy.get(), carried: false };
        setMode("peel");
      }}
      onPointerMove={(e) => {
        if (mode === "idle") return;
        const d = g.current;
        if (mode === "peel") {
          const v = Math.max(0, (e.clientY - d.sy) / (h * 1.1));
          if (v > 0.06 && peel.get() <= 0.06) play("peel");
          if (v >= THRESH) {
            // soltou de vez: agora o adesivo acompanha o ponteiro
            setMode("carry");
            d.carried = true;
            d.ax = e.clientX; d.ay = e.clientY; d.aox = ox.get(); d.aoy = oy.get();
            peel.set(0);
            lift.set(1);
            play("peel");
          } else {
            peel.set(Math.min(THRESH, v));
          }
          return;
        }
        ox.set(d.aox + (e.clientX - d.ax));
        oy.set(d.aoy + (e.clientY - d.ay));
      }}
      onPointerUp={() => {
        if (mode === "idle") return;
        const d = g.current;
        peel.set(0);
        lift.set(0);
        if (d.carried) {
          // mantém o adesivo dentro da janela
          const el = ref.current;
          if (el) {
            const r = el.getBoundingClientRect();
            let dx = 0, dy = 0;
            if (r.left < 8) dx = 8 - r.left; else if (r.right > window.innerWidth - 8) dx = window.innerWidth - 8 - r.right;
            if (r.top < 70) dy = 70 - r.top; else if (r.bottom > window.innerHeight - 8) dy = window.innerHeight - 8 - r.bottom;
            ox.set(ox.get() + dx); oy.set(oy.get() + dy);
          }
          play("drop");
        } else if (peel.get() > 0.06) play("pop");
        setMode("idle");
      }}
      onPointerCancel={() => { peel.set(0); lift.set(0); setMode("idle"); }}
    >
      <div className={`stack ${mode === "carry" ? "lifted" : "shadow"}`}>
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

export function LaptopSticker() {
  return (
    <svg width="210" height="124" viewBox="0 0 240 142" aria-hidden style={{ display: "block" }}>
      <defs>
        <clipPath id="lt-scr"><rect x="46" y="12" width="148" height="92" rx="3" /></clipPath>
        <linearGradient id="lt-wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0d2f2a" /><stop offset=".55" stopColor="#103e3a" /><stop offset="1" stopColor="#2b1b52" /></linearGradient>
        <linearGradient id="lt-base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0f2f5" /><stop offset="1" stopColor="#b9bfc9" /></linearGradient>
        <linearGradient id="lt-gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".26" /><stop offset=".4" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <path d="M38 6h164a8 8 0 0 1 8 8v96H30V14a8 8 0 0 1 8-8Z M6 110h228l-1 3c-1 5-6 9-12 9H19c-6 0-11-4-12-9l-1-3Z" {...W} />
      <path d="M38 6h164a8 8 0 0 1 8 8v96H30V14a8 8 0 0 1 8-8Z" fill="#17181b" />
      <g clipPath="url(#lt-scr)">
        <rect x="46" y="12" width="148" height="92" fill="url(#lt-wall)" />
        <circle cx="168" cy="30" r="38" fill="var(--accent)" opacity=".2" />
        <rect x="46" y="12" width="148" height="6" fill="#fff" opacity=".1" />
        <rect x="58" y="28" width="88" height="56" rx="5" fill="#0a0b0d" opacity=".85" />
        <circle cx="66" cy="36" r="2" fill="#ff5f57" /><circle cx="73" cy="36" r="2" fill="#febc2e" /><circle cx="80" cy="36" r="2" fill="#28c840" />
        <g fontFamily="var(--font-jetbrains), monospace" fontSize="6.4">
          <text x="65" y="52" fill="#c792ea">const</text><text x="88" y="52" fill="#82aaff">app</text><text x="101" y="52" fill="#e8eef2">=</text>
          <text x="65" y="62" fill="var(--accent)">build</text><text x="87" y="62" fill="#ffcb6b">(ios, web)</text>
          <text x="65" y="72" fill="#7fdbca">ship</text><text x="83" y="72" fill="#e8eef2">()</text>
        </g>
        <rect x="152" y="40" width="34" height="44" rx="5" fill="#fff" opacity=".12" />
        <rect x="84" y="92" width="72" height="9" rx="4.5" fill="#fff" opacity=".16" />
        <circle cx="94" cy="96.5" r="2.5" fill="var(--accent)" /><circle cx="104" cy="96.5" r="2.5" fill="#82aaff" /><circle cx="114" cy="96.5" r="2.5" fill="#c792ea" /><circle cx="124" cy="96.5" r="2.5" fill="#ffcb6b" /><circle cx="134" cy="96.5" r="2.5" fill="#ff8a65" />
        <rect x="46" y="12" width="148" height="92" fill="url(#lt-gloss)" />
      </g>
      <rect x="108" y="7.4" width="24" height="3.4" rx="1.7" fill="#0a0a0c" />
      <path d="M6 110h228l-1 3c-1 5-6 9-12 9H19c-6 0-11-4-12-9l-1-3Z" fill="url(#lt-base)" />
      <path d="M100 110h40c0 3.4-3 5.4-6 5.4h-28c-3 0-6-2-6-5.4Z" fill="#9aa0aa" />
    </svg>
  );
}

export function MugSticker() {
  return (
    <svg width="112" height="124" viewBox="0 0 140 154" aria-hidden style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="mg-body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffffff" /><stop offset=".55" stopColor="#f1ece4" /><stop offset="1" stopColor="#d4ccc0" /></linearGradient>
        <radialGradient id="mg-coffee" cx="40%" cy="40%" r="70%"><stop offset="0" stopColor="#a8693a" /><stop offset="1" stopColor="#4b2812" /></radialGradient>
        <style>{`.mg-s{stroke-dasharray:14 44;animation:mgs 3.4s ease-in-out infinite}.mg-s.b{animation-delay:-1.2s}.mg-s.c{animation-delay:-2.2s}@keyframes mgs{0%{stroke-dashoffset:44;opacity:0}30%{opacity:.9}100%{stroke-dashoffset:-8;opacity:0}}@media (prefers-reduced-motion:reduce){.mg-s{animation:none;opacity:.6}}`}</style>
      </defs>
      <path d="M24 56h72v44c0 22-16 36-36 36s-36-14-36-36V56Z" {...W} />
      <path d="M96 66h10c13 0 20 7 20 17s-7 17-20 17H92" fill="none" stroke="#fff" strokeWidth="24" strokeLinecap="round" />
      <path d="M96 68h10c10 0 16 5 16 15s-6 15-16 15H93" fill="none" stroke="#e4ddd1" strokeWidth="8" strokeLinecap="round" />
      <path d="M24 56h72v44c0 22-16 36-36 36s-36-14-36-36V56Z" fill="url(#mg-body)" />
      <path d="M24 84h72v16c0 22-16 36-36 36s-36-14-36-36V84Z" fill="var(--accent)" opacity=".92" />
      <path d="M24 84h72" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
      <text x="60" y="119" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="20" fontWeight="700" fill="#04130d">{"</>"}</text>
      <ellipse cx="60" cy="56" rx="36" ry="9" fill="#e9e3d9" /><ellipse cx="60" cy="56" rx="31" ry="6.4" fill="url(#mg-coffee)" />
      <path d="M48 56c4-4 8-4 12 0 4-4 8-4 12 0-4 4-8 5-12 2-4 3-8 2-12-2Z" fill="#d9a56a" opacity=".85" />
      <path d="M32 66v26" stroke="#fff" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
      <g fill="none" stroke="#f3f6f9" strokeWidth="3.4" strokeLinecap="round">
        <path className="mg-s" d="M46 44c-6-7 6-10 0-20" /><path className="mg-s b" d="M60 44c-6-7 6-10 0-20" /><path className="mg-s c" d="M74 44c-6-7 6-10 0-20" />
      </g>
    </svg>
  );
}


/** Guampa de tereré (copo de chifre) com bomba de metal; a faixa muda com a cor do site. */
export function MateSticker() {
  return (
    <svg width="104" height="132" viewBox="0 0 130 166" aria-hidden style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="mt-horn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d9b98c" /><stop offset=".5" stopColor="#b88a58" /><stop offset="1" stopColor="#7e5632" /></linearGradient>
        <linearGradient id="mt-metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f4f6f8" /><stop offset="1" stopColor="#a4abb5" /></linearGradient>
        <radialGradient id="mt-herb" cx="45%" cy="40%" r="70%"><stop offset="0" stopColor="#8cc152" /><stop offset="1" stopColor="#3f7024" /></radialGradient>
      </defs>
      {/* contorno branco (silhueta única) */}
      <path d="M92 8L68 72" stroke="#fff" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d="M24 58h82l-10 78c-1 9-8 16-17 16H51c-9 0-16-7-17-16Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      {/* copo */}
      <path d="M24 58h82l-10 78c-1 9-8 16-17 16H51c-9 0-16-7-17-16Z" fill="url(#mt-horn)" />
      <path d="M31 96h68l-2 14H33Z" fill="var(--accent)" opacity=".95" />
      <path d="M24 58h82l-1.6 12H25.6Z" fill="url(#mt-metal)" />
      <ellipse cx="65" cy="58" rx="41" ry="9" fill="#e9dcc6" /><ellipse cx="65" cy="58" rx="36" ry="6.4" fill="url(#mt-herb)" />
      <path d="M46 58c6-3 12-3 18 0 6-3 14-3 20 0-6 3-14 4-20 1-6 2-12 2-18-1Z" fill="#b6dc7c" opacity=".7" />
      <path d="M38 76c-1 14 1 30 6 44" stroke="#fff" strokeOpacity=".45" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* bomba */}
      <path d="M92 8L68 70" stroke="url(#mt-metal)" strokeWidth="6" strokeLinecap="round" fill="none" />
      <ellipse cx="94" cy="7" rx="8.5" ry="5" transform="rotate(-22 94 7)" fill="url(#mt-metal)" />
    </svg>
  );
}

export function AvatarSticker({ size = 140 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "#fff", padding: Math.round(size * 0.05) }}>
      <MemojiAvatar size={size - Math.round(size * 0.1)} />
    </div>
  );
}
