"use client";

import { getAllProjectsBrief } from "@/app/projects/helper";
import Link from "next/link";
import styled from "styled-components";
import { Wrap } from "@/components/ui/layout";
import { useEffect, useRef, useState } from "react";
import Letters from "@/components/ui/letters";
import DecodeLines from "@/components/ui/decode-lines";
import MatrixRain from "@/components/ui/matrix-rain";
import Magnetic from "@/components/ui/magnetic";
import IDot from "@/components/ui/i-dot-machine";
import PeelSticker, { AvatarSticker, ClockSticker, LaptopSticker, MugSticker, PhoneSticker } from "@/components/ui/peel-sticker";
import { useLang } from "@/i18n/provider";
import { CAREER_SINCE, MOBILE_SINCE } from "@/data/profile";
import { BRAND_ICON } from "@/data/brands";

const WORKED = [
  { id: "pjbank", name: "Conta Superlógica" },
  { id: "gruvi", name: "Gruvi" },
  { id: "minha-navex", name: "Minha Navex" },
  { id: "mont-b2b", name: "Mont Capital" },
  { id: "consorcio-gazin", name: "Consórcio Gazin" },
  { id: "clube-da-joia-marketplace", name: "Clube da Joia" },
];

const Box = styled.section`
  position: relative; display: flex; flex-direction: column; justify-content: center; min-height: min(calc(100svh - var(--header)), 800px); padding: 48px 0 56px;
  .spot { position: absolute; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(520px circle at var(--mx, 70%) var(--my, 30%), color-mix(in srgb, var(--accent) 13%, transparent), transparent 62%); }
  .content { position: relative; z-index: 2; max-width: 680px; }
  .kicker { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  .kicker i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--ping, var(--accent)) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }
  h1 { margin-top: 22px; font-size: clamp(2.9rem, 7.2vw, 6rem); font-weight: 700; line-height: 0.95; letter-spacing: -0.055em; }
  h1 { cursor: default; }
  h1 > span { display: block; }
  h1 .jr > span { display: inline-block; }
  h1 .jr * { margin-right: 0; }
  h1 .ii { position: relative; display: inline-block; }
  .cta { display: flex; flex-wrap: wrap; gap: 12px 14px; margin-top: 34px; }
  .btn { display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 26px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.86rem; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
  .btn.p { background: var(--accent); color: var(--on-accent); font-weight: 700; box-shadow: 4px 4px 0 var(--accent-2); }
  .btn.p:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--accent-2); }
  .btn.g { border: 1px solid var(--line); }
  .btn.g:hover { border-color: var(--accent); color: var(--accent-ink); transform: translateY(-2px); }
  .meta { display: flex; flex-wrap: wrap; gap: 8px 40px; margin-top: 44px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); max-width: 34rem; margin-top: 30px; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: color-mix(in srgb, var(--card) 70%, transparent); }
  .stats > div { display: flex; flex-direction: column-reverse; gap: 4px; padding: 14px 18px; }
  .stats > div + div { border-left: 1px solid var(--line); }
  .stats dt { font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .stats dd { font-size: 1.7rem; font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; }
  .stats dd small { display: block; margin-top: 2px; font-family: var(--font-mono); font-size: 0.6rem; font-weight: 400; letter-spacing: 0.04em; color: var(--muted); }
  @media (max-width: 520px) { .stats dd { font-size: 1.35rem; } .stats > div { padding: 12px 12px; } }
  .worked { display: flex; align-items: center; gap: 14px; margin-top: 30px; padding-top: 22px; border-top: 1px solid var(--line); max-width: 34rem; }
  .worked small { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  .worked .icons { display: flex; gap: 8px; }
  .worked a { display: block; width: 34px; height: 34px; border-radius: 9px; overflow: hidden; border: 1px solid var(--line); opacity: 0.85; transition: transform 0.25s cubic-bezier(.2,.7,.2,1), opacity 0.2s ease, border-color 0.2s ease; }
  .worked a:hover { transform: translateY(-4px); opacity: 1; border-color: var(--accent); }
  .worked img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .meta .live { display: inline-flex; align-items: center; gap: 10px; }
  .meta .live i { width: 8px; height: 8px; border-radius: 50%; background: #3ddc84; animation: ping 2.2s ease-out infinite; --ping: #3ddc84; }
  .meta b { color: var(--ink); font-weight: 500; }

  .board { position: absolute; top: 50%; height: min(600px, 84%); transform: translateY(-50%); right: max(var(--gutter), calc((100vw - var(--wrap)) / 2 + var(--gutter))); width: min(46vw, 560px); z-index: 3; pointer-events: none; }
  .board::before { content: ""; position: absolute; left: 50%; bottom: 8%; width: 86%; aspect-ratio: 1; transform: translateX(-50%); border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 17%, transparent), transparent 66%); }
  /* disposição escolhida (desktop); no celular volta para a de baixo */
  .s1 { right: -5%; top: 17%; }
  .s2 { left: 54%; top: 51%; }
  .s3 { right: -2%; top: 80%; }
  .s4 { left: 9%; top: 32%; }
  .s5 { left: 28%; top: 90%; }
  @media (max-width: 760px) {
    .s1 { left: 4%; right: auto; top: 14%; } .s2 { left: 38%; top: 10%; } .s3 { right: 4%; left: auto; top: 16%; } .s4 { left: 12%; top: 56%; } .s5 { left: 52%; top: 62%; }
    .board { position: relative; top: auto; right: auto; transform: none; width: 100%; height: 330px; margin-top: 18px; }
    min-height: 0;
    .meta { grid-template-columns: 1fr; gap: 8px; margin-top: 40px; }
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
          <div className="kicker"><i /> {h.kicker} · {h.based}</div>
          <h1 aria-label="Edson Junior" onClick={() => setAgain((n) => n + 1)} title="↻">
            <span><Letters text="Edson" delay={0.1} /></span>
            <span className="jr" aria-hidden>
              <Letters text="Jun" delay={0.35} />
              <span className="ii">ı<IDot trigger={again} /></span>
              <Letters text="or" delay={0.6} />
            </span>
          </h1>
          <DecodeLines lines={lines} delay={900} />
          <div className="cta">
            <Magnetic><Link className="btn p" href="/home#contato">{h.ctaTalk} <span aria-hidden>→</span></Link></Magnetic>
            <Link className="btn g" href="/projects">{h.ctaWork}</Link>
          </div>
          <dl className="stats">
            <div><dt>{h.stats.years}</dt><dd>+{yr - CAREER_SINCE}</dd></div>
            <div><dt>{h.stats.projects}</dt><dd>{getAllProjectsBrief().length}</dd></div>
            <div><dt>{h.stats.fronts}</dt><dd>3</dd></div>
          </dl>
          <div className="meta">
            <span className="live"><i /> {h.status}</span>
          </div>
          <div className="worked">
            <small>{h.worked}</small>
            <div className="icons">
              {WORKED.map((w) => (
                <Link key={w.id} href={`/projects/${w.id}`} title={w.name} aria-label={w.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={BRAND_ICON[w.id]} alt="" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Wrap>

      <div className="board">
        <PeelSticker h={98} rot={-1} className="s1" label={h.stickers.laptop}><LaptopSticker scale={0.72} /></PeelSticker>
        <PeelSticker h={140} rot={0} className="s2" label={h.stickers.photo}><AvatarSticker size={140} /></PeelSticker>
        <PeelSticker h={44} rot={1} className="s3" label={h.stickers.clock}><ClockSticker /></PeelSticker>
        <PeelSticker h={136} rot={2} className="s4" label={h.stickers.phone}><PhoneSticker scale={0.6} /></PeelSticker>
        <PeelSticker h={95} rot={-2} className="s5" label={h.stickers.coffee}><MugSticker scale={0.72} /></PeelSticker>
      </div>
    </Box>
  );
}

