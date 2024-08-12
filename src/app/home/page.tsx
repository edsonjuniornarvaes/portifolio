"use client";

import Link from "next/link";
import * as S from "../styles";
import { projectData } from "./helper";
import Container from "../components/container";

export default function Home() {
  return (
    <S.ResponsiveContainer>
      <Container>
        <S.TitleContainer>
          <S.ContentTitle>Olá, eu sou Edson Junior 👋</S.ContentTitle>
          <S.ContentSubtitle>Dev Front-end, Web e Mobile.</S.ContentSubtitle>
        </S.TitleContainer>
        <S.DescriptionDiv>
          <S.ContentDescription>Unindo criação e código.</S.ContentDescription>
        </S.DescriptionDiv>
        <S.QuickAccess>
          <S.QuickAccessButton
            onClick={() =>
              window.open("https://github.com/edsonjuniornarvaes", "_blank")
            }
          >
            Me acompanhe no GitHub
          </S.QuickAccessButton>
          <S.QuickAccessButton
            onClick={() =>
              window.open("https://dev.to/edsonjuniornarvaes", "_blank")
            }
          >
            Me acompanhe no Dev.to
          </S.QuickAccessButton>
        </S.QuickAccess>
        <S.ProjectsContainer>
          <S.ProjectsSection>
            <S.ProjectsSectionTitle>ÚLTIMOS DROPS</S.ProjectsSectionTitle>
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
    </S.ResponsiveContainer>
  );
}
