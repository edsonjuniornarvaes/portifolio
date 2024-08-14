"use client";

import Link from "next/link";
import * as S from "./styles";
import { projectData } from "./helper";
import Container from "../components/container";
import { useEffect, useState } from "react";
import GitHubLightIcon from "@/assets/icons/social/github-light";

const Projects = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <Container>
      <S.ProjectsContainer>
        <S.ProjectsContent>
          {projectData.map((project, index) => (
            <S.ProjectsCard key={index}>
              <S.StyledImageWrapper>
                <S.StyledImage src={project.imgSrc} alt={project.alt} />
                <S.Overlay />
                <S.OverlayContent className="overlay-content">
                  <S.OverlayText>{project.description}</S.OverlayText>
                  <S.OverlayFooter>
                    <S.StatusContainer>
                      <S.Dot />
                      <S.StatusText>Em Desenvolvimento</S.StatusText>
                    </S.StatusContainer>
                    <S.StyledLink href={project.href}>
                      <GitHubLightIcon />
                      <S.FooterText> {project.linkTitle}</S.FooterText>
                    </S.StyledLink>
                  </S.OverlayFooter>
                </S.OverlayContent>

                <S.ProjectsCardContainer>
                  <S.ProjectsCardTitle className="projects-card-title">
                    {project.text}
                  </S.ProjectsCardTitle>
                </S.ProjectsCardContainer>
              </S.StyledImageWrapper>
            </S.ProjectsCard>
          ))}
        </S.ProjectsContent>
      </S.ProjectsContainer>
    </Container>
  );
};

export default Projects;
