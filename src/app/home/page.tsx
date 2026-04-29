"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import * as S from "../styles";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";
import { FaReact, FaMobileAlt, FaApple, FaAndroid, FaCode, FaRocket } from "react-icons/fa";
import { SiTypescript, SiRedux } from "react-icons/si";
import { OrbitBackground } from "@/components/orbit-bg";

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

const blogFade = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const BlogSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0 48px;
`;

const BlogHeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`;

const BlogCarousel = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 12px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--bg-tertiary);
    border-radius: 4px;
  }
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
  font-size: 0.9375rem;
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

type BlogPostPreview = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at?: string;
};

const skills = [
  {
    icon: <FaMobileAlt />,
    name: "React Native",
    description: "Apps nativos de alta performance para iOS e Android",
  },
  {
    icon: <SiTypescript />,
    name: "TypeScript",
    description: "Código tipado, seguro e escalável",
  },
  {
    icon: <SiRedux />,
    name: "Redux",
    description: "Gerenciamento de estado previsível",
  },
  {
    icon: <FaApple />,
    name: "iOS",
    description: "Publicação e manutenção na App Store",
  },
  {
    icon: <FaAndroid />,
    name: "Android",
    description: "Publicação e manutenção na Play Store",
  },
  {
    icon: <FaRocket />,
    name: "CI/CD",
    description: "Automação com Bitrise e Harness",
  },
];

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPostPreview[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setBlogPosts((d.posts || []).slice(0, 6)))
      .catch(() => setBlogPosts([]));
  }, []);

  return (
    <S.PageWrapper>
      <OrbitBackground />
      {/* Hero Section */}
      <S.HeroSection>
        <S.HeroContent>
          <S.HeroTextContent>
            <S.Greeting>👋 Olá, eu sou</S.Greeting>
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
                  src="/images/profile.svg" 
                  alt="Edson Junior - Desenvolvedor Mobile" 
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

      {/* Stats Section */}
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

      {blogPosts.length > 0 && (
        <BlogSection aria-label="Artigos recentes">
          <BlogHeaderRow>
            <div>
              <S.SectionTitle style={{ textAlign: "left", marginBottom: 8 }}>
                Artigos
              </S.SectionTitle>
              <S.SectionSubtitle style={{ textAlign: "left", marginBottom: 0 }}>
                Notas e reflexões sobre tecnologia, trabalho e aprendizado contínuo.
              </S.SectionSubtitle>
            </div>
            <BlogSeeAll href="/blog">Ver linha do tempo</BlogSeeAll>
          </BlogHeaderRow>
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
        </BlogSection>
      )}

      {/* Skills Section */}
      <S.SkillsSection>
        <S.SectionTitle>Minhas Especialidades</S.SectionTitle>
        <S.SectionSubtitle>
          Tecnologias e ferramentas que uso no dia a dia
        </S.SectionSubtitle>
        <S.SkillsGrid>
          {skills.map((skill) => (
            <S.SkillCard key={skill.name}>
              <S.SkillIcon>{skill.icon}</S.SkillIcon>
              <S.SkillContent>
                <S.SkillName>{skill.name}</S.SkillName>
                <S.SkillDescription>{skill.description}</S.SkillDescription>
              </S.SkillContent>
            </S.SkillCard>
          ))}
        </S.SkillsGrid>
      </S.SkillsSection>
    </S.PageWrapper>
  );
}
