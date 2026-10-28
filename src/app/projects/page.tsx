"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";
import * as S from "../home/styles";
import { personalProjects, professionalProjects, webProjects, type Project } from "./helper";

type Filter = "all" | "personal" | "mobile" | "web";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Tudo" },
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
  gap: 8px 24px;
  margin: 40px 0 8px;
  button {
    font: inherit;
    font-size: 0.95rem;
    color: var(--muted);
    background: none;
    border: 0;
    padding: 0 0 3px;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  button:hover { color: var(--ink); }
  button[aria-pressed="true"] { color: var(--ink); border-bottom-color: var(--accent); }
`;

function Item({ p }: { p: Project }) {
  const year = STATUS[p.status];
  const inner = (
    <>
      <span className="year">{year}</span>
      <span>
        <span className="name">{p.title}</span>
        <span className="what">{p.tagline}</span>
      </span>
      <span className="meta">{p.tags.slice(0, 3).join(" · ")}</span>
    </>
  );
  return (
    <S.Row>
      <S.RowLink href={`/projects/${p.id}`}>{inner}</S.RowLink>
    </S.Row>
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
      <S.Kicker>Trabalho</S.Kicker>
      <S.Display style={{ maxWidth: "15ch" }}>
        O que eu já <em>coloquei no ar</em>.
      </S.Display>
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

      <S.List style={{ marginTop: 24 }}>
        {list.map((p) => (
          <Item key={p.id} p={p} />
        ))}
      </S.List>
    </S.Page>
  );
}
