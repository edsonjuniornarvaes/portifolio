"use client";

import Link from "next/link";
import styled from "styled-components";
import { Wrap } from "@/components/ui/layout";
import Letters from "@/components/ui/letters";
import { DigitalClock, Floater } from "@/components/ui/floaters";
import PeelSticker, { AvatarSticker, CoffeeSticker, MacBookSticker } from "@/components/ui/peel-sticker";
import { useLang } from "@/i18n/provider";

const Box = styled.section`
  position: relative; display: flex; flex-direction: column; justify-content: center; min-height: calc(100svh - var(--header)); padding: 56px 0 64px;
  .content { position: relative; z-index: 2; max-width: 680px; }
  .kicker { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  .kicker i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: ping 2.2s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }
  h1 { margin-top: 22px; font-size: clamp(2.9rem, 7.2vw, 6rem); font-weight: 700; line-height: 0.95; letter-spacing: -0.055em; }
  h1 span { display: block; }
  .lead { max-width: 34rem; margin-top: 30px; font-size: clamp(1.1rem, 1.7vw, 1.3rem); line-height: 1.6; }
  .cta { display: flex; flex-wrap: wrap; gap: 12px 14px; margin-top: 34px; }
  .btn { display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 26px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.86rem; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
  .btn.p { background: var(--accent); color: var(--on-accent); font-weight: 700; box-shadow: 4px 4px 0 var(--accent-2); }
  .btn.p:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--accent-2); }
  .btn.g { border: 1px solid var(--line); }
  .btn.g:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  .meta { display: flex; flex-wrap: wrap; gap: 8px 40px; margin-top: 44px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .meta b { color: var(--ink); font-weight: 500; }

  .board { position: absolute; top: 50%; height: min(600px, 84%); transform: translateY(-50%); right: max(var(--gutter), calc((100vw - var(--wrap)) / 2 + var(--gutter))); width: min(46vw, 560px); z-index: 3; pointer-events: none; }
  .board::before { content: ""; position: absolute; left: 50%; bottom: 8%; width: 86%; aspect-ratio: 1; transform: translateX(-50%); border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 17%, transparent), transparent 66%); }
  @media (max-width: 760px) {
    .board { position: relative; top: auto; right: auto; transform: none; width: 100%; height: 420px; margin-top: 30px; }
    .meta { grid-template-columns: 1fr; gap: 8px; margin-top: 40px; }
    }
  @media (prefers-reduced-motion: reduce) { .kicker i { animation: none; } }
`;

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <Box>
      <Wrap style={{ width: "100%", position: "relative" }}>
        <div className="content">
          <div className="kicker"><i /> {h.kicker} · {h.based}</div>
          <h1>
            <span><Letters text="Edson" delay={0.1} /></span>
            <span><Letters text="Junior" delay={0.35} /></span>
          </h1>
          <p className="lead">{h.lead}</p>
          <div className="cta">
            <Link className="btn p" href="/projects">{h.ctaWork} <span aria-hidden>→</span></Link>
            <Link className="btn g" href="/home#contato">{h.ctaTalk}</Link>
          </div>
          <div className="meta">
            <span><b>●</b> {h.status}</span>
          </div>
        </div>
      </Wrap>

      <div className="board">
        <PeelSticker h={129} rot={-6} style={{ left: "4%", top: "12%" }} label={h.stickers.laptop}><MacBookSticker /></PeelSticker>
        <PeelSticker h={150} rot={4} style={{ left: "36%", top: "46%" }} label={h.stickers.photo}><AvatarSticker size={150} /></PeelSticker>
        <PeelSticker h={106} rot={9} style={{ right: "6%", top: "30%" }} label={h.stickers.coffee}><CoffeeSticker /></PeelSticker>
        <Floater style={{ right: "6%", top: "6%" }} delay={1} amp={5}><DigitalClock /></Floater>
      </div>
    </Box>
  );
}

