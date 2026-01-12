"use client";

import styled, { keyframes } from "styled-components";
import Container from "../components/container";
import { ExperienceData, EducationData, AboutText, DailyPractices } from "./helper";
import { FaBriefcase, FaGraduationCap, FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

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

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 24px 100px;
  
  @media (max-width: 768px) {
    padding: 20px 16px 60px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
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
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.6s ease 0.1s forwards;
  opacity: 0;
`;

const Section = styled.section`
  margin-bottom: 60px;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: var(--delay, 0s);
  opacity: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(46, 235, 170, 0.1);
  color: #2eebaa;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
`;

const AboutCard = styled.div`
  padding: 32px;
  background: rgba(26, 26, 36, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
`;

const AboutParagraph = styled.p`
  font-size: 1rem;
  color: #a1a1aa;
  line-height: 1.8;
  white-space: pre-line;
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PracticesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
`;

const PracticeItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.95rem;
  color: #a1a1aa;
  line-height: 1.6;
  
  svg {
    flex-shrink: 0;
    margin-top: 4px;
    color: #2eebaa;
  }
`;

const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 19px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, rgba(46, 235, 170, 0.3) 0%, rgba(46, 235, 170, 0.05) 100%);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 60px;
  padding-bottom: 40px;
  
  &:last-child {
    padding-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #0a0a0f;
    border: 3px solid #2eebaa;
    z-index: 1;
  }
`;

const ExperienceCard = styled.div`
  padding: 24px;
  background: rgba(26, 26, 36, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(46, 235, 170, 0.05);
    border-color: rgba(46, 235, 170, 0.2);
  }
`;

const ExperienceHeader = styled.div`
  margin-bottom: 16px;
`;

const ExperienceCompany = styled.h3`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
`;

const ExperienceRole = styled.span`
  font-size: 1rem;
  font-weight: 500;
  background: linear-gradient(135deg, #2eebaa 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ExperienceMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #71717a;
  
  svg {
    font-size: 0.75rem;
  }
`;

const ExperienceDescription = styled.p`
  font-size: 0.95rem;
  color: #a1a1aa;
  line-height: 1.7;
  margin-bottom: 16px;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  display: grid;
  gap: 8px;
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.875rem;
  color: #a1a1aa;
  
  &::before {
    content: '→';
    color: #2eebaa;
    flex-shrink: 0;
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillTag = styled.span`
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.7rem;
  font-weight: 500;
  color: #2eebaa;
  padding: 4px 10px;
  border-radius: 100px;
  background: rgba(46, 235, 170, 0.1);
  border: 1px solid rgba(46, 235, 170, 0.2);
`;

const EducationGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const EducationCard = styled.div`
  padding: 24px;
  background: rgba(26, 26, 36, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(46, 235, 170, 0.05);
    border-color: rgba(46, 235, 170, 0.2);
  }
`;

const EducationTitle = styled.h3`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
`;

const EducationInstitution = styled.p`
  font-size: 0.95rem;
  color: #a1a1aa;
  margin-bottom: 4px;
`;

const EducationPeriod = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #71717a;
  
  svg {
    font-size: 0.75rem;
  }
`;

const About = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <PageTitle>Sobre Mim</PageTitle>
        <PageSubtitle>Conheça minha trajetória e experiência profissional</PageSubtitle>

        <Section style={{ '--delay': '0.2s' } as React.CSSProperties}>
          <SectionHeader>
            <SectionIcon>
              <FaBriefcase size={18} />
            </SectionIcon>
            <SectionTitle>Quem sou eu</SectionTitle>
          </SectionHeader>
          <AboutCard>
            <AboutParagraph>{AboutText}</AboutParagraph>
            <SectionTitle style={{ fontSize: '1.1rem', marginBottom: '16px', marginTop: '24px' }}>
              No dia a dia, aplico:
            </SectionTitle>
            <PracticesList>
              {DailyPractices.map((practice, index) => (
                <PracticeItem key={index}>
                  <FaCheckCircle size={14} />
                  {practice}
                </PracticeItem>
              ))}
            </PracticesList>
          </AboutCard>
        </Section>

        <Section style={{ '--delay': '0.3s' } as React.CSSProperties}>
          <SectionHeader>
            <SectionIcon>
              <FaBriefcase size={18} />
            </SectionIcon>
            <SectionTitle>Experiência Profissional</SectionTitle>
          </SectionHeader>
          <Timeline>
            {ExperienceData.map((exp, index) => (
              <TimelineItem key={index}>
                <ExperienceCard>
                  <ExperienceHeader>
                    <ExperienceCompany>{exp.company}</ExperienceCompany>
                    <ExperienceRole>{exp.role}</ExperienceRole>
                    <ExperienceMeta>
                      <MetaItem>
                        <FaCalendarAlt />
                        {exp.period}
                      </MetaItem>
                      <MetaItem>
                        <FaMapMarkerAlt />
                        {exp.location}
                      </MetaItem>
                    </ExperienceMeta>
                  </ExperienceHeader>
                  <ExperienceDescription>{exp.description}</ExperienceDescription>
                  <HighlightsList>
                    {exp.highlights.map((highlight, idx) => (
                      <HighlightItem key={idx}>{highlight}</HighlightItem>
                    ))}
                  </HighlightsList>
                  <SkillTags>
                    {exp.skills.map((skill) => (
                      <SkillTag key={skill}>{skill}</SkillTag>
                    ))}
                  </SkillTags>
                </ExperienceCard>
              </TimelineItem>
            ))}
          </Timeline>
        </Section>

        <Section style={{ '--delay': '0.4s' } as React.CSSProperties}>
          <SectionHeader>
            <SectionIcon>
              <FaGraduationCap size={18} />
            </SectionIcon>
            <SectionTitle>Formação Acadêmica</SectionTitle>
          </SectionHeader>
          <EducationGrid>
            {EducationData.map((edu, index) => (
              <EducationCard key={index}>
                <EducationTitle>{edu.course}</EducationTitle>
                <EducationInstitution>{edu.institution}</EducationInstitution>
                <EducationPeriod>
                  <FaCalendarAlt />
                  {edu.period}
                </EducationPeriod>
              </EducationCard>
            ))}
          </EducationGrid>
        </Section>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default About;
