"use client";

import styled from "styled-components";
import * as S from "../home/styles";
import Reveal from "@/components/ui/reveal";
import PackageJson from "@/components/ui/package-json";
import { ExperienceData, EducationData } from "./helper";
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

const TOPICS = [
  { t: "MVVM na prática", d: "como organizar um app React Native para crescer" },
  { t: "Auth0", d: "SSO, MFA, login social, fluxos e tokens" },
  { t: "Atualizações OTA", d: "enviar updates sem passar pela loja (React Native Stallion)" },
  { t: "Cobranças em apps", d: "Stripe e pagamentos dentro do app" },
  { t: "IA no dia a dia", d: "economia de tokens ao usar Claude Code e agentes" },
];

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
            Sou desenvolvedor mobile sênior, especializado em <b>React Native</b> e{" "}
            <b>TypeScript</b>, com experiência em produtos de fintech, banco digital, telecom,
            e-commerce e superapps.
          </S.Lead>
          <S.Lead>
            Atuo em todo o ciclo de desenvolvimento: da arquitetura e implementação a testes,
            observabilidade, CI/CD e releases em produção. Tenho experiência com arquiteturas MVVM
            escaláveis, integrações com BFF, fluxos financeiros críticos como Pix, pagamentos e
            cobrança, autenticação segura com Auth0 e integrações nativas em iOS e Android.
          </S.Lead>
          <S.Lead>
            Também já atuei como Scrum Master, conectando decisões técnicas, metas de produto e o
            trabalho do time. Gosto de problemas complexos, de entender bases de código existentes
            e de entregar soluções confiáveis que escalam.
          </S.Lead>
          <S.Lead>
            Estudo tecnologia desde {STUDY_SINCE} e trabalho como desenvolvedor desde {CAREER_SINCE}.
            Moro em {location} e falo português e inglês. Contato:{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </S.Lead>
        </div>
        <S.Photo>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/edson.webp" alt="Retrato de Edson Junior" />
          <figcaption>
            Edson Junior · {location}
          </figcaption>
        </S.Photo>
      </Intro>

      <Reveal>
        <S.Section id="agora">
          <S.AboutGrid>
            <div>
              <S.Label>Agora</S.Label>
              <div className="text">
                <div className="now" style={{ marginTop: 0 }}>
                  <ul>
                    <li>
                      <b>PJBank</b> na Superlógica: arquitetura, autenticação e fluxos como o Pix
                      Automático
                    </li>
                    <li>
                      <b>Clube da Joia</b>: site, painel e app com pagamentos, em um backend só
                    </li>
                    <li>
                      Próximos passos: <b>notificações push</b>, <b>Mixpanel</b> e frete real
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{ marginTop: 32 }}>
                <S.Label>Sobre o que escrevo no LinkedIn</S.Label>
                <Topics>
                  {TOPICS.map((x) => (
                    <li key={x.t}>
                      <b>{x.t}</b>: {x.d}
                    </li>
                  ))}
                </Topics>
                <div style={{ marginTop: 18 }}>
                  <S.TextLink href={contact.linkedin}>Ver no LinkedIn →</S.TextLink>
                </div>
              </div>
            </div>
            <div>
              <S.Label>Tecnologias</S.Label>
              <S.Window>
                <PackageJson />
              </S.Window>
            </div>
          </S.AboutGrid>
        </S.Section>
      </Reveal>

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
    </S.Page>
  );
}
