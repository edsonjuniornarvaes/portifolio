"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import CodeBlock, { type CodeLine } from "@/components/ui/code-block";
import { useLang } from "@/i18n/provider";
import { CAREER_SINCE } from "@/data/profile";

const Grid = styled.div`
  display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 48px; align-items: center;
  @media (max-width: 960px) { grid-template-columns: 1fr; gap: 32px; }
  .list { display: grid; gap: 0; border-top: 1px solid var(--line); }
  .it { padding: 24px 0; border-bottom: 1px solid var(--line); transition: padding 0.3s cubic-bezier(.2,.7,.2,1); }
  .it:hover { padding-left: 14px; }
  .key { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent); }
  .key::before { content: "edson."; color: var(--syn-c); }
  h3 { margin-top: 8px; font-size: 1.7rem; font-weight: 600; letter-spacing: -0.03em; }
  p { margin-top: 8px; color: var(--muted); line-height: 1.6; max-width: 30rem; }
`;

export default function CodeSection() {
  const { t } = useLang();
  const c = t.code;
  const reduce = useReducedMotion();

  const list = (items: string[]): CodeLine[0][] => {
    const out: CodeLine[0][] = [["p", "["]];
    items.forEach((it, i) => {
      out.push(["s", `"${it}"`]);
      if (i < items.length - 1) out.push(["p", ", "]);
    });
    out.push(["p", "],"]);
    return out;
  };

  const lines: CodeLine[] = [
    [["k", "const "], ["f", "edson"], ["p", " = {"]],
    [["v", "  name"], ["p", ": "], ["s", '"Edson Junior"'], ["p", ","]],
    [["v", "  base"], ["p", ": "], ["s", '"Umuarama, BR"'], ["p", ","]],
    [["v", "  since"], ["p", ": "], ["n", String(CAREER_SINCE)], ["p", ","]],
    [["c", `  // ${c.comments.mobile}`]],
    [["v", "  mobile"], ["p", ": "], ...list(["React Native", "Expo", "iOS", "Android"])],
    [["c", `  // ${c.comments.web}`]],
    [["v", "  web"], ["p", ": "], ...list(["Next.js", "React", "TypeScript", "Supabase"])],
    [["c", `  // ${c.comments.systems}`]],
    [["v", "  systems"], ["p", ": "], ...list(["Auth0", "Pix", "Sentry", "Jest"])],
    [["v", "  available"], ["p", ": "], ["k", "true"], ["p", ","]],
    [["p", "};"]],
    [],
    [["k", "export default "], ["f", "edson"], ["p", ";"]],
  ];

  return (
    <Grid>
      <CodeBlock file={c.file} lines={lines} />
      <div className="list">
        {c.items.map((it, i) => (
          <motion.div
            className="it"
            key={it.k}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="key">{it.k}</div>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </motion.div>
        ))}
      </div>
    </Grid>
  );
}
