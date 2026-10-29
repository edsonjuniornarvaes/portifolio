"use client";

import Link from "next/link";
import Container from "../components/container";
import PageTitle from "../components/title";
import { stackData } from "./helper";

import * as S from "./styles";

const Stack = () => {
  return (
    <Container>
      <PageTitle title="Stack" />
      <S.Container>
        {stackData.map((item) => (
          <Link key={item.link} href={item.link}>
            <S.Card key={item.title}>
              <S.StyledImage src={item.image} alt={item.alt} />
              <S.Title>{item.title}</S.Title>
              <S.Description>{item.description}</S.Description>
            </S.Card>
          </Link>
        ))}
      </S.Container>
    </Container>
  );
};

export default Stack;
