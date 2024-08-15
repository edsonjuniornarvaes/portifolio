import * as S from "../../styles";

type PageTitleProps = {
  title: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <S.CategorySection>
      <S.CategorySectionTitle>{title}</S.CategorySectionTitle>
    </S.CategorySection>
  );
};

export default PageTitle;
