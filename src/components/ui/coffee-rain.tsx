"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { play } from "@/lib/sound";

/** Segredo: digite "cafe" em qualquer página e chove café. */
export default function CoffeeRain() {
  const [drops, setDrops] = useState<{ id: number; x: number; s: number; d: number; r: number }[]>([]);

  useEffect(() => {
    let buf = "";
    let id = 0;
    const key = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf !== "cafe") return;
      buf = "";
      const batch = Array.from({ length: 22 }, (_, i) => ({ id: id++, x: Math.random() * 100, s: 22 + Math.random() * 26, d: i * 0.08, r: (Math.random() - 0.5) * 60 }));
      setDrops((d) => [...d, ...batch]);
      batch.forEach((b, i) => setTimeout(() => play("pop", i), b.d * 1000));
      setTimeout(() => setDrops((d) => d.filter((x) => !batch.includes(x))), 4200);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 80, pointerEvents: "none", overflow: "hidden" }}>
      <AnimatePresence>
        {drops.map((d) => (
          <motion.span
            key={d.id}
            initial={{ y: "-12vh", opacity: 1, rotate: 0 }}
            animate={{ y: "110vh", rotate: d.r }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.6, delay: d.d, ease: [0.4, 0, 0.9, 0.6] }}
            style={{ position: "absolute", left: `${d.x}%`, top: 0, fontSize: d.s }}
          >
            ☕
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
