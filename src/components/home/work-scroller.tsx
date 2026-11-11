"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Phone from "@/components/ui/phone";
import WebWire from "@/components/ui/web-wire";
import Tilt from "@/components/ui/tilt";
import { useLang } from "@/i18n/provider";
import { localizeProject } from "@/i18n/content";
import { getProjectById, personalProjects, professionalProjects, webProjects } from "@/app/projects/helper";
import { SHOWCASE, isWebId, projectColor } from "@/data/work";

const Section = styled.section`
  position: relative;
  @media (max-width: 959px) { height: auto !important; }

  .pin { position: sticky; top: var(--header); height: calc(100svh - var(--header)); overflow: hidden; }
  @media (max-width: 959px) { .pin { position: static; height: auto; overflow: visible; } }

  .track { display: flex; height: 100%; will-change: transform; }
  @media (max-width: 959px) { .track { flex-direction: column; transform: none !important; } }

  .slide { position: relative; flex: none; width: 100vw; height: 100%; display: flex; align-items: center; padding: 0 var(--gutter); }
  @media (max-width: 959px) { .slide { width: 100%; height: auto; padding: 44px var(--gutter); border-top: 1px solid var(--line); } }

  .in { position: relative; z-index: 1; width: 100%; max-width: var(--wrap); margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: 64px; align-items: center; }
  @media (max-width: 959px) { .in { grid-template-columns: 1fr; gap: 36px; } }

  .big { position: absolute; right: 2%; bottom: -6%; z-index: 0; font-size: 36vw; line-height: 0.8; font-weight: 700; letter-spacing: -0.06em; color: transparent; -webkit-text-stroke: 1px var(--line); pointer-events: none; user-select: none; }
  @media (max-width: 959px) { .big { display: none; } }

  .meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; font-size: 0.95rem; color: var(--muted); }
  .meta .idx { color: var(--pc); font-weight: 600; }
  .meta .st::before { content: "●"; margin-right: 6px; color: var(--sc); }
  h3 { margin-top: 18px; font-size: clamp(2.8rem, 6.4vw, 6rem); font-weight: 700; line-height: 0.98; letter-spacing: -0.045em; }
  .tag { margin-top: 18px; max-width: 30rem; font-size: 1.15rem; line-height: 1.55; color: var(--muted); }
  .tags { margin-top: 22px; display: flex; flex-wrap: wrap; gap: 8px; }
  .tags span { padding: 6px 13px; border: 1px solid var(--line); border-radius: 99px; font-size: 0.84rem; color: var(--muted); }
  .open { display: inline-flex; align-items: center; gap: 10px; margin-top: 30px; height: 50px; padding: 0 26px; border: 1px solid var(--pc); border-radius: 99px; font-size: 1rem; font-weight: 500; color: var(--ink); transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease; }
  .open:hover { background: var(--pc); color: #05070a; transform: translateX(6px); }

  .vis { position: relative; display: grid; place-items: center; }
  .vis::before { content: ""; position: absolute; width: 78%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--pc) 28%, transparent), transparent 66%); filter: blur(10px); }
  .vis > * { position: relative; }
  .wire { width: min(520px, 100%); }
  @media (max-width: 959px) { .vis { order: -1; } }

  .end { flex-direction: column; justify-content: center; text-align: center; gap: 22px; }
  .end a { font-size: clamp(2.2rem, 6vw, 5rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.05; transition: color 0.2s ease; }
  .end a:hover { color: var(--accent); }
  .end small { color: var(--muted); font-size: 1rem; }
  .end { align-items: center; }

  .hud { position: absolute; left: var(--gutter); right: var(--gutter); bottom: 22px; z-index: 5; display: flex; align-items: center; gap: 18px; max-width: var(--wrap); margin: 0 auto; font-size: 0.85rem; color: var(--muted); pointer-events: none; }
  .hud .bar { flex: 1; height: 2px; background: var(--line); border-radius: 2px; overflow: hidden; }
  .hud .bar i { display: block; height: 100%; width: 100%; background: var(--accent); transform-origin: 0 50%; }
  .hud b { color: var(--accent); font-weight: 500; }
  .hint { position: absolute; top: 18px; right: var(--gutter); z-index: 5; font-size: 0.85rem; color: var(--muted); animation: nudge 1.8s ease-in-out infinite; }
  @keyframes nudge { 50% { transform: translateX(8px); } }
  @media (max-width: 959px) { .hud, .hint { display: none; } }
  @media (prefers-reduced-motion: reduce) { .hint { animation: none; } }
`;

const STATUS_COLOR = { production: "#2eebaa", development: "#ffcb6b", paused: "#8c95a3" } as const;

export default function WorkScroller() {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const n = SHOWCASE.length + 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `${-(n - 1) * 100}vw`]);
  const [cur, setCur] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => setCur(Math.min(n, Math.round(v * (n - 1)) + 1)));
  const total = [...personalProjects, ...professionalProjects, ...webProjects].length;

  return (
    <Section ref={ref} style={{ height: `calc((100svh - var(--header)) * ${1 + (n - 1) * 0.85})` }}>
      <div className="pin">
        <motion.div className="track" style={{ x }}>
          {SHOWCASE.map((s, i) => {
            const base = getProjectById(s.id);
            if (!base) return null;
            const p = localizeProject(base, lang);
            const web = isWebId(s.id);
            const color = projectColor(s.id);
            return (
              <article key={s.id} className="slide" style={{ ["--pc" as string]: color, ["--sc" as string]: STATUS_COLOR[p.status] }}>
                <div className="big" aria-hidden>{String(i + 1).padStart(2, "0")}</div>
                <div className="in">
                  <div>
                    <div className="meta">
                      <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                      <span>{web ? t.work.web : t.work.app} · {s.year}</span>
                      <span className="st">{t.status[p.status]}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p className="tag">{p.tagline}</p>
                    <div className="tags">{p.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <Link className="open" href={`/projects/${s.id}`}>{t.work.open} <span aria-hidden>→</span></Link>
                  </div>
                  <div className="vis">
                    {web || !s.screen ? (
                      <Tilt className="wire" max={6}><WebWire color={color} url={p.title} /></Tilt>
                    ) : (
                      <Tilt max={10}><Phone screens={[s.screen]} alt={p.title} width={260} /></Tilt>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
          <article className="slide end">
            <small>{t.work.allCount.replace("{n}", String(total))}</small>
            <Link href="/projects">{t.work.all} →</Link>
          </article>
        </motion.div>

        <div className="hint" aria-hidden>{t.work.hint} →</div>
        <div className="hud" aria-hidden>
          <span><b>{String(cur).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}</span>
          <span className="bar"><motion.i style={{ scaleX: scrollYProgress }} /></span>
        </div>
      </div>
    </Section>
  );
}
