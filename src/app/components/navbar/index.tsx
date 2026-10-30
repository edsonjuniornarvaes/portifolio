"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import ThemeToggle from "@/components/ui/theme-toggle";

const links = [
  { href: "/home", label: "home" },
  { href: "/home#expertise", label: "expertise" },
  { href: "/home#projetos", label: "projetos" },
  { href: "/home#experiencia", label: "experiência" },
  { href: "/blog", label: "blog" },
  { href: "/home#contato", label: "contato" },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 80%, transparent);
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  min-height: 68px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  @media (max-width: 860px) { flex-wrap: wrap; padding: 10px 16px 0; min-height: 0; }
`;

const Brand = styled(Link)`
  font-family: var(--font-mono);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--accent-ink);
  white-space: nowrap;
  em { font-style: normal; color: var(--accent-2); animation: caret 1.1s steps(2) infinite; }
  @keyframes caret { 50% { opacity: 0; } }
  @media (prefers-reduced-motion: reduce) { em { animation: none; } }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 860px) {
    order: 3; width: 100%; margin: 0 -16px; padding: 4px 16px 10px; overflow-x: auto; scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  position: relative;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  padding: 10px 10px 8px;
  white-space: nowrap;
  color: ${(p) => (p.$active ? "var(--ink)" : "var(--muted)")};
  transition: color 0.2s ease;
  small { position: absolute; top: 2px; right: 2px; font-size: 0.55rem; color: var(--accent-ink); opacity: 0.9; }
  &::before { content: "// "; color: var(--accent-2); opacity: ${(p) => (p.$active ? 1 : 0.55)}; }
  &:hover { color: var(--accent-ink); }
`;

const Right = styled.div`
  display: flex; align-items: center; gap: 10px;
  @media (max-width: 860px) { order: 2; }
`;

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Bar>
      <Inner>
        <Brand href="/home" aria-label="Edson Junior, página inicial">
          EdsonJunior.<em>_</em>
        </Brand>
        <Nav aria-label="Principal">
          {links.map((l, i) => (
            <NavLink
              key={l.href}
              href={l.href}
              $active={l.href === "/home" ? pathname === "/home" : l.href === "/blog" ? pathname.startsWith("/blog") : false}
            >
              <small>{String(i + 1).padStart(2, "0")}</small>
              {l.label}
            </NavLink>
          ))}
        </Nav>
        <Right>
          <ThemeToggle />
        </Right>
      </Inner>
    </Bar>
  );
}
