"use client";

import styled, { keyframes } from "styled-components";

const shoot = keyframes`
  0% {
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateX(var(--dx)) translateY(var(--dy));
    opacity: 0;
  }
`;

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const Star = styled.div<{ $top: string; $left: string; $delay: string; $dur: string; $dx: string; $dy: string; $size: number }>`
  --dx: ${(p) => p.$dx};
  --dy: ${(p) => p.$dy};
  position: absolute;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 50%;
  background: rgba(46, 235, 170, 0.7);
  box-shadow: 0 0 ${(p) => p.$size * 3}px rgba(46, 235, 170, 0.3),
    0 0 ${(p) => p.$size * 6}px rgba(46, 235, 170, 0.1);
  opacity: 0;
  animation: ${shoot} ${(p) => p.$dur} linear ${(p) => p.$delay} infinite;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    width: ${(p) => p.$size * 30}px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(46, 235, 170, 0.15),
      rgba(46, 235, 170, 0.4)
    );
  }
`;

const meteors = [
  { top: "8%", left: "15%", delay: "0s", dur: "3.5s", dx: "600px", dy: "400px", size: 2 },
  { top: "2%", left: "55%", delay: "1.8s", dur: "4s", dx: "500px", dy: "350px", size: 2 },
  { top: "25%", left: "80%", delay: "4s", dur: "3s", dx: "-550px", dy: "380px", size: 1.5 },
  { top: "12%", left: "35%", delay: "6.5s", dur: "3.8s", dx: "650px", dy: "300px", size: 2 },
  { top: "5%", left: "70%", delay: "2.5s", dur: "4.5s", dx: "-400px", dy: "500px", size: 1.5 },
  { top: "30%", left: "10%", delay: "8s", dur: "3.2s", dx: "700px", dy: "250px", size: 2 },
  { top: "15%", left: "90%", delay: "5s", dur: "3.6s", dx: "-600px", dy: "350px", size: 1.5 },
  { top: "40%", left: "45%", delay: "10s", dur: "4.2s", dx: "500px", dy: "300px", size: 1.5 },
  { top: "3%", left: "25%", delay: "12s", dur: "3.4s", dx: "550px", dy: "420px", size: 2 },
  { top: "20%", left: "60%", delay: "7.5s", dur: "3.9s", dx: "-500px", dy: "350px", size: 1.5 },
];

export function ShootingStars() {
  return (
    <Wrap aria-hidden>
      {meteors.map((m, i) => (
        <Star
          key={i}
          $top={m.top}
          $left={m.left}
          $delay={m.delay}
          $dur={m.dur}
          $dx={m.dx}
          $dy={m.dy}
          $size={m.size}
        />
      ))}
    </Wrap>
  );
}

/** @deprecated use ShootingStars */
export const OrbitBackground = ShootingStars;
