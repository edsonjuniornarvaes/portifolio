import styled from "styled-components";
import { FlexDiv } from "../styles";

const Container = styled(FlexDiv)`
  padding-top: 24px;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const Card = styled(FlexDiv)`
  width: 240px;
  height: 220px;
  border: 0.1px solid #14141a;
  border-radius: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
  transition: box-shadow 0.3s ease-in-out;
`;

const StyledImage = styled.img`
  width: 40%;
  height: auto;
  object-fit: cover;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 16px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 14px;
  text-align: center;
  color: #666;
`;

export { Container, Card, StyledImage, Title, Description };
