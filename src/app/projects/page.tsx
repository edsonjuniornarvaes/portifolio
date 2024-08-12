"use client";

import Link from "next/link";
import * as S from "./styles";
import { projectData } from "./helper";
import Container from "../components/container";

const Projects = () => {
  return (
    <Container>
      <S.ProjectsContainer>
        <S.ProjectsSection>
          <S.ProjectsSectionTitle>Projetos</S.ProjectsSectionTitle>
        </S.ProjectsSection>
        <S.ProjectsContent>
          {projectData.map((project, index) => (
            <S.ProjectsCard key={index}>
              <Link href={project.href} passHref>
                <S.StyledImageWrapper>
                  <S.StyledImage src={project.imgSrc} alt={project.alt} />
                  <S.Overlay />
                </S.StyledImageWrapper>
                <S.ProjectsCardContainer>
                  <S.ProjectsCardText>{project.text}</S.ProjectsCardText>
                </S.ProjectsCardContainer>
              </Link>
            </S.ProjectsCard>
          ))}
        </S.ProjectsContent>
      </S.ProjectsContainer>
    </Container>
  );
};

export default Projects;
