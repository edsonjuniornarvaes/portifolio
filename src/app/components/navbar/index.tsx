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

const Wrap = styled.header`
  position: sticky;
  top: 14px;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 0 12px;
  pointer-events: none;
`;

const Pill = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 6px 6px 8px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--paper) 72%, transparent);
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  max-width: 100%;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 10px;
  margin-right: 4px;
  border-right: 1px solid var(--line);
  font-weight: 600;
  font-size: 0.88rem;
  letter-spacing: -0.015em;
  white-space: nowrap;
  .mark {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--accent-ink);
  }
  .mark::before { content: '<'; color: var(--muted); }
  .mark::after { content: ' />'; color: var(--muted); }
  @media (max-width: 520px) { .last { display: none; } }
  @media (max-width: 440px) { .name { display: none; } padding-right: 8px; }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: 0.84rem;
  color: ${(p) => (p.$active ? "var(--on-accent)" : "var(--muted)")};
  background: ${(p) => (p.$active ? "var(--accent)" : "transparent")};
  padding: 7px 12px;
  border-radius: 999px;
  font-weight: ${(p) => (p.$active ? 600 : 400)};
  transition: color 0.2s ease, background 0.2s ease;
  &:hover { color: ${(p) => (p.$active ? "var(--on-accent)" : "var(--ink)")}; background: ${(p) => (p.$active ? "var(--accent)" : "var(--paper-2)")}; }
  @media (max-width: 520px) { padding: 7px 9px; font-size: 0.8rem; }
`;

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Wrap>
      <Pill as="nav" aria-label="Principal">
        <Brand href="/home" aria-label="Edson Junior, página inicial">
          <span className="mark">ej</span>
          <span className="name">
            Edson<span className="last"> Junior</span>
          </span>
        </Brand>
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
      </Pill>
    </Wrap>
  );
}
