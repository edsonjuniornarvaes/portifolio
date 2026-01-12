"use client";

import * as S from "../styles";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";
import { FaReact, FaMobileAlt, FaApple, FaAndroid, FaCode, FaRocket } from "react-icons/fa";
import { SiTypescript, SiRedux } from "react-icons/si";

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
  { number: "6", label: "Apps Publicados" },
];

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
  return (
    <S.PageWrapper>
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
