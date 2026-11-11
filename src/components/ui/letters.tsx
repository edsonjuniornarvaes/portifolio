"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

const Word = styled.span`
  display: inline-block; white-space: nowrap; margin-right: 0.22em;
  .ch { display: inline-block; transition: transform 0.35s cubic-bezier(.2,.7,.2,1), color 0.2s ease; }
  .ch:hover { transform: translateY(-0.12em) rotate(-3deg); color: var(--accent); }
`;

/** Título que entra letra por letra e reage ao mouse (cada letra pula quando você passa por cima). */
export default function Letters({ text, delay = 0, view = false }: { text: string; delay?: number; view?: boolean }) {
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <span aria-label={text}>
      {text.split(" ").map((w, wi) => (
        <Word key={wi} aria-hidden>
          {w.split("").map((c, ci) => {
            const i = n++;
            return (
              <motion.span
                key={ci}
                className="ch"
                initial={reduce ? false : { opacity: 0, y: "0.5em", filter: "blur(10px)" }}
                {...(view ? { whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, viewport: { once: true, margin: "-60px" } } : { animate: { opacity: 1, y: 0, filter: "blur(0px)" } })}
                transition={{ duration: 0.65, delay: delay + i * 0.035, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {c}
              </motion.span>
            );
          })}
        </Word>
      ))}
    </span>
  );
}
