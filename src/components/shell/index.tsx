"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { FaEnvelope } from "react-icons/fa";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";
import ThemeToggle from "@/components/ui/theme-toggle";
import LocalTime from "@/components/ui/local-time";
import Spotlight from "@/components/ui/spotlight";
import { contact } from "@/data/profile";

const NAV = [
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

const Frame = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  gap: 64px;
  @media (max-width: 1023px) { display: block; padding: 0 20px; }
`;

const Side = styled.aside`
  width: 40%;
  max-width: 440px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 96px 0 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1023px) { position: static; width: 100%; max-width: none; height: auto; padding: 56px 0 8px; gap: 28px; }
  .rise { animation: rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
  .d1 { animation-delay: 0.05s; } .d2 { animation-delay: 0.15s; } .d3 { animation-delay: 0.25s; } .d4 { animation-delay: 0.35s; } .d5 { animation-delay: 0.45s; }
  @keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
`;

const Hello = styled.p`
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--accent-ink);
  margin-bottom: 10px;
`;

const Name = styled.h1`
  font-size: clamp(2.4rem, 5vw, 3.3rem);
  font-weight: 650;
  line-height: 1.02;
  letter-spacing: -0.04em;
  a { display: inline-block; }
`;

const Role = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin-top: 12px;
`;

const Blurb = styled.p`
  margin-top: 16px;
  max-width: 21rem;
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--muted);
`;

const Nav = styled.nav`
  margin-top: 56px;
  @media (max-width: 1023px) { display: none; }
  ul { list-style: none; display: grid; gap: 4px; }
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 6px 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(p) => (p.$active ? "var(--ink)" : "var(--muted)")};
  transition: color 0.2s ease;
  &::before {
    content: "";
    height: 1px;
    width: ${(p) => (p.$active ? "64px" : "28px")};
    background: ${(p) => (p.$active ? "var(--accent-ink)" : "var(--muted)")};
    transition: width 0.25s ease, background 0.25s ease;
  }
  &:hover { color: var(--ink); }
  &:hover::before { width: 64px; background: var(--ink); }
`;

const Foot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  a.icon { color: var(--muted); display: grid; place-items: center; transition: color 0.2s ease, transform 0.2s ease; }
  a.icon:hover { color: var(--accent-ink); transform: translateY(-2px); }
  .status { display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: var(--muted); }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: ping 2.2s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 var(--accent); } 80%, 100% { box-shadow: 0 0 0 8px transparent; } }
  @media (max-width: 1023px) { gap: 12px; }
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  padding: 96px 0 40px;
  position: relative;
  z-index: 1;
  @media (max-width: 1023px) { padding: 32px 0 24px; }
`;

const MobileBar = styled.nav`
  display: none;
  @media (max-width: 1023px) {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 40;
    margin: 0 -20px;
    padding: 10px 20px;
    gap: 18px;
    overflow-x: auto;
    background: color-mix(in srgb, var(--paper) 85%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line);
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
  a {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--muted);
    padding: 4px 0;
  }
  a[aria-current="true"] { color: var(--accent-ink); }
`;

const Copy = styled.p`
  margin-top: 96px;
  font-size: 0.8rem;
  color: var(--muted);
  max-width: 28rem;
  line-height: 1.6;
`;

/** Marca a seção visível para destacar o item do menu. */
function useScrollSpy(enabled: boolean) {
  const [active, setActive] = useState("sobre");

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return;
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);

  return active;
}

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/home";
  const active = useScrollSpy(isHome);

  if (pathname.startsWith("/adminaccess")) return <>{children}</>;

  return (
    <>
      <Spotlight />
      <Frame>
        <Side>
          <div>
            <Hello className="rise d1">Olá, eu sou</Hello>
            <Name className="rise d2">
              <Link href="/home">Edson Junior</Link>
            </Name>
            <Role className="rise d3">Desenvolvedor Mobile Sênior</Role>
            <Blurb className="rise d4">
              Especializado em React Native, construindo aplicativos com alta performance,
              arquitetura escalável e experiência do usuário de excelência para iOS e Android.
            </Blurb>
            <Nav className="rise d5" aria-label="Seções">
              <ul>
                {NAV.map((n) => (
                  <li key={n.id}>
                    <NavItem href={`/home#${n.id}`} $active={isHome && active === n.id}>
                      {n.label}
                    </NavItem>
                  </li>
                ))}
              </ul>
            </Nav>
          </div>

          <Foot className="rise d5">
            <div className="status">
              <span className="dot" />
              Disponível para projetos · Brasil · <LocalTime />
            </div>
            <div className="row">
              <a className="icon" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon width={22} height={22} color="currentColor" />
              </a>
              <a className="icon" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon width={22} height={22} color="currentColor" />
              </a>
              <a className="icon" href={contact.devto} target="_blank" rel="noopener noreferrer" aria-label="Dev.to">
                <DevtoIcon width={22} height={22} color="currentColor" />
              </a>
              <a className="icon" href={`mailto:${contact.email}`} aria-label="E-mail">
                <FaEnvelope size={19} />
              </a>
              <ThemeToggle />
            </div>
          </Foot>
        </Side>

        <div style={{ flex: 1, minWidth: 0 }}>
          <MobileBar aria-label="Seções">
            {NAV.map((n) => (
              <Link key={n.id} href={`/home#${n.id}`} aria-current={isHome && active === n.id}>
                {n.label}
              </Link>
            ))}
          </MobileBar>
          <Main>
            {children}
            <Copy>
              © {new Date().getFullYear()} Edson Junior. Feito com Next.js, TypeScript e styled-components.
            </Copy>
          </Main>
        </div>
      </Frame>
    </>
  );
}
