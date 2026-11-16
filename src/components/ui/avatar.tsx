"use client";

/** Seu Memoji em círculo; o fundo acompanha a cor de destaque do site (a que a corda troca). */
export function MemojiAvatar({ size = 40 }: { size?: number }) {
  return (
    <span
      style={{
        display: "block", position: "relative", width: size, height: size, borderRadius: "50%", overflow: "hidden", flex: "none",
        background: "linear-gradient(180deg, color-mix(in srgb, var(--accent) 52%, #fff) 0%, color-mix(in srgb, var(--accent) 78%, #000) 100%)",
        transition: "background 0.4s ease",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/edson-memoji-cutout.webp" alt="Edson Junior" width={size} height={size} draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </span>
  );
}
