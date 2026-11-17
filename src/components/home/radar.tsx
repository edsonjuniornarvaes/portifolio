"use client";

import styled from "styled-components";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Box = styled.div`
  position: relative; display: grid; grid-template-columns: minmax(0, 1.3fr) auto; gap: 28px 48px; align-items: center; padding: clamp(28px, 4vw, 48px); border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--line)); border-radius: 18px; overflow: hidden;
  background: radial-gradient(70% 140% at 100% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%), color-mix(in srgb, var(--card) 88%, transparent);
  @media (max-width: 820px) { grid-template-columns: 1fr; }
  h3 { font-size: clamp(1.7rem, 3.4vw, 2.6rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.06; }
  p { margin-top: 14px; max-width: 36rem; color: var(--muted); line-height: 1.65; }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; padding: 0; list-style: none; }
  .tags li { padding: 6px 13px; border: 1px solid var(--line); border-radius: 99px; font-size: 0.84rem; color: var(--ink); }
  .btns { display: flex; flex-direction: column; gap: 10px; min-width: 220px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: 52px; padding: 0 24px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
  .btn.p { background: var(--accent); color: var(--on-accent); box-shadow: 4px 4px 0 var(--accent-2); }
  .btn.p:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--accent-2); }
  .btn.g { border: 1px solid var(--line); font-weight: 500; }
  .btn.g:hover { border-color: var(--accent); color: var(--accent); }
`;

/** Convite para empresas: site, página, marketplace e app, com chamada para conversar. */
export default function Radar() {
  const { t } = useLang();
  const r = t.radar;
  const subject = encodeURIComponent(r.subject);
  return (
    <Box>
      <div>
        <h3>{r.title}</h3>
        <p>{r.text}</p>
        <ul className="tags">{r.items.map((i) => <li key={i}>{i}</li>)}</ul>
      </div>
      <div className="btns">
        <a className="btn p" href={`mailto:${contact.email}?subject=${subject}`}>{r.cta} <span aria-hidden>→</span></a>
        <a className="btn g" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </Box>
  );
}
