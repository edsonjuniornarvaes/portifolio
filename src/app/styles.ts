import styled from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
`;

export const FlexButton = styled.button`
  display: flex;
`;

export const NavBar = styled(FlexDiv)`
  align-items: center;
  justify-content: center;

  height: 80px;

  background-color: #171717;
`;

export const NavBarContent = styled(FlexDiv)`
  width: 100%;
  max-width: 800px;

  justify-content: space-around;
`;

export const NavbarTitle = styled.div`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;

  margin: 0 4px;
  padding: 12px;

  border-radius: 4px;

  color: #fff;

  &:hover {
    background-color: #32312e;
  }
`;

export const NavbarContent = styled(FlexDiv)`
  align-items: center;
  justify-content: center;
  /* justify-content: center; */

  gap: 24px;
  /* justify-content: space-around; */

  width: 100%;
  max-width: 800px;
`;

export const Container = styled(FlexDiv)`
  align-items: flex-start;
  justify-content: center;

  width: 100vw;
  height: calc(100vh - 80px);
  padding: 60px 0 24px 0;
`;

export const Content = styled.div`
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 800px;

  /* padding: 20px; */

  border-radius: 12px;
`;

export const Title = styled.text`
  font-weight: 600;

  /* font-size: 32px; */
  font-size: 2.25rem;
`;

export const TitleContainer = styled(FlexDiv)`
  /* background-color: green; */
  flex-direction: column;

  /* text-align: center; */

  padding-bottom: 12px;
`;

export const ContentTitle = styled(Title)`
  font-weight: 700;
`;

export const ContentSubtitle = styled(Title)`
  font-weight: 700;

  margin-top: 12px;
`;

export const DescriptionDiv = styled(FlexDiv)`
  /* background-color: red; */
  padding: 12px 0;

  /* text-align: center; */
`;

export const ContentDescription = styled.text`
  font-weight: 200;

  /* font-size: 16px; */
  font-size: 1.125rem;
`;

export const QuickAccess = styled(FlexDiv)`
  align-items: center;
  /* justify-content: center; */

  /* background-color: yellow; */
  padding: 48px 0;
`;

export const QuickAccessButton = styled(FlexButton)`
  padding: 12px;
  margin: 0 4px;

  color: #171717;
  background-color: #fff;

  border: #fff;
  border-radius: 24px;

  &:hover {
    color: #fff;
    background-color: #32312e;
  }
`;

export const ProjectsContent = styled(FlexDiv)`
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;

  padding-bottom: 24px;
`;

export const ProjectsCard = styled(FlexDiv)`
  position: relative;
  flex-direction: column;

  flex: 1 1 300px;
  min-width: 250px;
  max-width: 390px;

  /* padding: 16px; */
  /* box-sizing: border-box; */

  /* border-top-left-radius: 12px; */
  /* border-top-right-radius: 12px; */
`;

export const ProjectsSection = styled(FlexDiv)`
  align-items: center;
  /* background-color: red; */

  padding-bottom: 24px;

  /* justify-content: center; */
`;

export const ProjectsSectionTitle = styled.text`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 180px; /* Define uma altura fixa */
  object-fit: cover; /* Mantém a proporção da imagem e preenche o espaço */
  /* border-top-left-radius: 12px;
  border-top-right-radius: 12px; */

  border-radius: 12px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  opacity: 0.8; /* Define a opacidade do componente */
  background-color: #f0f0f0; /* Exemplo de cor de fundo */

  transition: transform 0.3s ease-in-out; /* Suaviza a transformação */

  &:hover {
    transform: scale(1.05); /* Aumenta o componente em 5% ao passar o mouse */
  }
`;

export const ProjectsCardContainer = styled(FlexDiv)`
  position: absolute;
  bottom: 12px;
  padding-left: 12px;
`;

export const ProjectsCardText = styled.text`
  font-size: 1.125rem;
  line-height: 1.75rem;

  color: #fff;
`;
