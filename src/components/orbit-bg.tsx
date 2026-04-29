"use client";

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const System = styled.div`
  position: relative;
  width: 700px;
  height: 700px;

  @media (max-width: 768px) {
    width: 500px;
    height: 500px;
  }
`;

const Orbit = styled.div<{ $size: number; $dur: number; $tiltX: number; $tiltY: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  margin-left: ${(p) => -p.$size / 2}px;
  margin-top: ${(p) => -p.$size / 2}px;
  border: 1px solid rgba(46, 235, 170, 0.06);
  border-radius: 50%;
  transform: rotateX(${(p) => p.$tiltX}deg) rotateY(${(p) => p.$tiltY}deg);
  animation: ${spin} ${(p) => p.$dur}s linear infinite;
`;

const Planet = styled.span<{ $size: number; $color: string; $glow: string }>`
  position: absolute;
  top: -${(p) => p.$size / 2}px;
  left: 50%;
  margin-left: -${(p) => p.$size / 2}px;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  box-shadow: 0 0 ${(p) => p.$size * 2}px ${(p) => p.$glow};
`;

const Core = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: rgba(46, 235, 170, 0.3);
  box-shadow: 0 0 30px rgba(46, 235, 170, 0.15), 0 0 60px rgba(46, 235, 170, 0.08);
`;

const orbits = [
  { size: 200, dur: 20, tiltX: 70, tiltY: 10, planet: 5, color: "rgba(46, 235, 170, 0.6)", glow: "rgba(46, 235, 170, 0.2)" },
  { size: 340, dur: 32, tiltX: 65, tiltY: -15, planet: 4, color: "rgba(6, 182, 212, 0.5)", glow: "rgba(6, 182, 212, 0.15)" },
  { size: 480, dur: 45, tiltX: 72, tiltY: 5, planet: 3, color: "rgba(46, 235, 170, 0.4)", glow: "rgba(46, 235, 170, 0.12)" },
  { size: 600, dur: 60, tiltX: 68, tiltY: -8, planet: 3, color: "rgba(6, 182, 212, 0.3)", glow: "rgba(6, 182, 212, 0.1)" },
];

export function OrbitBackground() {
  return (
    <Wrap aria-hidden>
      <System>
        <Core />
        {orbits.map((o, i) => (
          <Orbit key={i} $size={o.size} $dur={o.dur} $tiltX={o.tiltX} $tiltY={o.tiltY}>
            <Planet $size={o.planet} $color={o.color} $glow={o.glow} />
          </Orbit>
        ))}
      </System>
    </Wrap>
  );
}
