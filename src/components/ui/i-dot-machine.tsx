"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { play } from "@/lib/sound";

const Anchor = styled.span`
  position: absolute; left: 50%; top: 0.07em; width: 0; height: 0; pointer-events: none;
  .ball { position: absolute; left: -0.1em; top: -0.1em; width: 0.2em; height: 0.2em; border-radius: 50%; background: var(--ink); }
  .thread { position: absolute; left: -0.5px; bottom: 0.1em; width: 1px; height: 120vh; background: color-mix(in srgb, var(--ink) 55%, transparent); }
  .claw { position: absolute; left: -0.18em; bottom: 0.08em; width: 0.36em; height: 0.24em; }
  .claw svg { width: 100%; height: 100%; display: block; overflow: visible; }
`;

/**
 * O pingo do "i": uma garrinha desce pelo fio, coloca o pingo no lugar e sobe de volta.
 * Mude `trigger` para repetir. A letra deve ser "ı" (i sem pingo).
 */
export default function IDot({ trigger }: { trigger: number }) {
  const reduce = useReducedMotion();
  const rig = useAnimationControls();
  const gear = useAnimationControls();

  useEffect(() => {
    if (reduce) { rig.set({ y: 0 }); gear.set({ opacity: 0 }); return; }
    let live = true;
    (async () => {
      rig.set({ y: "-85vh", opacity: 1 });
      gear.set({ y: 0, opacity: 1 });
      await new Promise((r) => setTimeout(r, 900));
      if (!live) return;
      await rig.start({ y: 0, transition: { duration: 1.1, ease: [0.3, 0, 0.2, 1] } });
      if (!live) return;
      play("drop");
      await new Promise((r) => setTimeout(r, 250));
      if (!live) return;
      await gear.start({ y: "-90vh", opacity: 0, transition: { duration: 0.9, ease: "easeIn" } });
    })();
    return () => { live = false; };
  }, [trigger, reduce, rig, gear]);

  return (
    <Anchor aria-hidden>
      <motion.span animate={rig} initial={false} style={{ position: "absolute", left: 0, top: 0 }}>
        <motion.span animate={gear} initial={false} style={{ position: "absolute", left: 0, top: 0 }}>
          <span className="thread" />
          <span className="claw">
            <svg viewBox="0 0 34 22" fill="none" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 0v8M5 20c0-8 4-12 12-12s12 4 12 12" /></svg>
          </span>
        </motion.span>
        <span className="ball" />
      </motion.span>
    </Anchor>
  );
}
