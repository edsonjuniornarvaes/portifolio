"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import {
  SiReact, SiTypescript, SiExpo, SiRedux, SiJest, SiNextdotjs, SiSupabase, SiSentry,
  SiFigma, SiGit, SiAuth0, SiMongodb,
} from "react-icons/si";
import * as S from "./styles";
import Reveal from "@/components/ui/reveal";
import GlowCard from "@/components/ui/glow-card";
import LocalTime from "@/components/ui/local-time";
import Typewriter from "@/components/ui/typewriter";
import Orbit, { type OrbitItem } from "@/components/ui/orbit";
import TechMarquee from "@/components/ui/tech-marquee";
import CopyButton from "@/components/ui/copy-button";
import GithubActivity from "@/components/ui/github-activity";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";
import { ExperienceData } from "../about/helper";
import { getProjectById, type Project } from "../projects/helper";
import { contact, yearsCareer, yearsStudying, STUDY_SINCE } from "@/data/profile";

const ORBIT: OrbitItem[] = [
  { label: "React Native", icon: SiReact, ring: 1, angle: 0 },
  { label: "TypeScript", icon: SiTypescript, ring: 1, angle: 120 },
  { label: "Expo", icon: SiExpo, ring: 1, angle: 240 },
  { label: "Redux", icon: SiRedux, ring: 2, angle: 15 },
  { label: "Jest", icon: SiJest, ring: 2, angle: 87 },
  { label: "Next.js", icon: SiNextdotjs, ring: 2, angle: 159 },
  { label: "Supabase", icon: SiSupabase, ring: 2, angle: 231 },
  { label: "Sentry", icon: SiSentry, ring: 2, angle: 303 },
  { label: "Figma", icon: SiFigma, ring: 3, angle: 40 },
  { label: "Git", icon: SiGit, ring: 3, angle: 130 },
  { label: "Auth0", icon: SiAuth0, ring: 3, angle: 220 },
  { label: "MongoDB", icon: SiMongodb, ring: 3, angle: 310 },
];

const TYPED = ["React Native", "TypeScript", "Arquitetura MVVM", "Pix e fintech", "Jest + CI/CD"];
const MORE = ["pjbank", "gruvi", "mont-b2b", "minha-navex"];

type BlogPostPreview = { id: string; slug: string; title: string; excerpt: string | null; created_at?: string };

function tone(status: Project["status"]) {
  return status === "production" ? "live" : status === "development" ? "dev" : "done";
}
const STATUS_LABEL = { production: "No ar", development: "Em desenvolvimento", paused: "Entregue" } as const;

