"use client";

import { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { type Project } from "../helper";
import { MarkdownBody } from "@/components/markdown-body";
import {
  FaGithub,
  FaFigma,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaApple,
  FaGooglePlay,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const fade = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  padding: 100px 24px 80px;
  max-width: 960px;
  margin: 0 auto;
  animation: ${fade} 0.5s ease forwards;
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 28px;
  &:hover {
    color: var(--accent-primary);
  }
`;

const Hero = styled.header`
  margin-bottom: 40px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border-color);
`;

const HeroTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px 24px;
`;

const HeroMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  flex: 1;
  min-width: min(100%, 280px);
`;

const IconBox = styled.div<{ $bg?: string }>`
  width: 72px;
  height: 72px;
  border-radius: 18px;
  background: ${(p) => p.$bg || "var(--bg-card)"};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--border-color);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Letter = styled.span`
  font-weight: 800;
  font-size: 1.35rem;
  color: #fff;
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const Tagline = styled.p`
  color: var(--accent-primary);
  font-weight: 500;
  margin-bottom: 12px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 6px 12px;
  border-radius: 100px;
  background: rgba(46, 235, 170, 0.1);
  border: 1px solid rgba(46, 235, 170, 0.25);
  color: var(--accent-primary);
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
`;

const MockRow = styled.div<{ $single: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.$single ? "minmax(0, 360px)" : "1fr 1fr")};
  gap: 24px;
  justify-content: ${(p) => (p.$single ? "center" : "stretch")};
  justify-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StoreFrame = styled.div<{ $variant: "apple" | "play" }>`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 360px;
`;

const Badge = styled.div<{ $variant: "apple" | "play" }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  padding: 8px 14px;
  border-radius: 10px;
  background: ${(p) =>
    p.$variant === "apple"
      ? "linear-gradient(180deg, #333 0%, #111 100%)"
      : "linear-gradient(180deg, #01875f 0%, #00695c 100%)"};
`;

const Phone = styled.div<{ $shot?: string }>`
  width: 200px;
  max-width: 100%;
  aspect-ratio: 9 / 19;
  border-radius: 28px;
  border: 3px solid #2a2a32;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  background: ${(p) =>
    p.$shot
      ? `url(${p.$shot}) center/cover`
      : "linear-gradient(180deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)"};
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 36%;
    height: 4px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
`;

const LinkRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const OutlineLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 0.9rem;
  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  background: var(--accent-gradient);
  color: var(--bg-primary);
  font-weight: 600;
  font-size: 0.9rem;
  &:hover {
    opacity: 0.95;
  }
`;

const HighlightsGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
`;

const HighlightCard = styled.li`
  padding: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`;

const GalleryWrap = styled.div`
  position: relative;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
  background: var(--bg-card);
`;

const GalleryViewport = styled.div`
  overflow: hidden;
`;

const GalleryTrack = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.35s ease;
  transform: translateX(${(p) => -p.$index * 100}%);
`;

const GallerySlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  display: flex;
  justify-content: center;
  padding: 24px;
  background: var(--bg-secondary);
  img {
    display: block;
    max-height: min(65vh, 600px);
    max-width: 100%;
    object-fit: contain;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  }
`;

const GalleryBtn = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(p) => (p.$side === "left" ? "left: 8px" : "right: 8px")};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background: rgba(0, 0, 0, 0.72);
  }
`;

const GalleryDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${(p) => (p.$active ? "22px" : "8px")};
  height: 8px;
  border-radius: 999px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${(p) => (p.$active ? "var(--accent-primary)" : "var(--border-color)")};
  transition: width 0.2s ease, background 0.2s ease;
`;

function renderIcon(p: Project) {
  if (p.icon && (p.icon.startsWith("/") || p.icon.startsWith("http"))) {
    return (
      <IconBox $bg={p.iconColor || "var(--bg-card)"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.icon} alt="" />
      </IconBox>
    );
  }
  if (p.iconLetter) {
    return (
      <IconBox $bg={p.iconColor}>
        <Letter>{p.iconLetter}</Letter>
      </IconBox>
    );
  }
  return null;
}

function GallerySlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const safe = useMemo(() => images.filter((u) => u?.trim()), [images]);
  if (safe.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + safe.length) % safe.length);
  const next = () => setIndex((i) => (i + 1) % safe.length);

  return (
    <GalleryWrap>
      <GalleryViewport>
        <GalleryTrack $index={index}>
          {safe.map((src, i) => (
            <GallerySlide key={`${src}-${i}`}>
              <img src={src} alt={`Imagem ${i + 1} do projeto`} loading={i === 0 ? "eager" : "lazy"} />
            </GallerySlide>
          ))}
        </GalleryTrack>
      </GalleryViewport>
      {safe.length > 1 && (
        <>
          <GalleryBtn type="button" $side="left" onClick={prev} aria-label="Imagem anterior">
            <FaChevronLeft size={14} />
          </GalleryBtn>
          <GalleryBtn type="button" $side="right" onClick={next} aria-label="Próxima imagem">
            <FaChevronRight size={14} />
          </GalleryBtn>
        </>
      )}
      {safe.length > 1 && (
        <GalleryDots>
          {safe.map((_, i) => (
            <Dot
              key={i}
              type="button"
              $active={i === index}
              onClick={() => setIndex(i)}
              aria-label={`Ir para imagem ${i + 1}`}
            />
          ))}
        </GalleryDots>
      )}
    </GalleryWrap>
  );
}

function ProjectDetailClient({ project }: { project: Project }) {
  const showGh = !!project.githubUrl && project.showGithub !== false;
  const showFig =
    !!project.figmaUrl && project.figmaUrl.startsWith("http") && project.showFigma === true;
  const md = project.longDescription || project.description;

  const showPreview = project.showPreview !== false;
  const showApple = showPreview && project.showMockupApple !== false;
  const showPlay = showPreview && project.showMockupPlay !== false;
  const mockCount = (showApple ? 1 : 0) + (showPlay ? 1 : 0);

  const highlightsOn =
    project.showHighlights !== false && !!project.features && project.features.length > 0;

  const galleryUrls = (project.galleryImages || []).map((u) => u.trim()).filter(Boolean);
  const showGallery = galleryUrls.length > 0 && project.showGallery !== false;

  const liveLabel = (project.liveCtaLabel || "Confira").trim() || "Confira";

  return (
    <Page>
      <Back href="/projects">
        <FaArrowLeft /> Voltar aos projetos
      </Back>

      <Hero>
        <HeroTop>
          <HeroMain>
            {renderIcon(project)}
            <div>
              <Title>{project.title}</Title>
              <Tagline>{project.tagline}</Tagline>
              <Tags>
                {project.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </Tags>
            </div>
          </HeroMain>
          <LinkRow>
            {project.liveUrl && (
              <PrimaryLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt size={14} /> {liveLabel}
              </PrimaryLink>
            )}
            {showGh && (
              <OutlineLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </OutlineLink>
            )}
            {showFig && (
              <OutlineLink href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                <FaFigma /> Figma
              </OutlineLink>
            )}
          </LinkRow>
        </HeroTop>
      </Hero>

      <Section>
        <SectionTitle>Sobre</SectionTitle>
        <MarkdownBody markdown={md} />
      </Section>

      {mockCount > 0 && (
        <Section>
          <SectionTitle>Preview</SectionTitle>
          <MockRow $single={mockCount === 1}>
            {showApple && (
              <StoreFrame $variant="apple">
                <Badge $variant="apple">
                  <FaApple /> App Store
                </Badge>
                <Phone $shot={project.mockupAppleUrl?.trim() || undefined} />
              </StoreFrame>
            )}
            {showPlay && (
              <StoreFrame $variant="play">
                <Badge $variant="play">
                  <FaGooglePlay /> Google Play
                </Badge>
                <Phone $shot={project.mockupPlayUrl?.trim() || undefined} />
              </StoreFrame>
            )}
          </MockRow>
        </Section>
      )}

      {showGallery && (
        <Section>
          <SectionTitle>Galeria</SectionTitle>
          <GallerySlider images={galleryUrls} />
        </Section>
      )}

      {highlightsOn && (
        <Section>
          <SectionTitle>Destaques</SectionTitle>
          <HighlightsGrid>
            {project.features!.map((f, i) => (
              <HighlightCard key={`${f.title}-${i}`}>
                <strong style={{ color: "var(--text-primary)" }}>
                  {f.icon} {f.title}
                </strong>
                <p
                  style={{
                    margin: "8px 0 0",
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  {f.description}
                </p>
              </HighlightCard>
            ))}
          </HighlightsGrid>
        </Section>
      )}
    </Page>
  );
}

export default ProjectDetailClient;
