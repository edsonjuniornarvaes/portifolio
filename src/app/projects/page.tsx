"use client";

import styled, { keyframes } from "styled-components";
import { featuredProject, professionalProjects, webProjects } from "./helper";
import { FaGithub, FaRocket, FaExternalLinkAlt, FaBriefcase, FaCode } from "react-icons/fa";

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
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

const ProjectShowcase = styled.div`
  animation: ${fadeInUp} 0.6s ease 0.2s forwards;
  opacity: 0;
  margin-bottom: 80px;
`;

const ShowcaseLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 230, 118, 0.1);
  border: 1px solid rgba(0, 230, 118, 0.3);
  border-radius: 100px;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.75rem;
  font-weight: 500;
  color: #00E676;
  margin-bottom: 24px;
  
  svg {
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const ShowcaseCard = styled.div`
  position: relative;
  background: linear-gradient(135deg, rgba(0, 230, 118, 0.08) 0%, rgba(0, 168, 67, 0.04) 100%);
  border: 1px solid rgba(0, 230, 118, 0.2);
  border-radius: 32px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00E676 0%, #FFD600 50%, #FF9100 100%);
  }
`;

const ShowcaseHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 40px 24px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 24px 20px 20px;
  }
`;

const LogoWrapper = styled.div`
  margin-bottom: 24px;
  animation: ${float} 4s ease-in-out infinite;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 230, 118, 0.25);
  animation: ${pulse} 3s ease-in-out infinite;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  font-size: 0.85rem;
  font-weight: 500;
  color: #a1a1aa;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #2eebaa;
  }
`;

const Projects = () => {
  const project = featuredProject;

  return (
    <PageWrapper>
      <ContentWrapper>
        <PageHeader>
          <PageTitle>Meus Projetos</PageTitle>
          <PageSubtitle>
            Projetos pessoais e profissionais que desenvolvi ao longo da carreira
          </PageSubtitle>
        </PageHeader>

        {/* Featured Project - Rachão */}
        <ProjectShowcase>
          <ShowcaseLabel>
            <FaRocket size={12} />
            Projeto Pessoal em Desenvolvimento
          </ShowcaseLabel>
          
          <ShowcaseCard>
            <ShowcaseHeader>
              <LogoWrapper>
                <IconWrapper>
                  <img src={project.icon} alt={project.title} />
                </IconWrapper>
              </LogoWrapper>
              
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectTagline>{project.tagline}</ProjectTagline>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <TagsContainer>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsContainer>
              
              <StatusBadge>Em Desenvolvimento Ativo</StatusBadge>
            </ShowcaseHeader>
            
            {project.features && (
              <FeaturesSection>
                <FeaturesTitle>Funcionalidades Principais</FeaturesTitle>
                <FeaturesGrid>
                  {project.features.map((feature) => (
                    <FeatureCard key={feature.title}>
                      <FeatureIcon>{feature.icon}</FeatureIcon>
                      <FeatureTitle>{feature.title}</FeatureTitle>
                      <FeatureDescription>{feature.description}</FeatureDescription>
                    </FeatureCard>
                  ))}
                </FeaturesGrid>
              </FeaturesSection>
            )}
            
            <ActionsSection>
              {project.githubUrl && (
                <ActionButton 
                  href={project.githubUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  $primary
                >
                  <FaGithub size={20} />
                  Ver Código no GitHub
                </ActionButton>
              )}
            </ActionsSection>
          </ShowcaseCard>
        </ProjectShowcase>

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
                  {proj.liveUrl && (
                    <CardLink 
                      href={proj.liveUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver na App Store
                      <FaExternalLinkAlt size={12} />
                    </CardLink>
                  )}
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
                  {proj.liveUrl && (
                    <CardLink 
                      href={proj.liveUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visitar
                      <FaExternalLinkAlt size={12} />
                    </CardLink>
                  )}
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
