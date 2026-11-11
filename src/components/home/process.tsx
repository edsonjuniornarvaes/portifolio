"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/i18n/provider";

const Box = styled.div`
  h3 { max-width: 16ch; font-size: clamp(2.2rem, 5vw, 4.2rem); font-weight: 700; line-height: 1.02; letter-spacing: -0.045em; }
  ol { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; margin: 56px 0 0; padding: 0; list-style: none; }
  @media (max-width: 960px) { ol { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 560px) { ol { grid-template-columns: 1fr; gap: 8px; } }
  li { position: relative; padding-top: 26px; }
  li .rail { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--line); overflow: hidden; }
  li .rail i { display: block; height: 100%; background: var(--accent); transform-origin: 0 50%; }
  li .n { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); }
  li h4 { margin-top: 14px; font-size: 1.5rem; font-weight: 600; letter-spacing: -0.03em; }
  li p { margin-top: 12px; max-width: 24rem; color: var(--muted); line-height: 1.65; padding-bottom: 20px; }
`;

export default function Process() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const p = t.process;
  return (
    <Box>
      <h3>{p.title}</h3>
      <ol>
        {p.steps.map((s, i) => (
          <motion.li key={s.title} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}>
            <span className="rail"><motion.i initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2 + i * 0.18, ease: "easeOut" }} /></span>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </Box>
  );
}
