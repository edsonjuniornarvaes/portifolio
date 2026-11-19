"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import ThemeToggle from "@/components/ui/theme-toggle";
import LangSwitch from "@/components/ui/lang-switch";
import { PixelAvatar } from "@/components/ui/avatar";
import SoundToggle from "@/components/ui/sound-toggle";
import { useLang } from "@/i18n/provider";

const LINKS = [
  { href: "/projects", key: "work", match: "/projects" },
  { href: "/trajetoria", key: "journey", match: "/trajetoria" },
  { href: "/blog", key: "writing", match: "/blog" },
  { href: "/home#contato", key: "contact", match: "" },
] as const;

const Bar = styled.header`
  position: sticky; top: 0; z-index: 50; height: var(--header);
  background: color-mix(in srgb, var(--paper) 94%, transparent);
  border-bottom: 1px solid var(--line);
  .in { position: relative; max-width: var(--wrap); height: 100%; margin: 0 auto; padding: 0 var(--gutter); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .brand .logo { display: flex; flex-direction: column; gap: 1px; line-height: 1.1; }
  .brand .logo strong { font-weight: 700; font-size: 1.02rem; letter-spacing: -0.025em; }
  .brand .logo small { font-family: var(--font-mono); font-size: 0.6rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent-ink); }
  .brand { order: 1; display: inline-flex; align-items: center; gap: 10px; font-weight: 600; font-size: 1rem; letter-spacing: -0.01em; white-space: nowrap; }
  .panel { display: contents; }
  nav { order: 2; display: flex; align-items: center; gap: 4px; }
  nav a { font-size: 0.95rem; color: var(--muted); padding: 8px 14px; border-radius: 99px; transition: color 0.2s ease, background 0.2s ease; }
  nav a:hover { color: var(--ink); background: color-mix(in srgb, var(--ink) 7%, transparent); }
  nav a[aria-current="page"] { color: var(--ink); background: color-mix(in srgb, var(--accent) 16%, transparent); }
  .tools { order: 4; display: flex; align-items: center; gap: 10px; }
  .burger { order: 5; display: none; width: 38px; height: 38px; border: 1px solid var(--line); border-radius: 12px; background: none; cursor: pointer; color: var(--ink); place-items: center; }
  .burger span { position: relative; display: block; width: 16px; height: 2px; border-radius: 2px; background: currentColor; transition: background 0.2s ease; }
  .burger span::before, .burger span::after { content: ""; position: absolute; left: 0; width: 16px; height: 2px; border-radius: 2px; background: currentColor; transition: transform 0.25s ease, top 0.25s ease; }
  .burger span::before { top: -5px; } .burger span::after { top: 5px; }
  .burger[aria-expanded="true"] span { background: transparent; }
  .burger[aria-expanded="true"] span::before { top: 0; transform: rotate(45deg); }
  .burger[aria-expanded="true"] span::after { top: 0; transform: rotate(-45deg); }
  @media (max-width: 860px) {
    --header: 60px;
    .in { gap: 10px; }
    .burger { margin-left: auto; }
    .burger { display: grid; }
    .panel { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; gap: 6px; padding: 10px var(--gutter) 18px; background: var(--paper); border-bottom: 1px solid var(--line); box-shadow: 0 30px 50px -30px rgba(0,0,0,0.7); }
    .panel[data-open="true"] { display: flex; animation: drop 0.22s ease; }
    @keyframes drop { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
    nav { flex-direction: column; align-items: stretch; gap: 2px; }
    nav a { display: flex; align-items: center; justify-content: space-between; padding: 14px 12px; font-size: 1.15rem; font-weight: 500; color: var(--ink); border-radius: 12px; }
    nav a::after { content: "→"; color: var(--muted); font-family: var(--font-mono); }
    .tools { order: 3; justify-content: space-between; margin-top: 8px; padding-top: 16px; border-top: 1px solid var(--line); }
    .tools > * { transform: scale(1.12); transform-origin: left center; }
    .tools > :last-child { transform-origin: right center; }
  }
`;

export default function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Bar>
      <div className="in">
        <Link href="/home" className="brand" aria-label={t.nav.homeAria}>
          <PixelAvatar size={38} decorative />
          <span className="logo"><strong>Edson Junior</strong><small>{t.nav.logoSub}</small></span>
        </Link>
        <button type="button" className="burger" aria-expanded={open} aria-controls="menu" aria-label={open ? t.nav.close : t.nav.menu} onClick={() => setOpen((v) => !v)}><span /></button>
        <div id="menu" className="panel" data-open={open}>
          <nav aria-label={t.nav.aria}>
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} data-perch onClick={() => setOpen(false)} aria-current={l.match && pathname.startsWith(l.match) ? "page" : undefined}>
                {t.nav[l.key]}
              </Link>
            ))}
          </nav>
          <div className="tools">
            <SoundToggle />
            <LangSwitch />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Bar>
  );
}
