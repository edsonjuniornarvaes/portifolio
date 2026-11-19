"use client";

import Link from "next/link";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { ExperienceData } from "@/data/experience";
import { localizeExperience } from "@/i18n/content";
import { useLang } from "@/i18n/provider";

const Box = styled.div`
  .lead { max-width: 38rem; margin: -10px 0 26px; color: var(--muted); line-height: 1.65; }
  .co { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.6fr); gap: 10px 48px; padding: 24px 0; border-top: 1px solid var(--line); }
  .co:last-of-type { border-bottom: 1px solid var(--line); }
  .co h3 { font-size: clamp(1.4rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1; }
  .co .span { margin-top: 6px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent-ink); }
  .roles { list-style: none; display: grid; gap: 12px; }
  .roles li { display: grid; grid-template-columns: 11.5rem minmax(0, 1fr); gap: 4px 20px; align-items: baseline; }
  .roles .p { font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.04em; color: var(--muted); }
  .roles b { font-weight: 600; }
  .more { margin-top: 22px; display: inline-flex; align-items: center; gap: 8px; color: var(--muted); transition: color 0.2s ease, gap 0.25s ease; }
  .more:hover { color: var(--accent-ink); gap: 14px; }
  @media (max-width: 760px) { .co { grid-template-columns: 1fr; } .roles li { grid-template-columns: 1fr; } }
`;

/** "Onde trabalhei": empresas e funções em uma lista curta (o detalhe fica na página Trajetória). */
export default function WhereWorked() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const jobs = localizeExperience(ExperienceData, lang);
  const order: string[] = [];
  const by: Record<string, typeof jobs> = {};
  for (const j of jobs) { if (!by[j.company]) { by[j.company] = []; order.push(j.company); } by[j.company].push(j); }
  const range = (list: typeof jobs) => `${list[list.length - 1].period.split(" - ")[0]} – ${list[0].period.split(" - ")[1] ?? ""}`;
  return (
    <Box>
      <p className="lead">{t.worked.lead}</p>
      {order.map((c, i) => (
        <motion.div
          key={c}
          className="co"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div><h3>{c}</h3><div className="span">{range(by[c])}</div></div>
          <ul className="roles">
            {by[c].map((j) => <li key={j.period}><span className="p">{j.period}</span><b>{j.role}</b></li>)}
          </ul>
        </motion.div>
      ))}
      <Link className="more" href="/trajetoria">{t.worked.more} <span aria-hidden>→</span></Link>
    </Box>
  );
}
