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
    <svg width="212" height="136" viewBox="0 0 260 168" aria-hidden style={{ display: "block", overflow: "visible" }}>
      <defs>
        <filter id="lt-o" x="-25%" y="-25%" width="150%" height="150%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="4.2" result="d" />
          <feGaussianBlur in="d" stdDeviation="2" result="b" />
          <feComponentTransfer in="b" result="r"><feFuncA type="linear" slope="9" intercept="-3.6" /></feComponentTransfer>
          <feFlood floodColor="#fff" />
          <feComposite in2="r" operator="in" result="w" />
          <feMerge><feMergeNode in="w" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="lt-lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b4048" /><stop offset="1" stopColor="#1d2025" /></linearGradient>
        <linearGradient id="lt-base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2f4f7" /><stop offset=".55" stopColor="#d6dae1" /><stop offset="1" stopColor="#aab0ba" /></linearGradient>
        <linearGradient id="lt-wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0c2a27" /><stop offset=".55" stopColor="#12413c" /><stop offset="1" stopColor="#2a1c52" /></linearGradient>
        <linearGradient id="lt-gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".22" /><stop offset=".38" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <clipPath id="lt-scr"><rect x="34" y="14" width="192" height="112" rx="3" /></clipPath>
      </defs>
      <g filter="url(#lt-o)">
        <rect x="26" y="6" width="208" height="126" rx="10" fill="url(#lt-lid)" />
        <rect x="30" y="10" width="200" height="118" rx="7" fill="#08090b" />
        <g clipPath="url(#lt-scr)">
          <rect x="34" y="14" width="192" height="112" fill="url(#lt-wall)" />
          <circle cx="196" cy="40" r="46" fill="var(--accent)" opacity=".22" />
          <rect x="34" y="14" width="192" height="8" fill="#0a0b0d" opacity=".55" />
          <circle cx="44" cy="18" r="1.8" fill="#ff5f57" /><circle cx="50" cy="18" r="1.8" fill="#febc2e" /><circle cx="56" cy="18" r="1.8" fill="#28c840" />
          <rect x="48" y="30" width="112" height="72" rx="6" fill="#0a0b0d" opacity=".9" />
          <rect x="48" y="30" width="112" height="9" rx="4" fill="#1a1d22" />
          <g fontFamily="var(--font-jetbrains), monospace" fontSize="7.4">
            <text x="56" y="54" fill="#c792ea">const</text><text x="82" y="54" fill="#82aaff">app</text><text x="96" y="54" fill="#e8eef2">=</text><text x="108" y="54" fill="var(--accent)">build</text><text x="130" y="54" fill="#e8eef2">()</text>
            <text x="56" y="66" fill="#7fdbca">ship</text><text x="75" y="66" fill="#e8eef2">(</text><text x="80" y="66" fill="#ffcb6b">ios, web</text><text x="116" y="66" fill="#e8eef2">)</text>
            <text x="56" y="78" fill="#5f6b7d">{"// no ar"}</text>
          </g>
          <rect x="56" y="86" width="40" height="10" rx="5" fill="var(--accent)" />
          <rect x="168" y="38" width="48" height="60" rx="8" fill="#fff" opacity=".1" />
          <rect x="174" y="46" width="36" height="6" rx="3" fill="#fff" opacity=".35" /><rect x="174" y="58" width="28" height="4" rx="2" fill="#fff" opacity=".2" /><rect x="174" y="68" width="32" height="4" rx="2" fill="#fff" opacity=".2" />
          <rect x="34" y="14" width="192" height="112" fill="url(#lt-gloss)" />
        </g>
        <rect x="116" y="8" width="28" height="5" rx="2.5" fill="#08090b" />
        <path d="M6 132h248c0 6-3 9-8 9H14c-5 0-8-3-8-9Z" fill="url(#lt-base)" />
        <path d="M6 132h248l-1.5 3H7.5Z" fill="#fff" opacity=".6" />
        <path d="M104 132h52c0 4-3 6-7 6h-38c-4 0-7-2-7-6Z" fill="#9aa1ab" />
      </g>
    </svg>
  );
}

