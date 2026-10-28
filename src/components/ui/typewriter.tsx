"use client";

import { useEffect, useState } from "react";

type TypewriterProps = { words: string[] };

/** Alterna frases digitando e apagando, com cursor piscando. */
export default function Typewriter({ words }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const delay = done ? 1600 : empty ? 300 : deleting ? 35 : 70;

    const id = setTimeout(() => {
      if (done) return setDeleting(true);
      if (empty) {
        setDeleting(false);
        return setIndex((i) => i + 1);
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words]);

  return (
    <span aria-label={words[index % words.length]}>
      {text}
      <span style={{ color: "var(--accent-secondary)", animation: "pulse 1s steps(2) infinite" }}>▍</span>
    </span>
  );
}
