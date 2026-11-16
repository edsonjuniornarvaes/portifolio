"use client";

import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";
import Memoji from "@/components/ui/memoji";

const Foot = styled.footer`
  position: relative; margin-top: 140px; color: var(--ink);
  .land { position: relative; height: 150px; }
  .land svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 1; pointer-events: none; }
  .peek { position: absolute; left: max(var(--gutter), calc((100vw - var(--wrap)) / 2 + var(--gutter) + 8px)); top: -64px; width: 140px; pointer-events: auto; z-index: 0; }
  .body { position: relative; background: linear-gradient(180deg, var(--land-2) 0%, var(--land-3) 100%); padding-bottom: 28px; }
  .in { max-width: var(--wrap); margin: 0 auto; padding: 0 var(--gutter); }
  .grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px 56px; padding-top: 8px; }
  @media (max-width: 860px) { .grid { grid-template-columns: 1fr 1fr; } .talk { grid-column: 1 / -1; } }
  @media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
  .brand { font-size: clamp(1.8rem, 3.6vw, 2.6rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.05; }
  .talk p { margin-top: 10px; max-width: 26rem; color: color-mix(in srgb, var(--ink) 72%, transparent); line-height: 1.55; }
  form { display: flex; margin-top: 22px; max-width: 26rem; border: 1px solid color-mix(in srgb, var(--ink) 22%, transparent); border-radius: 8px; background: color-mix(in srgb, var(--paper) 70%, transparent); overflow: hidden; }
  form input { flex: 1; min-width: 0; padding: 14px 16px; border: 0; background: transparent; color: var(--ink); font: inherit; }
  form input:focus { outline: none; }
  form button { width: 54px; border: 0; cursor: pointer; background: var(--accent); color: var(--on-accent); font-size: 1.2rem; font-weight: 700; transition: filter 0.2s ease; }
  form button:hover { filter: brightness(1.12); }
  h4 { font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
  ul { list-style: none; display: grid; gap: 10px; }
  li a { transition: color 0.2s ease, padding 0.25s ease; }
  li a:hover { color: var(--accent); padding-left: 6px; }
  .icons { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 44px; }
  .icons a { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid var(--line); border-radius: 99px; color: var(--muted); transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
  .icons a:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
  .tip { margin-top: 22px; font-family: var(--font-hand); font-size: 1.3rem; color: var(--accent); }
  .base { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 24px; margin-top: 26px; padding-top: 18px; border-top: 1px solid var(--line); font-size: 0.86rem; color: var(--muted); }
  .meta { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; display: flex; flex-wrap: wrap; gap: 4px 22px; }
  .base button.top { background: none; border: 0; padding: 0; cursor: pointer; color: var(--muted); font-size: inherit; transition: color 0.2s ease; }
  .base button.top:hover { color: var(--accent); }
  --land-1: #0b1d1a; --land-2: #0e2e2b; --land-3: #123f3b;
  :root[data-theme="light"] & { --land-1: #cfe9de; --land-2: #bfe3d3; --land-3: #a9d9c6; }
`;

export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLang();
  const [email, setEmail] = useState("");
  if (pathname.startsWith("/adminaccess")) return null;
  const f = t.footer;
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${f.bodyPre} ${email}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
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
          <div className="grid">
            <div className="talk">
              <h4>{"// "}{f.mailLabel}</h4>
              <ul><li><a href={`mailto:${contact.email}`}>{contact.email}</a></li></ul>
            </div>
            <nav aria-label={f.explore}>
              <h4>{"// "}{f.explore}</h4>
              <ul>
                <li><Link href="/projects">{t.nav.work}</Link></li>
                <li><Link href="/trajetoria">{t.nav.journey}</Link></li>
                <li><Link href="/blog">{t.nav.writing}</Link></li>
                <li><Link href="/lab">{f.lab}</Link></li>
                <li><Link href="/home#contato">{t.nav.contact}</Link></li>
              </ul>
            </nav>
            <div>
              <h4>{"// "}{f.social}</h4>
              <ul>
                <li><a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href={contact.twitter} target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
              <li><a href={contact.devto} target="_blank" rel="noopener noreferrer">dev.to</a></li>
              </ul>
            </div>
          </div>
          <div className="base">
          <span>© {new Date().getFullYear()} Edson Junior</span>
            <button className="top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{f.top} ↑</button>
          </div>
        </div>
      </div>
    </Foot>
  );
}
