import { FlexButton, FlexDiv } from "@/app/styles";
import Link from "next/link";
import styled from "styled-components";

const HamburgerButton = styled(FlexButton)`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  @media (max-width: 868px) {
    z-index: 2;
    display: flex;
  }
`;

const MobileMenu = styled.div`
  z-index: 3;
  display: none;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  background-color: #08080b;
  a {
    margin: 8px 0;
    color: #fff;
    text-decoration: none;
  }

  @media (max-width: 868px) {
    display: flex;
    position: absolute;
    top: 80px;
    left: 0;
  }
`;

const NavBar = styled(FlexDiv)`
  z-index: 3;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  left: 0;
  height: 80px;
  padding: 0 16px;
  @media (max-width: 868px) {
    justify-content: space-between;
  }
`;

const NavbarContent = styled(FlexDiv)`
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  @media (max-width: 868px) {
    display: none;
  }
`;

const NavbarLink = styled(Link)`
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 0 2px;
  padding: 12px;
  border-radius: 4px;
  color: #fff;
  border: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid #2eebaa;
  }
  @media (max-width: 868px) {
    &:hover {
      text-align: center;
      width: 90%;
    }
  }
`;

export { HamburgerButton, MobileMenu, NavBar, NavbarContent, NavbarLink };
