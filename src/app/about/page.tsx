"use client";

import styled from "styled-components";
import * as S from "../home/styles";
import Reveal from "@/components/ui/reveal";
import { ExperienceData, EducationData } from "./helper";
import { skillGroups } from "../home/skills";
import { contact, journey, yearsStudying, STUDY_SINCE } from "@/data/profile";

const Intro = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 56px;
  align-items: start;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 36px; }
  figure { order: 2; }
  @media (min-width: 861px) { figure { position: sticky; top: 100px; } }
`;

export default function About() {
  return (
    <S.Page>
      <Intro>
        <div>
          <S.Kicker>Sobre</S.Kicker>
          <S.Display style={{ maxWidth: "14ch" }}>
            Oi, eu sou o <em>Edson</em>.
          </S.Display>
          <S.Lead>
            Sou desenvolvedor mobile sênior e passo meus dias com React Native, TypeScript e as
            lojas de aplicativos. Gosto do trabalho que ninguém vê: arquitetura, testes e o
            monitoramento que avisa quando algo quebra antes de o usuário perceber.
          </S.Lead>
          <S.Lead>
            Comecei a estudar tecnologia em {STUDY_SINCE}. Foram {yearsStudying} anos entre
            faculdade, pós-graduação, primeiro emprego com PHP, a virada para o mobile e a
            liderança de um time como Scrum Master. Hoje faço parte do time do PJBank e, nas horas
            vagas, construo produtos meus.
          </S.Lead>
          <S.Lead>
            Me dou bem com quem desenha e com quem decide, porque já estive dos dois lados da
            conversa. Se quiser trocar uma ideia,{" "}
            <a href={`mailto:${contact.email}`}>é só escrever</a>.
          </S.Lead>
        </div>
        <S.Photo>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/edson.webp" alt="Retrato de Edson Junior" />
          <figcaption>Edson Junior, desenvolvedor mobile.</figcaption>
        </S.Photo>
      </Intro>

      <Reveal>
        <S.Section id="jornada">
          <S.Label>Jornada, {STUDY_SINCE} até hoje</S.Label>
          <S.List>
            {journey.map((j) => (
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
          <S.Label>Experiência</S.Label>
          <S.List>
            {ExperienceData.map((job) => (
              <S.Row key={`${job.company}-${job.period}`}>
                <S.RowStatic>
                  <span className="year">{job.period}</span>
                  <span>
                    <span className="name">{job.role}</span>
                    <span className="what">
                      {job.company} · {job.location}
                    </span>
                    <span className="what" style={{ color: "var(--ink)", opacity: 0.8, marginTop: 10 }}>
                      {job.description}
                    </span>
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
          <S.Label>Formação</S.Label>
          <S.List>
            {EducationData.map((e) => (
              <S.Row key={e.course}>
                <S.RowStatic>
                  <span className="year">{e.period}</span>
                  <span>
                    <span className="name" style={{ fontSize: "1.35rem" }}>{e.course}</span>
                    <span className="what">{e.institution}</span>
                  </span>
                  <span className="meta" />
                </S.RowStatic>
              </S.Row>
            ))}
          </S.List>
        </S.Section>
      </Reveal>

      <Reveal>
        <S.Section id="ferramentas">
          <S.Label>Ferramentas</S.Label>
          <div style={{ maxWidth: "38rem" }}>
            {skillGroups.map((g) => (
              <S.Plain key={g.title}>
                <b>{g.title}.</b> {g.items.join(", ")}.
              </S.Plain>
            ))}
          </div>
        </S.Section>
      </Reveal>
    </S.Page>
  );
}
