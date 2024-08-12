import styled from "styled-components";
import { FlexDiv } from "../styles";

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

  cursor: pointer;

  @media (max-width: 868px) {
    flex: 1 1 auto;
    width: 100%;
  }
`;

export const ProjectsContainer = styled(FlexDiv)`
  flex-direction: column;

  padding-bottom: 24px;
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

  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);

  transition: opacity 0.3s ease-in-out;
`;
