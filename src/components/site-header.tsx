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
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  backdrop-filter: saturate(160%) blur(12px); -webkit-backdrop-filter: saturate(160%) blur(12px);
  border-bottom: 1px solid var(--line);
  .in { max-width: var(--wrap); margin: 0 auto; padding: 0 var(--gutter); min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; }
  .brand img { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; object-position: center 20%; }
  nav { display: flex; align-items: center; gap: 28px; }
  nav a { font-size: 0.92rem; color: var(--muted); transition: color 0.2s ease; position: relative; padding: 6px 0; }
  nav a:hover, nav a[aria-current="page"] { color: var(--ink); }
  nav a[aria-current="page"]::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--accent); border-radius: 2px; }
  .tools { display: flex; align-items: center; gap: 10px; }
  @media (max-width: 760px) {
    .in { flex-wrap: wrap; padding-top: 10px; padding-bottom: 0; min-height: 0; row-gap: 0; }
    nav { order: 3; width: 100%; justify-content: space-between; gap: 8px; padding: 10px 0 8px; }
    nav a { font-size: 0.88rem; }
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
          Edson Junior
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
