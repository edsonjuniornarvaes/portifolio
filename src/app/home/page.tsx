"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import { SiReact } from "react-icons/si";
import * as S from "./styles";
import * as R from "./retro";
import Reveal from "@/components/ui/reveal";
import CountUp from "@/components/ui/count-up";
import CopyButton from "@/components/ui/copy-button";
import GithubActivity from "@/components/ui/github-activity";
import StackGroups from "@/components/ui/stack-groups";
import WindowFrame from "@/components/retro/window-frame";
import Wave from "@/components/retro/wave";
import TvPortrait from "@/components/retro/tv-portrait";
import Shapes from "@/components/retro/shapes";
import { ExperienceData } from "../about/helper";
import { personalProjects, professionalProjects, webProjects, getProjectById, type Project } from "../projects/helper";
import { contact, githubUsers, yearsCareer, yearsMobile, yearsStudying, SHOW_PROJECT_IMAGES } from "@/data/profile";

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
              <svg className="bracket" viewBox="0 0 44 60" aria-hidden>
                <path d="M1 1 H28 L43 15 V59 H1 Z" fill="none" strokeWidth="2" />
              </svg>
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

  const feat = getProjectById("clube-da-joia-marketplace");

  return (
    <S.Page id="top">
      {/* 01 — HOME */}
      <R.Hero>
        <Shapes />
        <R.HeroStage>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>
            <WindowFrame>
              <div className="inner">
              <div className="main">
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
                <S.Actions style={{ marginTop: 26 }}>
                  <R.Cta href="/home#projetos">Ver projetos →</R.Cta>
                  <S.BtnLine href={`mailto:${contact.email}`} style={{ borderRadius: 0, borderWidth: 2 }}>
                    <FaEnvelope size={14} /> Contato
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
              </div>
              <div className="tv">
                <TvPortrait src="/images/edson.webp" alt="Retrato de Edson Junior" />
              </div>
              </div>
            </WindowFrame>
          </motion.div>
        </R.HeroStage>
        <R.ScrollCue aria-hidden>
          <span />
          <svg viewBox="0 0 24 24"><path d="M12 22 3 11h6V2h6v9h6z" /></svg>
        </R.ScrollCue>
      </R.Hero>

      {/* Intro em faixa */}
      <R.Band id="sobre" style={{ marginTop: 80 }}>
        <div className="edge-top"><Wave id="top" flip /></div>
        <div className="grid">
          <div>
            <h2>Prazer, Edson!</h2>
            <p>
              Sou <b>desenvolvedor mobile sênior</b>, com foco em <b>React Native</b> e <b>TypeScript</b>. Já levei para
              produção apps financeiros com Pix, um superapp de condomínios e apps de investimentos e telecom.
            </p>
            <p>
              Atuo em todo o ciclo: da arquitetura e implementação a testes, observabilidade, CI/CD e releases. Também já
              fui Scrum Master, e gosto de problemas complexos e de entregar soluções confiáveis que escalam.
            </p>
            <p style={{ marginTop: 18 }}>
              <Link href="/about" style={{ fontFamily: "var(--font-mono)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 5 }}>
                Minha história desde 2015 →
              </Link>
            </p>
          </div>
          <WindowFrame hue="violet" tilt={-1.5}>
            <GithubActivity users={githubUsers} />
          </WindowFrame>
        </div>
        <div className="edge-bot"><Wave id="bot" /></div>
      </R.Band>

      {/* 02 — EXPERTISE */}
      <R.Section id="expertise" style={{ marginTop: 150 }}>
        <R.Heading>
          <span className="tag">02 expertise</span>
          <h2>O que eu faço</h2>
        </R.Heading>
        <R.Cards3>
          <div>
            <div className="card" style={{ ["--c" as string]: "#c4a1ff" }}>
              <div className="top">
                <SiReact />
                <h3><u>Desenvolvimento</u><br />Mobile</h3>
              </div>
              <div className="code">
                <span className="tg">{"<p>"}</span>
                <span className="in">Apps iOS e Android com React Native, Expo e TypeScript. MVVM, integrações nativas e publicação nas lojas.</span>
                <span className="tg">{"</p>"}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="card" style={{ ["--c" as string]: "#ff7eb6" }}>
              <div className="top">
                <FaLock />
                <h3><u>Fintech</u><br />e pagamentos</h3>
              </div>
              <div className="code">
                <span className="tg">{"<p>"}</span>
                <span className="in">Pix, Pix Automático, cobrança e autenticação segura com Auth0. Integrações via BFF.</span>
                <span className="tg">{"</p>"}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="card" style={{ ["--c" as string]: "#2eebaa" }}>
              <div className="top">
                <FaCheckCircle />
                <h3><u>Qualidade</u><br />e entrega</h3>
              </div>
              <div className="code">
                <span className="tg">{"<p>"}</span>
                <span className="in">Testes com Jest, monitoramento com Sentry, Datadog e Mixpanel, CI/CD com Bitrise e Harness.</span>
                <span className="tg">{"</p>"}</span>
              </div>
            </div>
          </div>
        </R.Cards3>
        <div style={{ marginTop: 40 }}>
          <StackGroups />
        </div>
      </R.Section>

      {/* 03 — PROJETOS */}
      <R.Section id="projetos">
        <R.Work>
          <div className="txt">
            <R.Heading style={{ marginBottom: 20 }}>
              <span className="tag">03 projetos</span>
              <h2>Meus<br />projetos</h2>
            </R.Heading>
            <p>
              Produtos que construí do zero, como o Clube da Joia, e apps e sistemas em que atuei, de fintech a telecom e
              e-commerce.
            </p>
          </div>
          {feat && (
            <div className="feat">
              <WindowFrame tilt={2}>
                <Link href={`/projects/${feat.id}`} className="shot">
                  {SHOW_PROJECT_IMAGES && feat.galleryImages?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={feat.galleryImages[0]} alt={`Tela de ${feat.title}`} />
                  ) : (
                    <span className="mock" style={{ ["--c" as string]: feat.iconColor }}>
                      <b>{feat.iconLetter ?? feat.title[0]}</b>
                      <i>{feat.tags.slice(0, 3).join(" · ")}</i>
                    </span>
                  )}
                </Link>
              </WindowFrame>
              <small>Projeto em destaque</small>
              <h3>{feat.title}</h3>
              <R.Cta href={`/projects/${feat.id}`}>Ver projeto →</R.Cta>
            </div>
          )}
        </R.Work>
        <Projects />
      </R.Section>

      {/* 04 — EXPERIÊNCIA */}
      <R.Section id="experiencia">
        <R.Heading>
          <span className="tag">04 experiência</span>
          <h2>Experiência</h2>
          <p>Da web ao mobile: onde trabalhei e o que entreguei.</p>
        </R.Heading>
        <Experience />
      </R.Section>

      {/* 05 — BLOG */}
      <R.Section id="escrita">
        <R.Heading style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <div>
            <span className="tag">05 blog</span>
            <h2>Escrita</h2>
          </div>
          <R.Writing><Link className="all" href="/blog">Todos os artigos</Link></R.Writing>
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

      {/* 06 — CONTATO */}
      <R.Section id="contato">
        <WindowFrame hue="mint">
          <R.ContactWin>
            <p className="prompt">Fale comigo</p>
            <a className="mail" href={`mailto:${contact.email}`}>{contact.email}</a>
            <div className="row">
              <CopyButton text={contact.email} />
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer">github</a>
              <a href={contact.devto} target="_blank" rel="noopener noreferrer">dev.to</a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer">instagram</a>
            </div>
          </R.ContactWin>
        </WindowFrame>
      </R.Section>
    </S.Page>
  );
}
