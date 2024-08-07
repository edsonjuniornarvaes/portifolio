import styled from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
`;

export const Body = styled(FlexDiv)`
  font-size: 30px;
  padding: 60px 160px 0 160px;
`;

export const BodyText = styled.text``;

export const NavBar = styled(FlexDiv)`
  align-items: center;
  justify-content: space-between;

  padding: 0 160px 0 160px;

  height: 80px;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #4d4d4d;
`;

export const Logo = styled(FlexDiv)``;

export const Menu = styled(FlexDiv)`
  :hover {
    color: #4d4d4d;
  }
`;

export const FirstNavbarTitle = styled.text`
  color: #fff;

  margin-right: 24px;
`;

export const SecondNavbarTitle = styled.text`
  color: #fff;
  margin-right: 24px;
`;
