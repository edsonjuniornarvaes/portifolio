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
  .brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 600; font-size: 1rem; letter-spacing: -0.01em; white-space: nowrap; }
  .brand img { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; object-position: center 20%; box-shadow: 0 0 0 2px var(--accent); }
  nav { display: flex; align-items: center; gap: 4px; }
  nav a { font-size: 0.95rem; color: var(--muted); padding: 8px 14px; border-radius: 99px; transition: color 0.2s ease, background 0.2s ease; }
  nav a:hover { color: var(--ink); background: color-mix(in srgb, var(--ink) 7%, transparent); }
  nav a[aria-current="page"] { color: var(--ink); background: color-mix(in srgb, var(--accent) 16%, transparent); }
  .tools { display: flex; align-items: center; gap: 10px; }
  @media (max-width: 860px) {
    height: auto;
    .in { flex-wrap: wrap; padding-top: 10px; padding-bottom: 0; row-gap: 0; }
    nav { order: 3; width: 100%; justify-content: space-between; padding: 6px 0 6px; }
    nav a { padding: 8px 12px; font-size: 0.9rem; }
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
          <span>Edson Junior</span>
        </Link>
        <nav aria-label={t.nav.aria}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={l.match && pathname.startsWith(l.match) ? "page" : undefined}>
              {t.nav[l.key]}
            </Link>
          ))}
        </nav>
        <div className="tools">
          <LangSwitch />
          <ThemeToggle />
        </div>
      </div>
    </Bar>
  );
}
