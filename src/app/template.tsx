"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Transição suave entre páginas: entra com um leve fade e subida. Sem movimento se o usuário pediu para reduzir. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
