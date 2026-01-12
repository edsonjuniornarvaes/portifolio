import styled, { keyframes } from "styled-components";
import Link from "next/link";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const NavBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 24px;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  animation: ${fadeIn} 0.5s ease forwards;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2eebaa 0%, #06b6d4 100%);
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 1rem;
  font-weight: 700;
  color: #0a0a0f;
`;

export const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #2eebaa;
  box-shadow: 0 0 12px rgba(46, 235, 170, 0.3);
`;

export const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavbarLink = styled(Link)<{ $isActive?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.$isActive ? '#2eebaa' : '#a1a1aa'};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(${props => props.$isActive ? 1 : 0});
    width: 20px;
    height: 2px;
    background: linear-gradient(135deg, #2eebaa 0%, #06b6d4 100%);
    border-radius: 2px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
    
    &::after {
      transform: translateX(-50%) scaleX(1);
    }
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  color: #a1a1aa;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: rgba(10, 10, 15, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transform: translateY(${props => props.$isOpen ? '0' : '-100%'});
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileNavLink = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px;
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.$isActive ? '#2eebaa' : '#a1a1aa'};
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: ${slideDown} 0.3s ease forwards;
  animation-delay: var(--delay, 0s);
  opacity: 0;
  
  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  
  @media (min-width: 769px) {
    display: none;
  }
`;
