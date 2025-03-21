import Image from "next/image";
import styled, { keyframes } from "styled-components";

const FlexDiv = styled.div`
  display: flex;
`;

const FlexButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResponsiveContainer = styled(FlexDiv)`
  min-height: calc(100vh - 160px);
  @media (max-width: 868px) {
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
`;

const HeaderTitleContainer = styled(FlexDiv)`
  flex-direction: column;
  justify-content: flex-start;
`;

const HeaderTitle = styled.text`
  font-weight: 200;
  font-size: 24px;
  margin-bottom: 12px;
  color: #2eebaa;
`;

const TitleContainer = styled(FlexDiv)`
  flex-direction: column;
  padding-bottom: 12px;
`;

const ContentTitle = styled.text`
  font-weight: 500;
  font-size: 40px;
  line-height: 120%;
`;

const ContentSubtitle = styled.text`
  font-weight: 700;
  font-size: 2.25rem;
  margin-top: 12px;
`;

const DescriptionDiv = styled(FlexDiv)`
  padding: 12px 0;
`;

const ContentDescription = styled.text`
  font-weight: 200;
  line-height: 140%;
  font-size: 20px;
  margin-bottom: 12px;
  color: #999999;
`;

const CategorySection = styled(FlexDiv)`
  /* flex-direction: column; */
  /* align-items: center;
  justify-content: center; */

  /* margin-right: 24px; */
`;

const CategorySectionTitle = styled.text`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.75rem;
`;

const AttribuitonsSection = styled(FlexDiv)`
  flex-direction: column;
  align-items: center;

  justify-self: space-between;
  padding: 24px;
  /* align-items: center;
  justify-content: center; */

  /* margin-right: 24px; */
`;

const AttribuitonsSectionTitle = styled.text`
  font-weight: 200;
  font-size: 32px;
  color: #2eebaa;
`;

const AttribuitonsSectionSubTitle = styled.text`
  font-size: 20px;
  font-weight: 200;
  line-height: 1.75rem;
`;

const QuickAccessSection = styled(FlexDiv)`
  flex-direction: column;
  padding-top: 24px;
  /* padding: 48px 0; */
  /* border-top: 1px solid #14141a; */
`;

const QuickAccessSectionTitle = styled.text`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 12px;
  color: #999999;
`;

const QuickAccess = styled(FlexDiv)`
  align-items: center;
`;

const QuickAccessButton = styled(FlexButton)`
  padding: 4px;
  margin-right: 8px;
  /* border: 1px solid rgb(213, 213, 214); */
  border: 1px solid transparent;

  /* border-radius: 24px; */
  border-radius: 4px;

  cursor: pointer;

  background-color: transparent;
  /* color: #fff; */
  color: #fff;
  &:hover {
    border-bottom: 1px solid #2eebaa;
    /* box-shadow: 0 0 2px 2px #2eebaa; */

    /* color: #fff; */
    /* background-color: #14141a; */

    /* font-weight: 700; */
  }
`;

const Separator = styled.div`
  margin: 24px 0;
  border-bottom: 1px solid #14141a;
`;

const Paragraph = styled.p`
  font-weight: 300;
`;

const Row = styled(FlexDiv)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 868px) {
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
`;

const AttribuitonsRow = styled(FlexDiv)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 24px;
  @media (max-width: 868px) {
    flex-direction: column;
    padding-top: 12px;
    align-items: center;
  }
`;

const ProfileContainer = styled(FlexDiv)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  margin-right: 48px;
  @media (max-width: 868px) {
    margin-right: 0;
    padding: 16px;
    margin-bottom: 23px;
  }
`;

const ProfileImage = styled(Image).attrs({
  width: 320,
  height: 222,
})`
  display: "block";
  width: 100%;
`;

const DescriptionColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 868px) {
    width: 100%;
    padding: 0 16px;
  }
`;

const ParagraphContainer = styled(FlexDiv)`
  flex-direction: column;
  padding: 24px 0;
`;

const LegendText = styled.span`
  font-weight: 200;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const SubtitleCategorySection = styled(FlexDiv)``;

const CategorySectionSubtitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.75rem;
`;

export {
  FlexDiv,
  FlexButton,
  ResponsiveContainer,
  HeaderTitle,
  HeaderTitleContainer,
  TitleContainer,
  ContentTitle,
  ContentSubtitle,
  DescriptionDiv,
  ContentDescription,
  CategorySection,
  AttribuitonsRow,
  AttribuitonsSection,
  AttribuitonsSectionTitle,
  AttribuitonsSectionSubTitle,
  QuickAccessSection,
  QuickAccessSectionTitle,
  QuickAccess,
  QuickAccessButton,
  Separator,
  Paragraph,
  Row,
  ProfileContainer,
  ProfileImage,
  DescriptionColumn,
  ParagraphContainer,
  LegendText,
  SubtitleCategorySection,
  CategorySectionTitle,
  CategorySectionSubtitle,
};
