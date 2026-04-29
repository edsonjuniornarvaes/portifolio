"use client";

import styled, { keyframes } from "styled-components";

// Keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(46, 235, 170, 0.2);
  }
  50% {
    box-shadow: 0 0 40px rgba(46, 235, 170, 0.4);
  }
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  50% { border-color: transparent }
`;

// Base Components
export const FlexDiv = styled.div`
  display: flex;
`;

export const FlexButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Layout
export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 0 24px;
  position: relative;
`;

export const HeroSection = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  
  @media (max-width: 768px) {
    padding: 40px 0;
    min-height: auto;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  
  @media (max-width: 968px) {
    flex-direction: column-reverse;
    text-align: center;
    gap: 40px;
  }
`;

export const HeroTextContent = styled.div`
  flex: 1;
  animation: ${slideInLeft} 0.8s ease forwards;
`;

export const HeroImageContent = styled.div`
  flex-shrink: 0;
  animation: ${slideInRight} 0.8s ease forwards;
  
  @media (max-width: 968px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

// Typography
export const Greeting = styled.span`
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 1rem;
  font-weight: 400;
  color: #2eebaa;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: block;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease 0.2s forwards;
`;

export const HeroTitle = styled.h1`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 12px;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease 0.3s forwards;
`;

export const HeroRole = styled.h2`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 500;
  background: linear-gradient(135deg, #2eebaa 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease 0.4s forwards;
`;

export const HeroDescription = styled.p`
  font-size: 1.125rem;
  font-weight: 300;
  color: #a1a1aa;
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 32px;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease 0.5s forwards;
  
  @media (max-width: 968px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

// Tech Stack Badges
export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease 0.6s forwards;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

export const TechBadge = styled.span`
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.75rem;
  font-weight: 500;
  color: #2eebaa;
  padding: 8px 16px;
  border-radius: 100px;
  background: rgba(46, 235, 170, 0.1);
  border: 1px solid rgba(46, 235, 170, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(46, 235, 170, 0.15);
    border-color: rgba(46, 235, 170, 0.4);
    transform: translateY(-2px);
  }
`;

// Social Links
export const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease 0.7s forwards;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

export const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(26, 26, 36, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #a1a1aa;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(46, 235, 170, 0.1);
    border-color: rgba(46, 235, 170, 0.3);
    color: #2eebaa;
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(46, 235, 170, 0.2);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

// Profile Image
export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 320px;
  height: 320px;
  
  @media (max-width: 768px) {
    width: 260px;
    height: 260px;
  }
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(46, 235, 170, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
  padding: 4px;
  animation: ${glow} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(135deg, #2eebaa 0%, #06b6d4 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

export const StatusBadge = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(46, 235, 170, 0.3);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  white-space: nowrap;
`;

export const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: ${pulse} 2s ease-in-out infinite;
`;

// Stats Section
export const StatsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease 0.8s forwards;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 24px;
  background: rgba(26, 26, 36, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(46, 235, 170, 0.05);
    border-color: rgba(46, 235, 170, 0.2);
    transform: translateY(-4px);
  }
`;

export const StatNumber = styled.span`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2eebaa 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

export const StatLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: #a1a1aa;
`;

// Skills Section
export const SkillsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0 100px;
`;

export const SectionTitle = styled.h2`
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
`;

export const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: #71717a;
  text-align: center;
  margin-bottom: 48px;
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

export const SkillCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: rgba(26, 26, 36, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(46, 235, 170, 0.05);
    border-color: rgba(46, 235, 170, 0.2);
    transform: translateY(-4px);
  }
`;

export const SkillIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(46, 235, 170, 0.1);
  color: #2eebaa;
  flex-shrink: 0;
  font-size: 1.5rem;
`;

export const SkillContent = styled.div`
  flex: 1;
`;

export const SkillName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
`;

export const SkillDescription = styled.p`
  font-size: 0.875rem;
  color: #71717a;
  line-height: 1.5;
`;

// Legacy exports for compatibility
export const ResponsiveContainer = styled(FlexDiv)`
  min-height: calc(100vh - 160px);
  @media (max-width: 868px) {
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
`;

export const Separator = styled.div`
  margin: 40px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const Paragraph = styled.p`
  font-weight: 300;
  color: #a1a1aa;
  line-height: 1.7;
`;

export const ParagraphContainer = styled(FlexDiv)`
  flex-direction: column;
  padding: 24px 0;
`;

export const LegendText = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  color: #71717a;
  line-height: 1.25rem;
`;

// Additional legacy exports
export const HeaderTitleContainer = styled(FlexDiv)`
  flex-direction: column;
  justify-content: flex-start;
`;

export const HeaderTitle = styled.span`
  font-weight: 200;
  font-size: 24px;
  margin-bottom: 12px;
  color: #2eebaa;
`;

export const TitleContainer = styled(FlexDiv)`
  flex-direction: column;
  padding-bottom: 12px;
`;

export const ContentTitle = styled.span`
  font-weight: 500;
  font-size: 40px;
  line-height: 120%;
`;

export const ContentSubtitle = styled.span`
  font-weight: 700;
  font-size: 2.25rem;
  margin-top: 12px;
`;

export const DescriptionDiv = styled(FlexDiv)`
  padding: 12px 0;
`;

export const ContentDescription = styled.span`
  font-weight: 200;
  line-height: 140%;
  font-size: 20px;
  margin-bottom: 12px;
  color: #999999;
`;

export const CategorySection = styled(FlexDiv)``;

export const CategorySectionTitle = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.75rem;
`;

export const AttribuitonsSection = styled(FlexDiv)`
  flex-direction: column;
  align-items: center;
  justify-self: space-between;
  padding: 24px;
`;

export const AttribuitonsSectionTitle = styled.span`
  font-weight: 200;
  font-size: 32px;
  color: #2eebaa;
`;

export const AttribuitonsSectionSubTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  line-height: 1.75rem;
`;

export const QuickAccessSection = styled(FlexDiv)`
  flex-direction: column;
  padding-top: 24px;
`;

export const QuickAccessSectionTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 12px;
  color: #999999;
`;

export const QuickAccess = styled(FlexDiv)`
  align-items: center;
`;

export const QuickAccessButton = styled(FlexButton)`
  padding: 4px;
  margin-right: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  &:hover {
    border-bottom: 1px solid #2eebaa;
  }
`;

export const Row = styled(FlexDiv)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 868px) {
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
`;

export const AttribuitonsRow = styled(FlexDiv)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 24px;
  @media (max-width: 868px) {
    flex-direction: column;
    padding-top: 12px;
    align-items: center;
  }
`;

export const ProfileContainer = styled(FlexDiv)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  margin-right: 48px;
  @media (max-width: 868px) {
    margin-right: 0;
    padding: 16px;
    margin-bottom: 23px;
  }
`;

export const DescriptionColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 868px) {
    width: 100%;
    padding: 0 16px;
  }
`;

export const SubtitleCategorySection = styled(FlexDiv)``;

export const CategorySectionSubtitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.75rem;
`;
