"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Wrap } from "@/components/ui/layout";
import Letters from "@/components/ui/letters";
import Phone from "@/components/ui/phone";
import WebWire from "@/components/ui/web-wire";
import { HERO_SCREENS } from "@/data/work";
import { useLang } from "@/i18n/provider";

const Box = styled.section`
  position: relative; min-height: calc(100svh - var(--header)); display: flex; align-items: center; padding: 28px 0 56px;
  --mx: -400px; --my: -400px;
  .glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(520px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 11%, transparent), transparent 62%); }
  .lit { position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px); background-size: 56px 56px; opacity: 0.5;
    -webkit-mask-image: radial-gradient(240px circle at var(--mx) var(--my), #000, transparent); mask-image: radial-gradient(240px circle at var(--mx) var(--my), #000, transparent); }
  .grid { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 520px); gap: 48px; align-items: center; }
  @media (max-width: 980px) { .grid { grid-template-columns: 1fr; gap: 44px; } min-height: 0; padding-top: 20px; }

  .who { display: inline-flex; align-items: center; gap: 14px; margin-bottom: 26px; padding: 8px 18px 8px 8px; border: 1px solid var(--line); border-radius: 99px; background: color-mix(in srgb, var(--card) 80%, transparent); }
  .who img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; object-position: center 20%; box-shadow: 0 0 0 2px var(--accent); }
  .who b { display: block; font-size: 0.92rem; font-weight: 600; line-height: 1.2; }
  .who span { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--muted); }
  .who i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: ping 2.2s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }

  h1 { font-size: clamp(2.3rem, 3.7vw, 3.6rem); font-weight: 700; line-height: 1.02; letter-spacing: -0.045em; }
  h1 .l1 { display: block; }
  h1 .l2 { display: block; color: var(--accent); }
  .lead { max-width: 32rem; margin-top: 26px; font-size: 1.2rem; line-height: 1.6; color: var(--muted); }
  .cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 14px; margin-top: 32px; }
  .btn { display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 26px; border-radius: 99px; font-size: 1rem; font-weight: 500; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease; }
  .btn.p { background: var(--accent); color: var(--on-accent); font-weight: 600; }
  .btn.p:hover { transform: translateY(-2px); box-shadow: 0 10px 34px -8px color-mix(in srgb, var(--accent) 70%, transparent); }
  .btn.g { border: 1px solid var(--line); }
  .btn.g:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 34px; padding: 0; list-style: none; }
  .chips li { display: inline-flex; align-items: center; gap: 9px; padding: 9px 16px; border-radius: 99px; font-size: 0.86rem; font-weight: 500; color: var(--muted); border: 1px solid var(--line); background: color-mix(in srgb, var(--card) 70%, transparent); }
  .chips li::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--c, var(--accent)); }

  .scene { position: relative; width: 100%; max-width: 520px; height: 540px; justify-self: center; }
  .scene::before { content: ""; position: absolute; inset: 6% 0 4%; border-radius: 28px; background: radial-gradient(60% 60% at 50% 50%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%); }
  .web { position: absolute; left: 0; top: 4%; width: 88%; }
  .phone { position: absolute; right: 3%; bottom: 0; filter: drop-shadow(0 30px 40px rgba(0,0,0,0.45)); animation: float 7s ease-in-out infinite; }
  @keyframes float { 50% { transform: translateY(-10px); } }
  @media (max-width: 980px) { .scene { height: 540px; margin-top: 12px; } }
  @media (max-width: 520px) { .scene { height: 470px; } .web { width: 90%; top: 2%; } .phone { right: 0; } }
  @media (prefers-reduced-motion: reduce) { .phone { animation: none; } }

`;

const CHIP_COLORS = ["#61dafb", "#a78bfa", "#2eebaa"];

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const box = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((v) => (v + 1) % HERO_SCREENS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const move = (e: React.PointerEvent) => {
    const el = box.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Box ref={box} onPointerMove={move}>
      <div className="glow" aria-hidden />
      <div className="lit" aria-hidden />
      <Wrap style={{ width: "100%" }}>
        <div className="grid">
          <div>
            <div className="who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/edson.webp" alt={h.portraitAlt} />
              <div>
                <b>Edson Junior</b>
                <span><i /> {h.status}</span>
              </div>
            </div>
            <h1>
              <span className="l1"><Letters text={h.h1a} delay={0.2} /></span>
              <span className="l2"><Letters text={h.h1b} delay={0.5} /></span>
            </h1>
            <p className="lead">{h.lead}</p>
            <div className="cta">
              <Link className="btn p" href="/home#trabalhos">{h.ctaWork} <span aria-hidden>↓</span></Link>
              <Link className="btn g" href="/home#contato">{h.ctaTalk}</Link>
            </div>
            <ul className="chips">
              {h.chips.map((name, i) => (
                <li key={name} style={{ ["--c" as string]: CHIP_COLORS[i] }}>{name}</li>
              ))}
            </ul>
          </div>

          <div className="scene" aria-hidden>
            <div className="web"><WebWire color="#2eebaa" url="seusite.com.br" /></div>
            <div className="phone"><Phone screens={HERO_SCREENS} active={active} alt="App" width={232} /></div>
          </div>
        </div>
      </Wrap>
    </Box>
  );
}
