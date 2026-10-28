"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import * as S from "../home/styles";
import Reveal from "@/components/ui/reveal";
import GlowCard from "@/components/ui/glow-card";
import { personalProjects, professionalProjects, webProjects, type Project } from "./helper";

type Filter = "all" | "personal" | "mobile" | "web";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "personal", label: "Produtos próprios" },
  { id: "mobile", label: "Apps profissionais" },
  { id: "web", label: "Web" },
];

const STATUS: Record<Project["status"], string> = {
  production: "No ar",
  development: "Em desenvolvimento",
  paused: "Entregue",
};

const Tabs = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 32px;
  button {
    font: inherit; font-size: 0.88rem; cursor: pointer;
    padding: 9px 18px; border-radius: 999px; color: var(--text-secondary);
    border: 1px solid var(--border-color); background: var(--bg-card);
    transition: all 0.2s ease;
  }
  button:hover { border-color: var(--border-hover); color: var(--text-primary); }
  button[aria-pressed="true"] { color: #fff; background: var(--accent-gradient); border-color: transparent; }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  @media (max-width: 980px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

const Card = styled.div<{ $color: string }>`
  display: flex; flex-direction: column; height: 100%;
  .thumb {
    height: 168px; display: grid; place-items: center; overflow: hidden;
    background: linear-gradient(135deg, ${(p) => p.$color}, ${(p) => p.$color}55);
    font-size: 2.4rem; font-weight: 800; color: #fff;
  }
  .thumb img.shot { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .body { padding: 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .row { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
  h3 { font-size: 1.1rem; }
  .status { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; }
  .tagline { color: var(--text-secondary); font-size: 0.88rem; line-height: 1.55; flex: 1; }
  .actions { display: flex; gap: 16px; margin-top: 6px; font-size: 0.85rem; font-weight: 600; }
  .actions a { color: var(--accent-secondary); }
  .actions a:hover { text-decoration: underline; }
`;

function ProjectCard({ p }: { p: Project }) {
  const color = p.iconColor ?? "#8b5cf6";
  const shot = p.galleryImages?.[0];
  const hasDetail = p.type === "personal";
  return (
    <GlowCard style={{ height: "100%" }}>
      <Card $color={color}>
        <div className="thumb">
          {shot ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="shot" src={shot} alt={`Tela do ${p.title}`} />
          ) : (
            p.iconLetter ?? p.title[0]
          )}
        </div>
        <div className="body">
          <div className="row">
            <h3>{p.title}</h3>
            <span className="status">{STATUS[p.status]}</span>
          </div>
          <p className="tagline">{p.tagline}</p>
          <S.Chips>
            {p.tags.slice(0, 4).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </S.Chips>
          <div className="actions">
            {hasDetail && <Link href={`/projects/${p.id}`}>Detalhes →</Link>}
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                {p.liveCtaLabel ?? "Ver online"} ↗
              </a>
            )}
            {p.githubUrl && p.showGithub !== false && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </Card>
    </GlowCard>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(() => {
    if (filter === "personal") return personalProjects;
    if (filter === "mobile") return professionalProjects;
    if (filter === "web") return webProjects;
    return [...personalProjects, ...professionalProjects, ...webProjects];
  }, [filter]);

  return (
    <S.Page>
      <Reveal>
        <S.Eyebrow>portfólio</S.Eyebrow>
        <S.SectionTitle>
          Projetos <span className="gradient-text-wide">&amp; produtos</span>
        </S.SectionTitle>
        <S.SectionLead>
          Apps financeiros, superapps e e-commerce: o que construí no trabalho e o que criei por
          conta própria.
        </S.SectionLead>
      </Reveal>

      <Tabs role="group" aria-label="Filtrar projetos">
        {FILTERS.map((f) => (
          <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </Tabs>

      <Grid>
        {list.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </Grid>
    </S.Page>
  );
}
