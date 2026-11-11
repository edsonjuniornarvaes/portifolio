"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

export type Tok = [kind: "k" | "s" | "n" | "f" | "c" | "p" | "v", text: string];
export type CodeLine = Tok[];

const Win = styled.div`
  border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: color-mix(in srgb, var(--card) 88%, transparent); backdrop-filter: blur(6px);
  box-shadow: 0 40px 80px -40px rgba(0,0,0,0.6);
  .top { display: flex; align-items: center; gap: 7px; padding: 10px 14px; border-bottom: 1px solid var(--line); background: var(--paper-2); }
  .top i { width: 10px; height: 10px; border-radius: 50%; background: var(--line); }
  .top i:nth-child(1) { background: #ff5f57; } .top i:nth-child(2) { background: #febc2e; } .top i:nth-child(3) { background: #28c840; }
  .top .tab { margin-left: 12px; padding: 3px 12px; border-radius: 6px 6px 0 0; font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink); background: var(--card); border: 1px solid var(--line); border-bottom: 0; }
  pre { margin: 0; padding: 18px 0 20px; font-family: var(--font-mono); font-size: 0.86rem; line-height: 1.85; overflow-x: auto; }
  .ln { display: grid; grid-template-columns: 46px minmax(0, 1fr); padding-right: 18px; transition: background 0.2s ease; }
  .ln:hover { background: color-mix(in srgb, var(--accent) 7%, transparent); }
  .n { text-align: right; padding-right: 16px; color: var(--syn-c); user-select: none; }
  .t { white-space: pre; }
  .k { color: var(--syn-k); } .s { color: var(--syn-s); } .n2 { color: var(--syn-n); } .f { color: var(--syn-f); } .c { color: var(--syn-c); font-style: italic; } .p { color: var(--syn-p); } .v { color: var(--ink); }
  @media (max-width: 560px) { pre { font-size: 0.74rem; } .ln { grid-template-columns: 34px minmax(0, 1fr); } .n { padding-right: 10px; } }
`;

/** Janela de editor com realce de sintaxe; as linhas entram uma a uma quando aparecem na tela. */
export default function CodeBlock({ file, lines }: { file: string; lines: CodeLine[] }) {
  const reduce = useReducedMotion();
  return (
    <Win>
      <div className="top"><i /><i /><i /><span className="tab">{file}</span></div>
      <pre>
        <code>
          {lines.map((ln, i) => (
            <motion.div
              className="ln"
              key={i}
              initial={reduce ? false : { opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.055, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="n">{i + 1}</span>
              <span className="t">
                {ln.map(([k, v], j) => (
                  <span key={j} className={k === "n" ? "n2" : k}>{v}</span>
                ))}
              </span>
            </motion.div>
          ))}
        </code>
      </pre>
    </Win>
  );
}
