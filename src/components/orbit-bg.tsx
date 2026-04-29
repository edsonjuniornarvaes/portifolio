"use client";

import styled, { keyframes } from "styled-components";

const drift1 = keyframes`
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(120px, -80px); }
  50% { transform: translate(-60px, 100px); }
  75% { transform: translate(80px, 40px); }
`;

const drift2 = keyframes`
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-100px, 60px); }
  50% { transform: translate(80px, -120px); }
  75% { transform: translate(-40px, -50px); }
`;

const drift3 = keyframes`
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(60px, 90px); }
  50% { transform: translate(-110px, -40px); }
  75% { transform: translate(30px, -100px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.12; }
  50% { opacity: 0.25; }
`;

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const Particle = styled.div<{
  $top: string;
  $left: string;
  $size: number;
  $anim: number;
  $dur: number;
  $delay: number;
  $color: string;
}>`
  position: absolute;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  filter: blur(${(p) => Math.max(p.$size * 0.4, 1)}px);
  opacity: 0.15;
  animation:
    ${(p) => [drift1, drift2, drift3][p.$anim]} ${(p) => p.$dur}s ease-in-out infinite,
    ${pulse} ${(p) => p.$dur * 0.6}s ease-in-out ${(p) => p.$delay}s infinite;
`;

const particles = [
  { top: "15%", left: "10%", size: 4, anim: 0, dur: 25, delay: 0, color: "rgba(46, 235, 170, 0.6)" },
  { top: "60%", left: "80%", size: 3, anim: 1, dur: 30, delay: 3, color: "rgba(6, 182, 212, 0.5)" },
  { top: "35%", left: "55%", size: 5, anim: 2, dur: 28, delay: 6, color: "rgba(46, 235, 170, 0.4)" },
  { top: "80%", left: "25%", size: 3, anim: 1, dur: 32, delay: 2, color: "rgba(6, 182, 212, 0.4)" },
  { top: "10%", left: "70%", size: 4, anim: 0, dur: 26, delay: 5, color: "rgba(46, 235, 170, 0.35)" },
];

export function ShootingStars() {
  return (
    <Wrap aria-hidden>
      {particles.map((p, i) => (
        <Particle
          key={i}
          $top={p.top}
          $left={p.left}
          $size={p.size}
          $anim={p.anim}
          $dur={p.dur}
          $delay={p.delay}
          $color={p.color}
        />
      ))}
    </Wrap>
  );
}
