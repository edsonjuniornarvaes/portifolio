"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useLang } from "@/i18n/provider";
import { CAREER_SINCE, MOBILE_SINCE, STUDY_SINCE } from "@/data/profile";
import { personalProjects, professionalProjects, webProjects } from "@/app/projects/helper";

const Row = styled.div`
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-block: 1px solid var(--line);
  @media (max-width: 760px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .c { padding: 36px 24px 32px 0; }
  @media (max-width: 760px) { .c { padding: 26px 16px 24px 0; } .c:nth-child(n + 3) { border-top: 1px solid var(--line); } }
  .v { font-size: clamp(2.8rem, 6.4vw, 5.4rem); font-weight: 700; line-height: 1; letter-spacing: -0.05em; }
  .v sup { font-size: 0.45em; vertical-align: 0.9em; color: var(--accent); margin-left: 2px; }
  .l { margin-top: 12px; max-width: 14rem; font-size: 0.95rem; line-height: 1.4; color: var(--muted); }
`;

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{v}</span>;
}

export default function Numbers() {
  const { t } = useLang();
  const y = new Date().getFullYear();
  const total = [...personalProjects, ...professionalProjects, ...webProjects].length;
  const vals = [y - STUDY_SINCE, y - CAREER_SINCE, y - MOBILE_SINCE, total];
  return (
    <Row>
      {t.numbers.items.map((l, i) => (
        <div className="c" key={l}>
          <div className="v"><Count to={vals[i]} /><sup>+</sup></div>
          <div className="l">{l}</div>
        </div>
      ))}
    </Row>
  );
}
