"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/i18n/provider";

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
  .card { position: relative; display: flex; flex-direction: column; gap: 14px; padding: 30px 28px 32px; border: 1px solid var(--line); border-radius: 20px; background: color-mix(in srgb, var(--card) 80%, transparent); overflow: hidden; transition: transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.3s ease; }
  .card::before { content: ""; position: absolute; inset: auto -30% -60% -30%; height: 80%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%); opacity: 0; transition: opacity 0.4s ease; pointer-events: none; }
  .card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--accent) 55%, var(--line)); }
  .card:hover::before { opacity: 1; }
  .ic { display: grid; place-items: center; width: 54px; height: 54px; border-radius: 16px; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); }
  .ic svg { width: 26px; height: 26px; }
  h3 { margin-top: 10px; font-size: 1.55rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1.15; }
  p { color: var(--muted); line-height: 1.65; }
  .tools { margin-top: 36px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px; color: var(--muted); font-size: 0.92rem; }
  .tools b { color: var(--ink); font-weight: 600; }
`;

const ICONS = [
  <svg key="m" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2.5" width="10" height="19" rx="2.6" /><path d="M10.5 18.5h3" /></svg>,
  <svg key="w" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.4" /><path d="M2.5 9h19" /><circle cx="5.6" cy="6.8" r=".5" /><circle cx="8" cy="6.8" r=".5" /></svg>,
  <svg key="s" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4.5 6v5.5c0 4.4 3.1 8 7.5 9.5 4.4-1.5 7.5-5.1 7.5-9.5V6L12 3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></svg>,
];

export default function Services() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const sv = t.services;
  return (
    <>
      <Grid>
        {sv.items.map((it, i) => (
          <motion.div
            className="card"
            key={it.title}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <span className="ic">{ICONS[i]}</span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </motion.div>
        ))}
        <div className="tools" style={{ gridColumn: "1 / -1" }}>
          <b>{sv.techLabel}:</b> <span>{sv.tech}</span>
        </div>
      </Grid>
    </>
  );
}
