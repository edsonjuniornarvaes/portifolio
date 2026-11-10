"use client";

import { useState } from "react";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Box = styled.div`
  h2 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(3rem, 8vw, 6.4rem); line-height: 0.98; letter-spacing: -0.025em; }
  h2 em { color: var(--accent-ink); }
  p { margin-top: 16px; max-width: 30rem; color: var(--muted); font-size: 1.1rem; }
  .mail { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 18px; margin-top: 34px; }
  .mail a.addr { font-family: var(--font-serif); font-size: clamp(1.5rem, 4vw, 2.6rem); line-height: 1.1; border-bottom: 2px solid var(--accent); padding-bottom: 2px; word-break: break-all; transition: color 0.2s ease; }
  .mail a.addr:hover { color: var(--accent-ink); }
  .copy { height: 38px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); background: transparent; cursor: pointer; font-size: 0.82rem; transition: border-color 0.2s ease, color 0.2s ease; }
  .copy:hover { border-color: var(--accent-ink); color: var(--accent-ink); }
  .social { display: flex; flex-wrap: wrap; gap: 8px 28px; margin-top: 34px; font-size: 0.98rem; }
  .social a { border-bottom: 1px solid var(--line); padding-bottom: 2px; transition: color 0.2s ease, border-color 0.2s ease; }
  .social a:hover { color: var(--accent-ink); border-color: var(--accent-ink); }
`;

export default function Contact() {
  const { t } = useLang();
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
  const [a, b] = t.contact.title.split(" ").reduce<[string, string]>((acc, w, i, all) => (i < all.length - 1 ? [acc[0] + (acc[0] ? " " : "") + w, acc[1]] : [acc[0], w]), ["", ""]);
  return (
    <Box>
      <h2>{a} <em>{b}</em></h2>
      <p>{t.contact.text}</p>
      <div className="mail">
        <a className="addr" href={`mailto:${contact.email}`}>{contact.email}</a>
        <button className="copy" type="button" onClick={copy} aria-label={t.contact.copy}>{done ? "✓" : t.contact.copy}</button>
      </div>
      <div className="social">
        <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={contact.devto} target="_blank" rel="noopener noreferrer">Dev.to</a>
      </div>
    </Box>
  );
}
