"use client";

import styled from "styled-components";

const Box = styled.div`
  width: 100%; line-height: 0; overflow: hidden;
  svg { display: block; width: 100%; height: 64px; }
`;

/** Divisor ondulado retrô: linha em degradê menta, ciano e lilás. */
export default function Wave({ id = "w" }: { id?: string }) {
  return (
    <Box aria-hidden>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`wv-${id}`} x1="0" x2="1">
            <stop offset="0" stopColor="#c4a1ff" /><stop offset="0.35" stopColor="#2eebaa" /><stop offset="0.7" stopColor="#06b6d4" /><stop offset="1" stopColor="#c4a1ff" />
          </linearGradient>
        </defs>
        <path d="M0 40 C 120 8, 240 8, 360 32 S 600 62, 720 36 S 960 6, 1080 30 S 1320 58, 1440 28" fill="none" stroke={`url(#wv-${id})`} strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
    </Box>
  );
}
