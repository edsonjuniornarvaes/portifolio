"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
    <svg width="112" height="128" viewBox="0 0 140 160" aria-hidden style={{ display: "block", overflow: "visible" }}>
      <defs>
        <filter id="mg-o" x="-25%" y="-25%" width="150%" height="150%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="4.2" result="d" />
          <feGaussianBlur in="d" stdDeviation="2" result="b" />
          <feComponentTransfer in="b" result="r"><feFuncA type="linear" slope="9" intercept="-3.6" /></feComponentTransfer>
          <feFlood floodColor="#fff" />
          <feComposite in2="r" operator="in" result="w" />
          <feMerge><feMergeNode in="w" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="mg-cer" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d9d2c6" /><stop offset=".22" stopColor="#ffffff" /><stop offset=".6" stopColor="#efe9df" /><stop offset="1" stopColor="#bdb4a6" /></linearGradient>
        <radialGradient id="mg-cof" cx="42%" cy="40%" r="70%"><stop offset="0" stopColor="#b07a46" /><stop offset=".6" stopColor="#5d3414" /><stop offset="1" stopColor="#2d170a" /></radialGradient>
        <clipPath id="mg-bd"><path d="M20 62h78v52c0 22-17 38-39 38S20 136 20 114Z" /></clipPath>
        <style>{`.mg-s{stroke-dasharray:14 44;animation:mgs 3.4s ease-in-out infinite}.mg-s.b{animation-delay:-1.2s}.mg-s.c{animation-delay:-2.2s}@keyframes mgs{0%{stroke-dashoffset:44;opacity:0}30%{opacity:.95}100%{stroke-dashoffset:-8;opacity:0}}@media (prefers-reduced-motion:reduce){.mg-s{animation:none;opacity:.6}}`}</style>
      </defs>
      <g filter="url(#mg-o)">
        <path d="M98 74h8c14 0 22 8 22 20s-8 20-22 20h-10" fill="none" stroke="#e6dfd2" strokeWidth="12" strokeLinecap="round" />
        <path d="M98 72h8c14 0 22 8 22 20" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 62h78v52c0 22-17 38-39 38S20 136 20 114Z" fill="url(#mg-cer)" />
        <g clipPath="url(#mg-bd)">
          <path d="M16 100h86v22H16Z" fill="#1a1d22" /><path d="M16 100h86v3H16Z" fill="#fff" opacity=".12" />
          <text x="59" y="118" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="17" fontWeight="700" fill="var(--accent)">{"</>"}</text>
          <path d="M26 70v66" stroke="#fff" strokeOpacity=".75" strokeWidth="5" strokeLinecap="round" />
        </g>
        <ellipse cx="59" cy="62" rx="39" ry="9.5" fill="#f3eee5" /><ellipse cx="59" cy="62" rx="34.5" ry="7" fill="url(#mg-cof)" />
        <path d="M44 61.5c5-3 10-3 15 0s10 3 15 0" stroke="#e8c79a" strokeOpacity=".6" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
      <g fill="none" stroke="#dfe5ea" strokeWidth="3.4" strokeLinecap="round">
        <path className="mg-s" d="M44 46c-6-6 6-9 0-18" /><path className="mg-s b" d="M59 46c-6-6 6-9 0-18" /><path className="mg-s c" d="M74 46c-6-6 6-9 0-18" />
      </g>
    </svg>
  );
}

