"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import ThemeToggle from "@/components/ui/theme-toggle";

const links = [
  { href: "/home", label: "Home" },
  { href: "/projects", label: "Projetos" },
  { href: "/about", label: "Sobre" },
  { href: "/blog", label: "Blog" },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 72%, transparent);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  height: 68px;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  @media (max-width: 760px) { grid-template-columns: 1fr auto; height: 60px; padding: 0 16px; }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  font-weight: 650;
  font-size: 1.02rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
  .mark { font-family: var(--font-mono); font-size: 0.84rem; font-weight: 700; color: var(--accent-ink); }
  .mark::before { content: "<"; color: var(--muted); }
  .mark::after { content: " />"; color: var(--muted); }
`;

const Center = styled.nav`
  display: flex;
  gap: 4px;
  @media (max-width: 760px) {
    grid-column: 1 / -1;
    grid-row: 2;
    margin: 0 -16px;
    padding: 0 16px 10px;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: 0.9rem;
  padding: 7px 14px;
  border-radius: 999px;
  color: ${(p) => (p.$active ? "var(--ink)" : "var(--muted)")};
  background: ${(p) => (p.$active ? "color-mix(in srgb, var(--accent) 16%, transparent)" : "transparent")};
  transition: color 0.2s ease, background 0.2s ease;
  white-space: nowrap;
  &:hover { color: var(--ink); background: color-mix(in srgb, var(--accent) 12%, transparent); }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 0 18px;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--on-accent);
  background: var(--brand-gradient);
  box-shadow: 0 6px 24px var(--glow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 10px 32px var(--glow); }
`;

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Bar>
      <Inner>
        <Brand href="/home" aria-label="Edson Junior, página inicial">
          <span className="mark">ej</span>
          <span>Edson Junior</span>
        </Brand>
        <Center aria-label="Principal">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} $active={pathname === l.href || (l.href !== "/home" && pathname.startsWith(l.href))}>
              {l.label}
            </NavLink>
          ))}
        </Center>
        <Right>
          <ThemeToggle />
          <Cta href="/home#contato">Contato</Cta>
        </Right>
      </Inner>
    </Bar>
  );
}
