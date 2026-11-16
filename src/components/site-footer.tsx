"use client";

import Link from "next/link";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";
import Wave from "@/components/ui/wave";

const Foot = styled.footer`
  margin-top: 150px; padding-bottom: 36px;
  .in { max-width: var(--wrap); margin: 0 auto; padding: 36px var(--gutter) 0; }
  .grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px 56px; }
  @media (max-width: 800px) { .grid { grid-template-columns: 1fr 1fr; } .talk { grid-column: 1 / -1; } }
  @media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
  h4 { font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
  .talk strong { display: block; font-size: clamp(1.8rem, 3.6vw, 2.8rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.05; }
  .talk p { margin-top: 12px; max-width: 24rem; color: var(--muted); line-height: 1.55; }
  .mail { display: inline-block; margin-top: 18px; padding: 10px 18px; border: 1px solid var(--line); border-radius: 6px; font-family: var(--font-mono); font-size: 0.86rem; box-shadow: 3px 3px 0 var(--accent-2); transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .mail:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 var(--accent-2); color: var(--accent); }
  ul { list-style: none; display: grid; gap: 10px; }
  li a { color: var(--ink); transition: color 0.2s ease, padding 0.25s ease; }
  li a:hover { color: var(--accent); padding-left: 6px; }
  .base { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 24px; margin-top: 48px; padding-top: 22px; border-top: 1px solid var(--line); font-size: 0.86rem; color: var(--muted); }
  .base button { background: none; border: 0; padding: 0; cursor: pointer; color: var(--muted); font-size: inherit; transition: color 0.2s ease; }
  .base button:hover { color: var(--accent); }
  .tip { margin-top: 14px; font-family: var(--font-hand); font-size: 1.25rem; color: var(--accent); }
`;

export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLang();
  if (pathname.startsWith("/adminaccess")) return null;
  const f = t.footer;
  return (
    <Foot>
      <Wave id="f" />
      <div className="in">
        <div className="grid">
          <div className="talk">
            <strong>{f.talk}</strong>
            <p>{f.talkText}</p>
            <a className="mail" href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <nav aria-label={f.explore}>
            <h4>{"// "}{f.explore}</h4>
            <ul>
              <li><Link href="/projects">{t.nav.work}</Link></li>
              <li><Link href="/trajetoria">{t.nav.journey}</Link></li>
              <li><Link href="/blog">{t.nav.writing}</Link></li>
              <li><Link href="/home#contato">{t.nav.contact}</Link></li>
            </ul>
          </nav>
          <div>
            <h4>{"// "}{f.social}</h4>
            <ul>
              <li><a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href={contact.devto} target="_blank" rel="noopener noreferrer">dev.to</a></li>
            </ul>
          </div>
        </div>
        <p className="tip">{f.sound}</p>
        <div className="base">
          <span>© {new Date().getFullYear()} Edson Junior · {f.coffee} ☕ · {f.made}</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{f.top} ↑</button>
        </div>
      </div>
    </Foot>
  );
}
