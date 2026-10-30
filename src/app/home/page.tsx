"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaDev } from "react-icons/fa";
import * as S from "./styles";
import Reveal from "@/components/ui/reveal";
import CountUp from "@/components/ui/count-up";
import LocalTime from "@/components/ui/local-time";
import CopyButton from "@/components/ui/copy-button";
import GithubActivity from "@/components/ui/github-activity";
import StackGroups from "@/components/ui/stack-groups";
import { ExperienceData } from "../about/helper";
import { personalProjects, professionalProjects, webProjects, type Project } from "../projects/helper";
import { contact, githubUsers, location, yearsCareer, yearsMobile } from "@/data/profile";

const GROUPS = [
  { id: "all", label: "Todos" },
  { id: "own", label: "Produtos próprios" },
  { id: "mobile", label: "Apps" },
  { id: "web", label: "Web" },
] as const;

type GroupId = (typeof GROUPS)[number]["id"];

const STATUS = { production: "No ar", development: "Em desenvolvimento", paused: "Entregue" } as const;
const DOT = { production: "#4ade80", development: "#fbbf24", paused: "var(--muted)" } as const;

type BlogPostPreview = { id: string; slug: string; title: string; excerpt: string | null; created_at?: string };

function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <S.Commits ref={ref}>
      <div className="rail">
        <motion.div className="fill" style={{ scaleY }} />
      </div>
      {ExperienceData.map((job, i) => (
        <Reveal key={`${job.company}-${job.period}`} className={`commit${i === 0 ? " head" : ""}`}>
          <S.CommitCard>
            <div className="meta">
              <span className="when">{job.period}</span>
            </div>
            <h3>{job.role}</h3>
            <div className="company">
              {job.company} · {job.location}
            </div>
            <p>{job.description}</p>
            <S.Chips style={{ marginTop: 14 }}>
              {job.skills.slice(0, 5).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </S.Chips>
          </S.CommitCard>
        </Reveal>
      ))}
    </S.Commits>
  );
}

