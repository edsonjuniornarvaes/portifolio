"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Phone from "@/components/ui/phone";

const P = "/images/projects/";
/** Telas reais de apps que entreguei; a ordem segue a do portfólio (a Superlógica fica de fora: a única captura mostra "Área Pix"). */
const SHOTS = [
  { id: "gruvi", name: "Gruvi", src: `${P}gruvi-home.webp` },
  { id: "clube-da-joia-marketplace", name: "Clube da Joia", src: `${P}clube-app-home.webp` },
  { id: "mont-capital", name: "Mont Capital", src: `${P}mont-home-alt.webp` },
  { id: "minha-navex", name: "Minha Navex", src: `${P}navex-home-new.webp` },
  { id: "gazin", name: "Grupo Gazin", src: `${P}consorcio-gazin-simulador.webp` },
];

const Box = styled.div`
  display: grid; justify-items: center; gap: 16px;
  .ph { display: block; border-radius: 34px; transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1); }
  .ph:hover { transform: translateY(-6px); }
  .ph:active { transform: translateY(-3px) scale(0.99); }
  .ph:focus-visible { outline: 2px solid var(--accent); outline-offset: 6px; }
  .cap { display: flex; align-items: center; gap: 12px; height: 28px; }
  .cap a { font-size: 0.95rem; font-weight: 600; letter-spacing: -0.01em; }
  .cap a:hover { color: var(--accent-ink); }
  .dots { display: flex; gap: 2px; }
  .dots button { display: grid; place-items: center; width: 22px; height: 22px; padding: 0; border: 0; background: none; cursor: pointer; }
  .dots i { display: block; width: 7px; height: 7px; border-radius: 99px; background: var(--line); transition: width 0.3s cubic-bezier(0.23, 1, 0.32, 1), background 0.2s ease; }
  .dots button[aria-current="true"] i { width: 20px; background: var(--accent); }
  .dots button:focus-visible { outline: 2px solid var(--accent); border-radius: 6px; }
`;

/** Celular grande com telas de apps reais: troca sozinho de tempos em tempos, para quando você chega perto e responde às bolinhas. */
export default function HeroPhone({ width = 232 }: { width?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (reduce || hold) return;
    const id = setInterval(() => { if (document.visibilityState === "visible") setI((v) => (v + 1) % SHOTS.length); }, 3800);
    return () => clearInterval(id);
  }, [reduce, hold]);

  const cur = SHOTS[i];
  return (
    <Box onPointerEnter={(e) => { if (e.pointerType === "mouse") setHold(true); }} onPointerLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <Link href={`/projects/${cur.id}`} className="ph" aria-label={cur.name}>
        <Phone screens={SHOTS.map((s) => s.src)} active={i} alt="" width={width} />
      </Link>
      <div className="cap">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={cur.id} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
            <Link href={`/projects/${cur.id}`}>{cur.name}</Link>
          </motion.span>
        </AnimatePresence>
        <div className="dots" role="group" aria-label="Projetos">
          {SHOTS.map((s, k) => (
            <button key={s.id} type="button" aria-label={s.name} aria-current={k === i} onClick={() => setI(k)}><i /></button>
          ))}
        </div>
      </div>
    </Box>
  );
}
