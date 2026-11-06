"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

export type Screen = { src: string; app: string; note: string };

const Wrap = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  padding: 8px 0 4px;
  .stage { position: relative; width: min(300px, 78vw); height: min(520px, 132vw); }
  .glow { position: absolute; inset: 8% -10% 0; background: radial-gradient(60% 60% at 50% 45%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 70%); filter: blur(24px); }
  .phone {
    position: absolute; inset: 0 auto auto 50%;
    width: 232px; aspect-ratio: 9 / 19.2; border-radius: 36px; padding: 7px;
    background: #0b0c0e; border: 1px solid color-mix(in srgb, var(--ink) 22%, transparent);
    box-shadow: 0 30px 60px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset;
    overflow: hidden;
  }
  .phone .screens { position: relative; width: 100%; height: 100%; border-radius: 29px; overflow: hidden; background: #111; }
  .phone img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: 0; transition: opacity 0.7s ease; }
  .phone img[data-on="true"] { opacity: 1; }
  .phone .notch { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 62px; height: 17px; border-radius: 12px; background: #000; z-index: 2; }
  .main { transform: translateX(-50%) rotate(-4deg); z-index: 2; animation: float 7s ease-in-out infinite; }
  .back { transform: translateX(-12%) translateY(34px) rotate(7deg) scale(0.88); opacity: 0.85; z-index: 1; filter: saturate(0.9); }
  @keyframes float { 50% { transform: translateX(-50%) translateY(-8px) rotate(-3deg); } }
  .cap { margin-top: 14px; display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); }
  .cap b { color: var(--ink); font-weight: 600; }
  .cap .dots { display: inline-flex; gap: 5px; }
  .cap .dots button { width: 6px; height: 6px; padding: 0; border-radius: 50%; border: 0; background: var(--line); cursor: pointer; transition: background 0.2s, transform 0.2s; }
  .cap .dots button[aria-current="true"] { background: var(--accent); transform: scale(1.35); }
  @media (prefers-reduced-motion: reduce) { .main { animation: none; } .phone img { transition: none; } }
`;

/** Celular com telas reais dos apps que desenvolvi, trocando devagar. */
export default function PhoneShowcase({ screens, interval = 3400 }: { screens: Screen[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || screens.length < 2) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % screens.length), interval);
    return () => clearInterval(t);
  }, [paused, screens.length, interval]);

  const next = (i + 1) % screens.length;
  const cur = screens[i];

  return (
    <Wrap onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="stage" aria-hidden={false}>
        <div className="glow" />
        <div className="phone back" aria-hidden>
          <div className="screens">
            {screens.map((s, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.src} src={s.src} alt="" data-on={k === next} loading="lazy" />
            ))}
          </div>
        </div>
        <div className="phone main">
          <span className="notch" />
          <div className="screens">
            {screens.map((s, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.src} src={s.src} alt={k === i ? `${s.app}: ${s.note}` : ""} data-on={k === i} />
            ))}
          </div>
        </div>
      </div>
      <div className="cap">
        <span>
          <b>{cur.app}</b> · {cur.note}
        </span>
        <span className="dots" role="group" aria-label="Trocar tela">
          {screens.map((s, k) => (
            <button key={s.src} aria-label={`${s.app}: ${s.note}`} aria-current={k === i} onClick={() => setI(k)} />
          ))}
        </span>
      </div>
    </Wrap>
  );
}
