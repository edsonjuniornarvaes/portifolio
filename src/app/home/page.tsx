"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaDev, FaInstagram } from "react-icons/fa";
import * as S from "./styles";
import * as R from "./retro";
import Reveal from "@/components/ui/reveal";
import CountUp from "@/components/ui/count-up";
import LocalTime from "@/components/ui/local-time";
import CopyChip from "@/components/ui/copy-chip";
import Ticker, { type TickerItem } from "@/components/ui/ticker";
import GithubActivity from "@/components/ui/github-activity";
import WindowFrame from "@/components/retro/window-frame";
import { ExperienceData } from "../about/helper";
import { personalProjects, professionalProjects, webProjects, type Project } from "../projects/helper";
import { skillGroups } from "./skills";
import {
  contact,
  githubUsers,
  location,
  yearsCareer,
  yearsMobile,
  yearsStudying,
  SHOW_PROJECT_IMAGES,
} from "@/data/profile";

const GROUPS = [
  { id: "all", label: "todos" },
  { id: "own", label: "produtos próprios" },
  { id: "mobile", label: "apps" },
  { id: "web", label: "web" },
] as const;
type GroupId = (typeof GROUPS)[number]["id"];

const STATUS = { production: "no ar", development: "em desenvolvimento", paused: "entregue" } as const;
const DOT = { production: "#4ade80", development: "#fbbf24", paused: "var(--muted)" } as const;

type PostPreview = { id: string; slug: string; title: string; excerpt: string | null; created_at?: string };

const TICKER: TickerItem[] = [
  { label: `${yearsCareer}+ anos`, value: "como dev", tone: "live" },
  ...skillGroups.flatMap((g) => g.items.slice(0, 4)).map((t) => ({ label: t })),
  { label: `${yearsMobile}+ anos`, value: "em mobile", tone: "live" },
  { label: "PJBank", value: "no ar", tone: "live" },
  { label: "Gruvi", value: "no ar", tone: "live" },
  { label: `${yearsStudying}+ anos`, value: "em tecnologia", tone: "live" },
];

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

function Projects() {
  const [group, setGroup] = useState<GroupId>("all");
  const all = [...personalProjects, ...professionalProjects, ...webProjects];
  const list: Project[] =
    group === "own" ? personalProjects : group === "mobile" ? professionalProjects : group === "web" ? webProjects : all;
  const count = (g: GroupId) => (g === "own" ? personalProjects : g === "mobile" ? professionalProjects : g === "web" ? webProjects : all).length;

  return (
    <>
      <R.Filters role="group" aria-label="Filtrar projetos">
        <span className="lead">Filtrar por:</span>
        {GROUPS.map((g) => (
          <button key={g.id} aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
            {g.label}
            <sup>{String(count(g.id)).padStart(2, "0")}</sup>
          </button>
        ))}
      </R.Filters>
      <R.WinGrid>
        {list.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 50}>
            <R.WinCard href={`/projects/${p.id}`} $color={p.iconColor} style={{ ["--st" as string]: DOT[p.status] }}>
              <WindowFrame className="rv" reveal hue={p.type === "personal" ? "mint" : i % 2 ? "violet" : "warm"}>
                <div className="cover">
                  {SHOW_PROJECT_IMAGES && p.galleryImages?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.galleryImages[0]} alt={`Tela de ${p.title}`} loading="lazy" />
                  ) : (
                    <span className="letter">{p.iconLetter ?? p.title[0]}</span>
                  )}
                </div>
              </WindowFrame>
              <div className="cap">
                <strong>{p.title}</strong>
                <span>{p.tagline}</span>
                <em>● {STATUS[p.status]}</em>
              </div>
            </R.WinCard>
          </Reveal>
        ))}
      </R.WinGrid>
    </>
  );
}

