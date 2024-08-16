"use client";

import Container from "../components/container";
import PageSubtitle from "../components/subtitle";
import PageTitle from "../components/title";
import * as S from "../styles";
import { ExperienceData, EducationData } from "./helper";

const About = () => {
  return (
    <Container>
      <PageTitle title="SOBRE" />
      <S.LegendContainer>
        <PageSubtitle subtitle="Carreira" />
      </S.LegendContainer>
      <S.Paragraph>
        Iniciei minha carreira como desenvolvedor Front-End, trabalhando com
        PHP7, Laravel, Slim e Docker.
        <br />
        <br />
        Me especializei em desenvolvimento Web com React.js, Next.js, JavaScript
        e TypeScript, e participei de um projeto utilizando o Spotify Backstage
        para gerenciamento de projetos.
        <br />
        <br />
        Atualmente, foco no desenvolvimento mobile com React Native, consumindo
        APIs REST, utilizando versionamento de código e metodologias ágeis,
        criando designs no Figma e publicando aplicativos nas lojas Google Play
        e App Store. Também já atuei como Scrum Master em projetos mobile.
      </S.Paragraph>
      <S.Separator className="separator" />
      <PageTitle title="EXPERIÊNCIA" />
      {ExperienceData.map((exp, index) => (
        <div key={index}>
          <S.LegendContainer>
            <PageSubtitle subtitle={exp.company} />
            <S.LegendText>{exp.period}</S.LegendText>
          </S.LegendContainer>
        </div>
      ))}
      <S.Separator className="separator" />
      <PageTitle title="FORMAÇÃO" />
      {EducationData.map((edu, index) => (
        <div key={index}>
          <S.LegendContainer>
            <PageSubtitle subtitle={edu.course} />
            <S.LegendText>{edu.period}</S.LegendText>
          </S.LegendContainer>
          <S.Paragraph>{edu.institution}</S.Paragraph>
        </div>
      ))}
    </Container>
  );
};

export default About;