/** iPhone de lado a lado com a tela de um app (as laterais e a ilha dinâmica seguem o desenho real). */
export function PhoneSticker({ src = "/images/projects/clube-app-home.webp" }: { src?: string }) {
  return (
    <svg width="104" height="218" viewBox="0 0 120 252" aria-hidden style={{ display: "block", overflow: "visible" }}>
      <defs>
        <filter id="ph-o" x="-25%" y="-25%" width="150%" height="150%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="4.2" result="d" />
          <feGaussianBlur in="d" stdDeviation="2" result="b" />
          <feComponentTransfer in="b" result="r"><feFuncA type="linear" slope="9" intercept="-3.6" /></feComponentTransfer>
          <feFlood floodColor="#fff" />
          <feComposite in2="r" operator="in" result="w" />
          <feMerge><feMergeNode in="w" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="ph-fr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d8dbe0" /><stop offset=".5" stopColor="#8e939c" /><stop offset="1" stopColor="#c9cdd4" /></linearGradient>
        <linearGradient id="ph-gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".3" /><stop offset=".4" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <clipPath id="ph-scr"><rect x="9" y="9" width="102" height="234" rx="20" /></clipPath>
      </defs>
      <g filter="url(#ph-o)">
        <rect x="4" y="4" width="112" height="244" rx="26" fill="url(#ph-fr)" />
        <rect x="7" y="7" width="106" height="238" rx="23" fill="#0b0b0d" />
        <g clipPath="url(#ph-scr)">
          <rect x="9" y="9" width="102" height="234" fill="#fff" />
          <image href={src} x="9" y="9" width="102" height="234" preserveAspectRatio="xMidYMin slice" />
          <rect x="9" y="9" width="102" height="234" fill="url(#ph-gloss)" />
        </g>
        <rect x="42" y="14" width="36" height="10" rx="5" fill="#000" />
        <rect x="114" y="62" width="3" height="22" rx="1.5" fill="#8e939c" /><rect x="3" y="56" width="3" height="14" rx="1.5" fill="#8e939c" /><rect x="3" y="76" width="3" height="26" rx="1.5" fill="#8e939c" />
      </g>
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

/** Relógio de placas (flip clock) com o horário de Brasília: dá para descolar e levar para outro canto. */
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
  const card = (d: string) => (
    <div style={{ position: "relative", width: 30, height: 40, borderRadius: 6, background: "linear-gradient(#23272d 0 49%, #181b20 51% 100%)", color: "var(--accent)", display: "grid", placeItems: "center", fontFamily: "var(--font-jetbrains), monospace", fontSize: "1.35rem", fontWeight: 700, fontVariantNumeric: "tabular-nums", boxShadow: "inset 0 1px 0 rgba(255,255,255,.12), inset 0 -2px 6px rgba(0,0,0,.5)" }}>
      <span style={{ position: "relative", zIndex: 1, textShadow: "0 0 14px color-mix(in srgb, var(--accent) 55%, transparent)" }}>{d}</span>
      <i style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, marginTop: -1, background: "rgba(0,0,0,.65)" }} />
      <i style={{ position: "absolute", left: -1.5, top: "50%", width: 3, height: 6, marginTop: -3, borderRadius: 2, background: "#0c0e11" }} />
      <i style={{ position: "absolute", right: -1.5, top: "50%", width: 3, height: 6, marginTop: -3, borderRadius: 2, background: "#0c0e11" }} />
    </div>
  );
  const hh = t ? t[0] : "--", mm = t ? t[1] : "--";
  return (
    <div style={{ padding: 4, borderRadius: 14, background: "#fff" }} aria-label={t ? `${t[0]}:${t[1]}` : undefined}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: 5, borderRadius: 10, background: "#0b0d10" }}>
        {card(hh[0])}{card(hh[1])}
        <span style={{ display: "grid", gap: 5, padding: "0 1px", opacity: sep ? 1 : 0.25, transition: "opacity .2s" }}><i style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }} /><i style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }} /></span>
        {card(mm[0])}{card(mm[1])}
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
