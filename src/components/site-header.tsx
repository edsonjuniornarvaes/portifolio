"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import ThemeToggle from "@/components/ui/theme-toggle";
import LangSwitch from "@/components/ui/lang-switch";
import { useLang } from "@/i18n/provider";

const LINKS = [
  { href: "/projects", key: "work", match: "/projects" },
  { href: "/trajetoria", key: "journey", match: "/trajetoria" },
  { href: "/blog", key: "writing", match: "/blog" },
  { href: "/home#contato", key: "contact", match: "" },
] as const;

const Bar = styled.header`
  position: sticky; top: 0; z-index: 50; height: var(--header);
  background: color-mix(in srgb, var(--paper) 78%, transparent); backdrop-filter: saturate(160%) blur(14px); -webkit-backdrop-filter: saturate(160%) blur(14px);
  border-bottom: 1px solid var(--line);
  .in { max-width: var(--wrap); height: 100%; margin: 0 auto; padding: 0 var(--gutter); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .brand { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-weight: 500; font-size: 0.98rem; white-space: nowrap; }
  .brand img { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; object-position: center 20%; box-shadow: 0 0 0 2px var(--accent); }
  .brand em { font-style: normal; color: var(--accent); }
  .brand .caret { display: inline-block; width: 0.5em; height: 1em; margin-left: 2px; vertical-align: -0.12em; background: var(--accent); animation: blink 1.05s steps(2) infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  nav { display: flex; align-items: center; gap: 4px; }
  nav a { font-family: var(--font-mono); font-size: 0.82rem; color: var(--muted); padding: 8px 12px; border-radius: 8px; transition: color 0.2s ease, background 0.2s ease; }
  nav a::before { content: "/"; color: var(--syn-c); margin-right: 1px; transition: color 0.2s ease; }
  nav a:hover { color: var(--ink); background: color-mix(in srgb, var(--ink) 6%, transparent); }
  nav a:hover::before { color: var(--accent); }
  nav a[aria-current="page"] { color: var(--accent); }
  nav a[aria-current="page"]::before { color: var(--accent); }
  .tools { display: flex; align-items: center; gap: 10px; }
  .k { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 10px; border: 1px solid var(--line); border-radius: 8px; background: transparent; color: var(--muted); cursor: pointer; font-family: var(--font-mono); font-size: 0.74rem; transition: border-color 0.2s ease, color 0.2s ease; }
  .k:hover { border-color: var(--accent); color: var(--ink); }
  .k kbd { border: 0; background: color-mix(in srgb, var(--ink) 9%, transparent); padding: 1px 6px; }
  @media (max-width: 860px) {
    height: auto;
    .in { flex-wrap: wrap; padding-top: 10px; padding-bottom: 0; row-gap: 0; }
    nav { order: 3; width: 100%; justify-content: space-between; padding: 6px 0 6px; }
    nav a { padding: 8px 4px; font-size: 0.8rem; }
    .k { display: none; }
  }
`;

export default function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLang();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Bar>
      <div className="in">
        <Link href="/home" className="brand" aria-label={t.nav.homeAria}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/edson.webp" alt="" />
          <span>edson<em>.dev</em><span className="caret" /></span>
        </Link>
        <nav aria-label={t.nav.aria}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={l.match && pathname.startsWith(l.match) ? "page" : undefined}>
              {t.nav[l.key]}
            </Link>
          ))}
        </nav>
        <div className="tools">
          <button type="button" className="k" onClick={() => window.dispatchEvent(new Event("open-palette"))} aria-label={t.nav.palette}>
            <kbd>⌘K</kbd>
          </button>
          <LangSwitch />
          <ThemeToggle />
        </div>
      </div>
    </Bar>
  );
}
