"use client";

import { useState } from "react";
import styled from "styled-components";
import Letters from "@/components/ui/letters";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Box = styled.div`
  position: relative; padding: 8px 0 0;
  h2 { font-size: clamp(3rem, 9vw, 8rem); font-weight: 700; line-height: 0.92; letter-spacing: -0.055em; }
  h2 .a { display: block; }
  h2 .b { display: block; color: var(--accent); }
  p { margin-top: 24px; max-width: 30rem; color: var(--muted); font-size: 1.15rem; }
  .mail { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 20px; margin-top: 38px; }
  .mail a.addr { font-size: clamp(1.1rem, 4.4vw, 2.4rem); font-weight: 600; letter-spacing: -0.02em; padding: 16px 28px; border: 1px solid var(--line); border-radius: 99px; background: color-mix(in srgb, var(--card) 85%, transparent); word-break: break-all; transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
  .mail a.addr:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  .copy { height: 48px; padding: 0 22px; border-radius: 99px; border: 1px solid var(--line); background: transparent; cursor: pointer; font-size: 0.92rem; transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; }
  .copy:hover { border-color: var(--accent); color: var(--accent); }
  .copy[data-ok="true"] { background: var(--accent); color: var(--on-accent); border-color: var(--accent); }
  .social { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
  .social a { padding: 10px 20px; border: 1px solid var(--line); border-radius: 99px; font-size: 0.92rem; color: var(--muted); transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
  .social a:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
`;

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
  return (
    <Box>
      <h2>
        <span className="a"><Letters text={c.h2a} view /></span>
        <span className="b"><Letters text={c.h2b} view delay={0.15} /></span>
      </h2>
      <p>{c.text}</p>
      <div className="mail">
        <a className="addr" href={`mailto:${contact.email}`}>{contact.email}</a>
        <button className="copy" type="button" data-ok={done} onClick={copy}>{done ? c.copied : c.copy}</button>
      </div>
      <div className="social">
        <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </Box>
  );
}
