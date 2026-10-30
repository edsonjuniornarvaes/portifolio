"use client";

import styled from "styled-components";
import { FaGithub, FaLinkedinIn, FaDev, FaEnvelope, FaInstagram } from "react-icons/fa";
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
  .icons { display: flex; justify-content: center; gap: 14px; }
  .icons a { width: 46px; height: 46px; display: grid; place-items: center; border: 2px solid var(--line); color: var(--ink); transition: all 0.2s ease; }
  .icons a:hover { color: var(--accent-ink); border-color: var(--accent-ink); transform: translate(-2px, -2px); box-shadow: 4px 4px 0 color-mix(in srgb, var(--accent-2) 60%, transparent); }
  .stamp {
    display: inline-block; margin-top: 24px; padding: 3px; text-align: center; transform: rotate(-2deg); transition: transform 0.3s ease;
    background: linear-gradient(120deg, #c4a1ff 0%, #2eebaa 35%, #eafff8 55%, #06b6d4 78%, #c4a1ff 100%);
    background-size: 200% 200%; animation: holo 6s ease-in-out infinite;
  }
  .stamp:hover { transform: rotate(0deg) scale(1.04); }
  .stamp .top, .stamp .bot { display: block; background: #0a0b0d; color: #fff; font-family: var(--font-condensed); text-transform: uppercase; letter-spacing: 0.32em; font-size: 0.74rem; padding: 3px 10px; }
  .stamp .bot { letter-spacing: 0.16em; font-size: 0.7rem; }
  .stamp b { display: block; font-family: var(--font-condensed); font-weight: 400; font-size: 2.3rem; line-height: 1.1; letter-spacing: 0.42em; padding: 4px 0 4px 0.42em; color: #0a0b0d; }
  @keyframes holo { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @media (prefers-reduced-motion: reduce) { .stamp { animation: none; } }
  .links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 26px; font-family: var(--font-mono); font-size: 0.95rem; }
  .links a { color: var(--accent-ink); text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 2px; }
  .links a:hover { color: var(--ink); }
  .copy { margin-top: 20px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted); }
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
        <nav className="icons" aria-label="Redes sociais">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={22} /></a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={22} /></a>
          <a href={contact.devto} target="_blank" rel="noopener noreferrer" aria-label="Dev.to"><FaDev size={26} /></a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={22} /></a>
          <a href={`mailto:${contact.email}`} aria-label="E-mail"><FaEnvelope size={22} /></a>
        </nav>
        <p className="copy">
          © {new Date().getFullYear()} Edson Junior · {location} · <LocalTime />
        </p>
        <div className="stamp" role="img" aria-label="Feito à base de café">
          <span className="top">FEITO À BASE DE</span>
          <b>CAFÉ</b>
          <span className="bot">EDSON JUNIOR · 2026</span>
        </div>
      </div>
    </Foot>
  );
}
