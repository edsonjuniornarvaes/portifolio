"use client";

import Link from "next/link";
import * as S from "../styles";
import { projectData } from "./helper";
import Container from "../components/container";
import GitHubDarkIcon from "@/assets/icons/social/github-dark";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";

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
        <S.CategorySection>
          <S.QuickAccessSection className="separator">
            <S.QuickAccessSectionTitle>ME ACOMPANHE</S.QuickAccessSectionTitle>
            <S.QuickAccess>
              <S.QuickAccessButton
                onClick={() =>
                  window.open("https://github.com/edsonjuniornarvaes", "_blank")
                }
              >
                <GitHubDarkIcon />
                <S.SocialText>GitHub</S.SocialText>
              </S.QuickAccessButton>
              <S.QuickAccessButton
                onClick={() =>
                  window.open("https://dev.to/edsonjuniornarvaes", "_blank")
                }
              >
                <DevtoIcon />
                <S.SocialText>Dev.to</S.SocialText>
              </S.QuickAccessButton>
              <S.QuickAccessButton
                onClick={() =>
                  window.open(
                    "https://linkedin.com/in/edsonjuniornarvaes",
                    "_blank"
                  )
                }
              >
                <LinkedInIcon />
                <S.SocialText>LinkedIn</S.SocialText>
              </S.QuickAccessButton>
            </S.QuickAccess>
          </S.QuickAccessSection>
        </S.CategorySection>
        <S.CategorySection>
          <S.CategorySectionTitle>INSIGHTS</S.CategorySectionTitle>
          <S.CategoryContent>
            {projectData.map((project, index) => (
              <S.CategoryCard key={index}>
                <Link href={project.href} passHref>
                  <S.StyledImageWrapper>
                    <S.StyledImage src={project.imgSrc} alt={project.alt} />
                    <S.Overlay />
                  </S.StyledImageWrapper>
                  <S.CategoryCardContainer>
                    <S.CategoryCardText>{project.text}</S.CategoryCardText>
                  </S.CategoryCardContainer>
                </Link>
              </S.CategoryCard>
            ))}
          </S.CategoryContent>
        </S.CategorySection>
      </Container>
    </S.ResponsiveContainer>
  );
}
