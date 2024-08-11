"use client";

import Link from "next/link";
import * as S from "../styles";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <S.NavBar>
        <S.HamburgerButton onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes size={24} color="#fff" />
          ) : (
            <FaBars size={24} color="#fff" />
          )}
        </S.HamburgerButton>
        {!menuOpen && (
          <S.NavbarContent className={menuOpen ? "hidden" : ""}>
            <S.NavbarTitle>
              <Link href="/home">Home</Link>
            </S.NavbarTitle>
            <S.NavbarTitle>
              <Link href="/projects">Projetos</Link>
            </S.NavbarTitle>
            <S.NavbarTitle>
              <Link href="/about">Sobre</Link>
            </S.NavbarTitle>
            <S.NavbarTitle>
              <Link href="/contact">Contato</Link>
            </S.NavbarTitle>
          </S.NavbarContent>
        )}
      </S.NavBar>
      {menuOpen && (
        <S.MobileMenu>
          <S.NavbarTitle>
            <Link href="/home">Home</Link>
          </S.NavbarTitle>
          <S.NavbarTitle>
            <Link href="/projects">Projetos</Link>
          </S.NavbarTitle>
          <S.NavbarTitle>
            <Link href="/about">Sobre</Link>
          </S.NavbarTitle>
          <S.NavbarTitle>
            <Link href="/contact">Contato</Link>
          </S.NavbarTitle>
        </S.MobileMenu>
      )}
    </>
  );
};

export default Navbar;
