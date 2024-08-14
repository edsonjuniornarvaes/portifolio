"use client";

import * as S from "../styles";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
        <S.NavbarContent>
          <S.LinkContent href="/home">Home</S.LinkContent>
          <S.LinkContent href="/projects">Projetos</S.LinkContent>
          <S.LinkContent href="/about">Sobre</S.LinkContent>
        </S.NavbarContent>
      </S.NavBar>
      {menuOpen && (
        <S.MobileMenu>
          <S.LinkContent href="/home">Home</S.LinkContent>
          <S.LinkContent href="/projects">Projetos</S.LinkContent>
          <S.LinkContent href="/about">Sobre</S.LinkContent>
        </S.MobileMenu>
      )}
    </>
  );
};

export default Navbar;
