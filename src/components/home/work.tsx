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
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px;
  @media (max-width: 960px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Card = styled(motion.li)`
  list-style: none;
  a { display: flex; flex-direction: column; height: 100%; border-radius: 18px; overflow: hidden; background: var(--card); border: 1px solid var(--line); transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease; color: inherit; }
  a:hover { border-color: color-mix(in srgb, var(--accent) 55%, var(--line)); box-shadow: 0 24px 50px -26px color-mix(in srgb, var(--accent) 45%, #000); transform: translateY(-5px); }
  a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 3px; }
  .cover { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: color-mix(in srgb, var(--ink) 6%, var(--card)); }
  .cover img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.6s ease; display: block; }
  a:hover .cover img { transform: scale(1.05); }
  .art { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--font-condensed); font-size: 3.4rem; color: #fff; letter-spacing: 0.03em;
    background: radial-gradient(circle at 25% 20%, var(--c) 0%, transparent 62%), linear-gradient(140deg, color-mix(in srgb, var(--c) 28%, #0b0f12), #0b0f12 78%); }
  .art::after { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.09) 1px, transparent 1.4px) 0 0 / 14px 14px; mask-image: linear-gradient(160deg, #000, transparent 70%); -webkit-mask-image: linear-gradient(160deg, #000, transparent 70%); }
  .kind { position: absolute; left: 12px; top: 12px; z-index: 2; padding: 4px 10px; border-radius: 999px; font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.1em; text-transform: uppercase; background: color-mix(in srgb, #000 55%, transparent); color: #fff; backdrop-filter: blur(6px); }
  .kind.w { box-shadow: inset 0 0 0 1px var(--accent-2); }
  .kind.m { box-shadow: inset 0 0 0 1px var(--accent); }
  .feat { position: absolute; right: 12px; top: 12px; z-index: 2; padding: 4px 10px; border-radius: 999px; font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); font-weight: 700; }
  .body { display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 18px; flex: 1; }
  .top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  h3 { font-size: 1.08rem; font-weight: 650; letter-spacing: -0.02em; }
  .st { font-family: var(--font-mono); font-size: 0.66rem; color: var(--muted); white-space: nowrap; }
  .st::before { content: "● "; color: var(--d); }
  p { color: var(--muted); font-size: 0.88rem; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .tags { margin-top: auto; padding-top: 6px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); }
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
            const img = p.coverImage;
            return (
              <Card
                key={p.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ ["--c" as string]: p.iconColor || "#2eebaa", ["--d" as string]: DOT[p.status] }}
              >
                <Link href={`/projects/${p.id}`} aria-label={`${p.title}: ${p.tagline}`}>
                  <div className="cover">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt="" loading="lazy" />
                    ) : (
                      <div className="art" aria-hidden>{p.iconLetter ?? p.title[0]}</div>
                    )}
                    <span className={`kind ${kind === "web" ? "w" : "m"}`}>{kind === "web" ? s.kindWeb : s.kindMobile}</span>
                    {FEATURED.has(p.id) && <span className="feat">{s.featured}</span>}
                  </div>
                  <div className="body">
                    <div className="top">
                      <h3>{p.title}</h3>
                      <span className="st">{t.status[p.status]}</span>
                    </div>
                    <p>{p.tagline}</p>
                    <div className="tags">
                      {p.tags.slice(0, 4).map((tag) => (
                        <span key={tag}>
                          <TechIcon name={tag} size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
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