export default function Home() {
  const [posts, setPosts] = useState<PostPreview[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setPosts((d.posts || []).slice(0, 4)))
      .catch(() => setPosts([]));
  }, []);

  return (
    <S.Page id="top">
      {/* 01 — HOME */}
      <R.Hero>
        <R.HeroGrid>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>
            <S.Avatar>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/edson.webp" alt="Edson Junior" />
              <span className="live" aria-label="Disponível" />
            </S.Avatar>
            <R.Kick>Olá, eu sou</R.Kick>
            <R.BigName>
              <span className="l1">Edson</span>
              <span className="l2">Junior</span>
            </R.BigName>
            <R.Script>
              Mobile <span>×</span> React Native <span>×</span> Fintech
            </R.Script>
            <R.Intro>
              <b>Desenvolvedor Mobile Sênior</b> especializado em React Native, construindo aplicativos com alta
              performance, arquitetura escalável e experiência do usuário de excelência para iOS e Android.
            </R.Intro>
            <S.Actions style={{ marginTop: 24 }}>
              <R.Cta href="/home#projetos">Ver projetos →</R.Cta>
              <S.BtnLine as={Link} href="/about" style={{ borderRadius: 0, borderWidth: 2 }}>
                Minha história
              </S.BtnLine>
            </S.Actions>
            <R.Stats>
              <div>
                <dt><CountUp to={yearsCareer} suffix="+" /></dt>
                <dd>anos como desenvolvedor profissional</dd>
              </div>
              <div>
                <dt><CountUp to={yearsMobile} suffix="+" /></dt>
                <dd>anos em desenvolvimento mobile</dd>
              </div>
              <div>
                <dt><CountUp to={yearsStudying} suffix="+" /></dt>
                <dd>anos de experiência em tecnologia</dd>
              </div>
            </R.Stats>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }}>
            <WindowFrame hue="violet" tilt={-1}>
              <GithubActivity users={githubUsers} />
            </WindowFrame>
            <p style={{ marginTop: 12, fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", textAlign: "right" }}>
              {location} · <LocalTime />
            </p>
          </motion.div>
        </R.HeroGrid>
      </R.Hero>

      <Ticker items={TICKER} />

      {/* 02 — PROJETOS */}
      <R.Section id="projetos">
        <R.Heading>
          <span className="tag">02 projetos</span>
          <h2>Projetos</h2>
          <p>Produtos que construí do zero e apps e sistemas em que atuei.</p>
        </R.Heading>
        <Projects />
      </R.Section>

      {/* 03 — EXPERIÊNCIA */}
      <R.Section id="experiencia">
        <R.Heading>
          <span className="tag">03 experiência</span>
          <h2>Experiência</h2>
        </R.Heading>
        <Experience />
      </R.Section>

      {/* 04 — BLOG */}
      <R.Section id="escrita">
        <R.Heading style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <div>
            <span className="tag">04 blog</span>
            <h2>Escrita</h2>
          </div>
          <R.Writing>
            <Link className="all" href="/blog">Todos os artigos</Link>
          </R.Writing>
        </R.Heading>
        <R.Writing>
          {posts.length ? (
            <ul>
              {posts.map((p) => (
                <li key={p.id}>
                  <Link className="post" href={`/blog/${p.slug}`}>
                    <h3>{p.title}</h3>
                    <time>
                      {p.created_at ? new Date(p.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) : ""}
                    </time>
                    {p.excerpt && <p>{p.excerpt}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">Em breve, textos sobre mobile, arquitetura e carreira.</p>
          )}
        </R.Writing>
      </R.Section>

      {/* 05 — CONTATO */}
      <R.Section id="contato">
        <R.Heading style={{ marginBottom: 18 }}>
          <span className="tag">05 contato</span>
          <h2>Contato</h2>
        </R.Heading>
        <R.ContactRow>
          <CopyChip email={contact.email} />
          <a className="chip" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn size={14} /> LinkedIn
          </a>
          <a className="chip" href={contact.github} target="_blank" rel="noopener noreferrer">
            <FaGithub size={14} /> GitHub
          </a>
          <a className="chip" href={contact.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram size={14} /> Instagram
          </a>
          <a className="chip" href={contact.devto} target="_blank" rel="noopener noreferrer">
            <FaDev size={16} /> Dev.to
          </a>
        </R.ContactRow>
      </R.Section>
    </S.Page>
  );
}
