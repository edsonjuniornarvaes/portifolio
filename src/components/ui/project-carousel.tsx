"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import type { Project } from "@/app/projects/helper";

const STATUS = { production: "No ar", development: "Em desenvolvimento", paused: "Entregue" } as const;
const TONE = { production: "#4ade80", development: "#fbbf24", paused: "var(--muted)" } as const;

const Wrap = styled.div`
  position: relative;
  .track {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding: 6px 2px 18px;
    margin: 0 -2px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .track::-webkit-scrollbar { display: none; }
  .controls { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 4px; }
  .dots { display: flex; gap: 6px; }
  .dots button { width: 7px; height: 7px; border-radius: 99px; border: 0; padding: 0; cursor: pointer; background: var(--line); transition: width 0.25s ease, background 0.25s ease; }
  .dots button[aria-current="true"] { width: 22px; background: var(--accent); }
  .arrows { display: flex; gap: 8px; }
  .arrows button {
    width: 40px; height: 40px; border-radius: 12px; cursor: pointer; display: grid; place-items: center;
    border: 1px solid var(--line); background: var(--card); color: var(--ink); font-size: 1rem;
    transition: border-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
  }
  .arrows button:hover:not(:disabled) { border-color: var(--accent-ink); color: var(--accent-ink); }
  .arrows button:disabled { opacity: 0.35; cursor: default; }
`;

const Card = styled(Link)<{ $color?: string }>`
  flex: 0 0 min(330px, 82%);
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--card);
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--accent) 50%, var(--line)); box-shadow: 0 18px 44px var(--glow); }
  .cover {
    height: 150px; overflow: hidden; display: grid; place-items: center; position: relative;
    background:
      radial-gradient(ellipse 80% 90% at 30% 0%, color-mix(in srgb, ${(p) => p.$color ?? "#2eebaa"} 70%, transparent), transparent 75%),
      var(--paper-2);
    border-bottom: 1px solid var(--line);
  }
  .cover img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.6s ease; }
  &:hover .cover img { transform: scale(1.05); }
  .cover .letter { font-size: 2rem; font-weight: 750; letter-spacing: -0.03em; color: #fff; text-shadow: 0 4px 24px rgba(0,0,0,0.4); }
  .body { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
  .top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  h3 { font-size: 1.02rem; font-weight: 650; letter-spacing: -0.02em; }
  .st { font-family: var(--font-mono); font-size: 0.66rem; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; color: var(--c); }
  .st::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--c); }
  p { font-size: 0.88rem; line-height: 1.55; color: var(--muted); flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
  .tags span { font-family: var(--font-mono); font-size: 0.68rem; padding: 3px 8px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); }
`;

/** Carrossel horizontal com snap, setas e indicadores. */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("a") as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : 1;
    setIndex(Math.min(projects.length - 1, Math.round(el.scrollLeft / step)));
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, [projects.length]);

  useEffect(() => {
    update();
    const el = trackRef.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("a") as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16), behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    const card = el?.querySelector("a") as HTMLElement | null;
    if (el && card) el.scrollTo({ left: i * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <Wrap>
      <div className="track" ref={trackRef} tabIndex={0} aria-label="Projetos em destaque">
        {projects.map((p) => (
          <Card key={p.id} href={`/projects/${p.id}`} $color={p.iconColor}>
            <div className="cover">
              {p.galleryImages?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.galleryImages[0]} alt={`Tela de ${p.title}`} />
              ) : (
                <span className="letter">{p.iconLetter ?? p.title[0]}</span>
              )}
            </div>
            <div className="body">
              <div className="top">
                <h3>{p.title}</h3>
                <span className="st" style={{ ["--c" as string]: TONE[p.status] }}>
                  {STATUS[p.status]}
                </span>
              </div>
              <p>{p.description}</p>
              <div className="tags">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="controls">
        <div className="dots">
          {projects.map((p, i) => (
            <button key={p.id} aria-label={`Ir para ${p.title}`} aria-current={i === index} onClick={() => goTo(i)} />
          ))}
        </div>
        <div className="arrows">
          <button aria-label="Anterior" onClick={() => go(-1)} disabled={atStart}>
            ←
          </button>
          <button aria-label="Próximo" onClick={() => go(1)} disabled={atEnd}>
            →
          </button>
        </div>
      </div>
    </Wrap>
  );
}
