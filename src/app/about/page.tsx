"use client";

import styled from "styled-components";
import * as S from "../home/styles";
import Reveal from "@/components/ui/reveal";
import { ExperienceData, EducationData } from "./helper";
import { skillGroups } from "../home/skills";
import { contact, journey, yearsStudying, STUDY_SINCE, CAREER_SINCE } from "@/data/profile";

const Intro = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  gap: 40px;
  align-items: start;
  @media (max-width: 760px) { grid-template-columns: 1fr; gap: 24px; figure { max-width: 180px; order: -1; } }
`;

export default function About() {
  return (
    <S.Page>
      <Intro>
        <div>
          <S.Kicker>Sobre</S.Kicker>
          <S.Display>
            Oi, eu sou o <em>Edson</em>.
          </S.Display>
          <S.Lead>
            Sou desenvolvedor mobile sênior e passo meus dias com React Native, TypeScript e as lojas
            de aplicativos. Gosto do trabalho que ninguém vê: arquitetura, testes e o monitoramento
            que avisa quando algo quebra antes de o usuário perceber.
          </S.Lead>
          <S.Lead>
            Estou na área há {yearsStudying} anos, entre estudo e prática, desde {STUDY_SINCE}. Minha
            carreira profissional começou em {CAREER_SINCE}, no primeiro emprego com PHP, e passou
            pela virada para o mobile e pela liderança de um time como Scrum Master. Hoje faço parte
            do time do PJBank e, nas horas vagas, construo produtos meus.
          </S.Lead>
          <S.Lead>
            Contato: <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </S.Lead>
        </div>
        <S.Photo>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/edson.webp" alt="Retrato de Edson Junior" />
          <figcaption>Edson Junior</figcaption>
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
          <S.Label>Formação</S.Label>
          <S.List>
            {EducationData.map((e) => (
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

      <Reveal>
        <S.Section id="ferramentas">
          <S.Label>Ferramentas</S.Label>
          <S.Panel>
            {skillGroups.map((g) => (
              <div key={g.title} style={{ marginBottom: 16 }}>
                <S.Plain>
                  <b>{g.title}</b>
                </S.Plain>
                <S.Chips>
                  {g.items.map((i) => (
                    <span key={i}>{i}</span>
                  ))}
                </S.Chips>
              </div>
            ))}
          </S.Panel>
        </S.Section>
      </Reveal>
    </S.Page>
  );
}
