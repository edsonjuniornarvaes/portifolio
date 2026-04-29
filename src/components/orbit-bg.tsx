"use client";

import styled, { keyframes } from "styled-components";

const drift1 = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(80px, -60px) scale(1.1); }
  66%  { transform: translate(-40px, 40px) scale(0.95); }
  100% { transform: translate(0, 0) scale(1); }
`;

const drift2 = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(-70px, 50px) scale(1.05); }
  66%  { transform: translate(50px, -30px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
`;

const drift3 = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(60px, 70px) scale(1.08); }
  100% { transform: translate(0, 0) scale(1); }
`;

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const Blob = styled.div<{ $top: string; $left: string; $size: string; $color: string; $anim: number }>`
  position: absolute;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  width: ${(p) => p.$size};
  height: ${(p) => p.$size};
  border-radius: 50%;
  background: ${(p) => p.$color};
  filter: blur(100px);
  animation: ${(p) => [drift1, drift2, drift3][p.$anim]} ${(p) => 20 + p.$anim * 8}s ease-in-out infinite;
`;

export function ShootingStars() {
  return (
    <Wrap aria-hidden>
      <Blob $top="5%" $left="15%" $size="400px" $color="rgba(46, 235, 170, 0.03)" $anim={0} />
      <Blob $top="50%" $left="70%" $size="350px" $color="rgba(6, 182, 212, 0.025)" $anim={1} />
      <Blob $top="70%" $left="20%" $size="300px" $color="rgba(46, 235, 170, 0.02)" $anim={2} />
    </Wrap>
  );
}