/** Guampa de tereré (copo de chifre) com bomba de metal; o contorno branco é gerado do formato, sem emendas. */
export function MateSticker() {
  return (
    <svg width="112" height="141" viewBox="0 0 140 176" aria-hidden style={{ display: "block", overflow: "visible" }}>
      <defs>
        <filter id="mt-o" x="-25%" y="-25%" width="150%" height="150%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="4.2" result="d" />
          <feGaussianBlur in="d" stdDeviation="2" result="b" />
          <feComponentTransfer in="b" result="r"><feFuncA type="linear" slope="9" intercept="-3.6" /></feComponentTransfer>
          <feFlood floodColor="#fff" />
          <feComposite in2="r" operator="in" result="w" />
          <feMerge><feMergeNode in="w" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="mt-horn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#5a3a1f" /><stop offset=".28" stopColor="#b98b55" /><stop offset=".5" stopColor="#e0bd8a" /><stop offset=".78" stopColor="#8a5c33" /><stop offset="1" stopColor="#3f2711" /></linearGradient>
        <linearGradient id="mt-met" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#9aa2ac" /><stop offset=".4" stopColor="#fbfcfd" /><stop offset="1" stopColor="#8f97a1" /></linearGradient>
        <radialGradient id="mt-herb" cx="45%" cy="40%" r="70%"><stop offset="0" stopColor="#a1d65c" /><stop offset="1" stopColor="#3b6c22" /></radialGradient>
        <clipPath id="mt-hc"><path d="M24 62C20 100 36 140 62 164c4 3.6 11 3 13-2 26-24 42-64 41-100Z" /></clipPath>
      </defs>
      <g filter="url(#mt-o)">
        <path d="M24 62C20 100 36 140 62 164c4 3.6 11 3 13-2 26-24 42-64 41-100Z" fill="url(#mt-horn)" />
        <g clipPath="url(#mt-hc)">
          <path d="M18 112c32 9 74 8 104-8v16c-30 16-72 17-104 8Z" fill="var(--accent)" opacity=".95" />
          <path d="M18 112c32 9 74 8 104-8" stroke="#fff" strokeOpacity=".5" strokeWidth="2" fill="none" />
          <g stroke="#2a180a" strokeOpacity=".22" strokeWidth="2" fill="none"><path d="M30 76c3 22 12 44 26 62" /><path d="M96 70c0 22-8 46-22 66" /><path d="M44 70c4 22 12 40 24 58" /></g>
          <path d="M32 74c2 14 7 28 14 40" stroke="#fff" strokeOpacity=".55" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
        <path d="M18 58c0-3 3-5 8-5h88c5 0 8 2 8 5 0 5-4 8-8 9H26c-4-1-8-4-8-9Z" fill="url(#mt-met)" />
        <ellipse cx="70" cy="56" rx="48" ry="9" fill="#efe6d4" /><ellipse cx="70" cy="56" rx="43" ry="6.4" fill="url(#mt-herb)" />
        <g fill="#eaf6ff" opacity=".85"><rect x="46" y="51" width="11" height="9" rx="2" transform="rotate(-12 51 55)" /><rect x="84" y="52" width="10" height="8" rx="2" transform="rotate(10 89 56)" /></g>
        <path d="M76 62L104 14" stroke="url(#mt-met)" strokeWidth="6.6" strokeLinecap="round" fill="none" />
        <path d="M104 14c2-5 8-7 13-4" stroke="url(#mt-met)" strokeWidth="6.6" strokeLinecap="round" fill="none" />
        <ellipse cx="76" cy="62" rx="5.5" ry="3.4" fill="#8f97a1" transform="rotate(-30 76 62)" />
      </g>
    </svg>
  );
}

/** Relógio digital (horário de Brasília) como adesivo: dá para descolar e levar para outro canto. */
export function ClockSticker() {
  const [t, setT] = useState<[string, string] | null>(null);
  const [sep, setSep] = useState(true);
  useEffect(() => {
    const f = () => {
      const [h, m] = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Sao_Paulo" }).format(new Date()).split(":");
      setT([h, m]);
    };
    f();
    const id = setInterval(f, 10_000);
    const bl = setInterval(() => setSep((v) => !v), 1000);
    return () => { clearInterval(id); clearInterval(bl); };
  }, []);
  return (
    <div style={{ padding: 5, borderRadius: 16, background: "#fff" }} aria-label={t ? `${t[0]}:${t[1]}` : undefined}>
      <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "8px 14px", borderRadius: 12, background: "#0c1013", color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "1.15rem", fontWeight: 600, letterSpacing: "0.04em", fontVariantNumeric: "tabular-nums", boxShadow: "inset 0 0 14px color-mix(in srgb, var(--accent) 18%, transparent)" }}>
        <span>{t ? t[0] : "--"}</span><span style={{ opacity: sep ? 1 : 0.25 }}>:</span><span>{t ? t[1] : "--"}</span>
      </div>
    </div>
  );
}

export function AvatarSticker({ size = 140 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "#fff", padding: Math.round(size * 0.05) }}>
      <MemojiAvatar size={size - Math.round(size * 0.1)} />
    </div>
  );
}
