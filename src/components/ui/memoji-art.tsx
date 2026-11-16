"use client";

/**
 * Desenho do Edson no estilo Memoji da Apple (traços suaves, cabelo com topete, barba de bode, moletom gola alta),
 * com headset. Os olhos podem olhar para um lado (px, py) e piscar (blink).
 */
export function MemojiArt({ px = 0, py = 0, blink = false, headset = true, id = "mj" }: { px?: number; py?: number; blink?: boolean; headset?: boolean; id?: string }) {
  const lid = blink ? 14 : 0;
  return (
    <>
      <defs>
        <radialGradient id={`${id}-skin`} cx="46%" cy="36%" r="72%"><stop offset="0" stopColor="#fbe3cc" /><stop offset="1" stopColor="#eab994" /></radialGradient>
        <linearGradient id={`${id}-hair`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c99d72" /><stop offset="1" stopColor="#8a6040" /></linearGradient>
        <linearGradient id={`${id}-beard`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c9a47c" /><stop offset="1" stopColor="#a98259" /></linearGradient>
        <linearGradient id={`${id}-sweater`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b435e" /><stop offset="1" stopColor="#262c42" /></linearGradient>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4a4d56" /><stop offset="1" stopColor="#1f2126" /></linearGradient>
      </defs>
      {/* moletom de gola alta */}
      <path d="M8 204c4-38 38-56 92-56s88 18 92 56Z" fill={`url(#${id}-sweater)`} />
      <path d="M58 146c2 18 82 18 84 0v-18H58Z" fill="#323a55" />
      <path d="M62 138q38 14 76 0M60 148q40 14 80 0" fill="none" stroke="#1f2538" strokeWidth="2.4" strokeLinecap="round" opacity=".6" />
      {/* orelhas */}
      <ellipse cx="49" cy="102" rx="8.5" ry="13" fill="#e8b48c" /><ellipse cx="151" cy="102" rx="8.5" ry="13" fill="#e8b48c" />
      <ellipse cx="50" cy="103" rx="4" ry="7" fill="#d9a07a" opacity=".7" /><ellipse cx="150" cy="103" rx="4" ry="7" fill="#d9a07a" opacity=".7" />
      {/* cabeça */}
      <path d="M50 94c0-36 20-58 50-58s50 22 50 58c0 36-20 62-50 62S50 130 50 94Z" fill={`url(#${id}-skin)`} />
      {/* barba de bode */}
      <path d="M70 128c2-10 14-14 30-14s28 4 30 14c0 24-12 34-30 34s-32-10-30-34Z" fill={`url(#${id}-beard)`} />
      <path d="M76 123c8-7 16-7 24-2 8-5 16-5 24 2-4 7-14 10-24 8-10 2-20-1-24-8Z" fill="#b48d63" />
      <path d="M88 133q12 8 24 0q-1 8-12 8t-12-8Z" fill="#fff" /><path d="M88 133q12 8 24 0" fill="none" stroke="#7a3b2e" strokeWidth="2.4" strokeLinecap="round" />
      {/* nariz */}
      <path d="M94 116q6 6 12 0" fill="none" stroke="#d29a74" strokeWidth="3" strokeLinecap="round" />
      {/* sobrancelhas */}
      <path d="M62 86q14-8 28-2M110 84q14-6 28 2" stroke="#8a6444" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* olhos */}
      <g>
        <ellipse cx="77" cy="100" rx="10.5" ry="7.4" fill="#fff" /><ellipse cx="123" cy="100" rx="10.5" ry="7.4" fill="#fff" />
        <circle cx={77 + px} cy={100 + py} r="5.6" fill="#6f6d2d" /><circle cx={123 + px} cy={100 + py} r="5.6" fill="#6f6d2d" />
        <circle cx={77 + px} cy={100 + py} r="2.7" fill="#14150a" /><circle cx={123 + px} cy={100 + py} r="2.7" fill="#14150a" />
        <circle cx={79 + px} cy={97.6 + py} r="1.5" fill="#fff" /><circle cx={125 + px} cy={97.6 + py} r="1.5" fill="#fff" />
        <rect x="64" y="90" width="28" height={lid} fill="#f1c9a6" /><rect x="110" y="90" width="28" height={lid} fill="#f1c9a6" />
        <path d="M66 96q11-7 22 0M112 96q11-7 22 0" stroke="#7a5638" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      </g>
      {/* cabelo com topete */}
      <path d="M46 94c-8-38 10-66 48-70 30-3 54 14 60 46 1 8 1 16-1 24-3-14-9-24-18-30-18 8-42 10-64 2-6 8-10 16-12 28Z" fill={`url(#${id}-hair)`} />
      <path d="M72 32c14-12 44-12 58 4-18-6-38-6-58-4Z" fill="#dcb68c" opacity=".75" />
      <path d="M52 78c4-14 10-22 20-28" stroke="#a37548" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6" />
      {headset && (
        <>
          <path d="M42 98C34 34 70 12 100 12s66 22 58 86" fill="none" stroke="#2a2c32" strokeWidth="7" strokeLinecap="round" />
          <rect x="30" y="86" width="20" height="44" rx="10" fill={`url(#${id}-cup)`} /><rect x="150" y="86" width="20" height="44" rx="10" fill={`url(#${id}-cup)`} />
          <path d="M38 126c0 22 14 34 34 38" fill="none" stroke="#2a2c32" strokeWidth="4" strokeLinecap="round" /><circle cx="76" cy="164" r="7" fill="#2a2c32" />
        </>
      )}
    </>
  );
}

/** Avatar redondo (fundo verde-água como no Memoji do iPhone) para cabeçalho, adesivo etc. */
export function MemojiAvatar({ size = 40, headset = true, id = "mja" }: { size?: number; headset?: boolean; id?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label="Edson Junior" style={{ display: "block", borderRadius: "50%", flex: "none" }}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fd3c4" /><stop offset="1" stopColor="#2f8478" /></linearGradient>
        <clipPath id={`${id}-clip`}><circle cx="100" cy="100" r="100" /></clipPath>
      </defs>
      <circle cx="100" cy="100" r="100" fill={`url(#${id}-bg)`} />
      <g clipPath={`url(#${id}-clip)`} transform="translate(0 14) scale(1)"><MemojiArt headset={headset} id={id} /></g>
    </svg>
  );
}
