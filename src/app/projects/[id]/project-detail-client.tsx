"use client";

import Link from "next/link";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";
import { localizeProject, localizeCase } from "@/i18n/content";
import { MarkdownBody } from "@/components/markdown-body";
import { Page, PageTitle, Lead, Wrap } from "@/components/ui/layout";
import { cases } from "@/data/profile";
import WebWire from "@/components/ui/web-wire";
import { isWebId, projectColor } from "@/data/work";
import { type Project } from "../helper";

const Back = styled(Link)`
  display: inline-block; margin-bottom: 36px; font-size: 0.95rem; color: var(--muted); transition: color 0.2s ease;
  &:hover { color: var(--accent); }
`;

const Meta = styled.dl`
  display: flex; flex-wrap: wrap; gap: 14px 48px; margin-top: 34px; padding: 18px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  dt { font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
  dd { margin-top: 4px; font-size: 0.98rem; }
  a { border-bottom: 1px solid var(--accent); padding-bottom: 1px; }
  a:hover { color: var(--accent); }
`;

const Block = styled.section`
  display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 12px 48px; margin-top: 54px;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
  h2 { font-size: 0.95rem; font-weight: 600; color: var(--ink); padding-top: 4px; }
  ul { list-style: none; display: grid; gap: 12px; }
  li { position: relative; padding-left: 22px; line-height: 1.6; }
  li::before { content: "→"; position: absolute; left: 0; color: var(--accent); }
  .plain { color: var(--muted); line-height: 1.7; }
  dl.f { display: grid; gap: 16px; }
  dl.f dt { font-weight: 600; }
  dl.f dd { color: var(--muted); }
`;

const Shots = styled.div`
  display: flex; gap: 20px; overflow-x: auto; padding: 6px 2px 18px; scrollbar-width: thin;
  img { display: block; height: 460px; width: auto; max-width: none; border-radius: 22px; border: 1px solid var(--line); box-shadow: 0 30px 60px -34px rgba(0,0,0,0.5); }
  @media (max-width: 700px) { img { height: 380px; } }
`;

function ProjectDetailClient({ project: base }: { project: Project }) {
  const { lang, t } = useLang();
  const project = localizeProject(base, lang);
  const showGh = !!project.githubUrl && project.showGithub !== false;
  const showFig = !!project.figmaUrl && project.figmaUrl.startsWith("http") && project.showFigma === true;
  const studyBase = cases.find((c) => c.id === project.id);
  const study = studyBase ? localizeCase(studyBase, lang) : undefined;
  const md = project.longDescription || project.description;
  const live = project.liveUrl;
  const external = live?.startsWith("http");
  const features = project.showHighlights !== false ? project.features || [] : [];

  // Só telas de app: prints de site ficam de fora.
  const web = isWebId(project.id);
  const shots = web
    ? []
    : [project.mockupAppleUrl, project.mockupPlayUrl, ...(project.screens ?? [])].map((u) => (u || "").trim()).filter((u) => u && !/cover|board/.test(u));

  return (
    <Wrap>
      <Page>
        <Back href="/projects">{t.project.back}</Back>
        <PageTitle>{project.title}</PageTitle>
        <Lead>{project.tagline}</Lead>

        <Meta>
          <div><dt>Status</dt><dd>{t.project.status[project.status]}</dd></div>
          {study && <div><dt>{t.project.period}</dt><dd>{study.period}</dd></div>}
          {live && (
            <div>
              <dt>Link</dt>
              <dd><a href={live} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{(project.liveCtaLabel || t.project.viewOnline).trim()} ↗</a></dd>
            </div>
          )}
          {showGh && <div><dt>GitHub</dt><dd><a href={project.githubUrl} target="_blank" rel="noopener noreferrer">{t.project.github} ↗</a></dd></div>}
          {showFig && <div><dt>Figma</dt><dd><a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">{t.project.figma} ↗</a></dd></div>}
        </Meta>

        {web && (
          <Block as="div" style={{ display: "block" }}>
            <div style={{ maxWidth: 640 }}><WebWire color={projectColor(project.id)} url={project.title} /></div>
          </Block>
        )}

        {shots.length > 0 && (
          <Block as="div" style={{ display: "block" }}>
            <Shots>
              {shots.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt={`${t.project.screenOf} ${project.title}`} loading="lazy" />
              ))}
            </Shots>
          </Block>
        )}

        <Block>
          <h2>{t.project.about}</h2>
          <div><MarkdownBody markdown={md} /></div>
        </Block>

        {study && (
          <Block>
            <h2>{t.project.didWhat}</h2>
            <div>
              <p className="plain" style={{ marginBottom: 18 }}>{study.role}</p>
              <ul>{study.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
          </Block>
        )}

        {features.length > 0 && (
          <Block>
            <h2>{t.project.highlights}</h2>
            <dl className="f">
              {features.map((f) => (
                <div key={f.title}><dt>{f.title}</dt><dd>{f.description}</dd></div>
              ))}
            </dl>
          </Block>
        )}

        {project.tags.length > 0 && (
          <Block>
            <h2>{t.project.tools}</h2>
            <p className="plain">{(study ? study.stack : project.tags).join(" · ")}</p>
          </Block>
        )}
      </Page>
    </Wrap>
  );
}

export default ProjectDetailClient;
