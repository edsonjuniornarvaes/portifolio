"use client";

import { useState } from "react";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Box = styled.div`
  display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 32px 64px; align-items: start;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
  h2 { font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.15; }
  p { margin-top: 10px; max-width: 24rem; color: var(--muted); line-height: 1.6; }
  ul { list-style: none; border-top: 1px solid var(--line); }
  li { border-bottom: 1px solid var(--line); }
  li a, li button { width: 100%; display: grid; grid-template-columns: 110px minmax(0, 1fr) auto; align-items: center; gap: 14px; padding: 18px 2px; background: none; border: 0; text-align: left; cursor: pointer; color: var(--ink); transition: padding 0.3s cubic-bezier(.2,.7,.2,1), color 0.2s ease; }
  li a:hover, li button:hover { padding-left: 12px; color: var(--accent); }
  .k { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .v { font-size: 1.02rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ar { color: var(--muted); font-size: 0.85rem; }
  @media (max-width: 520px) { li a, li button { grid-template-columns: minmax(0, 1fr) auto; } .k { display: none; } }
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
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <Box>
      <div>
        <h2>{c.h2a} {c.h2b}</h2>
        <p>{c.text}</p>
      </div>
      <ul>
        <li>
          <button type="button" onClick={copy} aria-label={c.copy}>
            <span className="k">E-mail</span><span className="v">{contact.email}</span><span className="ar">{done ? c.copied : c.copy}</span>
          </button>
        </li>
        <li><a href={contact.instagram} {...ext}><span className="k">Instagram</span><span className="v">@edsonjunior.dev</span><span className="ar">↗</span></a></li>
        <li><a href={contact.linkedin} {...ext}><span className="k">LinkedIn</span><span className="v">edsonjuniornarvaes</span><span className="ar">↗</span></a></li>
        <li><a href={contact.twitter} {...ext}><span className="k">X (Twitter)</span><span className="v">@edsonjrandrade</span><span className="ar">↗</span></a></li>
        <li><a href={contact.github} {...ext}><span className="k">GitHub</span><span className="v">edsonjuniornarvaes</span><span className="ar">↗</span></a></li>
      </ul>
    </Box>
  );
}
