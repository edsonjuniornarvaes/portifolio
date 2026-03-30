"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { personalProjects, professionalProjects, webProjects, type Project } from "./helper";
import { BenjaminLogo } from "@/components/benjamin-logo";
import { FaGithub, FaRocket, FaExternalLinkAlt, FaBriefcase, FaCode, FaChevronRight } from "react-icons/fa";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 20px rgba(0, 230, 118, 0.3);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 40px rgba(0, 230, 118, 0.5);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 24px 100px;
  
  @media (max-width: 768px) {
    padding: 20px 16px 60px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const PageTitle = styled.h1`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: #71717a;
  max-width: 600px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.6s ease 0.1s forwards;
  opacity: 0;
`;

const PersonalSection = styled.section`
  animation: ${fadeInUp} 0.6s ease 0.2s forwards;
  opacity: 0;
  margin-bottom: 56px;
`;

const PersonalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const PersonalCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(46, 235, 170, 0.25);
    box-shadow: var(--glow-primary);
  }
`;

const PersonalCardTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const PersonalIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PersonalTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px;
`;

const PersonalTagline = styled.p`
  font-size: 0.85rem;
  color: var(--accent-primary);
  margin: 0 0 8px;
  font-weight: 500;
`;

const PersonalDesc = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PersonalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
  padding-top: 8px;
`;

const GhostLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
`;

const SmallGithub = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  padding: 10px 12px;
  &:hover {
    color: var(--accent-primary);
  }
`;

const ProjectTitle = styled.h2`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 6px;
  letter-spacing: 1px;
