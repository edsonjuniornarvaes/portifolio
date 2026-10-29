"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import * as S from "../styles";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";
import Reveal from "@/components/ui/reveal";
import CountUp from "@/components/ui/count-up";
import CopyButton from "@/components/ui/copy-button";
import { getProjectById } from "../projects/helper";
import { contact } from "@/data/profile";

const techStack = [
  "React Native",
  "TypeScript",
  "Redux",
  "iOS",
  "Android",
  "Jest",
];

const stats = [
  { to: 7, suffix: "+", label: "Anos de Experiência" },
  { to: 11, suffix: "", label: "Anos estudando tecnologia, desde 2015" },
  { to: 12, suffix: "+", label: "Projetos Entregues" },
  { to: 2, suffix: "", label: "Graduações" },
];

const featuredIds = ["clube-da-joia-marketplace", "clube-da-joia-app", "pjbank"];

/* ===== Blog styled ===== */

const blogFade = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const BlogSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 0 40px;
`;

const BlogHeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px 20px;
  margin-bottom: 18px;
`;

const BlogHeaderText = styled.div`
  flex: 1;
  min-width: 0;
`;

const BlogHeading = styled.h2`
  font-family: var(--font-display, system-ui, sans-serif);
  font-size: clamp(1rem, 2.4vw, 1.2rem);
  font-weight: 600;
  color: #e4e4e7;
  letter-spacing: -0.02em;
  line-height: 1.35;
  margin: 0 0 6px;
`;

const BlogLead = styled.p`
  font-size: 0.8125rem;
  font-weight: 400;
  color: #71717a;
  line-height: 1.5;
  margin: 0;
  max-width: 36rem;
`;

const BlogCarousel = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 12px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-thumb { background: var(--bg-tertiary); border-radius: 4px; }
`;

const BlogCard = styled(Link)`
  flex: 0 0 min(300px, 82vw);
  scroll-snap-align: start;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  animation: ${blogFade} 0.45s ease forwards;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba(46, 235, 170, 0.35);
    transform: translateY(-3px);
  }
`;

const BlogCover = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--bg-secondary);
`;

const BlogCardBody = styled.div`
  padding: 16px 18px 20px;
`;

const BlogCardDate = styled.time`
  display: block;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const BlogCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
`;

const BlogExcerpt = styled.p`
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogSeeAll = styled(Link)`
  flex-shrink: 0;
  font-size: 0.8125rem;
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 500;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom-color: rgba(46, 235, 170, 0.45);
  }
`;

const BlogEmptyPanel = styled.div`
  padding: 22px 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: rgba(26, 26, 36, 0.25);
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const BlogEmptyText = styled.p`
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 12px;
`;

const BlogLoadingText = styled.p`
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-align: center;
  padding: 16px 0 4px;
`;

/* ===== Destaques e contato ===== */

const FeatSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0 48px;
`;

const FeatHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px 20px;
  margin-bottom: 22px;
`;

const FeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;

const FeatCard = styled(Link)<{ $color?: string }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(26, 26, 36, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(46, 235, 170, 0.3);
    background: rgba(46, 235, 170, 0.04);
  }

  .thumb {
    height: 150px;
    display: grid;
    place-items: center;
    overflow: hidden;
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, ${(p) => p.$color ?? "#1a1a24"}, rgba(10, 10, 15, 0.9));
  }
  .thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.5s ease; }
  &:hover .thumb img { transform: scale(1.04); }
  .body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
  h3 { font-size: 1.05rem; font-weight: 600; color: var(--text-primary); }
  p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; flex: 1; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
  .tags span {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 4px 10px;
    border-radius: 100px;
    color: #2eebaa;
    background: rgba(46, 235, 170, 0.08);
    border: 1px solid rgba(46, 235, 170, 0.2);
  }
