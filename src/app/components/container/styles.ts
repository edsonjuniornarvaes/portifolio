import { FlexDiv } from "@/app/styles";
import styled from "styled-components";

const Container = styled(FlexDiv)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
`;

export { Container, Content };
