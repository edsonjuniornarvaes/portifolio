import Link from "next/link";
import styled from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
`;

export const FlexButton = styled.button`
  display: flex;
`;

export const HamburgerButton = styled(FlexButton)`
  display: none;
  align-items: center;
  justify-content: center;

  padding: 12px;
  border: none;

  background: transparent;

  cursor: pointer;

  @media (max-width: 868px) {
    z-index: 2;
    display: flex;
  }
`;

export const MobileMenu = styled.div`
  z-index: 1;

  display: none;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 16px 0;

  background-color: #08080b;

  a {
    margin: 8px 0;

    color: #fff;
    text-decoration: none;
  }

  @media (max-width: 868px) {
    display: flex;
    position: absolute;

    top: 80px;
    left: 0;
  }
`;

export const NavBar = styled(FlexDiv)`
  z-index: 3;

  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;

  width: 100%;
  height: 80px;
  padding: 0 16px;

  background-color: #08080b;

  @media (max-width: 868px) {
    justify-content: space-between;
  }
`;

export const NavbarContent = styled(FlexDiv)`
  align-items: center;
  justify-content: center;

  gap: 24px;
  width: 100%;
  max-width: 800px;

  @media (max-width: 868px) {
    display: none;
  }
`;

export const LinkContent = styled(Link)`
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;

  margin: 0 4px;
  padding: 12px;
  border-radius: 4px;

  color: #fff;

  &:hover {
    background-color: #14141a;
  }

  @media (max-width: 868px) {
    &:hover {
      text-align: center;

      width: 150px;
    }
  }
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

export const ProjectsSectionTitle = styled.text`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.75rem;
`;

export const QuickAccessSection = styled(FlexDiv)`
  flex-direction: column;

  padding: 48px 0;

  border-bottom: 1px solid #14141a;
`;

export const QuickAccessSectionTitle = styled.text`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.75rem;

  padding-bottom: 24px;
`;

export const QuickAccess = styled(FlexDiv)`
  align-items: center;
`;

export const QuickAccessButton = styled(FlexButton)`
  padding: 12px;
  margin-right: 8px;
  border: #fff;
  border-radius: 24px;

  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const SocialText = styled.text`
  padding-left: 8px;
`;

export const ProjectsContent = styled(FlexDiv)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
  gap: 12px;
`;

export const ProjectsCard = styled(FlexDiv)`
  flex: 1 0 calc(48% - 6px);
  flex-direction: column;
  position: relative;

  min-width: 200px;
  max-width: 100%;
  text-decoration: none;

  @media (max-width: 868px) {
    flex: 1 1 auto;
    width: 100%;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const ProjectsContainer = styled(FlexDiv)`
  flex-direction: column;

  padding-bottom: 24px;
`;

export const ProjectsSection = styled(FlexDiv)`
  align-items: center;

  padding-bottom: 24px;
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

  opacity: 0.8;
`;

export const Overlay = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  border-radius: 12px;

  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);

  transition: opacity 0.3s ease-in-out;
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
  min-height: calc(100vh - 160px);

  @media (max-width: 868px) {
    flex-direction: column;
    align-items: center;
  }
`;
