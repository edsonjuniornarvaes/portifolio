"use client";

import styled from "styled-components";

const ContainerWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <ContainerWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </ContainerWrapper>
  );
};

export default Container;
