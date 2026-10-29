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
import ProjectCarousel from "@/components/ui/project-carousel";
import { ExperienceData } from "../about/helper";
import { getProjectById, type Project } from "../projects/helper";
import { contact, githubUsers, location, yearsCareer, yearsMobile, STUDY_SINCE } from "@/data/profile";

const FEATURED = [
  "clube-da-joia-marketplace",
  "clube-da-joia-app",
  "pjbank",
  "gruvi",
  "mont-b2b",
  "minha-navex",
];

type BlogPostPreview = { id: string; slug: string; title: string; excerpt: string | null; created_at?: string };

/** Hash curto e estável, só decorativo (estilo de commit). */
function shortHash(seed: string) {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = (h * 33) ^ seed.charCodeAt(i);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

function History() {
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
              <span className="hash">{shortHash(job.company + job.period)}</span>
              {i === 0 ? <span className="ref head">HEAD → main</span> : <span className="ref">merged</span>}
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

export default function Home() {
  const [posts, setPosts] = useState<BlogPostPreview[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setPosts((d.posts || []).slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  const projects = FEATURED.map((id) => getProjectById(id)).filter(Boolean) as Project[];

  return (
    <S.Page>
      {/* HERO */}
      <S.HeroWrap>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
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
              <dt>{STUDY_SINCE}</dt>
              <dd>ano em que comecei a estudar tecnologia</dd>
            </div>
          </S.Shortlog>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <S.PhotoCard>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/edson.webp" alt="Retrato de Edson Junior" />
            <div className="cap">
              <strong>Edson Junior</strong>
              <span>{location}</span>
            </div>
          </S.PhotoCard>
          <S.Window style={{ marginTop: 14 }}>
            <GithubActivity users={githubUsers} />
          </S.Window>
        </motion.div>
      </S.HeroWrap>

      {/* PROJETOS */}
      <S.Block id="projetos">
        <S.Head2>
          <div>
            <span className="tag">projetos</span>
            <h2>Projetos em destaque</h2>
            <p>Produtos que construí do zero e apps em que atuei.</p>
          </div>
          <S.TextLink href="/projects">Ver todos →</S.TextLink>
        </S.Head2>
        <ProjectCarousel projects={projects} />
      </S.Block>

      {/* EXPERIÊNCIA */}
      <S.Block id="experiencia">
        <S.Head2>
          <div>
            <span className="tag">experiência</span>
            <h2>Histórico de commits</h2>
            <p>Da web ao mobile: onde trabalhei e o que entreguei.</p>
          </div>
        </S.Head2>
        <History />
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
