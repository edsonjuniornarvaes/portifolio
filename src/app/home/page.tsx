"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import * as S from "../styles";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";

const techStack = [
  "React Native",
  "TypeScript",
  "Redux",
  "iOS",
  "Android",
  "Jest",
];

const stats = [
  { number: "7+", label: "Anos de Experiência" },
  { number: "12+", label: "Projetos Entregues" },
  { number: "2", label: "Graduações" },
];

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
                  src="/images/profile-hero.png"
                  alt="Edson Junior no ambiente de trabalho"
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
              <S.StatNumber>{stat.number}</S.StatNumber>
              <S.StatLabel>{stat.label}</S.StatLabel>
            </S.StatCard>
          ))}
        </S.StatsGrid>
      </S.StatsSection>

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
    </S.PageWrapper>
  );
}
