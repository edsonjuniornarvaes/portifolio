"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as S from "./styles";
import * as R from "./retro";
import Reveal from "@/components/ui/reveal";
import LocalTime from "@/components/ui/local-time";
import Ticker, { type TickerItem } from "@/components/ui/ticker";
import GithubActivity from "@/components/ui/github-activity";
import WindowFrame from "@/components/retro/window-frame";
import Hero from "@/components/home/hero";
import Work from "@/components/home/work";
import Experience from "@/components/home/experience";
import Education from "@/components/home/education";
import ContactCta from "@/components/home/contact-cta";
import { useLang } from "@/i18n/provider";
import { LOCALE } from "@/i18n/config";
import { skillGroups } from "./skills";
import { githubUsers, location, yearsCareer, yearsMobile, yearsStudying } from "@/data/profile";

type PostPreview = { id: string; slug: string; title: string; excerpt: string | null; created_at?: string };

export default function Home() {
  const { lang, t } = useLang();
  const s = t.site;
  const [posts, setPosts] = useState<PostPreview[]>([]);

  const ticker: TickerItem[] = [
    { label: `${yearsCareer}+ ${t.ticker.years}`, value: t.ticker.asDev, tone: "live" },
    ...skillGroups.flatMap((g) => g.items.slice(0, 4)).map((x) => ({ label: x })),
    { label: `${yearsMobile}+ ${t.ticker.years}`, value: t.ticker.inMobile, tone: "live" },
    { label: "PJBank", value: t.ticker.live, tone: "live" },
    { label: "Gruvi", value: t.ticker.live, tone: "live" },
    { label: `${yearsStudying}+ ${t.ticker.years}`, value: t.ticker.inTech, tone: "live" },
  ];

  useEffect(() => {
    fetch(`/api/posts?lang=${lang}`)
      .then((r) => r.json())
      .then((d) => setPosts((d.posts || []).slice(0, 4)))
      .catch(() => setPosts([]));
  }, [lang]);

  return (
    <S.Page>
      <Hero />

      <div style={{ marginTop: 28 }}>
        <Ticker items={ticker} />
      </div>

      {/* 02 — TRABALHOS */}
      <R.Section id="trabalhos">
        <R.Heading>
          <span className="tag">{s.workTag}</span>
          <h2>{s.workTitle}</h2>
        </R.Heading>
        <Work />
      </R.Section>

      {/* 03 — EXPERIÊNCIA */}
      <R.Section id="experiencia">
        <R.Heading>
          <span className="tag">{s.expTag}</span>
          <h2>{t.home.expTitle}</h2>
        </R.Heading>
        <Experience />
      </R.Section>

      {/* 05 — FORMAÇÃO */}
      <R.Section id="formacao">
        <R.Heading>
          <span className="tag">{s.eduTag}</span>
          <h2>{s.eduTitle}</h2>
        </R.Heading>
        <Education />
      </R.Section>

      {/* 06 — ESCRITA */}
      <R.Section id="escrita">
        <R.Heading style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <div>
            <span className="tag">{s.writeTag}</span>
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
        <p style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", textAlign: "right" }}>
          {location} · <LocalTime />
        </p>
      </div>

      {/* 07 — CONTATO */}
      <R.Section id="contato">
        <R.Heading style={{ marginBottom: 18 }}>
          <span className="tag">{s.contactTag}</span>
        </R.Heading>
        <ContactCta />
      </R.Section>
    </S.Page>
  );
}
