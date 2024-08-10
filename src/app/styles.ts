import styled from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
`;

export const FlexButton = styled.button`
  display: flex;
`;

export const NavBar = styled(FlexDiv)`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 80px;

  background-color: #171717;
  padding: 0 16px;

  @media (max-width: 868px) {
    align-items: start;
    justify-content: center;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;

  padding: 8px;

  border: none;
  background: transparent;

  cursor: pointer;

  @media (max-width: 868px) {
    display: flex;
    z-index: 1;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 16px 0;

  background-color: #171717;

  @media (max-width: 868px) {
    display: flex;
    top: 0;
    position: absolute;
  }

  a {
    margin: 8px 0;
    color: #fff;
    text-decoration: none;
  }
`;

export const NavbarContent = styled(FlexDiv)`
  align-items: center;
  justify-content: center;

  gap: 24px;
  width: 100%;
  max-width: 800px;
  left: 0;

  @media (max-width: 868px) {
    display: none;
  }
`;

export const NavbarTitle = styled(FlexDiv)`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;

  margin: 0 4px;
  padding: 12px;

  border-radius: 4px;

  color: #fff;

  &:hover {
    padding: 12px;
    background-color: #32312e;
  }

  @media (max-width: 868px) {
    padding: 12px 0;
  }
`;

export const Container = styled(FlexDiv)`
  align-items: flex-start;
  justify-content: center;

  width: 100vw;
  height: calc(100vh - 80px);
  padding: 60px 0 24px 0;

  @media (max-width: 868px) {
    padding: 40px;
  }
`;

export const Content = styled.div`
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 800px;

  border-radius: 12px;
`;

export const Title = styled.text`
  font-weight: 600;
  font-size: 2.25rem;
`;

export const TitleContainer = styled(FlexDiv)`
  flex-direction: column;

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
  padding: 12px 0;
`;

export const ContentDescription = styled.text`
  font-weight: 200;
  font-size: 1.125rem;
`;

export const QuickAccess = styled(FlexDiv)`
  align-items: center;

  padding: 48px 0;
`;

export const QuickAccessButton = styled(FlexButton)`
  padding: 12px;
  margin: 0 4px;

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
  flex: 1 1 auto;
  position: relative;
  flex-direction: column;

  min-width: 200px;
  max-width: 100%;

  @media (max-width: 868px) {
    height: 150px;
  }
`;

export const ProjectsSection = styled(FlexDiv)`
  align-items: center;

  padding-bottom: 24px;
`;

export const ProjectsSectionTitle = styled.text`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.75rem;
`;

export const StyledImageWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 180px;
  border-radius: 12px;

  overflow: hidden;

  &:hover img {
    transform: scale(1.05);
  }

  &:hover div {
    opacity: 0.8;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.3s ease-in-out;
`;

export const Overlay = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border-radius: 12px;

  transition: opacity 0.3s ease-in-out;

  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
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

export const ResponsiveContainer = styled(FlexDiv)`
  @media (max-width: 868px) {
    flex-direction: column;
    align-items: center;
  }
`;
