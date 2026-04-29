"use client";

import * as S from "./styles";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "Sobre" },
  { href: "/projects", label: "Projetos" },
  { href: "/blog", label: "Artigos" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      <S.NavBar>
        <S.Logo href="/home">
          <S.LogoMark>ej</S.LogoMark>
        </S.Logo>
        
        <S.NavbarContent>
          {navLinks.map((link) => (
            <S.NavbarLink 
              key={link.href} 
              href={link.href}
              $isActive={pathname === link.href}
            >
              {link.label}
            </S.NavbarLink>
          ))}
        </S.NavbarContent>
        
        <S.HamburgerButton onClick={toggleMenu} aria-label="Menu">
          {menuOpen ? (
            <FaTimes size={20} />
          ) : (
            <FaBars size={20} />
          )}
        </S.HamburgerButton>
      </S.NavBar>
      
      <S.MobileMenuOverlay $isOpen={menuOpen} onClick={() => setMenuOpen(false)} />
      
      <S.MobileMenu $isOpen={menuOpen}>
        {navLinks.map((link, index) => (
          <S.MobileNavLink 
            key={link.href} 
            href={link.href}
            $isActive={pathname === link.href}
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            {link.label}
          </S.MobileNavLink>
        ))}
      </S.MobileMenu>
    </>
  );
};

export default Navbar;
