"use client";

import {
  Body,
  BodyText,
  FirstNavbarTitle,
  Logo,
  Menu,
  NavBar,
  SecondNavbarTitle,
} from "./styles";

export default function Home() {
  return (
    <>
      <NavBar>
        <Logo>Logo</Logo>
        <Menu>
          <FirstNavbarTitle>Sobre</FirstNavbarTitle>
          <SecondNavbarTitle>Projetos</SecondNavbarTitle>
          <SecondNavbarTitle>Contato</SecondNavbarTitle>
        </Menu>
      </NavBar>
      <Body>
        <BodyText>
          Olá, sou Edson Junior. Desenvolvedor mobile, Graduado e Pós-graduado
          em Desenvolvimento Web e Dispositivos móveis.
        </BodyText>
      </Body>
    </>
  );
}
