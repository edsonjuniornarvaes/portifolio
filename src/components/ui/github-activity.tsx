"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

type Day = { date: string; count: number; level: number };

const Wrap = styled.div`
  .head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 14px; }
  .title { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  .total { font-size: 0.82rem; color: var(--muted); }
  .total b { color: var(--ink); font-weight: 600; }
  .grid { display: grid; grid-auto-flow: column; grid-template-rows: repeat(7, 1fr); gap: 3px; overflow: hidden; }
  .cell { aspect-ratio: 1; border-radius: 2px; background: var(--line); min-width: 0; }
  .l1 { background: color-mix(in srgb, var(--accent) 28%, transparent); }
  .l2 { background: color-mix(in srgb, var(--accent) 50%, transparent); }
  .l3 { background: color-mix(in srgb, var(--accent) 75%, transparent); }
  .l4 { background: var(--accent); }
  .empty { font-size: 0.84rem; color: var(--muted); }
`;

/** Atividade do GitHub no último ano (API pública; some se estiver indisponível). */
export default function GithubActivity({ user }: { user: string }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!alive) return;
        const list: Day[] = d.contributions || [];
        setDays(list.slice(-26 * 7));
        setTotal(list.reduce((n, x) => n + x.count, 0));
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [user]);

  return (
    <Wrap>
      <div className="head">
        <span className="title">Atividade no GitHub</span>
        {days && (
          <span className="total">
            <b>{total}</b> contribuições no último ano
          </span>
        )}
      </div>
      {days ? (
        <div className="grid" role="img" aria-label="Mapa de contribuições do GitHub">
          {days.map((d) => (
            <span key={d.date} className={`cell l${d.level}`} title={`${d.count} em ${d.date}`} />
          ))}
        </div>
      ) : (
        <p className="empty">
          {failed ? (
            <a href={`https://github.com/${user}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-ink)", fontWeight: 600 }}>
              Ver meu perfil no GitHub →
            </a>
          ) : (
            "Carregando…"
          )}
        </p>
      )}
    </Wrap>
  );
}
