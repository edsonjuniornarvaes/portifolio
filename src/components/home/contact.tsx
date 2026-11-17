"use client";

import { useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Row = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; padding: 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  .mail { display: inline-flex; align-items: center; gap: 12px; padding: 0; border: 0; background: none; cursor: pointer; color: var(--ink); font-size: 1.05rem; transition: color 0.2s ease; }
  .mail:hover { color: var(--accent); }
  .mail small { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
  .mail svg { width: 18px; height: 18px; color: var(--accent); }
  .links { display: flex; flex-wrap: wrap; gap: 8px; margin-left: auto; }
  .links a { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 14px; border: 1px solid var(--line); border-radius: 10px; font-size: 0.9rem; color: var(--muted); transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
  .links a svg { width: 16px; height: 16px; }
  .links a:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
  @media (max-width: 640px) { .links { margin-left: 0; } }
`;

/** Contato discreto: e-mail (clique copia) e os links das redes numa linha só. */
export default function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* ignore */
    }
  };
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <Row>
      <button type="button" className="mail" onClick={copy} aria-label={c.copy}>
        <FaEnvelope aria-hidden /> {contact.email} <small>{done ? c.copied : c.copy}</small>
      </button>
      <nav className="links" aria-label={c.label}>
        <a href={contact.linkedin} {...ext}><FaLinkedinIn aria-hidden /> LinkedIn</a>
        <a href={contact.github} {...ext}><FaGithub aria-hidden /> GitHub</a>
        <a href={contact.instagram} {...ext}><FaInstagram aria-hidden /> Instagram</a>
        <a href={contact.twitter} {...ext}><FaXTwitter aria-hidden /> X</a>
      </nav>
    </Row>
  );
}
