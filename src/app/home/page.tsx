"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaDev, FaInstagram } from "react-icons/fa";
import * as S from "./styles";
import * as R from "./retro";
import Reveal from "@/components/ui/reveal";
import CountUp from "@/components/ui/count-up";
import CopyChip from "@/components/ui/copy-chip";
import Showcase from "@/components/home/showcase";
import GithubActivity from "@/components/ui/github-activity";
import Story from "@/components/home/story";
import TabletPortrait from "@/components/retro/tablet-portrait";
import TechIcon from "@/components/ui/tech-icon";
import WindowFrame from "@/components/retro/window-frame";
import Featured, { FEATURED_IDS } from "@/components/home/featured";
import ContactCta from "@/components/home/contact-cta";
import { Letters, Rotating } from "@/components/ui/hero-text";
import { ExperienceData } from "../about/helper";
import { useLang } from "@/i18n/provider";
import { LOCALE } from "@/i18n/config";
import { localizeExperience, localizeProject } from "@/i18n/content";
import { personalProjects, professionalProjects, webProjects, type Project } from "../projects/helper";
import { skillGroups } from "./skills";
import {
  contact,
  githubUsers,
} from "@/data/profile";

type GroupId = "all" | "own" | "mobile" | "web";
const GROUP_IDS: GroupId[] = ["all", "own", "mobile", "web"];

const DOT = { production: "#4ade80", development: "#fbbf24", paused: "var(--muted)" } as const;

type PostPreview = { id: string; slug: string; title: string; excerpt: string | null; created_at?: string };

const GROUP_KEY = { all: "all", own: "own", mobile: "apps", web: "web" } as const;

const WEB_IDS = new Set<string>([...webProjects.map((p) => p.id), "clube-da-joia-marketplace"]);
const isWeb = (p: Project) => WEB_IDS.has(p.id);
const inGroup = (p: Project, g: GroupId) =>
  g === "all" ? true : g === "own" ? p.type === "personal" : g === "web" ? isWeb(p) : !isWeb(p);

