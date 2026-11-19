"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";
import { PixelAvatar } from "@/components/ui/avatar";

const Foot = styled.footer`
  position: relative; margin-top: 90px; color: var(--ink);
  .body { position: relative; z-index: 1; border-top: 1px solid var(--line); background: linear-gradient(180deg, color-mix(in srgb, var(--paper) 92%, var(--accent)) 0%, var(--paper) 100%); }
  .in { max-width: var(--wrap); margin: 0 auto; padding: 48px var(--gutter) 26px; }

  .cta { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 22px 40px; padding-bottom: 40px; border-bottom: 1px solid var(--line); }
  .cta h2 { max-width: 30rem; font-size: clamp(1.7rem, 3.6vw, 2.7rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.08; }
  .cta h2 span { color: var(--accent-ink); }
  .cta .btns { display: flex; flex-wrap: wrap; gap: 10px; }
  .btn { display: inline-flex; align-items: center; gap: 10px; height: 50px; padding: 0 24px; border-radius: 99px; font-weight: 600; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
  .btn.p { background: var(--accent); color: var(--on-accent); }
  .btn.p:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -12px var(--accent); }
  .btn.g { border: 1px solid var(--line); }
  .btn.g:hover { border-color: var(--accent); color: var(--accent-ink); }

  .cols { display: grid; grid-template-columns: minmax(0, 1.5fr) repeat(2, minmax(0, 0.7fr)); gap: 36px 48px; padding: 38px 0 34px; }
  .who { display: flex; gap: 14px; align-items: flex-start; }
  .who b { display: block; font-size: 1.05rem; letter-spacing: -0.02em; }
  .who p { margin-top: 4px; max-width: 22rem; color: var(--muted); font-size: 0.92rem; line-height: 1.55; }
  h4 { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-ink); margin-bottom: 14px; }
  ul { list-style: none; display: grid; gap: 9px; }
  li a { transition: color 0.2s ease, padding 0.25s ease; }
  li a:hover { color: var(--accent-ink); padding-left: 6px; }

  .base { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px 24px; padding-top: 18px; border-top: 1px solid var(--line); font-size: 0.84rem; color: var(--muted); }
  .base .now { display: inline-flex; align-items: center; gap: 9px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.06em; font-variant-numeric: tabular-nums; }
  .base .now i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: fping 2s ease-out infinite; }
  @keyframes fping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 8px transparent; } }
  .base button.top { display: inline-flex; align-items: center; gap: 8px; background: none; border: 0; padding: 0; cursor: pointer; color: var(--muted); font-size: inherit; transition: color 0.2s ease; }
  .base button.top:hover { color: var(--accent-ink); }
  .lofi { margin-top: 26px; }
  @media (max-width: 860px) { .cols { grid-template-columns: 1fr 1fr; } .cols > :first-child { grid-column: 1 / -1; } }
  @media (max-width: 520px) { .cols { grid-template-columns: 1fr; } }
  @media (prefers-reduced-motion: reduce) { .base .now i { animation: none; } }
`;

export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLang();
  if (pathname.startsWith("/adminaccess")) return null;
  const f = t.footer;
  const onHome = pathname === "/" || pathname === "/home"; // na home o convite para conversar já está logo acima
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <Foot>
      <div className="body">
        <div className="in">
          {!onHome && <div className="cta">
            <h2>{t.contact.h2a} <span>{t.contact.h2b}</span></h2>
            <div className="btns">
              <a className="btn p" href={`mailto:${contact.email}`}>{t.contact.mailBtn} <ArrowRight /></a>
              <Link className="btn g" href="/home#contato">{t.contact.write}</Link>
            </div>
          </div>}

          <div className="cols">
            <div className="who">
              <PixelAvatar size={46} decorative />
              <div><b>Edson Junior</b><p>{f.talkText}</p></div>
            </div>
            <nav aria-label={f.explore}>
              <h4>{f.explore}</h4>
              <ul>
                <li><Link href="/projects">{t.nav.work}</Link></li>
                <li><Link href="/trajetoria">{t.nav.journey}</Link></li>
                <li><Link href="/blog">{t.nav.writing}</Link></li>
                <li><Link href="/lab">{f.lab}</Link></li>
              </ul>
            </nav>
            <div>
              <h4>{f.social}</h4>
              <ul>
                <li><a href={contact.linkedin} {...ext}>LinkedIn</a></li>
                <li><a href={contact.github} {...ext}>GitHub</a></li>
                <li><a href={contact.instagram} {...ext}>Instagram</a></li>
                <li><a href={contact.twitter} {...ext}>X</a></li>
              </ul>
            </div>
          </div>

          <div className="base">
            <span>© {new Date().getFullYear()} Edson Junior · {f.made}</span>
          </div>
        </div>
      </div>
    </Foot>
  );
}
