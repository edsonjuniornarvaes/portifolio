"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import TechIcon from "@/components/ui/tech-icon";
import { useLang } from "@/i18n/provider";
import { localizeProject } from "@/i18n/content";
import { personalProjects, professionalProjects, webProjects, type Project } from "@/app/projects/helper";

type Tab = "all" | "web" | "mobile" | "own";
type Kind = "web" | "mobile";

const FEATURED = new Set(["clube-da-joia-marketplace", "clube-da-joia-app", "pjbank"]);
const WEB_IDS = new Set<string>([...webProjects.map((p) => p.id), "clube-da-joia-marketplace"]);
const kindOf = (p: Project): Kind => (WEB_IDS.has(p.id) ? "web" : "mobile");
const DOT = { production: "#4ade80", development: "#fbbf24", paused: "#8b98a5" } as const;

const Tabs = styled.div`
  display: inline-flex; flex-wrap: wrap; gap: 4px; padding: 4px; border: 1px solid var(--line); border-radius: 999px; margin-bottom: 26px;
  button {
    position: relative; font: inherit; font-size: 0.84rem; padding: 8px 16px; border: 0; background: transparent; color: var(--muted); cursor: pointer; border-radius: 999px; transition: color 0.2s ease;
  }
  button:hover { color: var(--ink); }
  button[aria-pressed="true"] { color: var(--on-accent); font-weight: 600; }
  button .bg { position: absolute; inset: 0; border-radius: 999px; background: var(--accent); z-index: 0; }
  button span.t { position: relative; z-index: 1; }
  button sup { position: relative; z-index: 1; font-family: var(--font-mono); font-size: 0.6rem; margin-left: 4px; opacity: 0.75; }
`;

const Grid = styled(motion.ul)`
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;
  @media (max-width: 960px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Card = styled(motion.li)`
  list-style: none;
  a { display: flex; flex-direction: column; gap: 8px; height: 100%; padding: 14px 16px; border-radius: 14px; background: var(--card); border: 1px solid var(--line); color: inherit; transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease; }
  a:hover { border-color: color-mix(in srgb, var(--c) 60%, var(--line)); transform: translateY(-3px); background: color-mix(in srgb, var(--c) 6%, var(--card)); }
  a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 3px; }
  .head { display: flex; align-items: center; gap: 11px; }
  .mark { flex: none; width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; background: var(--c); color: #fff; font-family: var(--font-condensed); font-size: 0.82rem; letter-spacing: 0.02em; }
  .ttl { min-width: 0; flex: 1; }
  h3 { font-size: 0.98rem; font-weight: 650; letter-spacing: -0.015em; line-height: 1.25; }
  .meta { display: flex; align-items: center; gap: 8px; margin-top: 2px; font-family: var(--font-mono); font-size: 0.64rem; color: var(--muted); }
  .kind { text-transform: uppercase; letter-spacing: 0.08em; }
  .kind.w { color: var(--accent-2); }
  .kind.m { color: var(--accent-ink); }
  .st::before { content: "● "; color: var(--d); }
  p { color: var(--muted); font-size: 0.84rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .tags { margin-top: auto; display: flex; flex-wrap: wrap; gap: 4px 12px; font-family: var(--font-mono); font-size: 0.66rem; color: var(--muted); }
  .tags span { display: inline-flex; align-items: center; gap: 5px; }
`;

export default function Work() {
  const { lang, t } = useLang();
  const [tab, setTab] = useState<Tab>("all");

  const all = useMemo(() => [...personalProjects, ...professionalProjects, ...webProjects].map((p) => localizeProject(p, lang)), [lang]);
  const ordered = useMemo(() => [...all].sort((a, b) => Number(FEATURED.has(b.id)) - Number(FEATURED.has(a.id))), [all]);
  const list = ordered.filter((p) => (tab === "all" ? true : tab === "own" ? p.type === "personal" : kindOf(p) === tab));
  const count = (k: Tab) => ordered.filter((p) => (k === "all" ? true : k === "own" ? p.type === "personal" : kindOf(p) === k)).length;
  const s = t.site;
  const tabs: [Tab, string][] = [["all", s.tabAll], ["web", s.tabWeb], ["mobile", s.tabMobile], ["own", s.tabOwn]];

  return (
    <>
      <Tabs role="group" aria-label={t.home.filterAria}>
        {tabs.map(([id, label]) => (
          <button key={id} aria-pressed={tab === id} onClick={() => setTab(id)}>
            {tab === id && <motion.span layoutId="tab-bg" className="bg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="t">{label}</span>
            <sup>{String(count(id)).padStart(2, "0")}</sup>
          </button>
        ))}
      </Tabs>
      <Grid layout>
        <AnimatePresence mode="popLayout">
          {list.map((p) => {
            const kind = kindOf(p);
            return (
              <Card
                key={p.id}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ ["--c" as string]: p.iconColor || "#2eebaa", ["--d" as string]: DOT[p.status] }}
              >
                <Link href={`/projects/${p.id}`} aria-label={`${p.title}: ${p.tagline}`}>
                  <div className="head">
                    <span className="mark" aria-hidden>{p.iconLetter ?? p.title[0]}</span>
                    <div className="ttl">
                      <h3>{p.title}</h3>
                      <div className="meta">
                        <span className={`kind ${kind === "web" ? "w" : "m"}`}>{kind === "web" ? s.kindWeb : s.kindMobile}</span>
                        <span className="st">{t.status[p.status]}</span>
                      </div>
                    </div>
                  </div>
                  <p>{p.tagline}</p>
                  <div className="tags">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>
                        <TechIcon name={tag} size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </Card>
            );
          })}
        </AnimatePresence>
      </Grid>
    </>
  );
}
