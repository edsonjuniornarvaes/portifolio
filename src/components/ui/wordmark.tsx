"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const NAMES = ["Edson Junior", "EJ Sistemas"];

/** Marca do site: quadrado de contorno com o monograma EJ unido, nas cores do tema. */
export default function Wordmark({ sub, size = 40 }: { sub?: string; size?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => { if (document.visibilityState === "visible") setI((v) => v + 1); }, 4200);
    return () => clearInterval(id);
  }, [reduce]);
  const name = NAMES[i % NAMES.length];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12, whiteSpace: "nowrap" }}>
      <svg aria-hidden width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ flex: "none" }}>
        <rect x="2" y="2" width="60" height="60" rx="15" stroke="var(--accent-ink)" strokeWidth="3.5" />
        <g stroke="var(--accent-ink)" strokeWidth="7" strokeLinejoin="miter">
          <path d="M30 18H16v28h14M16 32h12" strokeLinecap="square" />
          <path d="M44 18v19a9 9 0 0 1-9 9h-1" strokeLinecap="round" />
        </g>
      </svg>
      <span style={{ display: "grid", lineHeight: 1.1 }}>
        <span style={{ display: "block", height: "1.2em", overflow: "hidden" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.b
              key={name}
              style={{ display: "block", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em" }}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              {name}
            </motion.b>
          </AnimatePresence>
        </span>
        {sub ? <small style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{sub}</small> : null}
      </span>
    </span>
  );
}