`;

const ContactBox = styled.section`
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 40px 36px;
  border-radius: 20px;
  background: rgba(26, 26, 36, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(46, 235, 170, 0.18);
  @media (max-width: 600px) { padding: 28px 20px; }

  h2 { font-size: clamp(1.2rem, 2.4vw, 1.5rem); font-weight: 600; color: var(--text-primary); margin-bottom: 18px; }
  .mail {
    display: inline-block;
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 4vw, 2.1rem);
    font-weight: 600;
    word-break: break-word;
    background: linear-gradient(135deg, #2eebaa 0%, #06b6d4 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
  .row a {
    display: inline-flex; align-items: center; height: 40px; padding: 0 18px;
    border-radius: 12px; font-size: 0.85rem; color: var(--text-secondary);
    border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(26, 26, 36, 0.6);
    transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .row a:hover { color: #2eebaa; border-color: rgba(46, 235, 170, 0.4); transform: translateY(-2px); }
`;

/* ===== Types ===== */

type BlogPostPreview = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at?: string;
};

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPostPreview[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setBlogPosts((d.posts || []).slice(0, 6)))
      .catch(() => setBlogPosts([]))
      .finally(() => setBlogLoading(false));
  }, []);

  return (
    <S.PageWrapper>
      {/* Hero */}
      <S.HeroSection>
        <S.HeroContent>
          <S.HeroTextContent>
            <S.Greeting>Olá, eu sou</S.Greeting>
            <S.HeroTitle>Edson Junior</S.HeroTitle>
            <S.HeroRole>Desenvolvedor Mobile Sênior</S.HeroRole>
            <S.HeroDescription>
              Especializado em React Native, construindo aplicativos com alta performance,
              arquitetura escalável e experiência do usuário de excelência para iOS e Android.
            </S.HeroDescription>

            <S.TechStack>
              {techStack.map((tech) => (
                <S.TechBadge key={tech}>{tech}</S.TechBadge>
              ))}
            </S.TechStack>

            <S.SocialLinks>
              <S.SocialButton
                href="https://linkedin.com/in/edsonjuniornarvaes"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <LinkedInIcon width={24} height={24} color="currentColor" />
              </S.SocialButton>
              <S.SocialButton
                href="https://github.com/edsonjuniornarvaes"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <GitHubIcon width={24} height={24} color="currentColor" />
              </S.SocialButton>
              <S.SocialButton
                href="https://dev.to/edsonjuniornarvaes"
                target="_blank"
                rel="noopener noreferrer"
                title="Dev.to"
              >
                <DevtoIcon width={24} height={24} color="currentColor" />
              </S.SocialButton>
            </S.SocialLinks>
          </S.HeroTextContent>

          <S.HeroImageContent>
            <S.ProfileImageWrapper>
              <S.ProfileImageContainer>
                <S.ProfileImage
                  src="/images/edson.webp"
                  alt="Retrato de Edson Junior"
                />
              </S.ProfileImageContainer>
              <S.StatusBadge>
                <S.StatusDot />
                Disponível para projetos
              </S.StatusBadge>
            </S.ProfileImageWrapper>
          </S.HeroImageContent>
        </S.HeroContent>
      </S.HeroSection>

      {/* Stats */}
      <S.StatsSection>
        <S.StatsGrid>
          {stats.map((stat) => (
            <S.StatCard key={stat.label}>
              <S.StatNumber>
                <CountUp to={stat.to} suffix={stat.suffix} />
              </S.StatNumber>
              <S.StatLabel>{stat.label}</S.StatLabel>
            </S.StatCard>
          ))}
        </S.StatsGrid>
      </S.StatsSection>

      <FeatSection aria-label="Projetos em destaque">
        <FeatHeader>
          <BlogHeaderText>
            <BlogHeading>Projetos em destaque</BlogHeading>
            <BlogLead>Produtos que construí e apps em que atuei.</BlogLead>
          </BlogHeaderText>
          <BlogSeeAll href="/projects">Ver todos</BlogSeeAll>
        </FeatHeader>
        <FeatGrid>
          {featuredIds.map((id, i) => {
            const p = getProjectById(id);
            if (!p) return null;
            const shot = p.galleryImages?.[0];
            return (
              <Reveal key={id} delay={i * 80}>
                <FeatCard href={`/projects/${p.id}`} $color={p.iconColor}>
                  <div className="thumb">
                    {shot ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={shot} alt={`Tela de ${p.title}`} />
                    ) : (
                      p.iconLetter ?? p.title[0]
                    )}
                  </div>
                  <div className="body">
                    <h3>{p.title}</h3>
                    <p>{p.tagline}</p>
                    <div className="tags">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </FeatCard>
              </Reveal>
            );
          })}
        </FeatGrid>
      </FeatSection>

      <BlogSection aria-label="Últimas publicações do blog">
        <BlogHeaderRow>
          <BlogHeaderText>
            <BlogHeading>Confira minhas últimas publicações</BlogHeading>
            <BlogLead>Textos em markdown sobre tecnologia, mobile e o que venho aprendendo.</BlogLead>
          </BlogHeaderText>
          <BlogSeeAll href="/blog">Ver todas</BlogSeeAll>
        </BlogHeaderRow>
        {blogLoading ? (
          <BlogLoadingText>Carregando…</BlogLoadingText>
        ) : blogPosts.length > 0 ? (
          <BlogCarousel>
            {blogPosts.map((p) => (
              <BlogCard key={p.id} href={`/blog/${p.slug}`}>
                <BlogCover>
                  {p.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.cover_image_url}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(135deg, rgba(46,235,170,0.2) 0%, rgba(6,182,212,0.15) 100%)",
                      }}
                    />
                  )}
                </BlogCover>
                <BlogCardBody>
                  {p.created_at ? (
                    <BlogCardDate dateTime={p.created_at}>
                      {new Date(p.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </BlogCardDate>
                  ) : null}
                  <BlogCardTitle>{p.title}</BlogCardTitle>
                  {p.excerpt && <BlogExcerpt>{p.excerpt}</BlogExcerpt>}
                </BlogCardBody>
              </BlogCard>
            ))}
          </BlogCarousel>
        ) : (
          <BlogEmptyPanel>
            <BlogEmptyText>Em breve novos textos por aqui. Até lá, você pode abrir o blog.</BlogEmptyText>
            <BlogSeeAll href="/blog">Ir ao blog</BlogSeeAll>
          </BlogEmptyPanel>
        )}
      </BlogSection>
      <ContactBox id="contato">
        <h2>Contato</h2>
        <a className="mail" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        <div className="row">
          <CopyButton text={contact.email} />
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={contact.devto} target="_blank" rel="noopener noreferrer">Dev.to</a>
        </div>
      </ContactBox>
    </S.PageWrapper>
  );
}
