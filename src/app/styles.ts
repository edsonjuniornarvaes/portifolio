import styled, { keyframes } from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
`;

export const FlexButton = styled.button`
  display: flex;
`;

export const TitleContainer = styled(FlexDiv)`
  flex-direction: column;
  padding-bottom: 12px;
`;

export const ContentTitle = styled.text`
  font-weight: 700;
  font-size: 2.25rem;
`;

export const ContentSubtitle = styled.text`
  font-weight: 700;
  font-size: 2.25rem;
  margin-top: 12px;
`;

export const DescriptionDiv = styled(FlexDiv)`
  padding: 12px 0;
`;

export const ContentDescription = styled.text`
  font-weight: 200;
  font-size: 1.125rem;
  margin-bottom: 12px;
`;

export const CategorySection = styled.div`
  align-items: center;
  padding-bottom: 24px;
`;

export const CategorySectionTitle = styled.text`
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
  color: inherit !important;
  text-decoration: none;
`;

export const CategoryContent = styled(FlexDiv)`
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  padding-top: 24px;
`;

export const CategoryCard = styled(FlexDiv)`
  flex: 1 0 calc(48% - 6px);
  flex-direction: column;
  position: relative;
  min-width: 200px;
  max-width: 100%;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
  @media (max-width: 868px) {
    flex: 1 1 auto;
    width: 100%;
  }
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

export const CategoryCardContainer = styled(FlexDiv)`
  position: absolute;
  bottom: 12px;
  padding-left: 12px;
`;

export const CategoryCardText = styled.text`
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

export const Separator = styled.div`
  margin: 24px 0;
  border-bottom: 1px solid #14141a;
`;

const FlexColumn = styled(FlexDiv)`
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export const Paragraph = styled.p`
  font-weight: 300;
  margin-bottom: 24px;
`;

export const LegendContainer = styled(FlexColumn)`
  padding-bottom: 8px;
`;

export const LegendText = styled.span`
  font-weight: 200;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const SubtitleCategorySection = styled(FlexDiv)``;

export const CategorySectionSubtitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.75rem;
`;