`;

const ProjectTagline = styled.p`
  font-size: 1rem;
  font-weight: 500;
  background: linear-gradient(135deg, #00E676 0%, #FFD600 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: #a1a1aa;
  line-height: 1.6;
  max-width: 500px;
  margin-bottom: 16px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const Tag = styled.span`
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.7rem;
  font-weight: 500;
  color: #00E676;
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(0, 230, 118, 0.1);
  border: 1px solid rgba(0, 230, 118, 0.2);
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #fbbf24;
  margin-bottom: 24px;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fbbf24;
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;

const FeaturesSection = styled.div`
  padding: 24px 32px;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FeaturesTitle = styled.h3`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 868px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 16px;
  background: rgba(26, 26, 36, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 230, 118, 0.05);
    border-color: rgba(0, 230, 118, 0.2);
    transform: translateY(-2px);
  }
`;

const FeatureIcon = styled.span`
  display: block;
  font-size: 1.5rem;
  margin-bottom: 8px;
`;

const FeatureTitle = styled.h4`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
`;

const FeatureDescription = styled.p`
  font-size: 0.75rem;
  color: #71717a;
  line-height: 1.4;
`;

const ActionsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 32px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  
  @media (max-width: 480px) {
    flex-direction: column;
    padding: 24px;
  }
`;

const ActionButton = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 32px;
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.$primary ? '#0a0a0f' : '#ffffff'};
  background: ${props => props.$primary ? 'linear-gradient(135deg, #00E676 0%, #00C853 100%)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$primary ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$primary ? '0 12px 35px rgba(0, 230, 118, 0.35)' : '0 12px 35px rgba(0, 0, 0, 0.2)'};
  }
`;

// Professional Projects Section
const ProfessionalSection = styled.section`
  animation: ${fadeInUp} 0.6s ease 0.4s forwards;
  opacity: 0;
  margin-bottom: 80px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(46, 235, 170, 0.1);
  color: #2eebaa;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProfessionalCard = styled.div`
  position: relative;
  padding: 20px;
  background: rgba(26, 26, 36, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #2eebaa 0%, #06b6d4 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(46, 235, 170, 0.05);
    border-color: rgba(46, 235, 170, 0.2);
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const CardIcon = styled.div<{ $bgColor?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$bgColor || '#333'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const IconLetter = styled.span<{ $small?: boolean }>`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: ${props => props.$small ? '1rem' : '1.25rem'};
  font-weight: 800;
  color: #ffffff;
  font-style: normal;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
`;

const CardTagline = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #2eebaa;
`;

const CardDescription = styled.p`
  font-size: 0.8rem;
  color: #a1a1aa;
  line-height: 1.5;
  margin-bottom: 12px;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
  flex: 1;
`;

const SmallTag = styled.span`
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.65rem;
  color: #71717a;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 4px;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-left: auto;
  justify-content: flex-end;
`;

const DetailLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(46, 235, 170, 0.35);
  color: #2eebaa;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(46, 235, 170, 0.1);
    border-color: #2eebaa;
  }
`;

const ProductionBadge = styled.span<{ $status?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.$status === 'paused' ? '#71717a' : '#22c55e'};
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => props.$status === 'paused' ? '#71717a' : '#22c55e'};
  }
`;

const CardLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-secondary);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--text-primary);
    border-color: rgba(46, 235, 170, 0.35);
    background: rgba(255, 255, 255, 0.04);
  }
`;

function renderPersonalThumb(p: Project) {
  if (p.useBenjaminLogo) {
    return (
      <PersonalIcon style={{ background: "#0a0a0a", padding: 6 }}>
        <BenjaminLogo width={120} height={52} style={{ width: "100%", height: "auto" }} />
      </PersonalIcon>
    );
  }
  if (p.icon && (p.icon.startsWith("/") || p.icon.startsWith("http"))) {
    return (
      <PersonalIcon>
        <img src={p.icon} alt="" />
      </PersonalIcon>
    );
  }
  if (p.iconLetter) {
    return (
      <PersonalIcon style={{ background: p.iconColor || "var(--bg-tertiary)" }}>
        <IconLetter $small={p.iconLetter.length > 1}>{p.iconLetter}</IconLetter>
      </PersonalIcon>
    );
  }
  return <PersonalIcon />;
}

const Projects = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <PageHeader>
          <PageTitle>Meus Projetos</PageTitle>
          <PageSubtitle>
            Projetos pessoais e profissionais que desenvolvi ao longo da carreira
          </PageSubtitle>
        </PageHeader>

        <PersonalSection>
          <SectionHeader style={{ marginBottom: 20 }}>
            <SectionIcon>
              <FaRocket size={20} />
            </SectionIcon>
            <SectionTitle>Projetos pessoais</SectionTitle>
          </SectionHeader>
          <PersonalGrid>
            {personalProjects.map((p) => (
              <PersonalCard key={p.id}>
                <PersonalCardTop>
                  {renderPersonalThumb(p)}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <PersonalTitle>{p.title}</PersonalTitle>
                    <PersonalTagline>{p.tagline}</PersonalTagline>
                  </div>
                </PersonalCardTop>
                <PersonalDesc>{p.description}</PersonalDesc>
                <PersonalActions>
                  <GhostLink href={`/projects/${p.id}`}>
                    Detalhes <FaChevronRight size={12} />
                  </GhostLink>
                  {p.githubUrl && p.showGithub !== false && (
                    <SmallGithub href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                      <FaGithub /> GitHub
                    </SmallGithub>
                  )}
                </PersonalActions>
              </PersonalCard>
            ))}
          </PersonalGrid>
        </PersonalSection>

        {/* Professional Projects */}
        <ProfessionalSection>
          <SectionHeader>
            <SectionIcon>
              <FaBriefcase size={20} />
            </SectionIcon>
            <SectionTitle>Apps em que Atuei</SectionTitle>
          </SectionHeader>
          
          <ProjectsGrid>
            {professionalProjects.map((proj) => (
              <ProfessionalCard key={proj.id}>
                <CardHeader>
                  <CardIcon $bgColor={proj.iconColor}>
                    {proj.iconLetter ? (
                      <IconLetter $small={proj.iconLetter.length > 1}>{proj.iconLetter}</IconLetter>
                    ) : (
                      <img src={proj.icon} alt={proj.title} />
                    )}
                  </CardIcon>
                  <CardInfo>
                    <CardTitle>{proj.title}</CardTitle>
                    <CardTagline>{proj.tagline}</CardTagline>
                  </CardInfo>
                </CardHeader>
                <CardDescription>{proj.description}</CardDescription>
                <CardTags>
                  {proj.tags.map((tag) => (
                    <SmallTag key={tag}>{tag}</SmallTag>
                  ))}
                </CardTags>
                <CardFooter>
                  <ProductionBadge $status={proj.status}>
                    {proj.status === 'production' ? 'Em Produção' : 'Versão Anterior'}
                  </ProductionBadge>
                  <CardActions>
                    <DetailLink href={`/projects/${proj.id}`}>
                      Ver detalhes
                      <FaChevronRight size={11} />
                    </DetailLink>
                    {proj.liveUrl && (
                      <CardLink href={proj.liveUrl} target="_blank" rel="noopener noreferrer">
                        App Store
                        <FaExternalLinkAlt size={11} />
                      </CardLink>
                    )}
                  </CardActions>
                </CardFooter>
              </ProfessionalCard>
            ))}
          </ProjectsGrid>
        </ProfessionalSection>

        {/* Web Projects */}
        <ProfessionalSection>
          <SectionHeader>
            <SectionIcon>
              <FaCode size={20} />
            </SectionIcon>
            <SectionTitle>Web em que Atuei</SectionTitle>
          </SectionHeader>
          
          <ProjectsGrid>
            {webProjects.map((proj) => (
              <ProfessionalCard key={proj.id}>
                <CardHeader>
                  <CardIcon $bgColor={proj.iconColor}>
                    {proj.iconLetter ? (
                      <IconLetter $small={proj.iconLetter.length > 1}>{proj.iconLetter}</IconLetter>
                    ) : (
                      <img src={proj.icon} alt={proj.title} />
                    )}
                  </CardIcon>
                  <CardInfo>
                    <CardTitle>{proj.title}</CardTitle>
                    <CardTagline>{proj.tagline}</CardTagline>
                  </CardInfo>
                </CardHeader>
                <CardDescription>{proj.description}</CardDescription>
                <CardTags>
                  {proj.tags.map((tag) => (
                    <SmallTag key={tag}>{tag}</SmallTag>
                  ))}
                </CardTags>
                <CardFooter>
                  <ProductionBadge $status={proj.status}>
                    {proj.status === 'production' ? 'Em Produção' : 'Versão Anterior'}
                  </ProductionBadge>
                  <CardActions>
                    <DetailLink href={`/projects/${proj.id}`}>
                      Ver detalhes
                      <FaChevronRight size={11} />
                    </DetailLink>
                    {proj.liveUrl && (
                      <CardLink href={proj.liveUrl} target="_blank" rel="noopener noreferrer">
                        Visitar
                        <FaExternalLinkAlt size={11} />
                      </CardLink>
                    )}
                  </CardActions>
                </CardFooter>
              </ProfessionalCard>
            ))}
          </ProjectsGrid>
        </ProfessionalSection>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Projects;
