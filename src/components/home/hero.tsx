"use client";

import { projectsTotal } from "@/app/projects/helper";
import { ArrowRight } from "@/components/ui/icons";
import Link from "next/link";
import styled from "styled-components";
import { Wrap } from "@/components/ui/layout";
import { useEffect, useRef, useState } from "react";
import Letters from "@/components/ui/letters";
import DecodeLines from "@/components/ui/decode-lines";
import MatrixRain from "@/components/ui/matrix-rain";
import IDot from "@/components/ui/i-dot-machine";
import PeelSticker, { AvatarSticker, ClockSticker, MugSticker } from "@/components/ui/peel-sticker";
import HeroPhone from "@/components/home/hero-phone";
import { useLang } from "@/i18n/provider";
import { CAREER_SINCE, MOBILE_SINCE } from "@/data/profile";
import { BRAND_ICON } from "@/data/brands";

const WORKED = [
  { id: "pjbank", name: "Conta Superlógica" },
  { id: "gruvi", name: "Gruvi" },
  { id: "clube-da-joia-marketplace", name: "Clube da Joia" },
  { id: "multjet", name: "MultJet" },
  { id: "mont-capital", name: "Mont Capital" },
  { id: "minha-navex", name: "Minha Navex" },
  { id: "gazin", name: "Grupo Gazin" },
];

