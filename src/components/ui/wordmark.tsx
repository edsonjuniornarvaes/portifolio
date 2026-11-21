"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const NAMES = ["Edson Junior", "EJ Sistemas"];

/** Marca do site: "ej" entre chaves de código, com degradê nas cores do tema. */
export default function Wordmark({ sub, size = 40 }: { sub?: string; size?: number }) {
  const reduce = useReducedMotion();
  const gid = `wm${useId().replace(/:/g, "")}`;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => { if (document.visibilityState === "visible") setI((v) => v + 1); }, 4200);
    return () => clearInterval(id);
  }, [reduce]);
  const name = NAMES[i % NAMES.length];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12, whiteSpace: "nowrap" }}>
      <svg aria-hidden width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ flex: "none", overflow: "visible" }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <path d="M17 8c-5 0-6 2-6 6v5c0 3-2 5-4 5 2 0 4 2 4 5v5c0 4 1 6 6 6M31 8c5 0 6 2 6 6v5c0 3 2 5 4 5-2 0-4 2-4 5v5c0 4-1 6-6 6" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="24" y="30" textAnchor="middle" style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 17, letterSpacing: -1.5 }} fill="var(--accent-ink)">ej</text>
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
