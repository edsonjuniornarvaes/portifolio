"use client";

import Link from "next/link";
import styled from "styled-components";
import { type Project } from "../helper";
import { MarkdownBody } from "@/components/markdown-body";
import { cases } from "@/data/profile";
import * as S from "../../home/styles";

const STATUS: Record<Project["status"], string> = {
  production: "No ar",
  development: "Em desenvolvimento",
  paused: "Entregue",
};

const Back = styled(Link)`
  font-size: 0.9rem;
  color: var(--muted);
  &:hover { color: var(--ink); }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
  margin-top: 20px;
  a {
    font-size: 0.88rem;
    text-decoration: underline;
    text-decoration-color: var(--line);
    text-underline-offset: 4px;
  }
  a:hover { color: var(--accent); }
`;

const Facts = styled.dl`
  display: grid;
  grid-template-columns: 130px minmax(0, 1fr);
  gap: 12px 20px;
  max-width: 44rem;
  dt { font-size: 0.82rem; color: var(--muted); padding-top: 2px; }
  dd { line-height: 1.6; font-size: 0.92rem; }
  ul { list-style: none; display: grid; gap: 10px; }
  li { position: relative; padding-left: 20px; }
  li::before { content: "→"; position: absolute; left: 0; color: var(--accent); }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 4px; dd { margin-bottom: 18px; } }
`;

const Shots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  img { width: 100%; border: 1px solid var(--line); border-radius: 6px; display: block; }
`;

function ProjectDetailClient({ project }: { project: Project }) {
  const showGh = !!project.githubUrl && project.showGithub !== false;
  const showFig =
    !!project.figmaUrl && project.figmaUrl.startsWith("http") && project.showFigma === true;
  const md = project.longDescription || project.description;
  const study = cases.find((c) => c.id === project.id);

  const shots = [
    ...(project.showPreview !== false && project.showMockupApple !== false ? [project.mockupAppleUrl] : []),
    ...(project.showPreview !== false && project.showMockupPlay !== false ? [project.mockupPlayUrl] : []),
    ...(project.showGallery !== false ? project.galleryImages || [] : []),
  ]
    .map((u) => (u || "").trim())
    .filter(Boolean);

  const features = project.showHighlights !== false ? project.features || [] : [];
  const liveLabel = (project.liveCtaLabel || "Ver online").trim() || "Ver online";
  const live = project.liveUrl;
  const external = live?.startsWith("http");

  return (
    <S.Page>
      <Back href="/projects">← Todos os projetos</Back>

      <S.Kicker style={{ marginTop: 28 }}>
        <span>{STATUS[project.status]}</span>
        {study && <span>{study.period}</span>}
      </S.Kicker>
      <S.Display>{project.title}</S.Display>
      <S.Lead>{project.tagline}</S.Lead>

      <Links>
        {live && (
          <a href={live} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {liveLabel} ↗
          </a>
        )}
        {showGh && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            Código no GitHub ↗
          </a>
        )}
        {showFig && (
          <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
            Design no Figma ↗
          </a>
        )}
      </Links>

      <S.Section>
        <S.Label>Sobre</S.Label>
        <S.Prose>
          <MarkdownBody markdown={md} />
        </S.Prose>
      </S.Section>

      {study && (
        <S.Section>
          <S.Label>Meu papel</S.Label>
          <Facts>
            <dt>Função</dt>
            <dd>{study.role}</dd>
            <dt>O que eu fiz</dt>
            <dd>
              <ul>
                {study.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </dd>
            <dt>Ferramentas</dt>
            <dd>{study.stack.join(", ")}</dd>
          </Facts>
        </S.Section>
      )}

      {!study && project.tags.length > 0 && (
        <S.Section>
          <S.Label>Ferramentas</S.Label>
          <S.Plain>{project.tags.join(", ")}</S.Plain>
        </S.Section>
      )}

      {features.length > 0 && (
        <S.Section>
          <S.Label>Destaques</S.Label>
          <Facts>
            {features.map((f) => (
              <div key={f.title} style={{ display: "contents" }}>
                <dt>{f.title}</dt>
                <dd>{f.description}</dd>
              </div>
            ))}
          </Facts>
        </S.Section>
      )}

      {shots.length > 0 && (
        <S.Section>
          <S.Label>Telas</S.Label>
          <Shots>
            {shots.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={`Tela de ${project.title}`} loading="lazy" />
            ))}
          </Shots>
        </S.Section>
      )}
    </S.Page>
  );
}

export default ProjectDetailClient;
