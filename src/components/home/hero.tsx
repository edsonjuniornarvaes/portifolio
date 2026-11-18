"use client";

import Link from "next/link";
import styled from "styled-components";
import { Wrap } from "@/components/ui/layout";
import { useState } from "react";
import Letters from "@/components/ui/letters";
import DecodeLines from "@/components/ui/decode-lines";
import MatrixRain from "@/components/ui/matrix-rain";
import IDot from "@/components/ui/i-dot-machine";
import PeelSticker, { SceneSticker, LaptopSticker, MugSticker, PhoneSticker } from "@/components/ui/peel-sticker";
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
  .btn.g:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  .meta { display: flex; flex-wrap: wrap; gap: 8px 40px; margin-top: 44px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
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
  @media (max-width: 760px) {
    .board { position: relative; top: auto; right: auto; transform: none; width: 100%; height: 360px; margin-top: 24px; }
    min-height: 0;
    .meta { grid-template-columns: 1fr; gap: 8px; margin-top: 40px; }
    }
  @media (prefers-reduced-motion: reduce) { .meta .live i { animation: none; } }
`;

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const [again, setAgain] = useState(0);
  const yr = new Date().getFullYear();
  const lines = h.lines.map((l) => l.replace("{career}", String(yr - CAREER_SINCE)).replace("{mobile}", String(yr - MOBILE_SINCE)));

  return (
    <Box>
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
            <Link className="btn p" href="/projects">{h.ctaWork} <span aria-hidden>→</span></Link>
            <Link className="btn g" href="/home#contato">{h.ctaTalk}</Link>
          </div>
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
        <PeelSticker h={136} rot={-2} style={{ left: "2%", top: "8%" }} label={h.stickers.laptop}><LaptopSticker /></PeelSticker>
        <PeelSticker h={216} rot={0} style={{ right: "5%", top: "6%" }} label={h.stickers.photo}><SceneSticker width={196} /></PeelSticker>
        <PeelSticker h={226} rot={3} style={{ left: "5%", top: "46%" }} label={h.stickers.phone}><PhoneSticker /></PeelSticker>
        <PeelSticker h={132} rot={-3} style={{ left: "56%", top: "62%" }} label={h.stickers.coffee}><MugSticker /></PeelSticker>
      </div>
    </Box>
  );
}

