"use client";

import { useState } from "react";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Row = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; padding: 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  .mail { display: inline-flex; align-items: center; gap: 12px; padding: 0; border: 0; background: none; cursor: pointer; color: var(--ink); font-size: 1.05rem; transition: color 0.2s ease; }
  .mail:hover { color: var(--accent); }
  .mail small { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
  .links { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-left: auto; }
  .links a { font-size: 0.92rem; color: var(--muted); transition: color 0.2s ease; }
  .links a:hover { color: var(--accent); }
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
        {contact.email} <small>{done ? c.copied : c.copy}</small>
      </button>
      <nav className="links" aria-label={c.label}>
        <a href={contact.linkedin} {...ext}>LinkedIn</a>
        <a href={contact.github} {...ext}>GitHub</a>
        <a href={contact.instagram} {...ext}>Instagram</a>
        <a href={contact.twitter} {...ext}>X</a>
      </nav>
    </Row>
  );
}
