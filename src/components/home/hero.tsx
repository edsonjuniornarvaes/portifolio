"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Wrap } from "@/components/ui/layout";
import Letters from "@/components/ui/letters";
import StringGrid from "@/components/ui/string-grid";
import Sticker, { BubbleSticker, CodeSticker, CoffeeSticker, GemSticker, IPhoneSticker, KeySticker, MacBookSticker, PhotoSticker, PixSticker, SparkSticker, WifiSticker } from "@/components/ui/sticker";
import { play } from "@/lib/sound";
import { useLang } from "@/i18n/provider";

const Box = styled.section`
  position: relative; display: flex; flex-direction: column; justify-content: center; min-height: calc(100svh - var(--header)); padding: 56px 0 64px;
  .content { position: relative; z-index: 2; max-width: 680px; }
  .kicker { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  .kicker i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: ping 2.2s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }
  h1 { margin-top: 22px; font-size: clamp(3.6rem, 11.5vw, 9.4rem); font-weight: 700; line-height: 0.88; letter-spacing: -0.065em; }
  h1 span { display: block; }
  .lead { max-width: 33rem; margin-top: 34px; font-size: clamp(1.1rem, 1.7vw, 1.3rem); line-height: 1.6; }
  .lead .w { margin-top: 12px; color: var(--muted); }
  .lead a.u { color: var(--ink); text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 2px; text-underline-offset: 4px; transition: color 0.2s ease; }
  .lead a.u:hover { color: var(--accent); }
  .menu { display: flex; flex-wrap: wrap; gap: 8px 28px; margin-top: 38px; font-family: var(--font-mono); font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase; }
  .menu a { position: relative; padding: 4px 0; color: var(--ink); }
  .menu a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--accent); transform: scaleX(0); transform-origin: 0 50%; transition: transform 0.3s cubic-bezier(.2,.7,.2,1); }
  .menu a:hover::after, .menu a:focus-visible::after { transform: scaleX(1); }
  .menu a.main { color: var(--accent); }
  .meta { display: grid; grid-template-columns: repeat(2, minmax(0, auto)); gap: 10px 56px; justify-content: start; margin-top: 56px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .meta b { color: var(--ink); font-weight: 500; }
  .hint { margin-top: 26px; max-width: 30rem; font-family: var(--font-hand); font-size: 1.45rem; line-height: 1.15; color: var(--accent); transform: rotate(-1.5deg); }

  .board { position: absolute; inset: 0; z-index: 3; pointer-events: none; }
  @media (max-width: 760px) {
    .board { position: relative; inset: auto; height: 400px; margin-top: 30px; }
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
  const hover = () => play("hover", Math.floor(Math.random() * 5));

  return (
    <Box>
      <StringGrid />
      <Wrap style={{ width: "100%", position: "relative" }}>
        <div className="content">
          <div className="kicker"><i /> {h.kicker} · {h.based}</div>
          <h1 data-perch>
            <span><Letters text="Edson" delay={0.1} /></span>
            <span><Letters text="Junior" delay={0.35} /></span>
          </h1>
          <p className="lead">
            {h.lead}
            <span className="w" style={{ display: "block" }}>
              {h.worked} <Link className="u" href="/projects/pjbank">PJBank</Link>, <Link className="u" href="/projects/gruvi">Gruvi</Link> {h.and} <Link className="u" href="/projects/clube-da-joia-marketplace">Clube da Joia</Link>.
            </span>
          </p>
          <nav className="menu" aria-label={h.index}>
            <Link className="main" href="/projects" onPointerEnter={hover}>{t.nav.work}</Link>
            <Link href="/trajetoria" onPointerEnter={hover}>{t.nav.journey}</Link>
            <Link href="/blog" onPointerEnter={hover}>{t.nav.writing}</Link>
            <Link href="/home#contato" onPointerEnter={hover}>{h.ctaTalk}</Link>
          </nav>
          <div className="meta">
            <span><b>●</b> {h.status}</span>
            <span>{h.now} · <b>{clock || "--:--"}</b></span>
            <span>☕ {t.footer.coffee}</span>
          </div>
          <p className="hint">{h.hint}</p>
        </div>
      </Wrap>

      <div className="board" ref={board}>
        <Sticker at={["58%", "7%"]} mobile={["4%", "3%"]} rot={-7} label={h.stickers.photo} constraints={board}><PhotoSticker src="/images/edson.webp" /></Sticker>
        <Sticker at={["45%", "24%"]} mobile={["32%", "30%"]} rot={-6} label={h.stickers.hello} constraints={board}><BubbleSticker text={h.hello} /></Sticker>
        <Sticker at={["73%", "6%"]} mobile={["56%", "4%"]} rot={9} label={h.stickers.phone} constraints={board}><IPhoneSticker src="/images/projects/clube-app-home.webp" id="ipa" /></Sticker>
        <Sticker at={["86%", "26%"]} mobile={["76%", "40%"]} rot={-10} label={h.stickers.phone} constraints={board}><IPhoneSticker tone="b" id="ipb" /></Sticker>
        <Sticker at={["50%", "50%"]} mobile={["2%", "44%"]} rot={-5} label={h.stickers.laptop} constraints={board}><MacBookSticker /></Sticker>
        <Sticker at={["72%", "62%"]} mobile={["52%", "62%"]} rot={8} label={h.stickers.coffee} constraints={board}><CoffeeSticker /></Sticker>
        <Sticker at={["90%", "4%"]} mobile={["40%", "2%"]} rot={14} label={h.stickers.star} constraints={board}><SparkSticker /></Sticker>
        <Sticker at={["60%", "78%"]} mobile={["30%", "78%"]} rot={6} label={h.stickers.gem} constraints={board}><GemSticker /></Sticker>
        <Sticker at={["87%", "60%"]} mobile={["74%", "76%"]} rot={-12} label={h.stickers.pix} constraints={board}><PixSticker /></Sticker>
        <Sticker at={["52%", "84%"]} mobile={null} rot={-9} label={h.stickers.key} constraints={board}><KeySticker /></Sticker>
        <Sticker at={["80%", "80%"]} mobile={null} rot={7} label={h.stickers.code} constraints={board}><CodeSticker /></Sticker>
        <Sticker at={["64%", "40%"]} mobile={null} rot={-4} label={h.stickers.wifi} constraints={board}><WifiSticker /></Sticker>
      </div>
    </Box>
  );
}