function Experience() {
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
      .then((d) => setPosts((d.posts || []).slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  const market = getProjectById("clube-da-joia-marketplace");
  const app = getProjectById("clube-da-joia-app");
  const more = MORE.map((id) => getProjectById(id)).filter(Boolean) as Project[];

  return (
    <S.Page>
      {/* HERO */}
      <S.HeroGrid>
        <S.Blob $top="-120px" $right="-160px" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <S.MonoPill>
            <span className="dot" />
            Disponível para projetos
          </S.MonoPill>
          <S.BigName>
            Edson <span className="grad">Junior</span>
          </S.BigName>
          <S.Underline />
          <S.TypeLine>
            <Typewriter words={TYPED} />
          </S.TypeLine>
          <S.HeroText>
            <b>Desenvolvedor Mobile Sênior</b> especializado em <b>React Native</b>, construindo
            aplicativos com alta performance, arquitetura escalável e experiência do usuário de
            excelência para iOS e Android. Atualmente no <b>PJBank / Superlógica</b>.
          </S.HeroText>

          <S.Actions style={{ marginTop: 30 }}>
            <S.BtnGrad href="/projects">Ver projetos →</S.BtnGrad>
            <S.BtnGhost href={`mailto:${contact.email}`}>
              <FaEnvelope size={14} /> Contato
            </S.BtnGhost>
          </S.Actions>

          <S.HeroFoot>
            <div className="socials">
              <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon width={20} height={20} color="currentColor" />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon width={20} height={20} color="currentColor" />
              </a>
              <a href={contact.devto} target="_blank" rel="noopener noreferrer" aria-label="Dev.to">
                <DevtoIcon width={20} height={20} color="currentColor" />
              </a>
            </div>
            <span className="sep" />
            <span className="stat">
              <b>{yearsCareer}+</b>anos de carreira
            </span>
            <span className="stat">
              <b>{yearsStudying}</b>anos desde {STUDY_SINCE}
            </span>
            <span className="stat">
              Brasil · <LocalTime />
            </span>
          </S.HeroFoot>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <Orbit src="/images/edson.webp" alt="Edson Junior" items={ORBIT} />
        </motion.div>
      </S.HeroGrid>

      <S.StripWrap>
        <TechMarquee />
      </S.StripWrap>

      {/* PROJETOS */}
      <S.SectionBig id="projetos">
        <S.Blob $top="-60px" $left="-220px" $size={560} />
        <S.SectionHead>
          <div>
            <S.Eyebrow>Portfólio</S.Eyebrow>
            <S.BigTitle>
              Projetos <span className="grad">em destaque</span>
            </S.BigTitle>
            <p>Produtos que construí do zero e apps em que atuei, em produção nas lojas.</p>
          </div>
          <S.TextLink href="/projects">Ver todos →</S.TextLink>
        </S.SectionHead>

        {market && (
          <Reveal>
            <S.Feature>
              <div className="media">
                <S.Cover $color={market.iconColor}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="shot" src={market.galleryImages?.[0]} alt="Loja do Clube da Joia" />
                </S.Cover>
              </div>
              <div className="glass">
                <span className="kicker">Projeto próprio · 2026</span>
                <h3>{market.title}</h3>
                <p>{market.description}</p>
                <div className="tags">
                  {market.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <Link href={`/projects/${market.id}`}>Ver detalhes →</Link>
              </div>
            </S.Feature>
          </Reveal>
        )}

        {app && (
          <Reveal>
            <S.Feature $flip>
              <div className="media">
                <S.Cover $color={app.iconColor}>
                  <div className="phone">CJ</div>
                </S.Cover>
              </div>
              <div className="glass">
                <span className="kicker">Projeto próprio · 2026</span>
                <h3>{app.title}</h3>
                <p>{app.description}</p>
                <div className="tags">
                  {app.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <Link href={`/projects/${app.id}`}>Ver detalhes →</Link>
              </div>
            </S.Feature>
          </Reveal>
        )}

        <S.ProjGrid4 style={{ marginTop: 56 }}>
          {more.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <S.ProjCard href={`/projects/${p.id}`}>
                <S.Cover $color={p.iconColor} style={{ aspectRatio: "16 / 9" }}>
                  <div className="phone" style={{ width: "22%" }}>{p.iconLetter ?? p.title[0]}</div>
                </S.Cover>
                <div className="body">
                  <div className="top">
                    <h3>{p.title}</h3>
                    <S.Badge $tone={tone(p.status)}>{STATUS_LABEL[p.status]}</S.Badge>
                  </div>
                  <span className="sub">{p.tagline}</span>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </S.ProjCard>
            </Reveal>
          ))}
        </S.ProjGrid4>
      </S.SectionBig>

      {/* SOBRE (bento) */}
      <S.SectionBig id="sobre">
        <S.SectionHead>
          <div>
            <S.Eyebrow>Sobre</S.Eyebrow>
            <S.BigTitle>
              Quem está <span className="grad">por trás do código</span>
            </S.BigTitle>
          </div>
        </S.SectionHead>
        <S.BentoGrid>
          <S.Tile $span={7}>
            <span className="eyebrow">Sobre mim</span>
            <p>
              Sou <b>desenvolvedor mobile sênior</b>, com foco em <b>React Native</b> e{" "}
              <b>TypeScript</b>. Já levei para produção apps financeiros com Pix, um superapp para
              condomínios e apps de investimentos e telecom.
            </p>
            <p>
              Venho também do front-end web com React e Next.js, e já liderei um time como Scrum
              Master. Gosto de arquitetura limpa, testes e de acompanhar o app depois do lançamento.
            </p>
            <Link className="more" href="/about">
              Ler minha história →
            </Link>
          </S.Tile>

          <S.Tile $span={5}>
            <span className="eyebrow">Agora</span>
            <h3>O que estou fazendo</h3>
            <ul>
              <li>
                <span>
                  <b>PJBank</b> na Superlógica: autenticação, autorizações e Pix Automático
                </span>
              </li>
              <li>
                <span>
                  <b>Clube da Joia</b>: site, painel e app com pagamentos
                </span>
              </li>
              <li>
                <span>
                  Próximos passos: <b>notificações push</b>, <b>Mixpanel</b> e frete real
                </span>
              </li>
            </ul>
          </S.Tile>

          <S.Tile $span={4}>
            <span className="eyebrow">Jornada</span>
            <div className="huge">{yearsStudying}</div>
            <p style={{ marginTop: 10 }}>anos estudando e programando, desde {STUDY_SINCE}.</p>
            <div className="years">
              <span>2015</span>
              <span>2019</span>
              <span>2021</span>
              <span className="on">2025</span>
            </div>
          </S.Tile>

          <S.Tile $span={8}>
            <GithubActivity user="edsonjuniornarvaes" />
          </S.Tile>
        </S.BentoGrid>
      </S.SectionBig>

      {/* EXPERIÊNCIA */}
      <S.SectionBig id="experiencia">
        <S.SectionHead>
          <div>
            <S.Eyebrow>Carreira</S.Eyebrow>
            <S.BigTitle>
              Experiência <span className="grad">profissional</span>
            </S.BigTitle>
          </div>
        </S.SectionHead>
        <Experience />
      </S.SectionBig>

      {/* BLOG */}
      {posts.length > 0 && (
        <S.SectionBig id="blog">
          <S.BlogPanel>
            <div className="left">
              <S.Eyebrow>Blog</S.Eyebrow>
              <h2>
                Conteúdo sobre mobile, código e <span className="grad">carreira</span>
              </h2>
              <p>Artigos práticos sobre React Native, TypeScript e o que aprendo no dia a dia.</p>
              <S.Actions>
                <S.BtnGrad href="/blog">Ler blog ↗</S.BtnGrad>
              </S.Actions>
            </div>
            <div className="right">
              {posts.map((p) => (
                <Link key={p.id} className="post" href={`/blog/${p.slug}`}>
                  <small>
                    {p.created_at
                      ? new Date(p.created_at).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
                      : "Artigo"}
                  </small>
                  <strong>{p.title}</strong>
                </Link>
              ))}
            </div>
          </S.BlogPanel>
        </S.SectionBig>
      )}

      {/* CONTATO */}
      <S.SectionBig id="contato">
        <S.ContactCard>
          <S.Eyebrow>Fale comigo</S.Eyebrow>
          <h2>Contato</h2>
          <a className="mail" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <div className="row">
            <CopyButton text={contact.email} />
            <S.BtnGhost href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ height: 40 }}>
              LinkedIn
            </S.BtnGhost>
            <S.BtnGhost href={contact.github} target="_blank" rel="noopener noreferrer" style={{ height: 40 }}>
              GitHub
            </S.BtnGhost>
            <S.BtnGhost href={contact.devto} target="_blank" rel="noopener noreferrer" style={{ height: 40 }}>
              Dev.to
            </S.BtnGhost>
          </div>
        </S.ContactCard>
      </S.SectionBig>
    </S.Page>
  );
}
