"use client";

import styled from "styled-components";
import { FaGraduationCap, FaEnvelope } from "react-icons/fa";
import * as S from "../home/styles";
import Reveal from "@/components/ui/reveal";
import GlowCard from "@/components/ui/glow-card";
import { ExperienceData, EducationData, AboutText, DailyPractices } from "./helper";
import { contact, journey, yearsStudying, STUDY_SINCE } from "@/data/profile";

const Intro = styled.header`
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 56px;
  align-items: center;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 32px; }
  h1 { font-size: clamp(2.2rem, 5.5vw, 3.8rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 20px; }
  p { color: var(--text-secondary); line-height: 1.75; margin-bottom: 14px; }
`;

const Photo = styled.div`
  position: relative;
  border-radius: 28px;
  padding: 3px;
  background: var(--accent-gradient-wide);
  box-shadow: var(--glow-intense);
  img { display: block; width: 100%; border-radius: 26px; aspect-ratio: 1 / 1; object-fit: cover; object-position: top; }
`;

const Two = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
  h3 { font-size: 1.05rem; margin-bottom: 4px; }
  .meta { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); }
  > div > div { padding: 24px; height: 100%; }
  ul { list-style: none; display: grid; gap: 12px; }
  li { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.55; padding-left: 20px; position: relative; }
  li::before { content: "→"; position: absolute; left: 0; color: var(--accent-primary); }
`;

export default function About() {
  return (
    <S.Page>
      <Intro>
        <div>
          <S.Eyebrow>sobre mim</S.Eyebrow>
          <h1>
            Código que chega à loja <span className="gradient-text-wide">e se mantém de pé</span>
          </h1>
          {AboutText.split("\n\n").map((t) => (
            <p key={t.slice(0, 20)}>{t}</p>
          ))}
          <S.Actions style={{ marginTop: 24 }}>
            <S.Primary href={`mailto:${contact.email}`}>
              <FaEnvelope size={14} /> Falar comigo
            </S.Primary>
            <S.Ghost href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </S.Ghost>
          </S.Actions>
        </div>
        <Photo>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/edson.webp" alt="Retrato de Edson Junior" />
        </Photo>
      </Intro>

      {/* Jornada */}
      <S.Section id="jornada">
        <Reveal>
          <S.Eyebrow>jornada</S.Eyebrow>
          <S.SectionTitle>De {STUDY_SINCE} até hoje</S.SectionTitle>
          <S.SectionLead>
            São {yearsStudying} anos estudando e construindo software: da faculdade ao primeiro
            emprego, da web ao mobile e, agora, a produtos próprios.
          </S.SectionLead>
          <S.Legend>
            <span style={{ ["--c" as string]: "var(--accent-warm)" }}>estudo</span>
            <span style={{ ["--c" as string]: "var(--accent-primary)" }}>carreira</span>
            <span style={{ ["--c" as string]: "var(--accent-secondary)" }}>produtos próprios</span>
          </S.Legend>
        </Reveal>
        <S.Journey>
          {journey.map((j) => (
            <Reveal key={j.year + j.title}>
              <S.JourneyItem $kind={j.kind}>
                <span className="year">{j.year}</span>
                <div>
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
              </S.JourneyItem>
            </Reveal>
          ))}
        </S.Journey>
      </S.Section>

      {/* Experiência */}
      <S.Section id="experiencia">
        <Reveal>
          <S.Eyebrow>carreira</S.Eyebrow>
          <S.SectionTitle>Experiência profissional</S.SectionTitle>
        </Reveal>
        <S.Timeline style={{ marginTop: 32 }}>
          {ExperienceData.map((job) => (
            <Reveal key={`${job.company}-${job.period}`}>
              <S.TimelineItem>
                <header>
                  <h3>{job.role}</h3>
                  <span className="period">{job.period}</span>
                </header>
                <div className="company">
                  {job.company} · {job.location}
                </div>
                <p>{job.description}</p>
                <ul>
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <S.Chips>
                  {job.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </S.Chips>
              </S.TimelineItem>
            </Reveal>
          ))}
        </S.Timeline>
      </S.Section>

      {/* Formação + práticas */}
      <S.Section>
        <Two>
          <Reveal>
            <GlowCard>
              <div>
                <S.Eyebrow>formação</S.Eyebrow>
                <ul style={{ marginTop: 12 }}>
                  {EducationData.map((e) => (
                    <li key={e.course} style={{ paddingLeft: 0 }}>
                      <FaGraduationCap style={{ color: "var(--accent-primary)", marginRight: 8 }} />
                      <strong style={{ color: "var(--text-primary)" }}>{e.course}</strong>
                      <div className="meta">
                        {e.institution} · {e.period}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </Reveal>
          <Reveal delay={80}>
            <GlowCard>
              <div>
                <S.Eyebrow>no dia a dia</S.Eyebrow>
                <ul style={{ marginTop: 12 }}>
                  {DailyPractices.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </Reveal>
        </Two>
      </S.Section>
    </S.Page>
  );
}
