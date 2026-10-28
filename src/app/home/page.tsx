"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import * as S from "./styles";
import Reveal from "@/components/ui/reveal";
import LocalTime from "@/components/ui/local-time";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";
import { ExperienceData } from "../about/helper";
import { getProjectById } from "../projects/helper";
import { skillGroups } from "./skills";
import { contact, yearsMobile } from "@/data/profile";

const FEATURED = ["clube-da-joia-marketplace", "clube-da-joia-app", "pjbank", "gruvi"];

const STATUS = { production: "No ar", development: "Em desenvolvimento", paused: "Entregue" } as const;

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

  const featured = FEATURED.map((id) => getProjectById(id)).filter(Boolean);

  return (
    <S.Page>
      <S.Kicker>
        <span>
          <span className="dot" />
          Aberto a conversas
        </span>
        <span>
          Brasil · <LocalTime />
        </span>
      </S.Kicker>

      <S.Display>
        Faço apps de celular que <em>ficam de pé</em> depois do lançamento.
      </S.Display>

      <S.Lead>
        Sou o Edson, desenvolvedor mobile sênior. Trabalho com <b>React Native</b> e{" "}
        <b>TypeScript</b> há mais de {yearsMobile} anos, hoje no{" "}
        <Link href="/projects/pjbank">PJBank</Link> (Superlógica), em fluxos como autenticação e Pix
        Automático. Estudo e escrevo código desde 2015 e, fora do trabalho, construo meus próprios
        produtos, como o <Link href="/projects/clube-da-joia-marketplace">Clube da Joia</Link>.
      </S.Lead>

      <S.Actions>
        <S.Primary href="/projects">Ver projetos</S.Primary>
        <S.Ghost href={`mailto:${contact.email}`}>
          <FaEnvelope size={13} /> Falar comigo
        </S.Ghost>
        <S.IconLink href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon width={18} height={18} color="currentColor" />
        </S.IconLink>
        <S.IconLink href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon width={18} height={18} color="currentColor" />
        </S.IconLink>
        <S.IconLink href={contact.devto} target="_blank" rel="noopener noreferrer" aria-label="Dev.to">
          <DevtoIcon width={18} height={18} color="currentColor" />
        </S.IconLink>
      </S.Actions>

      <S.Section id="projetos">
        <S.Label>
          Projetos em destaque
          <S.TextLink href="/projects">Ver todos →</S.TextLink>
        </S.Label>
        <S.Grid>
          {featured.map((p) =>
            p ? (
              <Reveal key={p.id}>
                <S.Card href={`/projects/${p.id}`} $color={p.iconColor}>
                  <div className="thumb">
                    {p.galleryImages?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.galleryImages[0]} alt={`Tela de ${p.title}`} />
                    ) : (
                      p.iconLetter ?? p.title[0]
                    )}
                  </div>
                  <div className="body">
                    <div className="top">
                      <h3>{p.title}</h3>
                      <span className="status">{STATUS[p.status]}</span>
                    </div>
                    <p>{p.tagline}</p>
                    <S.Chips>
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </S.Chips>
                  </div>
                </S.Card>
              </Reveal>
            ) : null,
          )}
        </S.Grid>
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
          <div style={{ marginTop: 14 }}>
            <S.TextLink href="/about">Minha jornada desde 2015 →</S.TextLink>
          </div>
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

      {posts.length > 0 && (
        <Reveal>
          <S.Section id="blog">
            <S.Label>
              Blog
              <S.TextLink href="/blog">Ver todos →</S.TextLink>
            </S.Label>
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
          </S.Section>
        </Reveal>
      )}

      <S.Section id="contato">
        <S.Panel>
          <S.H2>
            Tem um app, uma vaga ou uma ideia? <em>Vamos conversar.</em>
          </S.H2>
          <div style={{ marginTop: 20 }}>
            <S.Big href={`mailto:${contact.email}`}>{contact.email}</S.Big>
          </div>
        </S.Panel>
      </S.Section>
    </S.Page>
  );
}
