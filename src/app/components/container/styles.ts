import { FlexDiv } from "@/app/styles";
import styled from "styled-components";

export const Container = styled(FlexDiv)`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  /* min-height: calc(100vh - 160px); */
  padding: 48px;
`;

export const Content = styled.div`
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 800px;
  border-radius: 12px;
`;
