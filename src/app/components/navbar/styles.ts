import { FlexButton, FlexDiv } from "@/app/styles";
import Link from "next/link";
import styled from "styled-components";

export const HamburgerButton = styled(FlexButton)`
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

export const MobileMenu = styled.div`
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

export const NavBar = styled(FlexDiv)`
  z-index: 3;
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 0 16px;
  background-color: #08080b;
  @media (max-width: 868px) {
    justify-content: space-between;
  }
`;

export const NavbarContent = styled(FlexDiv)`
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  @media (max-width: 868px) {
    display: none;
  }
`;

export const NavbarLink = styled(Link)`
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin: 0 4px;
  padding: 12px;
  border-radius: 4px;
  color: #fff;
  &:hover {
    background-color: #14141a;
  }
  @media (max-width: 868px) {
    &:hover {
      text-align: center;
      width: 90%;
    }
  }
`;
