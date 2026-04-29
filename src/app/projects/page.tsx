"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { personalProjects, professionalProjects, webProjects, type Project } from "./helper";
import { FaGithub, FaRocket, FaExternalLinkAlt, FaBriefcase, FaCode, FaChevronRight } from "react-icons/fa";
import {
  SiReact,
  SiTypescript,
  SiRedux,
  SiExpo,
  SiJest,
  SiNextdotjs,
  SiStyledcomponents,
  SiPhp,
  SiLaravel,
  SiMongodb,
  SiFirebase,
  SiJavascript,
} from "react-icons/si";
import { FaApple, FaAndroid } from "react-icons/fa";

const TECH_ICON_MAP: Record<string, React.ReactNode> = {
  "React Native": <SiReact />,
  "React.js": <SiReact />,
  TypeScript: <SiTypescript />,
  Redux: <SiRedux />,
  "Redux Saga": <SiRedux />,
  Expo: <SiExpo />,
  Jest: <SiJest />,
  "Next.js": <SiNextdotjs />,
  "Styled-components": <SiStyledcomponents />,
  PHP: <SiPhp />,
  Laravel: <SiLaravel />,
  MongoDB: <SiMongodb />,
  Firebase: <SiFirebase />,
  JavaScript: <SiJavascript />,
  Auth0: <SiReact />,
  iOS: <FaApple />,
  Android: <FaAndroid />,
  OneSignal: <FaAndroid />,
};

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(0, 230, 118, 0.3); }
  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(0, 230, 118, 0.5); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 24px 100px;
  @media (max-width: 768px) { padding: 20px 16px 60px; }
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
  font-family: var(--font-display);
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

/* ===== Pessoais ===== */
const PersonalSection = styled.section`
  animation: ${fadeInUp} 0.6s ease 0.2s forwards;
  opacity: 0;
  margin-bottom: 56px;
`;

const PersonalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
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
  img { width: 100%; height: 100%; object-fit: cover; }
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
  &:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
`;

const SmallGithub = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  padding: 10px 12px;
  &:hover { color: var(--accent-primary); }
`;

const IconLetter = styled.span<{ $small?: boolean }>`
  font-family: system-ui, -apple-system, sans-serif;
  font-size: ${(p) => (p.$small ? "1rem" : "1.25rem")};
  font-weight: 800;
  color: #fff;
`;

/* ===== Profissionais ===== */
const ProfessionalSection = styled.section`
  animation: ${fadeInUp} 0.6s ease 0.4s forwards;
  opacity: 0;
  margin-bottom: 80px;
  &:last-child { margin-bottom: 0; }
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
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const ProfessionalCard = styled.div`
  position: relative;
  background: rgba(26, 26, 36, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #2eebaa 0%, #06b6d4 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(46, 235, 170, 0.05);
    border-color: rgba(46, 235, 170, 0.2);
    transform: translateY(-2px);
    &::before { opacity: 1; }
  }
`;

const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
`;

const CardIcon = styled.div<{ $bgColor?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.$bgColor || "#333"};
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const CardInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
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
  margin-bottom: 14px;
  flex: 1;
`;

/* ===== Marquee de techs ===== */
const TechStrip = styled.div`
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.15);
  padding: 10px 0;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
`;

const TechTrack = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;
  animation: ${scroll} 18s linear infinite;
`;

const TechChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: #71717a;
  white-space: nowrap;
  svg { font-size: 0.85rem; color: rgba(46, 235, 170, 0.6); flex-shrink: 0; }
`;

/* ===== Footer do card ===== */
const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 6px;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
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
  &:hover { background: rgba(46, 235, 170, 0.1); border-color: #2eebaa; }
`;

const ProductionBadge = styled.span<{ $status?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(p) => (p.$status === "paused" ? "#71717a" : "#22c55e")};
  &::before {
    content: "";
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${(p) => (p.$status === "paused" ? "#71717a" : "#22c55e")};
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

/* ===== Helpers ===== */
function renderPersonalThumb(p: Project) {
  if (p.icon && (p.icon.startsWith("/") || p.icon.startsWith("http"))) {
    return (
      <PersonalIcon style={{ background: p.iconColor || "var(--bg-secondary)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
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

function TechMarquee({ tags }: { tags: string[] }) {
  const doubled = [...tags, ...tags];
  return (
    <TechStrip>
      <TechTrack>
        {doubled.map((t, i) => (
          <TechChip key={`${t}-${i}`}>
            {TECH_ICON_MAP[t] || null}
            {t}
          </TechChip>
        ))}
      </TechTrack>
    </TechStrip>
  );
}

function ProfCard({ proj, storeLabel }: { proj: Project; storeLabel?: string }) {
  return (
    <ProfessionalCard>
      <CardBody>
        <CardHeader>
          <CardIcon $bgColor={proj.iconColor}>
            {proj.iconLetter ? (
              <IconLetter $small={proj.iconLetter.length > 1}>{proj.iconLetter}</IconLetter>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={proj.icon} alt={proj.title} />
            )}
          </CardIcon>
          <CardInfo>
            <CardTitle>{proj.title}</CardTitle>
            <CardTagline>{proj.tagline}</CardTagline>
          </CardInfo>
        </CardHeader>
        <CardDescription>{proj.description}</CardDescription>
        <CardFooter>
          <ProductionBadge $status={proj.status}>
            {proj.status === "production" ? "Em Produção" : "Versão Anterior"}
          </ProductionBadge>
          <CardActions>
            <DetailLink href={`/projects/${proj.id}`}>
              Ver detalhes <FaChevronRight size={11} />
            </DetailLink>
            {proj.liveUrl && (
              <CardLink href={proj.liveUrl} target="_blank" rel="noopener noreferrer">
                {storeLabel || "Visitar"} <FaExternalLinkAlt size={11} />
              </CardLink>
            )}
          </CardActions>
        </CardFooter>
      </CardBody>
      <TechMarquee tags={proj.tags} />
    </ProfessionalCard>
  );
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
            <SectionIcon><FaRocket size={20} /></SectionIcon>
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
                <TechMarquee tags={p.tags} />
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

        <ProfessionalSection>
          <SectionHeader>
            <SectionIcon><FaBriefcase size={20} /></SectionIcon>
            <SectionTitle>Apps em que Atuei</SectionTitle>
          </SectionHeader>
          <ProjectsGrid>
            {professionalProjects.map((proj) => (
              <ProfCard key={proj.id} proj={proj} storeLabel="App Store" />
            ))}
          </ProjectsGrid>
        </ProfessionalSection>

        <ProfessionalSection>
          <SectionHeader>
            <SectionIcon><FaCode size={20} /></SectionIcon>
            <SectionTitle>Web em que Atuei</SectionTitle>
          </SectionHeader>
          <ProjectsGrid>
            {webProjects.map((proj) => (
              <ProfCard key={proj.id} proj={proj} />
            ))}
          </ProjectsGrid>
        </ProfessionalSection>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Projects;
