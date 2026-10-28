"use client";

import { type Project } from "../helper";
import { MarkdownBody } from "@/components/markdown-body";
import { cases } from "@/data/profile";
import * as S from "../../home/styles";

const STATUS: Record<Project["status"], string> = {
  production: "No ar",
  development: "Em desenvolvimento",
  paused: "Entregue",
};

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
  const live = project.liveUrl;
  const liveLabel = (project.liveCtaLabel || "Ver online").trim() || "Ver online";

  return (
    <S.Page>
      <S.Back href="/home#projetos">← Projetos</S.Back>

      <S.Mono style={{ marginTop: 0, marginBottom: 12 }}>
        <em>›</em> {STATUS[project.status]}
        {study ? ` · ${study.period}` : ""}
      </S.Mono>
      <S.Title>{project.title}</S.Title>
      <S.Lead>{project.tagline}</S.Lead>

      <S.Row>
        {live && (
          <S.Pill
            href={live}
            {...(live.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {liveLabel} ↗
          </S.Pill>
        )}
        {showGh && (
          <S.Pill href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</S.Pill>
        )}
        {showFig && (
          <S.Pill href={project.figmaUrl} target="_blank" rel="noopener noreferrer">Figma ↗</S.Pill>
        )}
      </S.Row>

      <S.Section style={{ marginTop: 56 }}>
        <S.Label>Sobre</S.Label>
        <S.Prose>
          <MarkdownBody markdown={md} />
        </S.Prose>
      </S.Section>

      {study && (
        <S.Section>
          <S.Label>Meu papel</S.Label>
          <S.Facts>
            <dt>Função</dt>
            <dd>{study.role}</dd>
            <dt>O que fiz</dt>
            <dd>
              <ul>
                {study.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </dd>
            <dt>Ferramentas</dt>
            <dd>{study.stack.join(", ")}</dd>
          </S.Facts>
        </S.Section>
      )}

      {!study && project.tags.length > 0 && (
        <S.Section>
          <S.Label>Ferramentas</S.Label>
          <S.Tags style={{ marginTop: 0 }}>
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </S.Tags>
        </S.Section>
      )}

      {features.length > 0 && (
        <S.Section>
          <S.Label>Destaques</S.Label>
          <S.Facts>
            {features.map((f) => (
              <div key={f.title} style={{ display: "contents" }}>
                <dt>{f.title}</dt>
                <dd>{f.description}</dd>
              </div>
            ))}
          </S.Facts>
        </S.Section>
      )}

      {shots.length > 0 && (
        <S.Section>
          <S.Label>Telas</S.Label>
          <S.Shots>
            {shots.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={`Tela de ${project.title}`} loading="lazy" />
            ))}
          </S.Shots>
        </S.Section>
      )}
    </S.Page>
  );
}

export default ProjectDetailClient;
