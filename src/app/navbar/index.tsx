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
      <S.NavBar className="navbar">
        <S.HamburgerButton className="hamburger-button" onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="hamburger-icon" size={24} color="#fff" />
          ) : (
            <FaBars className="hamburger-icon" size={24} color="#fff" />
          )}
        </S.HamburgerButton>
        <S.NavbarContent>
          <S.LinkContent className="navbar-link" href="/home">
            Home
          </S.LinkContent>
          <S.LinkContent className="navbar-link" href="/projects">
            Projetos
          </S.LinkContent>
          <S.LinkContent className="navbar-link" href="/about">
            Sobre
          </S.LinkContent>
        </S.NavbarContent>
      </S.NavBar>
      {menuOpen && (
        <S.MobileMenu>
          <S.LinkContent className="navbar-link" href="/home">
            Home
          </S.LinkContent>
          <S.LinkContent className="navbar-link" href="/projects">
            Projetos
          </S.LinkContent>
          <S.LinkContent className="navbar-link" href="/about">
            Sobre
          </S.LinkContent>
        </S.MobileMenu>
      )}
    </>
  );
};

export default Navbar;
