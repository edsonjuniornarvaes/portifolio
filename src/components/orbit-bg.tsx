"use client";

import styled, { keyframes } from "styled-components";

const orbit1 = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const orbit2 = keyframes`
  0%   { transform: rotate(120deg); }
  100% { transform: rotate(480deg); }
`;

const orbit3 = keyframes`
  0%   { transform: rotate(240deg); }
  100% { transform: rotate(600deg); }
`;

const drift = keyframes`
  0%, 100% { opacity: 0.15; transform: translateY(0) scale(1); }
  50%      { opacity: 0.3;  transform: translateY(-40px) scale(1.1); }
`;

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const Ring = styled.div<{ $size: number; $dur: number; $tilt: number; $anim: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  margin-left: ${(p) => -p.$size / 2}px;
  margin-top: ${(p) => -p.$size / 2}px;
  border: 1px solid rgba(46, 235, 170, 0.08);
  border-radius: 50%;
  transform-style: preserve-3d;
  transform: rotateX(${(p) => p.$tilt}deg);
`;

const Electron = styled.span<{ $dur: number; $delay: number; $anim: ReturnType<typeof keyframes> }>`
  position: absolute;
  top: -4px;
  left: 50%;
  margin-left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, #2eebaa 0%, transparent 70%);
  box-shadow: 0 0 12px rgba(46, 235, 170, 0.5);
  animation: ${(p) => p.$anim} ${(p) => p.$dur}s linear infinite;
  animation-delay: ${(p) => p.$delay}s;
  transform-origin: 4px calc(50% + 4px);
`;

const Comet = styled.div<{ $top: string; $left: string; $delay: number }>`
  position: absolute;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: rgba(46, 235, 170, 0.4);
  box-shadow: 0 0 6px rgba(46, 235, 170, 0.3), -20px 0 16px rgba(46, 235, 170, 0.1), -40px 0 24px rgba(6, 182, 212, 0.05);
  animation: ${drift} ${8 + Math.random() * 6}s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay}s;
`;

const comets = [
  { top: "15%", left: "80%", delay: 0 },
  { top: "30%", left: "10%", delay: 2.5 },
  { top: "65%", left: "70%", delay: 5 },
  { top: "80%", left: "25%", delay: 1.8 },
  { top: "45%", left: "90%", delay: 4 },
  { top: "10%", left: "45%", delay: 3.2 },
];

export function OrbitBackground() {
  return (
    <Wrap aria-hidden>
      <Ring $size={360} $dur={25} $tilt={65} $anim="">
        <Electron $dur={25} $delay={0} $anim={orbit1} />
      </Ring>
      <Ring $size={500} $dur={35} $tilt={72} $anim="">
        <Electron $dur={35} $delay={0} $anim={orbit2} />
      </Ring>
      <Ring $size={640} $dur={45} $tilt={60} $anim="">
        <Electron $dur={45} $delay={0} $anim={orbit3} />
      </Ring>
      {comets.map((c, i) => (
        <Comet key={i} $top={c.top} $left={c.left} $delay={c.delay} />
      ))}
    </Wrap>
  );
}
