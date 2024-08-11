"use client";

import Link from "next/link";
import * as S from "../styles";

export default function Home() {
  return (
    <S.ResponsiveContainer>
      <S.Container>
        <S.Content>
          <S.TitleContainer>
            <S.ContentTitle>Olá, eu sou Edson Junior 👋</S.ContentTitle>
            <S.ContentSubtitle>Dev Front-end, Web e Mobile.</S.ContentSubtitle>
          </S.TitleContainer>
          <S.DescriptionDiv>
            <S.ContentDescription>
              Unindo criação e código.
            </S.ContentDescription>
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
              <S.ProjectsCard>
                <Link href="/projects" passHref>
                  <S.StyledImageWrapper>
                    <S.StyledImage
                      src="https://img.freepik.com/fotos-gratis/computador-laptop-cinza-ligado_400718-47.jpg?t=st=1723237356~exp=1723240956~hmac=4eafc2f572d1489078d27db4d7ca5592e9fd69d0a78b7929d233c3bc7c336362&w=740"
                      alt="Exemplo de Imagem"
                    />
                    <S.Overlay />
                  </S.StyledImageWrapper>
                  <S.ProjectsCardContainer>
                    <S.ProjectsCardText>Projetos</S.ProjectsCardText>
                  </S.ProjectsCardContainer>
                </Link>
              </S.ProjectsCard>
              <S.ProjectsCard>
                <Link href="/stack" passHref>
                  <S.StyledImageWrapper>
                    <S.StyledImage
                      src="https://img.freepik.com/fotos-gratis/vista-da-configuracao-da-mesa-de-jogos-iluminada-a-neon-com-teclado_23-2149529348.jpg?t=st=1723235991~exp=1723239591~hmac=d690003c86b97b0a6af32bde788497e4b21df90025ae373d5f72941b21c96472&w=740"
                      alt="Exemplo de Imagem"
                    />
                    <S.Overlay />
                  </S.StyledImageWrapper>
                  <S.ProjectsCardContainer>
                    <S.ProjectsCardText>Stack</S.ProjectsCardText>
                  </S.ProjectsCardContainer>
                </Link>
              </S.ProjectsCard>
            </S.ProjectsContent>
          </S.ProjectsContainer>
        </S.Content>
      </S.Container>
    </S.ResponsiveContainer>
  );
}
