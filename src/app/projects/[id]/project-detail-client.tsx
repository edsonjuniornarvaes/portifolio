"use client";

import { useLang } from "@/i18n/provider";
import { localizeProject, localizeCase } from "@/i18n/content";
import TechIcon from "@/components/ui/tech-icon";
import Link from "next/link";
import styled from "styled-components";
import { type Project } from "../helper";
import { MarkdownBody } from "@/components/markdown-body";
import { cases, SHOW_PROJECT_IMAGES } from "@/data/profile";
import * as S from "../../home/styles";

const Back = styled(Link)`
  display: block;
  width: fit-content;
  margin-bottom: 28px;
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
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
  img { display: block; width: auto; max-width: 100%; max-height: 520px; border: 1px solid var(--line); border-radius: 10px; }
`;

function ProjectDetailClient({ project: base }: { project: Project }) {
  const { lang, t } = useLang();
  const project = localizeProject(base, lang);
  const showGh = !!project.githubUrl && project.showGithub !== false;
  const showFig =
    !!project.figmaUrl && project.figmaUrl.startsWith("http") && project.showFigma === true;
  const md = project.longDescription || project.description;
  const studyBase = cases.find((c) => c.id === project.id);
  const study = studyBase ? localizeCase(studyBase, lang) : undefined;

  const shots = [
    ...(project.showPreview !== false && project.showMockupApple !== false ? [project.mockupAppleUrl] : []),
    ...(project.showPreview !== false && project.showMockupPlay !== false ? [project.mockupPlayUrl] : []),
    ...(project.screens ?? (SHOW_PROJECT_IMAGES && project.showGallery !== false ? project.galleryImages || [] : [])),
  ]
    .map((u) => (u || "").trim())
    .filter(Boolean);

  const features = project.showHighlights !== false ? project.features || [] : [];
  const liveLabel = (project.liveCtaLabel || t.project.viewOnline).trim() || t.project.viewOnline;
  const live = project.liveUrl;
  const external = live?.startsWith("http");

  return (
    <S.Page>
      <Back href="/projects">{t.project.back}</Back>

      <S.Kicker>
        <span>{t.statusCap[project.status]}</span>
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
            {t.project.github.replace(" ↗", "")} ↗
          </a>
        )}
        {showFig && (
          <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
            {t.project.figma.replace(" ↗", "")} ↗
          </a>
        )}
      </Links>

      <S.Section>
        <S.Label>{t.project.about}</S.Label>
        <S.Prose>
          <MarkdownBody markdown={md} />
        </S.Prose>
      </S.Section>

      {study && (
        <S.Section>
          <S.Label>{t.project.myRole}</S.Label>
          <Facts>
            <dt>{t.project.role}</dt>
            <dd>{study.role}</dd>
            <dt>{t.project.didWhat}</dt>
            <dd>
              <ul>
                {study.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </dd>
            <dt>{t.project.tools}</dt>
            <dd>{study.stack.join(", ")}</dd>
          </Facts>
        </S.Section>
      )}

      {!study && project.tags.length > 0 && (
        <S.Section>
          <S.Label>{t.project.tools}</S.Label>
          <S.Plain style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                <TechIcon name={tag} size={15} />
                {tag}
              </span>
            ))}
          </S.Plain>
        </S.Section>
      )}

      {features.length > 0 && (
        <S.Section>
          <S.Label>{t.project.highlights}</S.Label>
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
          <S.Label>{t.project.screens}</S.Label>
          <Shots>
            {shots.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={`${t.project.screenOf} ${project.title}`} loading="lazy" />
            ))}
          </Shots>
        </S.Section>
      )}
    </S.Page>
  );
}

export default ProjectDetailClient;
