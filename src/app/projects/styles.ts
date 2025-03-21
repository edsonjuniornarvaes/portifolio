import styled, { keyframes } from "styled-components";
import { FlexDiv } from "../styles";

const ProjectsContent = styled(FlexDiv)`
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
`;

const ProjectsCard = styled(FlexDiv)`
  flex: 1 0 calc(48% - 6px);
  flex-direction: column;
  position: relative;
  min-width: 200px;
  max-width: 50%;
  text-decoration: none;
  overflow: hidden;
  @media (max-width: 868px) {
    flex: 1 1 auto;
    max-width: 100%;
  }
  &:hover .projects-card-title {
    opacity: 0;
  }
`;

const ProjectsContainer = styled(FlexDiv)`
  flex-direction: column;
  padding-bottom: 24px;
`;

const ProjectsCardContainer = styled(FlexDiv)`
  position: absolute;
  bottom: 12px;
  padding-left: 12px;
  z-index: 1;
  color: #fff;
  width: 100%;
  justify-content: space-between;
`;

const ProjectsCardTitle = styled.text`
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #fff;
  transition: opacity 0.3s ease-in-out;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  &:hover img {
    transform: scale(1.05);
  }
  &:hover .overlay-content {
    opacity: 1;
    transform: translateY(0);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  &:hover .projects-card-title {
    opacity: 0;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
`;

const Overlay = styled.div`
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

const OverlayContent = styled(FlexDiv)`
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: rgba(24, 24, 27, 0.95);
  border-radius: 12px;
  color: #e4e4e7;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  transform: translateY(20px);
  z-index: 2;
`;

const OverlayText = styled.text`
  flex: 1;
  text-align: center;
  color: inherit;
`;

const OverlayFooter = styled(FlexDiv)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 868px) {
    align-items: center;
  }
  @media (max-width: 468px) {
    flex-direction: column;
  }
`;

const StatusContainer = styled(FlexDiv)`
  align-items: center;
  @media (max-width: 468px) {
    padding-bottom: 12px;
  }
`;

const StatusText = styled.text`
  padding-left: 8px;
  color: inherit;
  @media (max-width: 868px) {
    align-items: center;
  }
  @media (max-width: 468px) {
    flex-direction: column;
  }
`;

const StyledLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #e4e4e7;
  &:hover {
    color: #dadada;
  }
`;

const FooterText = styled.text`
  font-size: 14px;
  align-items: center;
  color: #e4e4e7;
  padding-left: 8px;
  a {
    color: #e4e4e7;
    text-decoration: none;
  }
`;

const PulseBorder = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgb(34 197 94 / var(--tw-bg-opacity));
  }
  70% {
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity));
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    border: 2px solid transparent;
    animation: ${PulseBorder} 1.5s infinite;
  }
`;

const ParagraphContainer = styled(FlexDiv)`
  flex-direction: column;
  padding: 24px 0;
`;

export {
  ProjectsContent,
  ProjectsCard,
  ProjectsContainer,
  ProjectsCardContainer,
  ProjectsCardTitle,
  StyledImageWrapper,
  StyledImage,
  Overlay,
  OverlayContent,
  OverlayText,
  OverlayFooter,
  StatusContainer,
  StatusText,
  StyledLink,
  FooterText,
  Dot,
  ParagraphContainer,
};
