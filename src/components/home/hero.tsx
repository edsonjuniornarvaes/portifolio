"use client";

import { useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wrap } from "@/components/ui/layout";
import Letters from "@/components/ui/letters";
import Phone from "@/components/ui/phone";
import { HERO_SCREENS } from "@/data/work";
import { useLang } from "@/i18n/provider";

const Box = styled.section`
  position: relative; overflow: hidden; --mx: 50%; --my: 30%;
  .glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(560px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 12%, transparent), transparent 62%); }
  .lit { position: absolute; inset: 0; pointer-events: none; opacity: 0.55;
    background-image: linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px); background-size: 56px 56px;
    -webkit-mask-image: radial-gradient(260px circle at var(--mx) var(--my), #000, transparent); mask-image: radial-gradient(260px circle at var(--mx) var(--my), #000, transparent); }

  .top { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding-top: clamp(40px, 8vh, 84px); }
  .kicker { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px; border: 1px solid var(--line); border-radius: 99px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); background: color-mix(in srgb, var(--card) 70%, transparent); }
  .kicker i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: ping 2.2s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }

  h1 { margin-top: 28px; font-size: clamp(2.7rem, 8.2vw, 7.2rem); font-weight: 700; line-height: 0.98; letter-spacing: -0.055em; }
  h1 .l1 { display: block; }
  h1 .l2 { display: block; color: var(--accent); }
  h1 .caret { display: inline-block; width: 0.07em; height: 0.82em; margin-left: 0.08em; background: var(--accent); vertical-align: -0.06em; animation: blink 1.1s steps(1) infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  .lead { max-width: 41rem; text-wrap: balance; margin-top: 28px; font-size: clamp(1.05rem, 1.6vw, 1.25rem); line-height: 1.6; color: var(--muted); }
  .cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 14px; margin-top: 34px; }
  .btn { display: inline-flex; align-items: center; gap: 10px; height: 54px; padding: 0 28px; border-radius: 99px; font-size: 1rem; font-weight: 500; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
  .btn.p { background: var(--accent); color: var(--on-accent); font-weight: 600; }
  .btn.p:hover { transform: translateY(-2px); box-shadow: 0 12px 36px -8px color-mix(in srgb, var(--accent) 70%, transparent); }
  .btn.g { border: 1px solid var(--line); }
  .btn.g:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  .chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px; margin-top: 30px; padding: 0; list-style: none; font-size: 0.9rem; color: var(--muted); }
  .chips li { display: inline-flex; align-items: center; gap: 9px; }
  .chips li::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--c, var(--accent)); }

  .stage { position: relative; height: clamp(300px, 40vw, 470px); margin-top: clamp(36px, 6vh, 64px); overflow: hidden;
    -webkit-mask-image: linear-gradient(#000 70%, transparent); mask-image: linear-gradient(#000 70%, transparent); }
  .row { position: absolute; left: 50%; top: 0; display: flex; align-items: flex-start; gap: clamp(14px, 2vw, 28px); transform: translateX(-50%); }
  .ph { flex: none; }
  .ph > div { transition: transform 0.4s cubic-bezier(.2,.7,.2,1); }
  .ph:hover > div { transform: translateY(-14px); }
  @media (max-width: 520px) { .kicker { font-size: 0.66rem; letter-spacing: 0.06em; padding: 8px 14px; text-align: left; } }
  @media (max-width: 700px) { .row { zoom: 0.72; } .ph:nth-child(1), .ph:nth-child(5) { display: none; } }
  @media (prefers-reduced-motion: reduce) { .kicker i, .caret { animation: none; } }
`;

const CHIP_COLORS = ["#61dafb", "#a78bfa", "#2eebaa"];
// largura, deslocamento inicial (mt) e quanto sobe ao rolar
const ROW = [
  { w: 176, mt: 76, k: 30 },
  { w: 212, mt: 36, k: 70 },
  { w: 248, mt: 0, k: 120 },
  { w: 212, mt: 36, k: 70 },
  { w: 176, mt: 76, k: 30 },
];
const ORDER = [3, 5, 1, 2, 4];

function Rise({ i, k, mt, children, p }: { i: number; k: number; mt: number; children: React.ReactNode; p: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const y = useTransform(p, [0, 1], [0, -k]);
  return (
    <motion.div className="ph" style={{ y, marginTop: mt }}>
      <motion.div initial={{ y: 220, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.55 + i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const box = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: box, offset: ["start start", "end start"] });

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
      <Wrap>
        <div className="top">
          <span className="kicker"><i /> {h.based} · {h.status}</span>
          <h1>
            <span className="l1"><Letters text={h.h1a} delay={0.15} /></span>
            <span className="l2"><Letters text={h.h1b} delay={0.45} /><span className="caret" aria-hidden /></span>
          </h1>
          <p className="lead">{h.lead}</p>
          <div className="cta">
            <Link className="btn p" href="/home#trabalhos">{h.ctaWork} <span aria-hidden>↓</span></Link>
            <Link className="btn g" href="/home#contato">{h.ctaTalk}</Link>
          </div>
          <ul className="chips">
            {h.chips.map((name, i) => <li key={name} style={{ ["--c" as string]: CHIP_COLORS[i] }}>{name}</li>)}
          </ul>
        </div>
      </Wrap>
      <div className="stage" aria-hidden>
        <div className="row">
          {ROW.map((r, i) => (
            <Rise key={i} i={i} k={r.k} mt={r.mt} p={scrollYProgress}>
              <Phone screens={[HERO_SCREENS[ORDER[i] - 1] ?? HERO_SCREENS[0]]} alt="" width={r.w} />
            </Rise>
          ))}
        </div>
      </div>
    </Box>
  );
}
