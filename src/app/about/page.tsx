"use client";

import Container from "../components/container";
import PageSubtitle from "../components/subtitle";
import PageTitle from "../components/title";
import * as S from "../styles";

const About = () => {
  return (
    <Container>
      <PageTitle title="SOBRE" />
      <S.Paragraph>
        Iniciei minha carreira como desenvolvedor Front-End, trabalhando com
        PHP7, Laravel, Slim e Docker. Me especializei em desenvolvimento Web com
        React.js, Next.js, JavaScript e TypeScript, e participei de um projeto
        utilizando o Spotify Backstage para gerenciamento de projetos.
        Atualmente, foco no desenvolvimento mobile com React Native, consumindo
        APIs REST, utilizando versionamento de código e metodologias ágeis,
        criando designs no Figma e publicando aplicativos nas lojas Google Play
        e App Store. Também já atuei como Scrum Master em projetos mobile.
      </S.Paragraph>
      <S.Separator className="separator" />
      <S.SectionPadding>
        <PageTitle title="EXPERIÊNCIA" />
        <S.LegendContainer>
          <PageSubtitle subtitle="Superlógica Tecnologias" />
          <S.LegendText>2024-Atualmente</S.LegendText>
        </S.LegendContainer>
        <S.Paragraph>
          Desenvolvo para o Gruvi, um superapp para condomínios que permite
          aprovar visitantes, pagar aluguel, reservar espaços públicos,
          interagir com vizinhos e criar salas de bate-papo baseadas em
          interesses comuns, oferecendo uma nova relação entre pessoas, suas
          casas, condomínios e vizinhança. No dia a dia, utilizo React Native,
          realizo testes unitários com Jest, e monitoro o desempenho e erros do
          app com Bitrise, Sentry, Datadog e Mixpanel. Também faço consultas no
          MongoDB para gerenciamento de dados.
        </S.Paragraph>
        <S.Paragraph>
          <S.ContentContainer>
            <S.LegendContainer>
              <PageSubtitle subtitle="E/Code" />
              <S.LegendText>2019-2024</S.LegendText>
            </S.LegendContainer>
          </S.ContentContainer>
        </S.Paragraph>
        <S.Paragraph>
          <S.Paragraph>
            Atuei como Desenvolvedor Front-End Web, onde participei da
            implementação do E-commerce e do Marketplace B2B/B2C para a Gazin,
            além de iniciar painéis ERP para a Navex Internet e Lojas do Manão.
            Também implementei uma solução white label baseada nesses projetos.
          </S.Paragraph>
          <S.Paragraph>
            Migrei para a função de Scrum Master em projetos mobile, onde
            desenvolvi o app Minha Navex, voltado para aproximação de clientes e
            suporte técnico. Também liderei o suporte ao app Consórcio Gazin e
            desenvolvi dois apps para a Mont Capital, focados na gestão de
            investimentos B2B e B2C.
          </S.Paragraph>
        </S.Paragraph>
        <S.Separator className="separator" />
        <PageTitle title="FORMAÇÃO" />
        <S.LegendContainer>
          <PageSubtitle subtitle="Graduação em Sistemas" />
          <S.LegendText>2017-2020</S.LegendText>
        </S.LegendContainer>
        <S.Paragraph>UniAlfa Umuarama</S.Paragraph>
        <S.ContentContainer>
          <S.LegendContainer>
            <PageSubtitle subtitle="Pós-graduação em Desenvolvimento Web e Mobile" />
            <S.LegendText>2019-2021</S.LegendText>
          </S.LegendContainer>
        </S.ContentContainer>
        <S.Paragraph>UniAlfa Umuarama</S.Paragraph>
      </S.SectionPadding>
    </Container>
  );
};

export default About;
