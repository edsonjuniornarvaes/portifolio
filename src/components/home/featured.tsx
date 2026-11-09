"use client";

import Link from "next/link";
import styled from "styled-components";
import Reveal from "@/components/ui/reveal";
import TechIcon from "@/components/ui/tech-icon";
import { useLang } from "@/i18n/provider";
import { localizeCase, localizeProject } from "@/i18n/content";
import { cases } from "@/data/profile";
import { getProjectById } from "@/app/projects/helper";

/** Projetos em destaque, na ordem em que aparecem. Cada um tem estudo de caso em `cases`. */
export const FEATURED_IDS = ["pjbank", "gruvi", "clube-da-joia-marketplace", "clube-da-joia-app"] as const;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;
  @media (max-width: 800px) { grid-template-columns: 1fr; }
  a { display: flex; flex-direction: column; gap: 10px; height: 100%; padding: 18px 20px; border-radius: 16px; background: var(--card); border: 1px solid var(--line); color: inherit; transition: border-color 0.25s ease, transform 0.25s ease; }
  a:hover { border-color: color-mix(in srgb, var(--c) 60%, var(--line)); transform: translateY(-3px); }
  a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 3px; }
  .head { display: flex; align-items: center; gap: 12px; }
  .mark { flex: none; width: 40px; height: 40px; border-radius: 11px; display: grid; place-items: center; background: var(--c); color: #fff; font-family: var(--font-condensed); font-size: 0.92rem; }
  h3 { font-size: 1.08rem; font-weight: 650; letter-spacing: -0.02em; line-height: 1.2; }
  .tag { margin-top: 2px; font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); }
  .period { margin-left: auto; align-self: flex-start; font-family: var(--font-mono); font-size: 0.66rem; color: var(--accent-ink); white-space: nowrap; }
  p { color: var(--muted); font-size: 0.9rem; line-height: 1.55; }
  .tags { margin-top: auto; display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); }
  .tags span { display: inline-flex; align-items: center; gap: 5px; }
  .go { margin-left: auto; color: var(--accent-ink); }
`;

export default function Featured() {
  const { lang, t } = useLang();
  return (
    <Grid>
      {FEATURED_IDS.map((id, i) => {
        const base = getProjectById(id);
        const study = cases.find((c) => c.id === id);
        if (!base || !study) return null;
        const p = localizeProject(base, lang);
        const c = localizeCase(study, lang);
        return (
          <Reveal key={id} delay={i * 60}>
            <Link href={`/projects/${id}`} data-spot style={{ ["--c" as string]: p.iconColor || "#2eebaa" }}>
              <div className="head">
                <span className="mark" aria-hidden>{p.iconLetter ?? p.title[0]}</span>
                <div>
                  <h3>{p.title}</h3>
                  <div className="tag">{c.tag}</div>
                </div>
                <span className="period">{c.period.split(" · ")[0]}</span>
              </div>
              <p>{c.summary}</p>
              <div className="tags">
                {c.stack.slice(0, 4).map((s) => (
                  <span key={s}>
                    <TechIcon name={s} size={12} />
                    {s}
                  </span>
                ))}
                <span className="go">{t.site.viewCase}</span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </Grid>
  );
}
