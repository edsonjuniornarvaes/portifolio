"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { play } from "@/lib/sound";

const Anchor = styled.span`
  position: absolute; left: 50%; top: 0.07em; width: 0; height: 0; pointer-events: none;
  .ball { position: absolute; left: -0.1em; top: -0.1em; width: 0.2em; height: 0.2em; border-radius: 50%; background: var(--ink); }
`;

/**
 * O pingo do "i": cai do alto, bate no lugar e quica duas vezes até assentar.
 * Mude `trigger` para repetir. A letra deve ser "ı" (i sem pingo).
 */
export default function IDot({ trigger }: { trigger: number }) {
  const reduce = useReducedMotion();
  const ball = useAnimationControls();

  useEffect(() => {
    if (reduce) { ball.set({ y: 0, opacity: 1 }); return; }
    let live = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    ball.set({ y: "-3.4em", opacity: 0, scaleY: 1, scaleX: 1 });
    timers.push(setTimeout(() => {
      if (!live) return;
      void ball.start({
        y: ["-3.4em", "0em", "-0.55em", "0em", "-0.16em", "0em"],
        opacity: [0, 1, 1, 1, 1, 1],
        scaleY: [1.1, 0.72, 1.05, 0.86, 1, 1],
        scaleX: [0.92, 1.22, 0.97, 1.1, 1, 1],
        transition: { duration: 1.25, times: [0, 0.42, 0.62, 0.78, 0.9, 1], ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn"] },
      });
      timers.push(setTimeout(() => live && play("drop"), 1250 * 0.42));
      timers.push(setTimeout(() => live && play("tick"), 1250 * 0.78));
    }, 900));
    return () => { live = false; timers.forEach(clearTimeout); };
  }, [trigger, reduce, ball]);

  return (
    <Anchor aria-hidden>
      <motion.span className="ball" animate={ball} initial={false} style={{ transformOrigin: "50% 100%" }} />
    </Anchor>
  );
}
