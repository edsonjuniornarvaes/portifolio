"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import ThemeToggle from "@/components/ui/theme-toggle";

const links = [
  { href: "/projects", label: "Trabalho" },
  { href: "/about", label: "Sobre" },
  { href: "/blog", label: "Escrita" },
  { href: "/home#contato", label: "Contato" },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  @media (max-width: 560px) { padding: 14px 16px; }
`;

const Name = styled(Link)`
  font-family: var(--font-serif);
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: -0.01em;
  white-space: nowrap;
  em { color: var(--accent); }
  @media (max-width: 560px) { font-size: 1.25rem; }
`;

const Nav = styled.nav`
  display: flex;
  align-items: baseline;
  gap: 26px;
  font-size: 0.92rem;
  @media (max-width: 560px) { gap: 10px; font-size: 0.8rem; }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: ${(p) => (p.$active ? "var(--ink)" : "var(--muted)")};
  background: linear-gradient(currentColor, currentColor) 0 100% / ${(p) => (p.$active ? "100%" : "0")} 1px no-repeat;
  padding-bottom: 2px;
  transition: color 0.2s ease, background-size 0.3s ease;
  &:hover { color: var(--ink); background-size: 100% 1px; }
`;

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Bar>
      <Inner>
        <Name href="/home" aria-label="Edson Junior, página inicial">
          Edson Junior<em>.</em>
        </Name>
        <Nav aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              $active={l.href !== "/home#contato" && pathname.startsWith(l.href)}
            >
              {l.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </Nav>
      </Inner>
    </Bar>
  );
}
