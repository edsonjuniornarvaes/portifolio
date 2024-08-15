"use client";

import Container from "../components/container";
import * as S from "../styles";

const About = () => {
  return (
    <Container>
      <S.CategorySection>
        <S.CategorySectionTitle>Sobre</S.CategorySectionTitle>
      </S.CategorySection>
      <S.ContentDescription>
        Iniciei minha carreira como desenvolvedor Front-End, trabalhando com
        PHP7, Laravel, Slim e Docker. Me especializei em desenvolvimento Web com
        React.js, Next.js, JavaScript e TypeScript, e participei de um projeto
        utilizando o Spotify Backstage para gerenciamento de projetos.
        Atualmente, foco no desenvolvimento mobile com React Native, consumindo
        APIs REST, utilizando versionamento de código e metodologias ágeis,
        criando designs no Figma e publicando aplicativos nas lojas Google Play
        e App Store. Também já atuei como Scrum Master em projetos mobile.
      </S.ContentDescription>
    </Container>
  );
};

export default About;