function Tiles() {
  const [group, setGroup] = useState<GroupId>("all");
  const list: Project[] =
    group === "own"
      ? personalProjects
      : group === "mobile"
        ? professionalProjects
        : group === "web"
          ? webProjects
          : [...personalProjects, ...professionalProjects, ...webProjects];

  return (
    <>
      <S.TileTabs role="group" aria-label="Filtrar projetos">
        {GROUPS.map((g) => (
          <button key={g.id} aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
            {g.label}
          </button>
        ))}
      </S.TileTabs>
      <S.TileGrid>
        {list.map((p) => (
          <S.Tile key={p.id} href={`/projects/${p.id}`} $color={p.iconColor}>
            <div className="cover">
              {p.galleryImages?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.galleryImages[0]} alt={`Tela de ${p.title}`} loading="lazy" />
              ) : (
                <span className="letter">{p.iconLetter ?? p.title[0]}</span>
              )}
              <div className="over">
                <p>{p.tagline}</p>
              </div>
            </div>
            <div className="foot">
              <strong>{p.title}</strong>
              <span className="st" style={{ ["--c" as string]: DOT[p.status] }} title={STATUS[p.status]} />
            </div>
          </S.Tile>
        ))}
      </S.TileGrid>
    </>
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

  
  return (
    <S.Page>
      {/* HERO */}
      <S.HeroWrap>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <S.Avatar>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/edson.webp" alt="Edson Junior" />
            <span className="live" aria-label="Disponível" />
          </S.Avatar>
          <S.Caption>
            <span className="hi">{"// olá, eu sou"}</span>
            <span className="status">
              <span className="dot" />
              disponível para projetos
            </span>
            <span>
              {location} · <LocalTime />
            </span>
          </S.Caption>
          <S.Name>Edson Junior</S.Name>
          <S.RoleLine>Desenvolvedor Mobile Sênior</S.RoleLine>
          <S.Desc>
            Especializado em <b>React Native</b>, construindo aplicativos com alta performance,
            arquitetura escalável e experiência do usuário de excelência para <b>iOS</b> e{" "}
            <b>Android</b>. Atualmente no <b>PJBank / Superlógica</b>.
          </S.Desc>

          <S.Actions style={{ marginTop: 28 }}>
            <S.BtnMint href="/projects">Ver projetos →</S.BtnMint>
            <S.BtnLine href={`mailto:${contact.email}`}>
              <FaEnvelope size={14} /> Contato
            </S.BtnLine>
            <S.IconLink href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={18} />
            </S.IconLink>
            <S.IconLink href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </S.IconLink>
            <S.IconLink href={contact.devto} target="_blank" rel="noopener noreferrer" aria-label="Dev.to">
              <FaDev size={20} />
            </S.IconLink>
          </S.Actions>

          <S.Shortlog>
            <div>
              <dt>
                <CountUp to={yearsCareer} suffix="+" />
              </dt>
              <dd>anos como desenvolvedor</dd>
            </div>
            <div>
              <dt>
                <CountUp to={yearsMobile} suffix="+" />
              </dt>
              <dd>anos em desenvolvimento mobile</dd>
            </div>
            <div>
              <dt>Milhões</dt>
              <dd>de usuários no Gruvi, superapp em que atuei</dd>
            </div>
          </S.Shortlog>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
        >

          <S.Window>
            <GithubActivity users={githubUsers} />
          </S.Window>
        </motion.div>
      </S.HeroWrap>

      {/* POSICIONAMENTO */}
      <S.Block id="manifesto" style={{ marginTop: 72 }}>
        <Reveal>
          <S.Statement>
            Gosto de <b>problemas complexos</b>, de entender bases de código existentes e de entregar soluções{" "}
            <em>confiáveis que escalam</em>.
          </S.Statement>
        </Reveal>
      </S.Block>

      {/* PROJETOS */}
      <S.Block id="projetos">
        <S.Head2>
          <div>
            <span className="tag">projetos</span>
            <h2>Projetos</h2>
            <p>Produtos que construí do zero e apps e sistemas em que atuei.</p>
          </div>
          <S.TextLink href="/projects">Ver detalhes →</S.TextLink>
        </S.Head2>
        <Tiles />
      </S.Block>

      {/* STACK */}
      <S.Block id="stack">
        <S.Head2>
          <div>
            <span className="tag">stack</span>
            <h2>Minha stack</h2>
            <p>O que uso no dia a dia, do app à entrega em produção.</p>
          </div>
        </S.Head2>
        <StackGroups />
      </S.Block>

      {/* EXPERIÊNCIA */}
      <S.Block id="experiencia">
        <S.Head2>
          <div>
            <span className="tag">experiência</span>
            <h2>Experiência</h2>
            <p>Da web ao mobile: onde trabalhei e o que entreguei.</p>
          </div>
        </S.Head2>
        <Experience />
      </S.Block>

      {/* BLOG */}
      {posts.length > 0 && (
        <S.Block id="blog">
          <S.BlogPanel>
            <div className="left">
              <span className="tag" style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--accent-ink)" }}>
                ## blog
              </span>
              <h2 style={{ marginTop: 8 }}>Conteúdo sobre mobile, código e carreira</h2>
              <p>Artigos práticos sobre React Native, TypeScript e o que aprendo no dia a dia.</p>
              <S.Actions>
                <S.BtnMint href="/blog">Ler blog ↗</S.BtnMint>
              </S.Actions>
            </div>
            <div className="right">
              {posts.map((p) => (
                <Link key={p.id} className="post" href={`/blog/${p.slug}`}>
                  <small>
                    {p.created_at
                      ? new Date(p.created_at).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
                      : "artigo"}
                  </small>
                  <strong>{p.title}</strong>
                </Link>
              ))}
            </div>
          </S.BlogPanel>
        </S.Block>
      )}

      {/* CONTATO */}
      <S.Block id="contato">
        <S.ContactBox>
          <p className="prompt">
            <b>$</b> contato
          </p>
          <a className="mail" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <div className="row">
            <CopyButton text={contact.email} />
            <S.BtnLine href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ height: 40 }}>
              LinkedIn
            </S.BtnLine>
            <S.BtnLine href={contact.github} target="_blank" rel="noopener noreferrer" style={{ height: 40 }}>
              GitHub
            </S.BtnLine>
            <S.BtnLine href={contact.devto} target="_blank" rel="noopener noreferrer" style={{ height: 40 }}>
              Dev.to
            </S.BtnLine>
          </div>
        </S.ContactBox>
      </S.Block>
    </S.Page>
  );
}
