"use client";

import { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaGlobe, FaMobileAlt } from "react-icons/fa";
import { useLang } from "@/i18n/provider";
import { localizeExperience } from "@/i18n/content";
import { ExperienceData } from "@/app/about/helper";
import TechIcon from "@/components/ui/tech-icon";

type Track = "web" | "mobile" | "both";
/** Mesma ordem de `ExperienceData` (mais recente primeiro): onde cada cargo se encaixa. */
const TRACKS: Track[] = ["mobile", "mobile", "mobile", "mobile", "web", "web"];

const Wrap = styled.div`
  position: relative;
  .lanes { display: grid; grid-template-columns: minmax(0, 1fr) 56px minmax(0, 1fr); align-items: end; margin-bottom: 18px; }
  .lane { display: flex; flex-direction: column; gap: 4px; }
  .lane.w { align-items: flex-end; text-align: right; }
  .lane strong { display: inline-flex; align-items: center; gap: 9px; font-size: 1.05rem; letter-spacing: -0.01em; }
  .lane.w strong svg { color: var(--accent-2); }
  .lane.m strong svg { color: var(--accent); }
  .lane small { font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); }
  .rows { position: relative; display: grid; gap: 22px; }
  .axis { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; margin-left: -1px; background: var(--line); border-radius: 2px; }
  .axis .fill { position: absolute; inset: 0; transform-origin: top; background: linear-gradient(180deg, var(--accent-2), var(--accent)); border-radius: 2px; }
  .row { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 56px minmax(0, 1fr); align-items: start; }
  .node { grid-column: 2; grid-row: 1; justify-self: center; z-index: 2; margin-top: 18px; width: 16px; height: 16px; border-radius: 50%; background: var(--paper); border: 3px solid var(--accent); box-shadow: 0 0 0 5px var(--paper); }
  .row.web .node { border-color: var(--accent-2); }
  .row.both .node { position: absolute; grid-column: 1 / -1; left: 50%; top: -11px; margin: 0; transform: translateX(-50%); border-color: transparent; background: var(--brand-gradient); width: 22px; height: 22px; }
  .card { grid-row: 1; padding: 16px 18px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); transition: border-color 0.25s ease, transform 0.25s ease; }
  .card:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); }
  .row.web .card { grid-column: 1; text-align: right; }
  .row.mobile .card { grid-column: 3; }
  .row.both .card { grid-column: 1 / -1; grid-row: 1; margin-inline: 8%; margin-top: 12px; padding-top: 24px; text-align: center; border-color: transparent; background: linear-gradient(var(--card), var(--card)) padding-box, var(--brand-gradient) border-box; border: 1px solid transparent; }
  .year { font-family: var(--font-mono); font-size: 0.74rem; color: var(--accent-ink); }
  .row.web .year { color: var(--accent-2); }
  .co { margin-top: 2px; font-size: 0.8rem; color: var(--muted); }
  .chips { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 4px 12px; font-family: var(--font-mono); font-size: 0.64rem; color: var(--muted); }
  .row.web .chips { justify-content: flex-end; }
  .chips span { display: inline-flex; align-items: center; gap: 5px; }
  .row.both .chips { justify-content: center; }
  h3 { margin-top: 4px; font-size: 1rem; font-weight: 650; letter-spacing: -0.015em; }
  p { margin-top: 6px; font-size: 0.86rem; color: var(--muted); line-height: 1.55; }
  .tag { display: none; }

  @media (max-width: 800px) {
    .lanes { display: none; }
    .axis { left: 12px; margin-left: 0; }
    .row, .row.both { grid-template-columns: 26px minmax(0, 1fr); }
    .node { grid-column: 1; margin-left: 0; justify-self: start; margin-top: 18px; }
    .row.both .node { grid-column: 1; left: 3px; top: 16px; transform: none; margin: 0; }
    .row.both .card { margin-top: 0; padding-top: 16px; }
    .row.web .card, .row.mobile .card, .row.both .card { grid-column: 2; text-align: left; margin-inline: 0; }
    .row.web .chips { justify-content: flex-start; }
    .tag { display: inline-flex; align-items: center; gap: 6px; margin-bottom: 6px; padding: 2px 9px; border-radius: 999px; font-family: var(--font-mono); font-size: 0.62rem; border: 1px solid var(--line); color: var(--muted); }
    .row.web .tag { color: var(--accent-2); }
    .row.mobile .tag { color: var(--accent); }
  }
`;

export default function Experience() {
  const { lang, t } = useLang();
  const jobs = localizeExperience(ExperienceData, lang);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const s = t.site;
  const label = { web: s.laneWeb, mobile: s.laneMobile, both: s.laneBoth } as const;

  return (
    <Wrap>
      <div className="lanes" aria-hidden>
        <div className="lane w">
          <strong><FaGlobe /> {s.laneWeb}</strong>
          <small>{s.laneWebStack}</small>
        </div>
        <span />
        <div className="lane m">
          <strong><FaMobileAlt /> {s.laneMobile}</strong>
          <small>{s.laneMobileStack}</small>
        </div>
      </div>
      <div className="rows" ref={ref}>
        <div className="axis" aria-hidden>
          <motion.div className="fill" style={{ scaleY }} />
        </div>
        <motion.div
          className="row both"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="node" aria-hidden />
          <div className="card">
            <span className="tag">{label.both}</span>
            <div className="year">{s.ownPeriod}</div>
            <h3>{s.ownRole}</h3>
            <div className="co">{s.ownTitle}</div>
            <p>{s.ownText}</p>
          </div>
        </motion.div>
        {jobs.map((j, i) => {
          const track = TRACKS[i] ?? "mobile";
          return (
            <motion.div
              key={`${j.company}-${j.period}`}
              className={`row ${track}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="node" aria-hidden />
              <div className="card">
                <span className="tag">{label[track]}</span>
                <div className="year">{j.period}</div>
                <h3>{j.role}</h3>
                <div className="co">{j.company} · {j.location}</div>
                <p>{j.description}</p>
                <div className="chips">
                  {j.skills.slice(0, 4).map((k) => (
                    <span key={k}>
                      <TechIcon name={k} size={11} />
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Wrap>
  );
}
