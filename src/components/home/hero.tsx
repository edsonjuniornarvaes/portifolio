"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Wrap } from "@/components/ui/layout";
import Letters from "@/components/ui/letters";
import Sticker, { CoffeeSticker, MacBookSticker } from "@/components/ui/sticker";
import Mascot from "@/components/ui/mascot";
import { useLang } from "@/i18n/provider";

const Box = styled.section`
  position: relative; display: flex; flex-direction: column; justify-content: center; min-height: calc(100svh - var(--header)); padding: 56px 0 64px;
  .content { position: relative; z-index: 2; max-width: 680px; }
  .kicker { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  .kicker i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: ping 2.2s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }
  h1 { margin-top: 22px; font-size: clamp(3.6rem, 11.5vw, 9.4rem); font-weight: 700; line-height: 0.88; letter-spacing: -0.065em; }
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
  .hint { margin-top: 26px; max-width: 30rem; font-family: var(--font-hand); font-size: 1.45rem; line-height: 1.15; color: var(--accent); transform: rotate(-1.5deg); }

  .board { position: absolute; top: 50%; height: min(600px, 84%); transform: translateY(-50%); right: max(var(--gutter), calc((100vw - var(--wrap)) / 2 + var(--gutter))); width: min(46vw, 560px); z-index: 3; pointer-events: none; }
  .board::before { content: ""; position: absolute; left: 50%; bottom: 8%; width: 86%; aspect-ratio: 1; transform: translateX(-50%); border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 17%, transparent), transparent 66%); }
  .mascot { position: absolute; left: 14%; right: 6%; bottom: 0; height: 66%; pointer-events: auto; }
  @media (max-width: 760px) {
    .board { position: relative; top: auto; right: auto; transform: none; width: 100%; height: 420px; margin-top: 30px; }
    .meta { grid-template-columns: 1fr; gap: 8px; margin-top: 40px; }
    .hint { font-size: 1.3rem; }
  }
  @media (prefers-reduced-motion: reduce) { .kicker i { animation: none; } }
`;

function useClock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const f = () => setNow(new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(new Date()));
    f();
    const id = setInterval(f, 20_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const board = useRef<HTMLDivElement>(null);
  const clock = useClock();

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
            <span>{h.now} · <b>{clock || "--:--"}</b></span>
          </div>
          <p className="hint">{h.hint}</p>
        </div>
      </Wrap>

      <div className="board" ref={board}>
        <div className="mascot"><Mascot hello={h.hello} label={h.mascot} /></div>
        <Sticker at={["0%", "2%"]} mobile={["0%", "2%"]} rot={-7} label={h.stickers.laptop} constraints={board}><MacBookSticker /></Sticker>
        <Sticker at={["2%", "62%"]} mobile={["4%", "60%"]} rot={8} label={h.stickers.coffee} constraints={board}><CoffeeSticker /></Sticker>
      </div>
    </Box>
  );
}

