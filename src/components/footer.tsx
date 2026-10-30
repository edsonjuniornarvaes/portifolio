"use client";

import styled from "styled-components";
import { usePathname } from "next/navigation";
import Wave from "@/components/retro/wave";
import LocalTime from "@/components/ui/local-time";
import { contact, location } from "@/data/profile";

const Foot = styled.footer`
  position: relative;
  margin-top: 120px;
  .sky {
    position: relative; height: 220px;
    background:
      radial-gradient(circle at 1px 1px, rgba(0,0,0,0.28) 1.2px, transparent 1.6px) 0 0 / 6px 6px,
      linear-gradient(170deg, #0b3b3b 0%, #0e7490 45%, #2eebaa 100%);
    :root[data-theme="light"] & { background: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1.2px, transparent 1.6px) 0 0 / 6px 6px, linear-gradient(170deg, #bff5e3, #7dd3fc 60%, #34d399); }
  }
  .sky .w { position: absolute; left: 0; right: 0; bottom: -2px; transform: scaleY(-1); }
  .sky svg { filter: none; }
  .body { background: var(--paper); text-align: center; padding: 28px 24px 48px; }
  .links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 26px; font-family: var(--font-mono); font-size: 0.95rem; }
  .links a { color: var(--accent-ink); text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 2px; }
  .links a:hover { color: var(--ink); }
  .copy { margin-top: 20px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted); }
  .stamp {
    display: inline-block; margin-top: 22px; padding: 6px 12px; border: 2px solid var(--ink); font-family: var(--font-condensed);
    text-transform: uppercase; letter-spacing: 0.18em; font-size: 0.82rem; line-height: 1.25; color: var(--ink); transform: rotate(-2deg);
  }
  .stamp b { display: block; font-weight: 400; letter-spacing: 0.3em; font-size: 1.15rem; color: var(--accent-ink); }
`;

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Foot>
      <div className="sky" aria-hidden>
        <div className="w">
          <Wave id="foot" />
        </div>
      </div>
      <div className="body">
        <nav className="links" aria-label="Contato">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">github</a>
          <a href={contact.devto} target="_blank" rel="noopener noreferrer">dev.to</a>
          <a href={`mailto:${contact.email}`}>email</a>
        </nav>
        <p className="copy">
          © {new Date().getFullYear()} Edson Junior · {location} · <LocalTime />
        </p>
        <div className="stamp">
          Código escrito
          <b>À MÃO</b>
          por humano
        </div>
      </div>
    </Foot>
  );
}
