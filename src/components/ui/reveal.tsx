"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Entrada "à la Apple": o bloco aparece conforme você rola (sobe, cresce e ganha opacidade) e
 * desfaz o efeito se você voltar a rolagem. Fica ligado ao scroll, não a um tempo fixo.
 */
export default function Reveal({ children, y = 56, from = 0.965, className, style }: { children: React.ReactNode; y?: number; from?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.98", "start 0.58"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const ty = useTransform(scrollYProgress, [0, 1], [y, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  if (reduce) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ opacity, y: ty, scale, transformOrigin: "50% 100%", willChange: "transform, opacity", ...style }}>
      {children}
    </motion.div>
  );
}
