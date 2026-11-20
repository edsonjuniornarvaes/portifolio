"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const COLORS = ["var(--accent)", "var(--accent-2)", "var(--lilac)", "#f5b942"];
const NAMES = ["Edson Junior", "EJ Sistemas"];

/** Marca do site: monograma EJ num quadrado que muda de cor, com o nome ao lado alternando entre "Edson Junior" e "EJ Sistemas". */
export default function Wordmark({ sub, size = 38 }: { sub?: string; size?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => { if (document.visibilityState === "visible") setI((v) => v + 1); }, 4200);
    return () => clearInterval(id);
  }, [reduce]);
  const color = COLORS[i % COLORS.length];
  const name = NAMES[i % NAMES.length];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11, whiteSpace: "nowrap" }}>
      <span
        aria-hidden
        style={{ display: "grid", placeItems: "center", width: size, height: size, borderRadius: Math.round(size * 0.28), background: color, color: "var(--on-accent, #04130d)", transition: "background 0.8s ease", flex: "none" }}
      >
        <svg viewBox="0 0 64 64" width={size * 0.8} height={size * 0.8} fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 18H16v28h14M16 32h12" />
          <path d="M44 18v19a9 9 0 0 1-9 9h-1" />
        </svg>
      </span>
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