/** Todos os projetos juntos: os destaques (estudos de caso) primeiro e, logo abaixo, os demais; um filtro só vale para os dois. */
function Projects() {
  const { lang, t } = useLang();
  const [group, setGroup] = useState<GroupId>("all");
  const all = [...personalProjects, ...professionalProjects, ...webProjects];
  const featured = (FEATURED_IDS as readonly string[]).filter((id) => {
    const p = all.find((x) => x.id === id);
    return p && inGroup(p, group);
  });
  const rest = all.filter((p) => !(FEATURED_IDS as readonly string[]).includes(p.id) && inGroup(p, group));
  const list = rest.map((p) => localizeProject(p, lang));
  const count = (g: GroupId) => all.filter((p) => inGroup(p, g)).length;

  return (
    <>
      <R.Filters role="group" aria-label={t.home.filterAria}>
        <span className="lead">{t.home.filterBy}</span>
        {GROUP_IDS.map((g) => (
          <button key={g} aria-pressed={group === g} onClick={() => setGroup(g)}>
            {t.home[GROUP_KEY[g]]}
            <sup>{String(count(g)).padStart(2, "0")}</sup>
          </button>
        ))}
      </R.Filters>
      <Featured ids={featured} />
      <R.ProjList>
        <AnimatePresence mode="popLayout">
        {list.map((p) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div>
              <R.ProjRow data-spot href={`/projects/${p.id}`} $color={p.iconColor} style={{ ["--st" as string]: DOT[p.status] }}>
                <span className="mark" aria-hidden>
                  {p.iconLetter ?? p.title[0]}
                </span>
                <span>
                  <span className="top">
                    <h3>{p.title}</h3>
                    <span className="st">{t.status[p.status]}</span>
                  </span>
                  <p className="sub">{p.tagline}</p>
                  <span className="tags">
                    {p.tags.slice(0, 4).map((tag) => (
                      <span key={tag}>
                        <TechIcon name={tag} size={12} />
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
              </R.ProjRow>
            </div>
          </motion.li>
        ))}
        </AnimatePresence>
      </R.ProjList>
    </>
  );
}

export default function Home() {
  const { lang, t } = useLang();
  const [posts, setPosts] = useState<PostPreview[]>([]);

  const everything = [...personalProjects, ...professionalProjects, ...webProjects];
  const stats = [
    { n: everything.length, label: t.hero.statCareer },
    { n: everything.filter((p) => !isWeb(p)).length, label: t.hero.statMobile },
    { n: everything.filter(isWeb).length, label: t.hero.statTech },
  ];

  useEffect(() => {
    fetch(`/api/posts?lang=${lang}`)
      .then((r) => r.json())
      .then((d) => setPosts((d.posts || []).slice(0, 4)))
      .catch(() => setPosts([]));
  }, [lang]);

  return (
    <S.Page id="top" style={{ paddingTop: 24 }}>
      {/* 01 — HOME */}
      <R.Hero>
        <R.HeroStage>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>
            <WindowFrame>
              <div className="inner">
                <div className="main">
                  <R.Kick>{t.hero.hello}</R.Kick>
            <R.BigName>
              <span className="l1"><Letters text="Edson" delay={0.15} /></span>
              <span className="l2"><Letters text="Junior" delay={0.4} gradient /></span>
            </R.BigName>
            <R.Script>
              <span className="pre">{t.hero.lead}</span>
              <Rotating words={t.hero.words} />
            </R.Script>
            <R.Intro>
              <b>{t.hero.role}</b>
              {t.hero.intro}
            </R.Intro>
            <S.Actions style={{ marginTop: 24 }}>
              <R.Cta href="/home#projetos">{t.hero.cta}</R.Cta>
              <S.BtnLine as={Link} href="/home#contato" style={{ borderRadius: 0, borderWidth: 2 }}>
                {t.hero.story}
              </S.BtnLine>
            </S.Actions>
            <R.Stats>
              {stats.map((x) => (
                <div key={x.label}>
                  <dt><CountUp to={x.n} /></dt>
                  <dd>{x.label}</dd>
                </div>
              ))}
            </R.Stats>
                </div>
                <div className="tv">
                  <TabletPortrait src="/images/edson.webp" alt={t.hero.portraitAlt} />
                </div>
              </div>
            </WindowFrame>
          </motion.div>
        </R.HeroStage>
      </R.Hero>

      <Showcase />

      {/* 02 — PROJETOS */}
      <R.Section id="projetos">
        <R.Heading>
          <span className="tag">{t.home.projectsTag}</span>
          <h2>{t.home.projectsTitle}</h2>
        </R.Heading>
        <Projects />
      </R.Section>

      {/* 03 — TRAJETÓRIA */}
      <R.Section id="experiencia">
        <R.Heading>
          <span className="tag">{t.home.expTag}</span>
          <h2>{t.home.expTitle}</h2>
        </R.Heading>
        <Story />
      </R.Section>

      {/* 04 — ESCRITA */}
      <R.Section id="escrita">
        <R.Heading style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <div>
            <span className="tag">{t.site.writeTag}</span>
            <h2>{t.home.blogTitle}</h2>
          </div>
          <R.Writing>
            <Link className="all" href="/blog">{t.home.allPosts}</Link>
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
                      {p.created_at ? new Date(p.created_at).toLocaleDateString(LOCALE[lang], { day: "2-digit", month: "short", year: "numeric" }) : ""}
                    </time>
                    {p.excerpt && <p>{p.excerpt}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">{t.home.noPosts}</p>
          )}
        </R.Writing>
      </R.Section>

      <div style={{ marginTop: 72 }}>
        <WindowFrame hue="violet" tilt={-0.6}>
          <GithubActivity users={githubUsers} />
        </WindowFrame>
      </div>

      {/* 05 — CONTATO */}
      <R.Section id="contato">
        <R.Heading style={{ marginBottom: 18 }}>
          <span className="tag">{t.site.contactTag}</span>
          <h2>{t.home.contactTitle}</h2>
        </R.Heading>
        <ContactCta />
      </R.Section>
    </S.Page>
  );
}
