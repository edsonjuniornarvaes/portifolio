"use client";

import { useRef } from "react";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";

const Tab = styled.div`
  position: relative;
  width: min(100%, 330px);
  transform: perspective(900px) rotate(2.5deg) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.25s ease-out;
  will-change: transform;
  &[data-tilt="on"] { transform: perspective(900px) rotate(0deg) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(1.02); }
  .glow { position: absolute; inset: 6% -8% -4%; background: radial-gradient(60% 60% at 50% 50%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 72%); filter: blur(26px); }
  .body {
    position: relative; padding: 14px; border-radius: 32px;
    background: linear-gradient(145deg, #2b2f33, #0b0c0e 55%, #1c1f22);
    border: 1px solid color-mix(in srgb, var(--ink) 22%, transparent);
    box-shadow: 0 34px 70px -24px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05) inset, 10px 12px 0 -3px color-mix(in srgb, var(--accent-2) 45%, transparent);
  }
  .cam { position: absolute; top: 5px; left: 50%; width: 5px; height: 5px; margin-left: -2.5px; border-radius: 50%; background: #1f3a46; box-shadow: 0 0 0 1px rgba(255,255,255,0.08); }
  .screen { position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 4 / 5; background: #0a0f0e; }
  .screen img { width: 100%; height: 100%; object-fit: cover; object-position: center 18%; display: block; }
  .screen::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(160deg, rgba(255,255,255,0.12), transparent 38%); }
  .bar { position: absolute; left: 50%; bottom: 5px; width: 64px; height: 3px; margin-left: -32px; border-radius: 3px; background: rgba(255,255,255,0.25); }
  .label {
    position: absolute; left: -10px; bottom: -14px; padding: 6px 12px; border-radius: 999px; font-size: 0.74rem;
    background: color-mix(in srgb, var(--paper) 85%, transparent); backdrop-filter: blur(8px); border: 1px solid var(--line);
    display: inline-flex; align-items: center; gap: 8px; transform: rotate(-3deg);
  }
  .label span { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: tping 2.2s ease-out infinite; }
  @keyframes tping { 0% { box-shadow: 0 0 0 0 #4ade80; } 80%, 100% { box-shadow: 0 0 0 8px transparent; } }
  @media (prefers-reduced-motion: reduce) { .label span { animation: none; } }
`;

/** Retrato na tela de um tablet. */
export default function TabletPortrait({ src, alt }: { src: string; alt: string }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
    el.dataset.tilt = "on";
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    delete el.dataset.tilt;
  };
  return (
    <Tab ref={ref} onPointerMove={move} onPointerLeave={leave}>
      <div className="glow" aria-hidden />
      <div className="body">
        <span className="cam" aria-hidden />
        <div className="screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
        </div>
        <span className="bar" aria-hidden />
      </div>
      <div className="label">
        <span /> {t.hero.available}
      </div>
    </Tab>
  );
}
