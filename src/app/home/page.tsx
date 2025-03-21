"use client";

import * as S from "../styles";
import Container from "../components/container";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";

export default function Home() {
  return (
    <S.ResponsiveContainer>
      <Container>
        <S.Row>
          <S.ProfileContainer>
            <S.ProfileImage src="/images/profile.svg" alt="Profile" />
            <S.CategorySection>
              <S.QuickAccessSection>
                <S.QuickAccessSectionTitle>
                  Me acompanhe
                </S.QuickAccessSectionTitle>
                <S.QuickAccess>
                  <S.QuickAccessButton
                    onClick={() =>
                      window.open(
                        "https://linkedin.com/in/edsonjuniornarvaes",
                        "_blank"
                      )
                    }
                  >
                    <LinkedInIcon
                      width={24}
                      height={24}
                      color="rgb(213, 213, 214)"
                    />
                  </S.QuickAccessButton>
                  <S.QuickAccessButton
                    onClick={() =>
                      window.open("https://dev.to/edsonjuniornarvaes", "_blank")
                    }
                  >
                    <DevtoIcon
                      width={24}
                      height={24}
                      color="rgb(213, 213, 214)"
                    />
                  </S.QuickAccessButton>
                  <S.QuickAccessButton
                    onClick={() =>
                      window.open(
                        "https://github.com/edsonjuniornarvaes",
                        "_blank"
                      )
                    }
                  >
                    <GitHubIcon
                      width={24}
                      height={24}
                      color="rgb(213, 213, 214)"
                    />
                  </S.QuickAccessButton>
                </S.QuickAccess>
              </S.QuickAccessSection>
            </S.CategorySection>
          </S.ProfileContainer>
          <S.DescriptionColumn>
            <S.HeaderTitleContainer>
              <S.HeaderTitle>Olá, sou Edson Jr.</S.HeaderTitle>
            </S.HeaderTitleContainer>
            <S.TitleContainer>
              <S.ContentTitle>
                Desenvolvedor Front-end, Web e Mobile.
              </S.ContentTitle>
            </S.TitleContainer>
            <S.DescriptionDiv>
              <S.ContentDescription>
                Especialista em Desenvolvimento Web e Mobile, com 6 anos de
                experiência.
              </S.ContentDescription>
            </S.DescriptionDiv>
          </S.DescriptionColumn>
        </S.Row>
        <S.AttribuitonsRow>
          <S.AttribuitonsSection>
            <S.AttribuitonsSectionTitle>6+</S.AttribuitonsSectionTitle>
            <S.AttribuitonsSectionSubTitle>
              Anos de Experiência
            </S.AttribuitonsSectionSubTitle>
          </S.AttribuitonsSection>
          <S.AttribuitonsSection>
            <S.AttribuitonsSectionTitle>12+</S.AttribuitonsSectionTitle>
            <S.AttribuitonsSectionSubTitle>
              Projetos participados
            </S.AttribuitonsSectionSubTitle>
          </S.AttribuitonsSection>
          <S.AttribuitonsSection>
            <S.AttribuitonsSectionTitle>2+</S.AttribuitonsSectionTitle>
            <S.AttribuitonsSectionSubTitle>
              Graduações
            </S.AttribuitonsSectionSubTitle>
          </S.AttribuitonsSection>
        </S.AttribuitonsRow>
      </Container>
    </S.ResponsiveContainer>
  );
}
