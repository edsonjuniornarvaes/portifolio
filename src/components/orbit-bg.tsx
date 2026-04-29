"use client";

import styled, { keyframes } from "styled-components";

const moveLines = keyframes`
  0%   { transform: translateY(0); }
  100% { transform: translateY(80px); }
`;

const pulse1 = keyframes`
  0%, 100% { opacity: 0.04; }
  50%      { opacity: 0.08; }
`;

const pulse2 = keyframes`
  0%, 100% { opacity: 0.03; }
  50%      { opacity: 0.06; }
`;

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: -80px 0 0 0;
  background-image:
    linear-gradient(rgba(46, 235, 170, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(46, 235, 170, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: ${moveLines} 12s linear infinite;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 70%);
`;

const GlowOrb = styled.div<{ $top: string; $left: string; $size: string; $color: string; $anim: 1 | 2 }>`
  position: absolute;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  width: ${(p) => p.$size};
  height: ${(p) => p.$size};
  border-radius: 50%;
  background: ${(p) => p.$color};
  filter: blur(120px);
  animation: ${(p) => (p.$anim === 1 ? pulse1 : pulse2)} ${(p) => 6 + p.$anim * 4}s ease-in-out infinite;
`;

export function ShootingStars() {
  return (
    <Wrap aria-hidden>
      <GridOverlay />
      <GlowOrb $top="10%" $left="20%" $size="500px" $color="rgba(46, 235, 170, 0.06)" $anim={1} />
      <GlowOrb $top="55%" $left="65%" $size="400px" $color="rgba(6, 182, 212, 0.05)" $anim={2} />
    </Wrap>
  );
}
