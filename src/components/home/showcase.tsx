"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Phone from "@/components/ui/phone";
import WebWire from "@/components/ui/web-wire";
import { useLang } from "@/i18n/provider";
import { localizeProject } from "@/i18n/content";
import { getProjectById, personalProjects, professionalProjects, webProjects } from "@/app/projects/helper";
import { SHOWCASE, isWebId, projectColor } from "@/data/work";

const Box = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(32px, 6vw, 96px);

  .block { min-height: 86svh; display: flex; flex-direction: column; justify-content: center; padding: 48px 0; }
  .meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; font-size: 0.92rem; color: var(--muted); }
  .meta .idx { font-family: var(--font-mono); color: var(--pc); font-weight: 600; }
  .meta .st::before { content: "●"; margin-right: 6px; color: var(--sc); }
  h3 { margin-top: 18px; font-size: clamp(2.6rem, 5.4vw, 5rem); font-weight: 700; line-height: 1; letter-spacing: -0.05em; }
  .tag { margin-top: 18px; max-width: 30rem; font-size: 1.15rem; line-height: 1.6; color: var(--muted); }
  .tags { margin-top: 22px; display: flex; flex-wrap: wrap; gap: 8px; }
  .tags span { padding: 6px 13px; border: 1px solid var(--line); border-radius: 99px; font-size: 0.84rem; color: var(--muted); }
  .open { align-self: flex-start; display: inline-flex; align-items: center; gap: 10px; margin-top: 30px; height: 50px; padding: 0 26px; border: 1px solid var(--pc); border-radius: 99px; font-size: 1rem; font-weight: 500; transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease; }
  .open:hover { background: var(--pc); color: #05070a; transform: translateX(6px); }
  .block[data-on="false"] .txt { opacity: 0.35; }
  .txt { transition: opacity 0.5s ease; }

  .sticky { position: sticky; top: calc(var(--header) + 20px); height: calc(100svh - var(--header) - 40px); }
  .stack { position: relative; width: 100%; height: 100%; }
  .v { position: absolute; inset: 0; display: grid; place-items: center; opacity: 0; transform: translateY(44px) scale(0.96); transition: opacity 0.6s ease, transform 0.9s cubic-bezier(.2,.7,.2,1); pointer-events: none; }
  .v[data-s="on"] { opacity: 1; transform: none; }
  .v[data-s="before"] { transform: translateY(-44px) scale(0.96); }
  .v::before { content: ""; position: absolute; width: min(88%, 62svh); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--pc) 26%, transparent), transparent 66%); filter: blur(8px); }
  .v > * { position: relative; }
  .wire { width: min(560px, 100%); }
  .count { position: absolute; left: 0; bottom: 6px; display: flex; align-items: center; gap: 14px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--muted); }
  .count b { color: var(--accent); font-weight: 500; }
  .count i { display: block; width: 90px; height: 2px; border-radius: 2px; background: var(--line); overflow: hidden; }
  .count i::after { content: ""; display: block; height: 100%; width: var(--p, 0%); background: var(--accent); transition: width 0.5s ease; }

  .mvis { display: none; }
  .end { min-height: 40svh; align-items: flex-start; }
  .end a { font-size: clamp(2rem, 4.6vw, 3.8rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.05; transition: color 0.2s ease; }
  .end a:hover { color: var(--accent); }
  .end small { margin-bottom: 14px; color: var(--muted); font-size: 1rem; }

  @media (max-width: 959px) {
    grid-template-columns: 1fr;
    .sticky { display: none; }
    .block { min-height: 0; padding: 56px 0; border-top: 1px solid var(--line); }
    .block[data-on="false"] .txt { opacity: 1; }
    .mvis { display: grid; place-items: center; margin-bottom: 36px; padding: 28px 0; border-radius: 24px; background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--pc) 22%, transparent), transparent 70%); }
    .end { min-height: 0; }
  }
  @media (prefers-reduced-motion: reduce) { .v, .txt { transition: none; } }
`;

const STATUS_COLOR = { production: "#2eebaa", development: "#ffcb6b", paused: "#8c95a3" } as const;

export default function Showcase() {
  const { lang, t } = useLang();
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [cur, setCur] = useState(0);
  const total = [...personalProjects, ...professionalProjects, ...webProjects].length;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setCur(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-35% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const items = SHOWCASE.map((s) => {
    const base = getProjectById(s.id);
    return base ? { s, p: localizeProject(base, lang), web: isWebId(s.id) || !s.screen, color: projectColor(s.id) } : null;
  }).filter((x): x is NonNullable<typeof x> => !!x);

  const visual = (it: (typeof items)[number], width: number | string) =>
    it.web ? <div className="wire"><WebWire color={it.color} url={it.p.title} /></div> : <Phone screens={[it.s.screen!]} alt={it.p.title} width={width} />;

  return (
    <Box>
      <div>
        {items.map((it, i) => (
          <article key={it.s.id} data-on={cur === i} className="block" style={{ ["--pc" as string]: it.color, ["--sc" as string]: STATUS_COLOR[it.p.status] }}>
            <div className="mvis" aria-hidden>{visual(it, 230)}</div>
            <div className="txt" ref={(el) => { refs.current[i] = el; }} data-i={i}>
              <div className="meta">
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <span>{it.web ? t.work.web : t.work.app} · {it.s.year}</span>
                <span className="st">{t.status[it.p.status]}</span>
              </div>
              <h3>{it.p.title}</h3>
              <p className="tag">{it.p.tagline}</p>
              <div className="tags">{it.p.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <Link className="open" href={`/projects/${it.s.id}`}>{t.work.open} <span aria-hidden>→</span></Link>
          </article>
        ))}
        <div className="block end">
          <small>{t.work.allCount.replace("{n}", String(total))}</small>
          <Link href="/projects">{t.work.all} →</Link>
        </div>
      </div>

      <div>
        <div className="sticky" aria-hidden>
          <div className="stack">
            {items.map((it, i) => (
              <div key={it.s.id} className="v" data-s={i === cur ? "on" : i < cur ? "before" : "after"} style={{ ["--pc" as string]: it.color }}>
                {visual(it, "min(270px, 38svh)")}
              </div>
            ))}
          </div>
          <div className="count" style={{ ["--p" as string]: `${((cur + 1) / items.length) * 100}%` }}>
            <span><b>{String(cur + 1).padStart(2, "0")}</b> / {String(items.length).padStart(2, "0")}</span><i />
          </div>
        </div>
      </div>
    </Box>
  );
}
