"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { SiReact, SiTypescript } from "react-icons/si";
import * as S from "./styles";
import Reveal from "@/components/ui/reveal";
import LocalTime from "@/components/ui/local-time";
import GlowCard from "@/components/ui/glow-card";
import Tilt from "@/components/ui/tilt";
import CountUp from "@/components/ui/count-up";
import CopyButton from "@/components/ui/copy-button";
import TechMarquee, { techItems } from "@/components/ui/tech-marquee";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";
import { ExperienceData } from "../about/helper";
import { getProjectById } from "../projects/helper";
import { contact, yearsCareer, yearsMobile, yearsStudying, STUDY_SINCE } from "@/data/profile";

const FEATURED = [
  { id: "clube-da-joia-marketplace", span: 4 },
  { id: "clube-da-joia-app", span: 2 },
  { id: "pjbank", span: 3 },
  { id: "gruvi", span: 3 },
];

const STATUS = { production: "No ar", development: "Em desenvolvimento", paused: "Entregue" } as const;

type BlogPostPreview = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  created_at?: string;
};

function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <S.Timeline ref={ref}>
      <div className="rail">
        <motion.div className="fill" style={{ scaleY }} />
      </div>
      {ExperienceData.map((job) => (
        <Reveal key={`${job.company}-${job.period}`} className="item">
          <GlowCard>
            <S.JobCard>
              <div className="head">
                <h3>{job.role}</h3>
                <span className="period">{job.period}</span>
              </div>
              <div className="company">
                {job.company} · {job.location}
              </div>
              <p>{job.description}</p>
              <S.Chips style={{ marginTop: 14 }}>
                {job.skills.slice(0, 5).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </S.Chips>
            </S.JobCard>
          </GlowCard>
        </Reveal>
      ))}
    </S.Timeline>
  );
}

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
      <S.Hero>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
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
            Especializado em React Native, construindo aplicativos com alta performance,
            arquitetura escalável e experiência do usuário de excelência para iOS e Android.
          </S.Lead>

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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <S.PhotoStage>
            <Tilt>
              <div className="frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/edson.webp" alt="Edson Junior" />
              </div>
            </Tilt>
            <span className="float a">
              <SiReact /> React Native
            </span>
            <span className="float b">
              <SiTypescript /> TypeScript
            </span>
            <span className="float c">PJBank · Superlógica</span>
          </S.PhotoStage>
        </motion.div>
      </S.Hero>

      <S.Stats>
        <GlowCard>
          <div>
            <strong>
              <CountUp to={yearsMobile} suffix="+" />
            </strong>
            <small>anos com React Native</small>
          </div>
        </GlowCard>
        <GlowCard>
          <div>
            <strong>
              <CountUp to={yearsCareer} suffix="+" />
            </strong>
            <small>anos de carreira profissional</small>
          </div>
        </GlowCard>
        <GlowCard>
          <div>
            <strong>
              <CountUp to={yearsStudying} />
            </strong>
            <small>anos estudando tecnologia, desde {STUDY_SINCE}</small>
          </div>
        </GlowCard>
      </S.Stats>

      <div style={{ marginTop: 56 }}>
        <TechMarquee />
      </div>

      <S.Section id="projetos">
        <S.Label>
          <span style={{ flex: 1 }}>Projetos em destaque</span>
          <S.TextLink href="/projects">Ver todos →</S.TextLink>
        </S.Label>
        <S.Bento>
          {FEATURED.map(({ id, span }) => {
            const p = getProjectById(id);
            if (!p) return null;
            return (
              <S.BentoCell key={id} $span={span}>
                <Reveal>
                  <GlowCard>
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
                          {p.tags.slice(0, 4).map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </S.Chips>
                      </div>
                    </S.Card>
                  </GlowCard>
                </Reveal>
              </S.BentoCell>
            );
          })}
        </S.Bento>
      </S.Section>

      <S.Section id="experiencia">
        <S.Label>
          <span style={{ flex: 1 }}>Experiência</span>
          <S.TextLink href="/about">Jornada desde {STUDY_SINCE} →</S.TextLink>
        </S.Label>
        <ExperienceTimeline />
      </S.Section>

      <S.Section id="ferramentas">
        <S.Label>
          <span style={{ flex: 1 }}>Ferramentas</span>
        </S.Label>
        <S.StackGrid>
          {techItems.map(([Icon, label]) => (
            <S.StackItem key={label}>
              <Icon />
              {label}
            </S.StackItem>
          ))}
        </S.StackGrid>
      </S.Section>

      {posts.length > 0 && (
        <S.Section id="blog">
          <S.Label>
            <span style={{ flex: 1 }}>Blog</span>
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
      )}

      <S.Section id="contato">
        <S.Label>
          <span style={{ flex: 1 }}>Contato</span>
        </S.Label>
        <GlowCard>
          <S.Panel>
            <S.Big href={`mailto:${contact.email}`}>{contact.email}</S.Big>
            <S.Actions style={{ marginTop: 22 }}>
              <CopyButton text={contact.email} />
              <S.Ghost href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</S.Ghost>
              <S.Ghost href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</S.Ghost>
              <S.Ghost href={contact.devto} target="_blank" rel="noopener noreferrer">Dev.to</S.Ghost>
            </S.Actions>
          </S.Panel>
        </GlowCard>
      </S.Section>
    </S.Page>
  );
}
