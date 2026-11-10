"use client";

import styled from "styled-components";
import { useLang } from "@/i18n/provider";

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 40px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
  .it { border-top: 1px solid var(--ink); padding: 22px 0 6px; }
  @media (max-width: 860px) { .it { padding-bottom: 26px; } }
  .n { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); }
  h3 { margin-top: 18px; font-family: var(--font-serif); font-weight: 400; font-size: 2rem; line-height: 1.1; letter-spacing: -0.01em; }
  p { margin-top: 12px; color: var(--muted); line-height: 1.6; }
  .tech { margin-top: 16px; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.03em; color: var(--accent-ink); }
`;

export default function Services() {
  const { t } = useLang();
  return (
    <Grid>
      {t.services.items.map((s, i) => (
        <div className="it" key={s.title}>
          <span className="n">{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          <div className="tech">{s.tech}</div>
        </div>
      ))}
    </Grid>
  );
}
