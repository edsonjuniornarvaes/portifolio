"use client";

import Link from "next/link";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import BrandMark from "@/components/ui/brand-mark";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const FEATURED = [
  { id: "pjbank", name: "Conta Superlógica" },
  { id: "gruvi", name: "Gruvi" },
  { id: "clube-da-joia-marketplace", name: "Clube da Joia" },
  { id: "multjet", name: "MultJet" },
  { id: "mont-capital", name: "Mont Capital" },
];

const Foot = styled.footer`
  position: relative; margin-top: 70px; overflow: hidden; color: var(--ink);
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--accent) 6%, var(--paper)) 38%, color-mix(in srgb, var(--accent) 10%, var(--paper)));
  /* fio de luz no topo e grade discreta ao fundo */
  &::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--accent) 30%, var(--accent-2) 70%, transparent); opacity: 0.7; }
  &::after { content: ""; position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px); background-size: 56px 56px; -webkit-mask-image: radial-gradient(70% 90% at 50% 100%, #000, transparent 75%); mask-image: radial-gradient(70% 90% at 50% 100%, #000, transparent 75%); }
  .in { position: relative; z-index: 1; max-width: var(--wrap); margin: 0 auto; padding: 72px var(--gutter) 28px; }

  .cta { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 22px 40px; padding-bottom: 46px; }
  .cta h2 { max-width: 30rem; font-size: clamp(1.8rem, 3.8vw, 2.9rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.06; }
  .cta h2 span { color: var(--accent-ink); }
  .btn { display: inline-flex; align-items: center; gap: 10px; height: 48px; padding: 0 24px; border-radius: 99px; font-weight: 600; background: var(--accent); color: var(--on-accent); transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s ease; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -12px var(--accent); }
  .btn:active { transform: scale(0.97); }

  .cols { display: grid; grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(0, 0.8fr)); gap: 40px 36px; padding: 44px 0 40px; border-top: 1px solid var(--line); }
  .cols[data-first] { border-top: 0; padding-top: 8px; }
  .brand { display: grid; gap: 16px; align-content: start; }
  .brand .id { display: flex; align-items: center; gap: 12px; }
  .brand .id b { display: block; font-size: 1.08rem; letter-spacing: -0.02em; line-height: 1.15; }
  .brand .id small { display: block; margin-top: 2px; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent-ink); }
  .brand p { max-width: 24rem; color: var(--muted); font-size: 0.93rem; line-height: 1.6; }
  .pill { display: inline-flex; align-items: center; gap: 9px; width: fit-content; padding: 7px 14px; border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--line)); border-radius: 99px; font-size: 0.82rem; background: color-mix(in srgb, var(--accent) 9%, transparent); }
  .pill i { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); animation: fping 2s ease-out infinite; }
  @keyframes fping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); } 80%, 100% { box-shadow: 0 0 0 8px transparent; } }
  h4 { font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
  ul { list-style: none; display: grid; gap: 11px; }
  li a { display: inline-flex; align-items: center; gap: 6px; color: var(--ink); font-size: 0.95rem; transition: color 0.2s ease, transform 0.25s ease; }
  li a:hover { color: var(--accent-ink); transform: translateX(4px); }
  li a svg.out { width: 12px; height: 12px; opacity: 0.55; }

  .base { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 24px; padding-top: 20px; border-top: 1px solid var(--line); font-size: 0.84rem; color: var(--muted); }
  .social { display: flex; gap: 8px; }
  .social a { display: grid; place-items: center; width: 38px; height: 38px; border: 1px solid var(--line); border-radius: 50%; color: var(--ink); transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease; }
  .social a:hover { color: var(--accent-ink); border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); transform: translateY(-3px); }
  .social svg { width: 16px; height: 16px; }
  @media (max-width: 900px) { .cols { grid-template-columns: 1fr 1fr; } .brand { grid-column: 1 / -1; } }
  @media (max-width: 860px) { .in { padding-bottom: 92px; } }
  @media (max-width: 520px) { .in { padding-top: 56px; } .base { flex-direction: column; align-items: flex-start; } }
  @media (prefers-reduced-motion: reduce) { .pill i { animation: none; } }
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
      <div className="in">
        {!onHome && (
          <div className="cta">
            <h2>{t.contact.h2a} <span>{t.contact.h2b}</span></h2>
            <a className="btn" href={`mailto:${contact.email}`}>{t.contact.mailBtn} <ArrowRight /></a>
          </div>
        )}

        <div className="cols" data-first={onHome || undefined}>
          <div className="brand">
            <div className="id">
              <BrandMark size={42} />
              <div><b>EJ Sistemas</b><small>{t.nav.logoSub}</small></div>
            </div>
            <p>{f.talkText}</p>
            <span className="pill"><i /> {t.hero.status}</span>
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

          <nav aria-label={t.hero.worked}>
            <h4>{t.hero.worked}</h4>
            <ul>
              {FEATURED.map((p) => <li key={p.id}><Link href={`/projects/${p.id}`}>{p.name}</Link></li>)}
            </ul>
          </nav>

          <div>
            <h4>{f.contactTitle}</h4>
            <ul>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><Link href="/home#contato">{t.contact.write}</Link></li>
              <li><a href={contact.linkedin} {...ext}>LinkedIn <ArrowUpRight className="out" /></a></li>
              <li><a href={contact.github} {...ext}>GitHub <ArrowUpRight className="out" /></a></li>
            </ul>
          </div>
        </div>

        <div className="base">
          <span>© {new Date().getFullYear()} EJ Sistemas · Edson Junior · {f.made}</span>
          <div className="social" aria-label={f.social}>
            <a href={contact.linkedin} aria-label="LinkedIn" {...ext}><FaLinkedinIn aria-hidden /></a>
            <a href={contact.github} aria-label="GitHub" {...ext}><FaGithub aria-hidden /></a>
            <a href={contact.instagram} aria-label="Instagram" {...ext}><FaInstagram aria-hidden /></a>
            <a href={contact.twitter} aria-label="X" {...ext}><FaXTwitter aria-hidden /></a>
          </div>
        </div>
      </div>
    </Foot>
  );
}
