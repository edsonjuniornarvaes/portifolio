"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import ThemeToggle from "@/components/ui/theme-toggle";

const links = [
  { href: "/projects", label: "Projetos" },
  { href: "/about", label: "Sobre" },
  { href: "/blog", label: "Blog" },
  { href: "/home#contato", label: "Contato" },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 85%, transparent);
  backdrop-filter: saturate(180%) blur(10px);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled.div`
  max-width: 880px;
  margin: 0 auto;
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  @media (max-width: 560px) { padding: 0 16px; }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: -0.015em;
  white-space: nowrap;
  @media (max-width: 480px) { .last { display: none; } }
  img { width: 26px; height: 26px; border-radius: 50%; object-fit: cover; object-position: top; border: 1px solid var(--line); }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  @media (max-width: 560px) { font-size: 0.8rem; }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: ${(p) => (p.$active ? "var(--ink)" : "var(--muted)")};
  background: ${(p) => (p.$active ? "var(--paper-2)" : "transparent")};
  padding: 6px 10px;
  border-radius: 6px;
  transition: color 0.15s ease, background 0.15s ease;
  &:hover { color: var(--ink); background: var(--paper-2); }
  @media (max-width: 560px) { padding: 6px 7px; }
`;

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Bar>
      <Inner>
        <Brand href="/home" aria-label="Edson Junior, página inicial">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/edson.webp" alt="" />
          <span>
            Edson<span className="last"> Junior</span>
          </span>
        </Brand>
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
