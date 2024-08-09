"use client";

import {
  NavBar,
  NavbarContent,
  NavbarTitle,
  Container,
  Content,
  ContentDescription,
  ContentTitle,
  DescriptionDiv,
  QuickAccess,
  QuickAccessButton,
  ProjectsContent,
  ProjectsCard,
  StyledImage,
  ContentSubtitle,
  TitleContainer,
  ProjectsSection,
  ProjectsSectionTitle,
  ProjectsCardContainer,
  ProjectsCardText,
} from "./styles";

export default function Home() {
  return (
    <>
      <NavBar>
        <NavbarContent>
          <NavbarTitle>Home</NavbarTitle>
          <NavbarTitle>Projetos</NavbarTitle>
          <NavbarTitle>Sobre</NavbarTitle>
          <NavbarTitle>Contato</NavbarTitle>
        </NavbarContent>
      </NavBar>
      <Container>
        <Content>
          <TitleContainer>
            <ContentTitle>Olá, eu sou Edson Junior 👋</ContentTitle>
            <ContentSubtitle>
              Dev Front-end, Web e Mobile.
              {/* Desenvolvedor mobile, Graduado e Pós-graduado em Desenvolvimento
              Web e Dispositivos móveis. */}
            </ContentSubtitle>
          </TitleContainer>
          <DescriptionDiv>
            <ContentDescription>
              Iniciei minha carreira como desenvolvedor Front-End, trabalhando
              com PHP7, Laravel, Slim e Docker. Me especializei em
              desenvolvimento Web com React.js, Next.js, JavaScript e
              TypeScript, e participei de um projeto utilizando o Spotify
              Backstage para gerenciamento de projetos. Atualmente, foco no
              desenvolvimento mobile com React Native, consumindo APIs REST,
              utilizando versionamento de código e metodologias ágeis, criando
              designs no Figma e publicando aplicativos nas lojas Google Play e
              App Store. Também já atuei como Scrum Master em projetos mobile.
            </ContentDescription>
          </DescriptionDiv>
          <QuickAccess>
            <QuickAccessButton
              onClick={() =>
                window.open("https://github.com/edsonjuniornarvaes", "_blank")
              }
            >
              Me acompanhe no GitHub
            </QuickAccessButton>
            <QuickAccessButton
              onClick={() =>
                window.open("https://dev.to/edsonjuniornarvaes", "_blank")
              }
            >
              Me acompanhe no Dev.to
            </QuickAccessButton>
          </QuickAccess>
          <ProjectsSection>
            <ProjectsSectionTitle>ÚLTIMOS DROPS</ProjectsSectionTitle>
          </ProjectsSection>
          <ProjectsContent>
            <ProjectsCard>
              <StyledImage
                src="https://img.freepik.com/fotos-gratis/computador-laptop-cinza-ligado_400718-47.jpg?t=st=1723237356~exp=1723240956~hmac=4eafc2f572d1489078d27db4d7ca5592e9fd69d0a78b7929d233c3bc7c336362&w=740"
                alt="Exemplo de Imagem"
              />
              <ProjectsCardContainer>
                <ProjectsCardText>Projetos</ProjectsCardText>
              </ProjectsCardContainer>
            </ProjectsCard>
            <ProjectsCard>
              <StyledImage
                src="https://img.freepik.com/fotos-gratis/vista-da-configuracao-da-mesa-de-jogos-iluminada-a-neon-com-teclado_23-2149529348.jpg?t=st=1723235991~exp=1723239591~hmac=d690003c86b97b0a6af32bde788497e4b21df90025ae373d5f72941b21c96472&w=740"
                alt="Exemplo de Imagem"
              />
              <ProjectsCardContainer>
                <ProjectsCardText>Stack</ProjectsCardText>
              </ProjectsCardContainer>
            </ProjectsCard>
          </ProjectsContent>
        </Content>
      </Container>
    </>
  );
}
