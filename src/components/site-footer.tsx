"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";
import Memoji from "@/components/ui/memoji";
import SpotifyDock from "@/components/ui/spotify-dock";

const Foot = styled.footer`
  position: relative; margin-top: 140px; color: var(--ink); overflow: hidden;
  .land { position: relative; height: 150px; }
  .land svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 1; pointer-events: none; }
  .peek { position: absolute; left: max(var(--gutter), calc((100vw - var(--wrap)) / 2 + var(--gutter) + 8px)); top: -64px; width: 140px; pointer-events: auto; z-index: 0; }
  .body { position: relative; background: linear-gradient(180deg, var(--land-2) 0%, var(--land-3) 100%); padding-bottom: 28px; }
  .in { max-width: var(--wrap); margin: 0 auto; padding: 26px var(--gutter) 0; }

  .top { display: grid; grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(0, 0.7fr)); gap: 40px 48px; }
  .eyebrow { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-ink); margin-bottom: 14px; }
  .about { max-width: 26rem; font-size: clamp(1.15rem, 2.2vw, 1.5rem); line-height: 1.35; letter-spacing: -0.02em; }
  .mail { position: relative; display: inline-block; font-size: clamp(1.4rem, 3.4vw, 2.5rem); font-weight: 600; letter-spacing: -0.035em; line-height: 1.1; word-break: break-word; }
  .mail::after { content: ""; position: absolute; left: 0; right: 0; bottom: -4px; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(.2,.7,.2,1); }
  .mail:hover::after, .mail:focus-visible::after { transform: scaleX(1); }
  .mail span { display: inline-block; transition: transform 0.25s ease; color: var(--accent-ink); }
  .mail:hover span { transform: translate(4px, -4px); }
  .copy { display: block; margin-top: 16px; padding: 0; border: 0; background: none; cursor: pointer; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: color-mix(in srgb, var(--ink) 65%, transparent); transition: color 0.2s ease; }
  .copy:hover { color: var(--accent-ink); }
  ul { list-style: none; display: grid; gap: 10px; }
  li a { display: inline-block; transition: color 0.2s ease, transform 0.25s ease; }
  li a:hover { color: var(--accent-ink); transform: translateX(6px); }
  .now { display: grid; gap: 8px; color: color-mix(in srgb, var(--ink) 78%, transparent); line-height: 1.5; }
  .pill { display: inline-flex; align-items: center; gap: 9px; width: fit-content; padding: 7px 14px; border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent); border-radius: 99px; font-size: 0.86rem; color: var(--ink); background: color-mix(in srgb, var(--accent) 10%, transparent); }
  .pill i { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); animation: fping 2s ease-out infinite; }
  @keyframes fping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }
  .clock { font-family: var(--font-mono); font-size: 0.82rem; font-variant-numeric: tabular-nums; }

  .mark { position: relative; display: block; margin: 56px 0 8px; font-size: clamp(2.6rem, 12.4vw, 10.5rem); font-weight: 700; letter-spacing: -0.06em; line-height: 0.92; white-space: nowrap; user-select: none; color: transparent; -webkit-text-stroke: 1.5px color-mix(in srgb, var(--ink) 34%, transparent); cursor: default; }
  .mark::after { content: attr(data-t); position: absolute; inset: 0; color: transparent; -webkit-text-stroke: 0; background: radial-gradient(circle 190px at var(--mx, -20%) var(--my, 50%), var(--accent), color-mix(in srgb, var(--accent-2) 55%, transparent) 55%, transparent 78%); -webkit-background-clip: text; background-clip: text; pointer-events: none; }
  .mark b { font-family: var(--font-mono); font-weight: 500; letter-spacing: -0.08em; }

  .row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 18px 24px; margin-top: 10px; }
  .base { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 24px; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--line); font-size: 0.86rem; color: var(--muted); }
  .base button.top { display: inline-flex; align-items: center; gap: 8px; background: none; border: 0; padding: 0; cursor: pointer; color: var(--muted); font-size: inherit; transition: color 0.2s ease; }
  .base button.top:hover { color: var(--accent-ink); }
  .base button.top span { display: inline-block; transition: transform 0.25s ease; }
  .base button.top:hover span { transform: translateY(-4px); }
  --land-1: #0b1d1a; --land-2: #0e2e2b; --land-3: #123f3b;
  :root[data-theme="light"] & { --land-1: #cfe9de; --land-2: #bfe3d3; --land-3: #a9d9c6; }
  @media (max-width: 860px) { .top { grid-template-columns: 1fr 1fr; } .top > :first-child { grid-column: 1 / -1; } }
  @media (max-width: 520px) { .top { grid-template-columns: 1fr; } .peek { width: 110px; } }
  @media (prefers-reduced-motion: reduce) { .pill i { animation: none; } }
`;

function useBrasiliaClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Sao_Paulo" }).format(new Date()));
    f();
    const id = setInterval(f, 15_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLang();
  const time = useBrasiliaClock();
  const mark = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);
  if (pathname.startsWith("/adminaccess")) return null;
  const f = t.footer;
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const glow = (e: React.PointerEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(contact.email); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* ignore */ }
  };
  return (
    <Foot>
      <div className="land">
        <div className="peek"><Memoji label="Edson, avatar em estilo Memoji" /></div>
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path d="M0 150V70C120 20 240 10 380 48S640 100 800 60 1100 -6 1240 34 1380 80 1440 56V150Z" fill="var(--land-1)" />
          <path d="M0 150V104C160 70 300 70 440 96S760 132 960 96 1280 60 1440 100V150Z" fill="var(--land-2)" />
        </svg>
      </div>
      <div className="body">
        <div className="in">
          <div className="top">
            <div>
              <div className="eyebrow">{"// "}{f.talk}</div>
              <p className="about">{f.talkText}</p>
              <button type="button" className="copy" onClick={copy}>{contact.email} · {copied ? t.contact.copied : t.contact.copy}</button>
            </div>
            <nav aria-label={f.explore}>
              <div className="eyebrow">{f.explore}</div>
              <ul>
                <li><Link href="/projects">{t.nav.work}</Link></li>
                <li><Link href="/trajetoria">{t.nav.journey}</Link></li>
                <li><Link href="/blog">{t.nav.writing}</Link></li>
                <li><Link href="/lab">{f.lab}</Link></li>
              </ul>
            </nav>
            <div>
              <div className="eyebrow">{f.social}</div>
              <ul>
                <li><a href={contact.linkedin} {...ext}>LinkedIn</a></li>
                <li><a href={contact.github} {...ext}>GitHub</a></li>
                <li><a href={contact.instagram} {...ext}>Instagram</a></li>
                <li><a href={contact.twitter} {...ext}>X</a></li>
              </ul>
            </div>
          </div>

          <span ref={mark} className="mark" data-t="Edson JR </>" onPointerMove={glow} aria-hidden>Edson JR <b>{"</>"}</b></span>

          <div className="row">
            <SpotifyDock />
            <div className="now">
              <span className="pill"><i /> {t.hero.status}</span>
              <span className="clock">{t.hero.now}{time ? ` · ${time}` : ""}</span>
            </div>
          </div>

          <div className="base">
            <span>© {new Date().getFullYear()} Edson Junior · {f.made}</span>
            <button className="top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{f.top} <span aria-hidden>↑</span></button>
          </div>
        </div>
      </div>
    </Foot>
  );
}
