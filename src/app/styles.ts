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
  padding: 12px;
  margin: 0 4px;
  border-radius: 4px;
  color: #fff;

  &:hover {
    background-color: #32312e;
  }
`;

export const Menu = styled(FlexDiv)`
  width: 100%;
  max-width: 800px;
  justify-content: space-around;
`;

export const Container = styled(FlexDiv)`
  height: calc(100vh - 80px);
  width: 100vw;
  padding-top: 24px;
  align-items: flex-start;
  justify-content: center;
`;

export const Content = styled.div`
  padding: 20px;
  max-width: 800px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const BodyTitle = styled.text`
  font-weight: 600;
  font-size: 24px;
`;

export const DescriptionDiv = styled(FlexDiv)`
  padding: 24px 0;
`;

export const BodyDescription = styled.text`
  font-weight: 200;
  font-size: 16px;
`;

export const QuickAccessDiv = styled(FlexDiv)``;

export const Button = styled(FlexButton)`
  padding: 12px;
  margin: 0 4px;
  border-radius: 24px;

  border: #fff;
  color: #171717;
  background-color: #fff;

  &:hover {
    color: #fff;
    background-color: #32312e;
  }
`;
