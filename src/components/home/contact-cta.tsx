"use client";

import styled from "styled-components";
import { FaGithub, FaLinkedinIn, FaDev, FaInstagram } from "react-icons/fa";
import CopyChip from "@/components/ui/copy-chip";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Box = styled.div`
  position: relative; overflow: hidden; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: 28px; align-items: center;
  padding: clamp(22px, 4vw, 40px); border-radius: 22px; border: 1px solid transparent;
  background: linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, color-mix(in srgb, var(--accent) 65%, transparent), color-mix(in srgb, var(--accent-2) 35%, transparent), var(--line)) border-box;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
  &::before { content: ""; position: absolute; width: 360px; height: 360px; right: -110px; top: -150px; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%); pointer-events: none; }
  .pill { display: inline-flex; align-items: center; gap: 9px; padding: 6px 13px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--line)); background: color-mix(in srgb, var(--accent) 9%, transparent); font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-ink); }
  .pill i { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: ping 2.2s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.7); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }
  @media (prefers-reduced-motion: reduce) { .pill i { animation: none; } }
  h3 { margin-top: 14px; font-size: clamp(1.5rem, 3vw, 2.2rem); line-height: 1.12; letter-spacing: -0.03em; font-weight: 700; }
  p { margin-top: 10px; color: var(--muted); max-width: 28rem; line-height: 1.6; }
  .links { position: relative; display: flex; flex-wrap: wrap; gap: 10px; }
  .chip { display: inline-flex; align-items: center; gap: 9px; height: 44px; padding: 0 16px; border-radius: 12px; border: 1px solid var(--line); font-family: var(--font-mono); font-size: 0.82rem; color: var(--ink); background: color-mix(in srgb, var(--paper) 50%, transparent); transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
  .chip:hover { border-color: var(--accent-ink); color: var(--accent-ink); transform: translateY(-2px); }
`;

/** Fecho da página: disponibilidade e canais de contato em um bloco só. */
export default function ContactCta() {
  const { t } = useLang();
  const s = t.site;
  return (
    <Box data-spot>
      <div style={{ position: "relative" }}>
        <span className="pill"><i /> {t.hero.available}</span>
        <h3>{s.ctaTitle}</h3>
        <p>{s.ctaText}</p>
      </div>
      <div className="links">
        <CopyChip email={contact.email} />
        <a className="chip" href={contact.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram size={15} /> Instagram</a>
        <a className="chip" href={contact.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={14} /> LinkedIn</a>
        <a className="chip" href={contact.github} target="_blank" rel="noopener noreferrer"><FaGithub size={14} /> GitHub</a>
        <a className="chip" href={contact.devto} target="_blank" rel="noopener noreferrer"><FaDev size={16} /> Dev.to</a>
      </div>
    </Box>
  );
}
