import * as S from "../../styles";

type PageSubtitleProps = {
  subtitle: string;
};

const PageSubtitle: React.FC<PageSubtitleProps> = ({ subtitle }) => {
  return (
    <S.SubtitleCategorySection>
      <S.CategorySectionSubtitle>{subtitle}</S.CategorySectionSubtitle>
    </S.SubtitleCategorySection>
  );
};

export default PageSubtitle;
