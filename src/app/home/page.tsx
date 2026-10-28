"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as S from "./styles";
import Reveal from "@/components/ui/reveal";
import LocalTime from "@/components/ui/local-time";
import { ExperienceData } from "../about/helper";
import { skillGroups } from "./skills";
import { contact, selectedWork, yearsMobile } from "@/data/profile";

type BlogPostPreview = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  created_at?: string;
};

export default function Home() {
  const [posts, setPosts] = useState<BlogPostPreview[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setPosts((d.posts || []).slice(0, 4)))
      .catch(() => setPosts([]));
  }, []);

  return (
    <S.Page>
      <S.Kicker>
        <span>
          <span className="dot" />
          Aberto a conversas
        </span>
        <span>Desenvolvedor mobile · Brasil · <LocalTime /></span>
      </S.Kicker>

      <S.Display>
        Faço apps de celular que <em>ficam de pé</em> depois do lançamento.
      </S.Display>

      <S.Lead>
        Sou o Edson, desenvolvedor mobile sênior. Trabalho com React Native e TypeScript há mais de{" "}
        {yearsMobile} anos, hoje no <Link href="/projects/pjbank">PJBank</Link>, na Superlógica, em
        fluxos como autenticação e Pix Automático.
      </S.Lead>
      <S.Lead>
        Antes passei pelo <Link href="/projects/gruvi">Gruvi</Link>, por apps de investimentos e de
        telecom na E/Code e por projetos web com React e PHP. Estudo e escrevo código desde 2015 e,
        fora do trabalho, construo meus próprios produtos, como o{" "}
        <Link href="/projects/clube-da-joia">Clube da Joia</Link>.
      </S.Lead>

      <S.Section id="trabalho">
        <S.Label>Trabalho selecionado</S.Label>
        <div>
          <S.List>
            {selectedWork.map((w) => (
              <S.Row key={w.name}>
                <S.RowLink href={w.href}>
                  <span className="year">{w.year}</span>
                  <span>
                    <span className="name">{w.name}</span>
                    <span className="what">{w.what}</span>
                  </span>
                  <span className="meta">{w.stack}</span>
                </S.RowLink>
              </S.Row>
            ))}
          </S.List>
          <S.TextLink href="/projects">Ver todos os projetos →</S.TextLink>
        </div>
      </S.Section>

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
                  </span>
                  <span className="meta" />
                </S.RowStatic>
              </S.Row>
            ))}
          </S.List>
        </S.Section>
      </Reveal>

      <Reveal>
        <S.Section id="jeito">
          <S.Label>Como eu trabalho</S.Label>
          <S.Prose>
            <p>
              Gosto de código que o time inteiro entende. Por isso uso MVVM, padronizo a arquitetura
              e escrevo testes com Jest nos fluxos que não podem quebrar.
            </p>
            <p>
              Depois do lançamento o app continua sendo trabalho: acompanho com Sentry, Datadog,
              Mixpanel e Kibana, e automatizo builds e releases com Bitrise e Harness.
            </p>
            <p>
              Já fui Scrum Master do time mobile da E/Code, então converso bem com design e negócio.
              Quando preciso, desenho no Figma.
            </p>
            <p style={{ marginTop: 28 }}>
              <S.TextLink href="/about" style={{ marginTop: 0 }}>
                Minha história desde 2015 →
              </S.TextLink>
            </p>
          </S.Prose>
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

      {posts.length > 0 && (
        <Reveal>
          <S.Section id="escrita">
            <S.Label>Escrita</S.Label>
            <div>
              <S.List>
                {posts.map((p) => (
                  <S.Row key={p.id}>
                    <S.RowLink href={`/blog/${p.slug}`}>
                      <span className="year">
                        {p.created_at
                          ? new Date(p.created_at).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
                          : ""}
                      </span>
                      <span>
                        <span className="name">{p.title}</span>
                        {p.excerpt && <span className="what">{p.excerpt}</span>}
                      </span>
                      <span className="meta" />
                    </S.RowLink>
                  </S.Row>
                ))}
              </S.List>
              <S.TextLink href="/blog">Todos os textos →</S.TextLink>
            </div>
          </S.Section>
        </Reveal>
      )}

      <S.Section id="contato">
        <S.Label>Contato</S.Label>
        <div>
          <S.H2>
            Tem um app, uma vaga ou uma ideia? <em>Vamos conversar.</em>
          </S.H2>
          <div style={{ marginTop: 36 }}>
            <S.Big href={`mailto:${contact.email}`}>{contact.email}</S.Big>
          </div>
          <S.Plain style={{ marginTop: 28 }}>
            Ou me ache no{" "}
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
              LinkedIn
            </a>{" "}
            e no{" "}
            <a href={contact.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
              GitHub
            </a>
            .
          </S.Plain>
        </div>
      </S.Section>
    </S.Page>
  );
}
