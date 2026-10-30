import styled from "styled-components";

const Wrap = styled.div<{ $flip?: boolean }>`
  width: 100%;
  line-height: 0;
  transform: ${(p) => (p.$flip ? "scaleY(-1)" : "none")};
  svg { display: block; width: 100%; height: 64px; overflow: visible; }
`;

/** Divisor ondulado com linha em degradê (verde-menta → ciano → lilás). */
export default function Wave({ flip, id = "w" }: { flip?: boolean; id?: string }) {
  return (
    <Wrap $flip={flip} aria-hidden>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g-${id}`} x1="0" x2="1">
            <stop offset="0" stopColor="#c4a1ff" />
            <stop offset="0.35" stopColor="#2eebaa" />
            <stop offset="0.7" stopColor="#06b6d4" />
            <stop offset="1" stopColor="#c4a1ff" />
          </linearGradient>
        </defs>
        <path
          d="M0 40 C 120 8, 240 8, 360 32 S 600 62, 720 36 S 960 6, 1080 30 S 1320 58, 1440 28"
          fill="none"
          stroke={`url(#g-${id})`}
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Wrap>
  );
}
