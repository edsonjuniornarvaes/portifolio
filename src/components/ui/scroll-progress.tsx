"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barrinha fina no topo da página que mostra o quanto já foi rolado. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return <motion.div aria-hidden style={{ scaleX, transformOrigin: "0 50%", position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "var(--accent)", zIndex: 80 }} />;
}
