"use client";

import Link from "next/link";
import styled from "styled-components";
import { Page, PageTitle, Wrap, Section, SectionHead } from "@/components/ui/layout";
import { useLang } from "@/i18n/provider";
import { SKILL_GROUP_EN, localizeEducation, localizeExperience, localizeJourney } from "@/i18n/content";
import { ExperienceData, EducationData } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { CAREER_SINCE, MOBILE_SINCE, STUDY_SINCE, contact, journey } from "@/data/profile";

const Intro = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 56px; align-items: end;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 32px; }
  p { max-width: 38rem; font-size: 1.18rem; line-height: 1.7; color: var(--muted); }
  p + p { margin-top: 16px; font-size: 1.02rem; }
  p b { color: var(--ink); font-weight: 500; }
  figure { margin: 0; }
  figure img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center 18%; border-radius: 6px; filter: saturate(0.92); }
  @media (max-width: 860px) { figure { max-width: 220px; } }
`;

const Rows = styled.ol`
  list-style: none; border-top: 1px solid var(--line);
  li { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 8px 32px; padding: 24px 0; border-bottom: 1px solid var(--line); }
  @media (max-width: 700px) { li { grid-template-columns: 1fr; padding: 20px 0; } }
  .y { font-family: var(--font-serif); font-size: 2.4rem; line-height: 1; color: var(--accent-ink); }
  .m { font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted); padding-top: 6px; }
  h3 { font-size: 1.12rem; font-weight: 600; letter-spacing: -0.01em; }
  p { margin-top: 6px; max-width: 44rem; color: var(--muted); line-height: 1.6; }
  .s { margin-top: 4px; color: var(--muted); }
`;

const Defs = styled.dl`
  border-top: 1px solid var(--line);
  > div { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 6px 32px; padding: 16px 0; border-bottom: 1px solid var(--line); }
  @media (max-width: 700px) { > div { grid-template-columns: 1fr; } }
  dt { font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); padding-top: 3px; }
  dd { line-height: 1.7; }
`;

const Links = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px 28px; font-size: 1rem;
  a { border-bottom: 1px solid var(--line); padding-bottom: 2px; transition: color 0.2s ease, border-color 0.2s ease; }
  a:hover { color: var(--accent-ink); border-color: var(--accent-ink); }
`;

export default function JourneyView() {
  const { lang, t } = useLang();
  const j = t.journey;
  const line = j.intro.replace("{study}", String(STUDY_SINCE)).replace("{career}", String(CAREER_SINCE)).replace("{mobile}", String(MOBILE_SINCE));
  const timeline = localizeJourney(journey, lang);
  const jobs = localizeExperience(ExperienceData, lang);
  const edu = localizeEducation(EducationData, lang);

  return (
    <Wrap>
      <Page>
        <Intro>
          <div>
            <PageTitle style={{ marginBottom: 28 }}>{j.title}</PageTitle>
            <p>{line}</p>
            <p>{j.intro2}</p>
          </div>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/edson.webp" alt={j.portraitAlt} />
          </figure>
        </Intro>

        <Section>
          <SectionHead n="01" label={j.timeline} />
          <Rows>
            {timeline.map((i) => (
              <li key={i.year + i.title}>
                <span className="y">{i.year}</span>
                <div>
                  <h3>{i.title}</h3>
                  <p>{i.text}</p>
                </div>
              </li>
            ))}
          </Rows>
        </Section>

        <Section>
          <SectionHead n="02" label={j.jobs} />
          <Rows>
            {jobs.map((job) => (
              <li key={`${job.company}-${job.period}`}>
                <span className="m">{job.period}</span>
                <div>
                  <h3>{job.role}</h3>
                  <p className="s">{job.company}</p>
                </div>
              </li>
            ))}
          </Rows>
        </Section>

        <Section>
          <SectionHead n="03" label={j.education} />
          <Rows>
            {edu.map((e) => (
              <li key={e.course}>
                <span className="m">{e.period}</span>
                <div>
                  <h3>{e.course}</h3>
                  <p className="s">{e.institution}</p>
                </div>
              </li>
            ))}
          </Rows>
        </Section>

        <Section>
          <SectionHead n="04" label={j.stack} />
          <Defs>
            {skillGroups.map((g) => (
              <div key={g.title}>
                <dt>{lang === "en" ? SKILL_GROUP_EN[g.title] ?? g.title : g.title}</dt>
                <dd>{g.items.join(" · ")}</dd>
              </div>
            ))}
          </Defs>
        </Section>

        <Section>
          <SectionHead n="05" label={j.elsewhere} />
          <Links>
            <Link href="/home#contato">{j.contactCta} →</Link>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={contact.devto} target="_blank" rel="noopener noreferrer">Dev.to</a>
          </Links>
        </Section>
      </Page>
    </Wrap>
  );
}
