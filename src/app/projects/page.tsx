"use client";

import Link from "next/link";
import * as S from "../home/styles";
import { personalProjects, professionalProjects, webProjects, type Project } from "./helper";

const GROUPS: { title: string; items: Project[] }[] = [
  { title: "Produtos próprios", items: personalProjects },
  { title: "Apps profissionais", items: professionalProjects },
  { title: "Web", items: webProjects },
];

const STATUS: Record<Project["status"], string> = {
  production: "No ar",
  development: "Em desenvolvimento",
  paused: "Entregue",
};

export default function Projects() {
  return (
    <S.Page>
      <S.Back href="/home#projetos">← Início</S.Back>
      <S.Title>Todos os projetos</S.Title>
      <S.Lead>O que construí no trabalho e por conta própria.</S.Lead>

      {GROUPS.map((g) => (
        <div key={g.title} style={{ marginTop: 56 }}>
          <S.Label>{g.title}</S.Label>
          <S.Table>
            <thead>
              <tr>
                <th>Projeto</th>
                <th className="hide-sm">Status</th>
                <th>Tecnologias</th>
              </tr>
            </thead>
            <tbody>
              {g.items.map((p) => (
                <tr key={p.id}>
                  <td className="name">
                    <Link href={`/projects/${p.id}`}>{p.title}</Link>
                  </td>
                  <td className="hide-sm">{STATUS[p.status]}</td>
                  <td className="tech">{p.tags.slice(0, 3).join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </div>
      ))}
    </S.Page>
  );
}
