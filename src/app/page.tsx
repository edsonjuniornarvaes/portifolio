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
        <Logo>
          <svg
            width="34"
            height="41"
            viewBox="0 0 34 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2841 40.5737H8.28036V0.5H10.2841V40.5737ZM6.27668 40.5737H4.27299V0.5H6.27668V40.5737ZM2.26931 40.5737H0.265625V0.5H2.26931V40.5737ZM14.2914 30.5553H33.4656V32.559H14.2914V34.5627H33.4656V36.5664H14.2914V38.57H33.4656V40.5737H12.2877V0.5H33.4656V2.50369H14.2914V4.50737H33.4656V6.51106H14.2914V8.51475H33.4656V10.5184H14.2914V15.4998H32.3525V17.5035H14.2914V19.5072H32.3525V21.5109H14.2914V23.5146H32.3525V25.5183H14.2914V30.5553Z"
              fill="white"
            />
          </svg>
        </Logo>
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
