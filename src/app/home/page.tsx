"use client";

import { useEffect, useState } from "react";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import * as S from "./styles";
import Reveal from "@/components/ui/reveal";
import Typewriter from "@/components/ui/typewriter";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";
import { ExperienceData } from "../about/helper";
import { personalProjects } from "../projects/helper";
import { skillGroups, heroWords, heroStats, contact } from "./skills";

type BlogPostPreview = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at?: string;
};

const marqueeItems = skillGroups.flatMap((g) => g.items.slice(0, 3));

export default function Home() {
  const [posts, setPosts] = useState<BlogPostPreview[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setPosts((d.posts || []).slice(0, 6)))
      .catch(() => setPosts([]));
  }, []);

  return (
    <S.Page>
      {/* Hero */}
      <S.Hero>
        <div>
          <S.Status>Aberto a novas oportunidades</S.Status>
          <S.Title>
            Olá, eu sou <span className="gradient-text-wide">Edson Junior</span>
          </S.Title>
          <S.TypeLine>
            Desenvolvedor Mobile Sênior · <Typewriter words={heroWords} />
          </S.TypeLine>
          <S.Lead>
            Construo apps iOS e Android com React Native, TypeScript e foco em arquitetura,
            performance e segurança — de apps financeiros com Pix a superapps e e-commerce.
          </S.Lead>
          <S.Actions>
            <S.Primary href="/projects">
              Ver projetos <FaArrowRight size={14} />
            </S.Primary>
            <S.Ghost href={`mailto:${contact.email}`}>
              <FaEnvelope size={14} /> Falar comigo
            </S.Ghost>
          </S.Actions>
          <S.Socials>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon width={22} height={22} color="currentColor" />
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon width={22} height={22} color="currentColor" />
            </a>
            <a href={contact.devto} target="_blank" rel="noopener noreferrer" aria-label="Dev.to">
              <DevtoIcon width={22} height={22} color="currentColor" />
            </a>
          </S.Socials>
        </div>

        <S.Terminal aria-hidden>
          <S.TerminalBar>
            <span /><span /><span />
            <em>edson.ts</em>
          </S.TerminalBar>
          <S.Code>
            <span className="k">const</span> edson = {"{"}
            {"\n  "}role: <span className="s">&quot;Mobile Engineer&quot;</span>,
            {"\n  "}stack: [<span className="s">&quot;React Native&quot;</span>, <span className="s">&quot;TypeScript&quot;</span>,
            {"\n         "}<span className="s">&quot;Redux&quot;</span>, <span className="s">&quot;Jest&quot;</span>],
            {"\n  "}observability: [<span className="s">&quot;Sentry&quot;</span>, <span className="s">&quot;Datadog&quot;</span>],
            {"\n  "}ci: [<span className="s">&quot;Bitrise&quot;</span>, <span className="s">&quot;Harness&quot;</span>],
            {"\n  "}based: <span className="s">&quot;Brasil 🇧🇷&quot;</span>,
            {"\n  "}<span className="p">shipping</span>: <span className="k">true</span>,
            {"\n"}{"}"};{"\n\n"}
            <span className="c">{"// qualidade não é etapa, é hábito"}</span>
          </S.Code>
        </S.Terminal>
      </S.Hero>

      <S.Stats>
        {heroStats.map((s) => (
          <Reveal key={s.label}>
            <S.Stat>
              <strong>{s.number}</strong>
              <span>{s.label}</span>
            </S.Stat>
          </Reveal>
        ))}
      </S.Stats>

      <S.Marquee aria-hidden>
        <div>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </S.Marquee>

      {/* Skills */}
      <S.Section id="skills">
        <Reveal>
          <S.Eyebrow>stack</S.Eyebrow>
          <S.SectionTitle>Ferramentas do dia a dia</S.SectionTitle>
          <S.SectionLead>
            Do código à loja: testes, observabilidade, pipelines e design andam junto com a
            entrega.
          </S.SectionLead>
        </Reveal>
        <S.SkillGrid>
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 60}>
              <S.SkillCard>
                <h3>{g.title}</h3>
                <S.Chips>
                  {g.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </S.Chips>
              </S.SkillCard>
            </Reveal>
          ))}
        </S.SkillGrid>
      </S.Section>

      {/* Experiência */}
      <S.Section id="experiencia">
        <Reveal>
          <S.Eyebrow>carreira</S.Eyebrow>
          <S.SectionTitle>Experiência</S.SectionTitle>
          <S.SectionLead>
            Superlógica, E/Code e os produtos que ajudei a colocar no ar: PJBank, Gruvi, Mont
            Capital, Minha Navex e Gazin.
          </S.SectionLead>
        </Reveal>
        <S.Timeline>
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

      {/* Projetos */}
      <S.Section id="projetos">
        <Reveal>
          <S.Eyebrow>portfólio</S.Eyebrow>
          <S.SectionTitle>Projetos em destaque</S.SectionTitle>
          <S.SectionLead>
            Produtos pessoais que construo de ponta a ponta: design, app, backend e pagamentos.
          </S.SectionLead>
        </Reveal>
        <S.ProjectGrid>
          {personalProjects.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <S.ProjectCard href={`/projects/${p.id}`}>
                <div className="badge" style={p.iconColor ? { background: p.iconColor } : undefined}>
                  {p.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.icon} alt="" />
                  ) : (
                    p.iconLetter ?? p.title[0]
                  )}
                </div>
                <h3>{p.title}</h3>
                <p>{p.tagline}</p>
                <S.Chips>
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </S.Chips>
                <span className="more">Ver detalhes →</span>
              </S.ProjectCard>
            </Reveal>
          ))}
        </S.ProjectGrid>
        <div style={{ marginTop: 24 }}>
          <S.TextLink href="/projects">Ver todos os projetos →</S.TextLink>
        </div>
      </S.Section>

      {/* Blog */}
      {posts.length > 0 && (
        <S.Section id="artigos">
          <Reveal>
            <S.Eyebrow>artigos</S.Eyebrow>
            <S.SectionTitle>Últimas publicações</S.SectionTitle>
            <S.SectionLead>Textos sobre mobile, arquitetura e o que venho aprendendo.</S.SectionLead>
          </Reveal>
          <S.BlogRow>
            {posts.map((p) => (
              <S.BlogCard key={p.id} href={`/blog/${p.slug}`}>
                <div className="cover">
                  {p.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover_image_url} alt="" />
                  ) : null}
                </div>
                <div className="body">
                  {p.created_at ? (
                    <time dateTime={p.created_at}>
                      {new Date(p.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  ) : null}
                  <h3>{p.title}</h3>
                  {p.excerpt && <p>{p.excerpt}</p>}
                </div>
              </S.BlogCard>
            ))}
          </S.BlogRow>
          <div style={{ marginTop: 16 }}>
            <S.TextLink href="/blog">Ver todos os artigos →</S.TextLink>
          </div>
        </S.Section>
      )}

      {/* Contato */}
      <Reveal>
        <S.Cta id="contato">
          <h2>
            Vamos construir algo <span className="gradient-text-wide">incrível</span>?
          </h2>
          <p>
            Tem um app, uma ideia ou uma vaga para time mobile? Me chama — respondo rápido.
          </p>
          <S.Actions>
            <S.Primary href={`mailto:${contact.email}`}>
              <FaEnvelope size={14} /> {contact.email}
            </S.Primary>
            <S.Ghost href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </S.Ghost>
          </S.Actions>
        </S.Cta>
      </Reveal>
    </S.Page>
  );
}
