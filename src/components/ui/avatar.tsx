"use client";

/** Seu Memoji, em círculo (usado no cabeçalho, no adesivo e no rodapé). */
export function MemojiAvatar({ size = 40 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/edson-memoji.webp" alt="Edson Junior" width={size} height={size} draggable={false} style={{ display: "block", width: size, height: size, borderRadius: "50%", flex: "none", objectFit: "cover" }} />
  );
}
