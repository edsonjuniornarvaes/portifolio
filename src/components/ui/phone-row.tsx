"use client";

import styled from "styled-components";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLang } from "@/i18n/provider";

export type Screen = { src: string; id?: string; app: string; note: string };

const Row = styled.section`
  margin-top: 28px;
  .head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 14px; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  .head b { color: var(--accent-ink); font-weight: 600; }
  .rail {
    display: flex; gap: 16px; justify-content: center; align-items: flex-start;
    overflow-x: auto; padding: 14px 4px 22px; scroll-snap-type: x mandatory; scrollbar-width: none;
  }
  .rail::-webkit-scrollbar { display: none; }
  @media (max-width: 1100px) { .rail { justify-content: flex-start; } }
  figure { margin: 0; flex: 1 0 138px; max-width: 188px; scroll-snap-align: center; }
  @media (max-width: 760px) { figure { flex: 0 0 176px; } }
  figure:nth-child(even) { margin-top: 26px; }
  figure a { display: block; color: inherit; }
  figure a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 6px; border-radius: 30px; }
  .phone { transition: transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.3s ease, box-shadow 0.3s ease; }
  figure:hover .phone { transform: translateY(-8px); border-color: color-mix(in srgb, var(--accent) 60%, transparent); box-shadow: 0 30px 56px -22px color-mix(in srgb, var(--accent) 40%, #000); }
  .phone {
    border-radius: 30px; padding: 6px; background: #0b0c0e;
    border: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
    box-shadow: 0 26px 50px -22px rgba(0,0,0,0.6);
  }
  /* proporção exata das telas: nada é cortado nas laterais */
  .screen { border-radius: 25px; overflow: hidden; background: #fff; aspect-ratio: 560 / 1213; }
  .screen img { display: block; width: 100%; height: auto; }
  figcaption { margin-top: 12px; font-size: 0.78rem; color: var(--muted); }
  figcaption b { display: block; color: var(--ink); font-weight: 650; font-size: 0.84rem; }
`;

function Phone({ s, k, progress }: { s: Screen; k: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const amp = reduce ? 0 : k % 2 ? 22 : -18;
  const y = useTransform(progress, [0, 1], [amp, -amp]);
  return (
    <motion.figure style={{ y }}>
      <Link href={s.id ? `/projects/${s.id}` : "/projects"} aria-label={`${s.app}: ${s.note}`}>
        <div className="phone">
          <div className="screen">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={`${s.app}: ${s.note}`} loading="lazy" />
          </div>
        </div>
        <figcaption>
          <b>{s.app}</b>
          {s.note}
        </figcaption>
      </Link>
    </motion.figure>
  );
}

/** Telas reais dos apps que desenvolvi, em tamanho de celular. */
export default function PhoneRow({ screens }: { screens: Screen[] }) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <Row ref={ref} aria-label={t.phones.section}>
      <div className="head">
        <span>
          <b>{"//"}</b> {t.phones.head}
        </span>
      </div>
      <div className="rail">
        {screens.map((s, k) => (
          <Phone key={s.src} s={s} k={k} progress={scrollYProgress} />
        ))}
      </div>
    </Row>
  );
}
