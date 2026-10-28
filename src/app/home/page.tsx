"use client";

import { useEffect, useState } from "react";
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
import { contact } from "@/data/profile";

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
          Disponível para projetos
        </span>
        <span>
          Brasil · <LocalTime />
        </span>
      </S.Kicker>

      <S.Greeting>Olá, eu sou</S.Greeting>
      <S.Display>Edson Junior</S.Display>
      <S.Role>Desenvolvedor Mobile Sênior</S.Role>

      <S.Lead>
        Especializado em React Native, construindo aplicativos com alta performance, arquitetura
        escalável e experiência do usuário de excelência para iOS e Android.
      </S.Lead>

      <S.Chips style={{ marginTop: 18 }}>
        {["React Native", "TypeScript", "Redux", "iOS", "Android", "Jest"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </S.Chips>

      <S.Actions>
        <S.Primary href="/projects">Ver projetos</S.Primary>
        <S.Ghost href={`mailto:${contact.email}`}>
          <FaEnvelope size={13} /> Contato
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
        <S.Label>Contato</S.Label>
        <S.Panel>
          <S.Big href={`mailto:${contact.email}`}>{contact.email}</S.Big>
          <S.Actions style={{ marginTop: 18 }}>
            <S.Ghost href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</S.Ghost>
            <S.Ghost href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</S.Ghost>
            <S.Ghost href={contact.devto} target="_blank" rel="noopener noreferrer">Dev.to</S.Ghost>
          </S.Actions>
        </S.Panel>
      </S.Section>
    </S.Page>
  );
}
