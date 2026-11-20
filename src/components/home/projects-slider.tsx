"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import Link from "next/link";
import styled from "styled-components";
import ProjectCard from "@/components/project-card";
import { projectsTotal } from "@/app/projects/helper";
import { useLang } from "@/i18n/provider";

/** Portfólio de venda: os projetos que melhor mostram o que eu entrego. Todos continuam em /projects. */
const IDS = ["pjbank", "gruvi", "mont-capital", "minha-navex", "gazin", "erp-sistemas", "clube-da-joia-marketplace", "multjet"];

const Box = styled.div`
  .lead { max-width: 40rem; margin: -10px 0 22px; color: var(--muted); line-height: 1.65; }
  .bar { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
  .hint { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); display: inline-flex; align-items: center; gap: 10px; }
  .hint i { display: inline-block; width: 22px; height: 12px; border: 1.5px solid var(--accent); border-radius: 99px; position: relative; }
  .hint i::after { content: ""; position: absolute; top: 1.5px; left: 2px; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: nudge 1.8s ease-in-out infinite; }
  @keyframes nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(8px); } }
  .prog { flex: 1; height: 2px; border-radius: 2px; background: var(--line); overflow: hidden; }
  .prog b { display: block; height: 100%; width: 100%; background: var(--accent); transform-origin: left; transform: scaleX(var(--p, 0.15)); transition: transform 0.15s linear; }
  .arrows { display: flex; gap: 8px; }
  .arrows button { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--line); background: color-mix(in srgb, var(--card) 70%, transparent); color: var(--ink); cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
  .arrows button:hover:not(:disabled) { border-color: var(--accent); color: var(--accent-ink); transform: translateY(-2px); }
  .arrows button:disabled { opacity: 0.35; cursor: default; }
  .track { display: flex; gap: 20px; list-style: none; overflow-x: auto; scroll-snap-type: x proximity; padding: 10px 4px 26px; margin: 0 -4px; scrollbar-width: none; cursor: grab; overscroll-behavior-x: contain; }
  .track::-webkit-scrollbar { display: none; }
  .track.drag { cursor: grabbing; scroll-snap-type: none; user-select: none; }
  .track.drag a { pointer-events: none; }
  .track > li { flex: 0 0 min(372px, 80vw); scroll-snap-align: start; }
  .all { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 14px; height: 100%; min-height: 380px; padding: 30px; border: 1px dashed color-mix(in srgb, var(--accent) 45%, var(--line)); border-radius: 18px; transition: border-color 0.25s ease, background 0.25s ease; }
  .all:hover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 6%, transparent); }
  .all b { font-size: 1.7rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1.12; }
  .all span { color: var(--muted); }
  .all em { font-style: normal; display: inline-flex; align-items: center; gap: 8px; height: 48px; padding: 0 20px; border-radius: 99px; background: var(--accent); color: var(--on-accent); font-weight: 600; }
`;

export default function ProjectsSlider() {
  const { t } = useLang();
  const track = useRef<HTMLUListElement>(null);
  const [drag, setDrag] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false });
  const g = useRef({ x: 0, left: 0, moved: false, on: false });
  const total = projectsTotal();

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    el.parentElement?.style.setProperty("--p", String(Math.max(0.08, p)));
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
  }, []);
  useEffect(() => { sync(); window.addEventListener("resize", sync); return () => window.removeEventListener("resize", sync); }, [sync]);

  const down = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    g.current = { x: e.clientX, left: track.current!.scrollLeft, moved: false, on: true };
  };
  const move = (e: React.PointerEvent) => {
    const s = g.current;
    if (!s.on) return;
    const dx = e.clientX - s.x;
    if (!s.moved && Math.abs(dx) > 6) { s.moved = true; setDrag(true); track.current?.setPointerCapture(e.pointerId); }
    if (s.moved) track.current!.scrollLeft = s.left - dx;
  };
  const up = () => { g.current.on = false; if (g.current.moved) setTimeout(() => setDrag(false), 0); };
  const by = (dir: number) => track.current?.scrollBy({ left: dir * 392, behavior: "smooth" });

  return (
    <Box>
      <p className="lead">{t.work.portfolioLead}</p>
      <div className="bar">
        <span className="hint"><i aria-hidden />{t.work.sliderHint}</span>
        <div className="prog" aria-hidden><b /></div>
        <div className="arrows">
          <button type="button" onClick={() => by(-1)} disabled={edge.start} aria-label={t.work.prev}><ChevronLeft width="18" height="18" /></button>
          <button type="button" onClick={() => by(1)} disabled={edge.end} aria-label={t.work.next}><ChevronRight width="18" height="18" /></button>
        </div>
      </div>
      <ul
        ref={track}
        className={`track${drag ? " drag" : ""}`}
        onScroll={sync}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onDragStart={(e) => e.preventDefault()}
      >
        {IDS.map((id) => (
          <li key={id}>
            {id === "clube-da-joia-marketplace"
              ? <ProjectCard id={id} level="h3" pair="clube-da-joia-app" title={t.work.clubeTitle} tagline={t.work.clubeText} />
              : <ProjectCard id={id} level="h3" />}
          </li>
        ))}
        <li>
          <Link className="all" href="/projects">
            <span>{t.work.allCount.replace("{n}", String(total))}</span>
            <b>{t.work.all}</b>
            <em>{t.work.seeAll} <ChevronRight /></em>
          </Link>
        </li>
      </ul>
    </Box>
  );
}
