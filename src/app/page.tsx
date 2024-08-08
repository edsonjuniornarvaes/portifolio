"use client";

import {
  NavBar,
  Menu,
  NavbarTitle,
  Container,
  Content,
  BodyDescription,
  BodyTitle,
  DescriptionDiv,
  QuickAccessDiv,
  Button,
} from "./styles";

export default function Home() {
  return (
    <>
      <NavBar>
        <Menu>
          <NavbarTitle>Home</NavbarTitle>
          <NavbarTitle>Projetos</NavbarTitle>
          <NavbarTitle>Sobre</NavbarTitle>
          <NavbarTitle>Contato</NavbarTitle>
        </Menu>
      </NavBar>
      <Container>
        <Content>
          <BodyTitle>
            Olá, sou Edson Junior. Desenvolvedor mobile, Graduado e Pós-graduado
            em Desenvolvimento Web e Dispositivos móveis.
          </BodyTitle>
          <DescriptionDiv>
            <BodyDescription>
              Iniciei minha carreira como desenvolvedor Front-End, trabalhando
              com PHP7, Laravel, Slim e Docker. Me especializei em
              desenvolvimento Web com React.js, Next.js, JavaScript e
              TypeScript, e participei de um projeto utilizando o Spotify
              Backstage para gerenciamento de projetos. Atualmente, foco no
              desenvolvimento mobile com React Native, consumindo APIs REST,
              utilizando versionamento de código e metodologias ágeis, criando
              designs no Figma e publicando aplicativos nas lojas Google Play e
              App Store. Também já atuei como Scrum Master em projetos mobile.
            </BodyDescription>
          </DescriptionDiv>
          <QuickAccessDiv>
            <Button
              onClick={() =>
                window.open("https://github.com/edsonjuniornarvaes", "_blank")
              }
            >
              GitHub
            </Button>
            <Button
              onClick={() =>
                window.open("https://dev.to/edsonjuniornarvaes", "_blank")
              }
            >
              Dev.to
            </Button>
          </QuickAccessDiv>
        </Content>
      </Container>
    </>
  );
}
