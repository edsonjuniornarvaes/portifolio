"use client";

import Link from "next/link";
import * as S from "./styles";
import Reveal from "@/components/ui/reveal";
import CopyButton from "@/components/ui/copy-button";
import { ExperienceData } from "../about/helper";
import { getProjectById } from "../projects/helper";
import { contact, yearsStudying, STUDY_SINCE } from "@/data/profile";

const FEATURED = [
  "clube-da-joia-marketplace",
  "clube-da-joia-app",
  "pjbank",
  "gruvi",
  "mont-b2b",
  "minha-navex",
];

const STATUS = { production: "No ar", development: "Em desenvolvimento", paused: "Entregue" } as const;

export default function Home() {
  return (
    <S.Page>
      <S.Section id="sobre">
        <S.Label>Sobre</S.Label>
        <S.Prose>
          <p>
            Sou desenvolvedor mobile sênior, especializado em <strong>React Native</strong> e{" "}
            <strong>TypeScript</strong>. Construo aplicativos para iOS e Android pensando em
            performance, arquitetura escalável e em quem vai usar.
          </p>
          <p>
            Já levei para produção apps financeiros com Pix (<Link href="/projects/pjbank">PJBank</Link>
            ), um superapp para condomínios (<Link href="/projects/gruvi">Gruvi</Link>) e apps de
            investimentos e telecom. Venho também do front-end web com React e Next.js e já liderei
            um time como Scrum Master.
          </p>
          <p>
            Fora do trabalho, construo meus próprios produtos, como o{" "}
            <Link href="/projects/clube-da-joia-marketplace">Clube da Joia</Link>: site, painel e
            app com pagamentos, em um backend só.
          </p>
        </S.Prose>
        <S.Mono>
          <em>›</em> estudando e programando desde {STUDY_SINCE} · {yearsStudying} anos de estrada
        </S.Mono>
      </S.Section>

      <S.Section id="experiencia">
        <S.Label>Experiência</S.Label>
        <S.Items>
          {ExperienceData.map((job) => (
            <Reveal key={`${job.company}-${job.period}`}>
              <S.Item>
                <S.ExpGrid>
                  <div className="when">{job.period.replace(" - ", " — ")}</div>
                  <div>
                    <h3>
                      {job.role} · <span>{job.company}</span>
                    </h3>
                    <div className="where">{job.location}</div>
                    <p>{job.description}</p>
                    <S.Tags>
                      {job.skills.slice(0, 6).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </S.Tags>
                  </div>
                </S.ExpGrid>
              </S.Item>
            </Reveal>
          ))}
        </S.Items>
      </S.Section>

      <S.Section id="projetos">
        <S.Label>Projetos</S.Label>
        <S.Items>
          {FEATURED.map((id) => {
            const p = getProjectById(id);
            if (!p) return null;
            const shot = p.galleryImages?.[0];
            return (
              <Reveal key={id}>
                <S.Item>
                  <S.ProjGrid href={`/projects/${p.id}`}>
                    <div className="thumb" style={{ ["--c" as string]: p.iconColor }}>
                      {shot ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={shot} alt={`Tela de ${p.title}`} />
                      ) : (
                        p.iconLetter ?? p.title[0]
                      )}
                    </div>
                    <div>
                      <h3>
                        {p.title} <span className="arrow">↗</span>
                        <span className="status">{STATUS[p.status]}</span>
                      </h3>
                      <p>{p.description}</p>
                      <S.Tags>
                        {p.tags.slice(0, 5).map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </S.Tags>
                    </div>
                  </S.ProjGrid>
                </S.Item>
              </Reveal>
            );
          })}
        </S.Items>
        <div style={{ marginTop: 36 }}>
          <S.TextLink href="/projects">Ver todos os projetos →</S.TextLink>
        </div>
      </S.Section>

      <S.Section id="contato">
        <S.Label>Contato</S.Label>
        <S.Big href={`mailto:${contact.email}`}>{contact.email}</S.Big>
        <S.Row>
          <CopyButton text={contact.email} />
          <S.Pill href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</S.Pill>
          <S.Pill href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</S.Pill>
          <S.Pill href={contact.devto} target="_blank" rel="noopener noreferrer">Dev.to</S.Pill>
        </S.Row>
      </S.Section>
    </S.Page>
  );
}
