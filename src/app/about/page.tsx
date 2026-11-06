"use client";

import styled from "styled-components";
import * as S from "../home/styles";
import Reveal from "@/components/ui/reveal";
import PackageJson from "@/components/ui/package-json";
import { ExperienceData, EducationData } from "./helper";
import { useLang } from "@/i18n/provider";
import { localizeJourney, localizeExperience, localizeEducation } from "@/i18n/content";
import { contact, journey, location, STUDY_SINCE, CAREER_SINCE } from "@/data/profile";

const Intro = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 48px;
  align-items: start;
  @media (max-width: 800px) { grid-template-columns: 1fr; gap: 24px; figure { max-width: 200px; order: -1; } }
`;

const Topics = styled.ul`
  list-style: none;
  display: grid;
  gap: 10px;
  li { color: var(--muted); font-size: 0.94rem; line-height: 1.5; padding-left: 18px; position: relative; }
  li::before { content: "›"; position: absolute; left: 0; color: var(--accent-ink); }
  li b { color: var(--ink); font-weight: 500; }
`;

export default function About() {
  const { lang, t } = useLang();
  const a = t.about;
  const journeyL = localizeJourney(journey, lang);
  const jobs = localizeExperience(ExperienceData, lang);
  const edu = localizeEducation(EducationData, lang);
  return (
    <S.Page>
      <Intro>
        <div>
          <S.Kicker>{a.kicker}</S.Kicker>
          <S.Display>
            {a.hi}<em>Edson</em>.
          </S.Display>
          <S.Lead>{a.p1}</S.Lead>
          <S.Lead>{a.p2}</S.Lead>
          <S.Lead>{a.p3}</S.Lead>
          <S.Lead>
            {a.p4a}
            {STUDY_SINCE}
            {a.p4b}
            {CAREER_SINCE}
            {a.p4c}
            {location}
            {a.p4d}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </S.Lead>
        </div>
        <S.Photo>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/edson.webp" alt={a.portraitAlt} />
          <figcaption>
            Edson Junior · {location}
          </figcaption>
        </S.Photo>
      </Intro>

      <Reveal>
        <S.Section id="agora">
          <S.AboutGrid>
            <div>
              <S.Label>{a.now}</S.Label>
              <div className="text">
                <div className="now" style={{ marginTop: 0 }}>
                  <ul>
                    <li>
                      <b>PJBank</b>
                      {a.now1At}
                      {a.now1}
                    </li>
                    <li>
                      <b>Clube da Joia</b>: {a.now2}
                    </li>
                    <li>
                      {a.now3a}
                      <b>{a.now3b}</b>
                      {a.now3c}
                      <b>Mixpanel</b>
                      {a.now3d}
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{ marginTop: 32 }}>
                <S.Label>{a.writeAbout}</S.Label>
                <Topics>
                  {a.topics.map((x) => (
                    <li key={x.t}>
                      <b>{x.t}</b>: {x.d}
                    </li>
                  ))}
                </Topics>
                <div style={{ marginTop: 18 }}>
                  <S.TextLink href={contact.linkedin}>{a.seeLinkedin}</S.TextLink>
                </div>
              </div>
            </div>
            <div>
              <S.Label>{a.stack}</S.Label>
              <S.Window>
                <PackageJson />
              </S.Window>
            </div>
          </S.AboutGrid>
        </S.Section>
      </Reveal>

      <Reveal>
        <S.Section id="jornada">
          <S.Label>{a.journey} {STUDY_SINCE} {a.untilNow}</S.Label>
          <S.List>
            {journeyL.map((j) => (
              <S.Row key={j.year + j.title}>
                <S.RowStatic>
                  <span className="year">{j.year}</span>
                  <span>
                    <span className="name">{j.title}</span>
                    <span className="what">{j.text}</span>
                  </span>
                  <span className="meta" />
                </S.RowStatic>
              </S.Row>
            ))}
          </S.List>
        </S.Section>
      </Reveal>

      <Reveal>
        <S.Section id="experiencia">
          <S.Label>{a.experience}</S.Label>
          <S.List>
            {jobs.map((job) => (
              <S.Row key={`${job.company}-${job.period}`}>
                <S.RowStatic>
                  <span className="year">{job.period}</span>
                  <span>
                    <span className="name">{job.role}</span>
                    <span className="what">
                      {job.company} · {job.location}
                    </span>
                    <span className="what" style={{ marginTop: 8 }}>{job.description}</span>
                  </span>
                  <span className="meta" />
                </S.RowStatic>
              </S.Row>
            ))}
          </S.List>
        </S.Section>
      </Reveal>

      <Reveal>
        <S.Section id="formacao">
          <S.Label>{a.education}</S.Label>
          <S.List>
            {edu.map((e) => (
              <S.Row key={e.course}>
                <S.RowStatic>
                  <span className="year">{e.period}</span>
                  <span>
                    <span className="name">{e.course}</span>
                    <span className="what">{e.institution}</span>
                  </span>
                  <span className="meta" />
                </S.RowStatic>
              </S.Row>
            ))}
          </S.List>
        </S.Section>
      </Reveal>
    </S.Page>
  );
}