const Box = styled.section`
  position: relative; display: flex; flex-direction: column; justify-content: center; min-height: min(calc(100svh - var(--header)), 800px); padding: 48px 0 56px;
  .spot { position: absolute; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(520px circle at var(--mx, 70%) var(--my, 30%), color-mix(in srgb, var(--accent) 13%, transparent), transparent 62%); }
  .content { position: relative; z-index: 2; max-width: 680px; }
  .kicker { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  .kicker i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--ping, var(--accent)) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }
  h1 { font-size: clamp(2.7rem, 6.2vw, 5.2rem); font-weight: 700; line-height: 1; letter-spacing: -0.04em; text-wrap: balance; }
  h1 { cursor: default; }
  h1 > span { display: block; }
  h1 .w { display: inline-block; white-space: nowrap; margin-right: 0.22em; }
  h1 .w * { margin-right: 0; }
  h1 .ii { position: relative; display: inline-block; }
  .by { margin-top: 20px; font-size: 1.05rem; line-height: 1.5; color: var(--muted); }
  .by b { color: var(--ink); font-weight: 600; }
  .cta { display: flex; flex-wrap: wrap; gap: 12px 14px; margin-top: 34px; }
  .btn { display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 26px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.86rem; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
  .btn.p { background: var(--accent); color: var(--on-accent); font-weight: 700; box-shadow: 4px 4px 0 var(--accent-2); }
  .btn.p:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--accent-2); }
  .btn.g { border: 1px solid var(--line); }
  .btn.g:hover { border-color: var(--accent); color: var(--accent-ink); transform: translateY(-2px); }
  .meta { display: flex; flex-wrap: wrap; gap: 8px 40px; margin-top: 44px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .facts { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 0; margin-top: 26px; font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.06em; color: var(--muted); }
  .facts span { display: inline-flex; align-items: baseline; gap: 6px; }
  .facts span:not(:last-child)::after { content: ""; width: 4px; height: 4px; margin: 0 14px; border-radius: 50%; background: var(--accent); align-self: center; }
  @media (max-width: 520px) { .facts { font-size: 0.72rem; letter-spacing: 0.02em; } .facts span:nth-child(3) { display: none; } .facts span:nth-child(2)::after { display: none; } .facts span:not(:last-child)::after { margin: 0 9px; } .facts b { font-size: 0.95rem; } }
  .facts b { font-size: 1.02rem; font-weight: 700; letter-spacing: -0.01em; color: var(--ink); }
  .worked { display: grid; gap: 12px; margin-top: 30px; padding-top: 22px; border-top: 1px solid var(--line); max-width: 36rem; }
  .worked small { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .worked .icons { display: flex; flex-wrap: wrap; gap: 8px; }
  .worked a { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 12px 0 5px; border-radius: 99px; border: 1px solid var(--line); font-size: 0.82rem; font-weight: 500; color: var(--text); transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s ease, background 0.2s ease; }
  .worked a:hover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
  .worked a:active { transform: scale(0.97); }
  .worked a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .worked a span { white-space: nowrap; }
  .worked img { width: 26px; height: 26px; border-radius: 99px; object-fit: cover; display: block; }
  .meta .live { display: inline-flex; align-items: center; gap: 10px; }
  .meta .live i { width: 8px; height: 8px; border-radius: 50%; background: #3ddc84; animation: ping 2.2s ease-out infinite; --ping: #3ddc84; }
  .meta b { color: var(--ink); font-weight: 500; }

  .board { position: absolute; top: 50%; height: min(600px, 84%); transform: translateY(-50%); right: max(var(--gutter), calc((100vw - var(--wrap)) / 2 + var(--gutter))); width: min(46vw, 560px); z-index: 3; pointer-events: none; }
  .board::before { content: ""; position: absolute; left: 50%; bottom: 8%; width: 86%; aspect-ratio: 1; transform: translateX(-50%); border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 17%, transparent), transparent 66%); }
  /* disposição escolhida (desktop); no celular volta para a de baixo */
  .stage { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 2; pointer-events: auto; }
  .s2 { left: 3%; top: 8%; }
  .s3 { right: 2%; top: 20%; }
  .s5 { left: 6%; bottom: 6%; }
  @media (max-width: 760px) {
    min-height: 0;
      .onleft { display: block; }
    .meta { margin-top: 30px; }
    h1 { font-size: clamp(2.5rem, 12vw, 3.4rem); }
    .worked { margin-top: 20px; padding-top: 18px; max-width: none; }
    .worked .icons { flex-wrap: wrap; }
    /* o celular vem primeiro e os adesivos viram uma faixa arrumada logo abaixo (nada flutuando sobre o texto) */
    .board { position: relative; top: auto; right: auto; transform: none; width: 100%; height: auto; margin-top: 28px; padding: 6px 8px 4px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 18px 26px; }
    .board::before { bottom: auto; top: 0; width: 100%; aspect-ratio: 1.4; }
    .stage { position: relative; left: auto; top: auto; transform: none; order: 0; width: 100%; display: flex; justify-content: center; }
    .board > [role="img"] { position: relative !important; inset: auto !important; left: auto !important; right: auto !important; top: auto !important; bottom: auto !important; }
    .s2 { order: 1; } .s3 { order: 2; } .s5 { order: 3; }
  }
  @media (prefers-reduced-motion: reduce) { .meta .live i { animation: none; } }
`;

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const [again, setAgain] = useState(0);
  const box = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mv = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", mv, { passive: true });
    return () => el.removeEventListener("pointermove", mv);
  }, []);
  const yr = new Date().getFullYear();
  const lines = h.lines.map((l) => l.replace("{career}", String(yr - CAREER_SINCE)).replace("{mobile}", String(yr - MOBILE_SINCE)));

  return (
    <Box ref={box}>
      <div className="spot" aria-hidden />
      <MatrixRain />
      <Wrap style={{ width: "100%", position: "relative" }}>
        <div className="content">
          <h1 aria-label={h.h1.join(" ")} onClick={() => setAgain((n) => n + 1)} title="↻">
            {h.h1.map((line, li) => (
              <span key={line}>
                {line.split(" ").map((word, wi) => {
                  const d = 0.1 + li * 0.28 + wi * 0.12;
                  const k = li === 0 ? word.indexOf("i") : -1;
                  if (k < 0) return <Letters key={wi} text={word} delay={d} />;
                  // a primeira letra "i" do título vira um "ı" sem pingo: o pingo cai e quica no lugar dele
                  return (
                    <span key={wi} className="w" aria-hidden>
                      <Letters text={word.slice(0, k)} delay={d} />
                      <span className="ii">ı<IDot trigger={again} /></span>
                      <Letters text={word.slice(k + 1)} delay={d + 0.3} />
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
          <p className="by"><b>Edson Junior</b>{h.byline}</p>
          <DecodeLines lines={lines} delay={900} />
          <div className="cta">
            <Link className="btn p" href="/home#contato">{h.ctaTalk} <ArrowRight /></Link>
            <Link className="btn g" href="/projects">{h.ctaWork}</Link>
          </div>
          <p className="facts">
            <span><b>+{yr - CAREER_SINCE}</b> {h.stats.years}</span>
            <span><b>+{projectsTotal()}</b> {h.stats.projects}</span>
          </p>
          <div className="onleft">
            <div className="meta">
              <span className="live"><i /> {h.status}</span>
            </div>
            <div className="worked">
              <small>{h.worked}</small>
              <div className="icons">
                {WORKED.map((w) => (
                  <Link key={w.id} href={`/projects/${w.id}`} >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={BRAND_ICON[w.id]} alt="" /><span>{w.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrap>

      <div className="board">
        <div className="stage"><HeroPhone /></div>
        <PeelSticker h={112} rot={-2} className="s2" label={h.stickers.photo}><AvatarSticker size={112} /></PeelSticker>
        <PeelSticker h={42} rot={2} className="s3" label={h.stickers.clock}><ClockSticker scale={0.95} /></PeelSticker>
        <PeelSticker h={88} rot={-2} className="s5" label={h.stickers.coffee}><MugSticker scale={0.68} /></PeelSticker>
      </div>
    </Box>
  );
}

