"use client";

import Link from "next/link";
import styled from "styled-components";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CountUp from "@/components/ui/count-up";
import { useLang } from "@/i18n/provider";
import { yearsCareer, yearsMobile, yearsStudying } from "@/data/profile";

const Wrap = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
  gap: 40px;
  align-items: center;
  padding: 8px 0 24px;
  min-height: min(600px, calc(100vh - 150px));
  @media (max-width: 980px) { grid-template-columns: 1fr; min-height: 0; gap: 36px; }

  .pill {
    display: inline-flex; align-items: center; gap: 9px; padding: 7px 14px 7px 12px; border-radius: 999px;
    border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--line));
    background: color-mix(in srgb, var(--accent) 9%, transparent);
    font-family: var(--font-mono); font-size: 0.74rem; color: var(--accent-ink);
  }
  .pill i { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: ping 2.2s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.7); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }

  .eyebrow { margin-top: 22px; font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.08em; color: var(--muted); }
  h1 {
    margin-top: 12px; font-size: clamp(2.5rem, 5.6vw, 4.5rem); line-height: 1.02; letter-spacing: -0.035em; font-weight: 700;
  }
  h1 span { display: block; }
  h1 .grad { background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; padding-bottom: 0.08em; }
  .lead { margin-top: 20px; max-width: 34rem; color: var(--muted); font-size: 1.06rem; line-height: 1.7; }
  .cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
  .btn {
    display: inline-flex; align-items: center; gap: 8px; height: 46px; padding: 0 22px; border-radius: 999px; font-weight: 600; font-size: 0.92rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }
  .btn.primary { background: var(--accent); color: var(--on-accent); box-shadow: 0 10px 30px -12px var(--accent); }
  .btn.primary:hover { transform: translateY(-2px); box-shadow: 0 16px 34px -12px var(--accent); }
  .btn.ghost { border: 1px solid var(--line); color: var(--ink); }
  .btn.ghost:hover { border-color: var(--accent-ink); color: var(--accent-ink); transform: translateY(-2px); }
  .stats { display: flex; flex-wrap: wrap; gap: 14px 34px; margin-top: 34px; padding-top: 20px; border-top: 1px solid var(--line); }
  .stats dt { font-family: var(--font-condensed); font-size: 1.9rem; line-height: 1; color: var(--ink); }
  .stats dt span { color: var(--accent-ink); }
  .stats dd { margin-top: 4px; font-size: 0.74rem; color: var(--muted); max-width: 9.5rem; line-height: 1.35; }
  @media (max-width: 520px) { .stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; } .stats dt { font-size: 1.6rem; } .stats dd { font-size: 0.68rem; } }
`;

const Stage = styled(motion.div)`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 460px;
  @media (max-width: 980px) { min-height: 0; padding: 8px 0 18px; }

  .glow { position: absolute; width: 80%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 26%, transparent), transparent 68%); filter: blur(34px); }
  .ring {
    position: relative; width: min(100%, 380px); aspect-ratio: 4 / 5; padding: 3px; border-radius: 34px; transform: rotate(2deg);
    background: linear-gradient(150deg, var(--accent), var(--accent-2) 55%, color-mix(in srgb, var(--accent) 20%, transparent));
    box-shadow: 0 40px 80px -34px rgba(0,0,0,0.8);
    transition: transform 0.5s cubic-bezier(.2,.7,.2,1);
  }
  .ring:hover { transform: rotate(0deg) scale(1.015); }
  .ring img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center 18%; border-radius: 31px; }

  .chip {
    position: absolute; display: inline-flex; align-items: center; gap: 8px; padding: 8px 13px; border-radius: 999px; z-index: 3;
    background: color-mix(in srgb, var(--paper) 82%, transparent); backdrop-filter: blur(10px); border: 1px solid var(--line);
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--ink); box-shadow: 0 12px 30px -14px rgba(0,0,0,0.6);
    animation: bob 6s ease-in-out infinite;
  }
  .chip b { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-2); }
  .chip.m b { background: var(--accent); }
  .chip.web { left: 2%; top: 8%; }
  .chip.mob { right: 0; bottom: 12%; animation-delay: -3s; }
  @keyframes bob { 50% { transform: translateY(-7px); } }
  @media (max-width: 520px) { .chip.web { left: 0; } }
  @media (prefers-reduced-motion: reduce) { .chip { animation: none; } }
`;

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 * i, ease: [0.2, 0.7, 0.2, 1] as const } }),
};

export default function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -28]);
  const s = t.site;
  return (
    <Wrap id="top">
      <div>
        <motion.span className="pill" variants={rise} initial="hidden" animate="show" custom={0}>
          <i /> {s.heroPill}
        </motion.span>
        <motion.p className="eyebrow" variants={rise} initial="hidden" animate="show" custom={1}>
          {s.heroEyebrow}
        </motion.p>
        <motion.h1 variants={rise} initial="hidden" animate="show" custom={2}>
          <span>{s.heroH1a}</span>
          <span className="grad">{s.heroH1b}</span>
        </motion.h1>
        <motion.p className="lead" variants={rise} initial="hidden" animate="show" custom={3}>
          {s.heroLead}
        </motion.p>
        <motion.div className="cta" variants={rise} initial="hidden" animate="show" custom={4}>
          <Link className="btn primary" href="/home#trabalhos">
            {s.ctaWork} →
          </Link>
          <Link className="btn ghost" href="/home#contato">
            {s.ctaTalk}
          </Link>
        </motion.div>
        <motion.dl className="stats" variants={rise} initial="hidden" animate="show" custom={5}>
          <div>
            <dt><CountUp to={yearsCareer} suffix="+" /></dt>
            <dd>{t.hero.statCareer}</dd>
          </div>
          <div>
            <dt><CountUp to={yearsMobile} suffix="+" /></dt>
            <dd>{t.hero.statMobile}</dd>
          </div>
          <div>
            <dt><CountUp to={yearsStudying} suffix="+" /></dt>
            <dd>{t.hero.statTech}</dd>
          </div>
        </motion.dl>
      </div>

      <Stage initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}>
        <div className="glow" aria-hidden />
        <motion.div className="ring" style={{ y }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/edson.webp" alt={t.hero.portraitAlt} />
        </motion.div>
        <span className="chip web"><b /> {s.chipWeb}</span>
        <span className="chip mob m"><b /> {s.chipMobile}</span>
      </Stage>
    </Wrap>
  );
}
