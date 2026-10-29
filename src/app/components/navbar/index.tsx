"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import ThemeToggle from "@/components/ui/theme-toggle";

const links = [
  { href: "/home", label: "home" },
  { href: "/projects", label: "projetos" },
  { href: "/about", label: "sobre" },
  { href: "/blog", label: "blog" },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 78%, transparent);
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  @media (max-width: 640px) { padding: 0 16px; height: 58px; }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  font-weight: 650;
  font-size: 1rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
  .mark { font-family: var(--font-mono); font-size: 0.86rem; font-weight: 700; color: var(--accent-ink); }
  .mark::before { content: "<"; color: var(--muted); }
  .mark::after { content: " />"; color: var(--muted); }
  @media (max-width: 440px) { .name { display: none; } }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 8px 10px;
  border-radius: 8px;
  color: ${(p) => (p.$active ? "var(--accent-ink)" : "var(--muted)")};
  transition: color 0.2s ease, background 0.2s ease;
  &::before { content: "/"; opacity: 0.5; margin-right: 1px; }
  &:hover { color: var(--ink); background: var(--paper-2); }
  @media (max-width: 640px) { padding: 8px 6px; font-size: 0.72rem; }
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 36px;
  margin-left: 8px;
  padding: 0 16px;
  border-radius: 10px;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--on-accent);
  background: var(--accent);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--glow); }
  @media (max-width: 640px) { display: none; }
`;

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Bar>
      <Inner>
        <Brand href="/home" aria-label="Edson Junior, página inicial">
          <span className="mark">ej</span>
          <span className="name">Edson Junior</span>
        </Brand>
        <Nav aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              $active={pathname === l.href || (l.href !== "/home" && pathname.startsWith(l.href))}
            >
              {l.label}
            </NavLink>
          ))}
          <ThemeToggle />
          <Cta href="/home#contato">Contato</Cta>
        </Nav>
      </Inner>
    </Bar>
  );
}
