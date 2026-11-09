"use client";

import { useEffect, useState } from "react";
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
  min-height: min(640px, calc(100vh - 150px));
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
`;

const Stage = styled(motion.div)`
  position: relative;
  height: 500px;
  @media (max-width: 980px) { max-width: 560px; width: 100%; margin: 0 auto; }
  @media (max-width: 520px) { height: 410px; }

  .glow { position: absolute; inset: 4% -6% 0; background: radial-gradient(55% 55% at 50% 50%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%); filter: blur(30px); }

  .browser {
    position: absolute; left: 0; top: 18px; width: 86%;
    border-radius: 16px; overflow: hidden; background: var(--card);
    border: 1px solid color-mix(in srgb, var(--ink) 16%, transparent);
    box-shadow: 0 40px 80px -30px rgba(0,0,0,0.7);
  }
  .browser .bar { display: flex; align-items: center; gap: 7px; padding: 10px 14px; background: color-mix(in srgb, var(--ink) 6%, var(--card)); border-bottom: 1px solid var(--line); }
  .browser .bar i { width: 9px; height: 9px; border-radius: 50%; background: var(--line); }
  .browser .bar i:nth-child(1) { background: #ff5f57; opacity: .85; }
  .browser .bar i:nth-child(2) { background: #febc2e; opacity: .85; }
  .browser .bar i:nth-child(3) { background: #28c840; opacity: .85; }
  .browser .bar span { margin-left: 10px; flex: 1; padding: 4px 12px; border-radius: 6px; background: color-mix(in srgb, var(--ink) 7%, transparent); font-family: var(--font-mono); font-size: 0.66rem; color: var(--muted); }
  .browser img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }

  .phone {
    position: absolute; right: 0; bottom: 0; width: 196px; padding: 6px; border-radius: 32px; background: #0b0c0e;
    border: 1px solid color-mix(in srgb, var(--ink) 22%, transparent);
    box-shadow: 0 34px 60px -22px rgba(0,0,0,0.75);
  }
  @media (max-width: 520px) { .phone { width: 150px; border-radius: 26px; } .browser { width: 92%; } }
  .phone .screen { position: relative; border-radius: 27px; overflow: hidden; background: #fff; aspect-ratio: 560 / 1213; }
  .phone .screen img { position: absolute; inset: 0; width: 100%; height: auto; opacity: 0; transition: opacity 0.7s ease; }
  .phone .screen img[data-on="true"] { opacity: 1; }

  .chip {
    position: absolute; display: inline-flex; align-items: center; gap: 8px; padding: 8px 13px; border-radius: 999px; z-index: 3;
    background: color-mix(in srgb, var(--paper) 82%, transparent); backdrop-filter: blur(10px); border: 1px solid var(--line);
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--ink); box-shadow: 0 12px 30px -14px rgba(0,0,0,0.6);
  }
  .chip b { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-2); }
  .chip.m b { background: var(--accent); }
  .chip.web { left: 4%; top: -4px; }
  .chip.mob { right: 4%; top: 46px; }
  @media (max-width: 520px) { .chip.mob { right: 0; top: 18px; } }

  .me {
    position: absolute; left: 2%; bottom: 14px; z-index: 3; display: flex; align-items: center; gap: 12px; padding: 8px 18px 8px 8px; border-radius: 999px;
    background: color-mix(in srgb, var(--paper) 86%, transparent); backdrop-filter: blur(12px); border: 1px solid var(--line);
    box-shadow: 0 20px 40px -18px rgba(0,0,0,0.65);
  }
  .me img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; object-position: center 20%; border: 2px solid var(--accent); }
  .me strong { display: block; font-size: 0.92rem; font-weight: 650; }
  .me span { font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-ink); }
`;

const PHONE_SCREENS = [
  "/images/projects/pjbank-home.webp",
  "/images/projects/mont-b2b-home.webp",
  "/images/projects/gruvi-minha-casa.webp",
  "/images/projects/consorcio-gazin-simulador.webp",
];

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 * i, ease: [0.2, 0.7, 0.2, 1] as const } }),
};

export default function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const { scrollY } = useScroll();
  const yBrowser = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -34]);
  const yPhone = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 46]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % PHONE_SCREENS.length), 3400);
    return () => clearInterval(id);
  }, [reduce]);

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
        <motion.div className="browser" style={{ y: yBrowser }}>
          <div className="bar">
            <i /><i /><i />
            <span>clube da joia · marketplace</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/projects/marketplace-web.webp" alt="Clube da Joia" />
        </motion.div>
        <motion.div className="phone" style={{ y: yPhone }}>
          <div className="screen">
            {PHONE_SCREENS.map((src, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" data-on={k === i} />
            ))}
          </div>
        </motion.div>
        <span className="chip web"><b /> {s.chipWeb}</span>
        <span className="chip mob m"><b /> {s.chipMobile}</span>
        <div className="me">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/edson.webp" alt={t.hero.portraitAlt} />
          <div>
            <strong>Edson Junior</strong>
            <span>{s.avatarRole}</span>
          </div>
        </div>
      </Stage>
    </Wrap>
  );
}
