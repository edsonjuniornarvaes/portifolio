"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/i18n/provider";

const Box = styled.div`
  .head { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 16px 48px; align-items: end; margin-bottom: 34px; }
  .head h3 { font-size: clamp(1.9rem, 3.8vw, 3rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.05; }
  .head p { color: var(--muted); line-height: 1.65; max-width: 30rem; }
  ol { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: color-mix(in srgb, var(--card) 70%, transparent); counter-reset: s; }
  li { position: relative; padding: 26px 24px 30px; transition: background 0.3s ease; }
  li + li { border-left: 1px solid var(--line); }
  li:hover { background: color-mix(in srgb, var(--accent) 7%, transparent); }
  .n { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-ink); }
  .n b { display: grid; place-items: center; min-width: 38px; height: 28px; padding: 0 8px; border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--line)); border-radius: 8px; font-weight: 500; }
  .n i { flex: 1; height: 1px; background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 50%, transparent), transparent); }
  h4 { font-size: 1.25rem; font-weight: 600; letter-spacing: -0.02em; }
  li p { margin-top: 8px; color: var(--muted); font-size: 0.95rem; line-height: 1.6; }
  @media (max-width: 860px) { ol { grid-template-columns: 1fr; } li + li { border-left: 0; border-top: 1px solid var(--line); } .head { grid-template-columns: 1fr; } }
`;

/** "Como eu trabalho": quatro etapas, da conversa ao produto no ar. */
export default function Process() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const p = t.process;
  return (
    <Box>
      <div className="head">
        <h3>{p.title}</h3>
        <p>{p.lead}</p>
      </div>
      <ol>
        {p.steps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="n"><b>{String(i + 1).padStart(2, "0")}</b><i /></div>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </Box>
  );
}
