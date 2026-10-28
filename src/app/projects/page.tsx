"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";
import * as S from "../home/styles";
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
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 24px 0 20px;
  button {
    font: inherit;
    font-size: 0.82rem;
    height: 30px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--card);
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s ease;
  }
  button:hover { color: var(--ink); border-color: var(--muted); }
  button[aria-pressed="true"] { background: var(--ink); color: var(--paper); border-color: var(--ink); }
`;

const Cols = styled(S.Grid)`
  grid-template-columns: repeat(3, minmax(0, 1fr));
  @media (max-width: 800px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

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
      <S.Display>Projetos</S.Display>
      <S.Lead>
        Apps financeiros, superapps, e-commerce e sistemas web: o que construí no trabalho e o que
        criei por conta própria.
      </S.Lead>

      <Tabs role="group" aria-label="Filtrar projetos">
        {FILTERS.map((f) => (
          <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </Tabs>

      <Cols>
        {list.map((p) => (
          <S.Card key={p.id} href={`/projects/${p.id}`} $color={p.iconColor}>
            <div className="thumb">
              {p.galleryImages?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.galleryImages[0]} alt={`Tela de ${p.title}`} />
              ) : (
                p.iconLetter ?? p.title[0]
              )}
            </div>
            <div className="body">
              <div className="top">
                <h3>{p.title}</h3>
              </div>
              <span className="status">{STATUS[p.status]}</span>
              <p>{p.tagline}</p>
              <S.Chips>
                {p.tags.slice(0, 2).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </S.Chips>
            </div>
          </S.Card>
        ))}
      </Cols>
    </S.Page>
  );
}
