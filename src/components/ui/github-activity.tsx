"use client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

type Day = { date: string; count: number };
type Account = { user: string; total: number; ok: boolean };

const API = "https://github-contributions-api.jogruber.de/v4";

const Wrap = styled.div`
  .bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--line); }
  .dots { display: flex; gap: 6px; }
  .dots i { width: 10px; height: 10px; border-radius: 50%; background: var(--line); }
  .dots i:first-child { background: #ff5f57; opacity: 0.8; }
  .dots i:nth-child(2) { background: #febc2e; opacity: 0.8; }
  .dots i:nth-child(3) { background: #28c840; opacity: 0.8; }
  .path { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); }
  .body { padding: 20px 20px 18px; }
  .sum { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px; margin-bottom: 16px; }
  .sum strong { font-size: 2.2rem; font-weight: 700; letter-spacing: -0.04em; line-height: 1; background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .sum span { font-size: 0.86rem; color: var(--muted); }
  .grid { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); grid-template-rows: repeat(7, auto); gap: 3px; }
  .cell { aspect-ratio: 1; border-radius: 2px; background: color-mix(in srgb, var(--ink) 7%, transparent); min-width: 0; opacity: 0; animation: pop 0.5s ease forwards; }
  .l1 { background: color-mix(in srgb, var(--accent) 30%, transparent); }
  .l2 { background: color-mix(in srgb, var(--accent) 52%, transparent); }
  .l3 { background: color-mix(in srgb, var(--accent) 78%, transparent); }
  .l4 { background: var(--accent); }
  @keyframes pop { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: none; } }
  .foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 16px; margin-top: 16px; }
  .accounts { display: flex; flex-wrap: wrap; gap: 8px; }
  .accounts a { font-family: var(--font-mono); font-size: 0.72rem; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); transition: color 0.2s ease, border-color 0.2s ease; }
  .accounts a:hover { color: var(--accent-ink); border-color: var(--accent-ink); }
  .accounts b { color: var(--ink); font-weight: 500; margin-left: 6px; }
  .legend { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: var(--muted); }
  .legend .cell { width: 10px; opacity: 1; animation: none; }
  .empty { font-size: 0.9rem; color: var(--muted); line-height: 1.7; }
  .empty a { color: var(--accent-ink); font-weight: 600; }
  @media (prefers-reduced-motion: reduce) { .cell { animation: none; opacity: 1; } }
`;

function levelOf(count: number, max: number) {
  if (count <= 0) return 0;
  const r = count / max;
  return r > 0.75 ? 4 : r > 0.5 ? 3 : r > 0.25 ? 2 : 1;
}

/** Soma as contribuições de várias contas do GitHub, dia a dia, como se fossem uma só. */
export default function GithubActivity({ users, weeks = 53 }: { users: string[]; weeks?: number }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all(
      users.map((u) =>
        fetch(`${API}/${u}?y=last`)
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then((d) => ({ user: u, days: (d.contributions || []) as Day[] }))
          .catch(() => ({ user: u, days: null as Day[] | null })),
      ),
    ).then((results) => {
      if (!alive) return;
      const okOnes = results.filter((r) => r.days);
      if (!okOnes.length) return setFailed(true);
      const map = new Map<string, number>();
      okOnes.forEach((r) => r.days!.forEach((d) => map.set(d.date, (map.get(d.date) || 0) + d.count)));
      const merged = Array.from(map.entries()).sort(([a], [b]) => (a < b ? -1 : 1)).map(([date, count]) => ({ date, count }));
      setDays(merged);
      setAccounts(
        results.map((r) => ({
          user: r.user,
          ok: !!r.days,
          total: (r.days || []).reduce((n, d) => n + d.count, 0),
        })),
      );
    });
    return () => {
      alive = false;
    };
  }, [users]);

  const view = useMemo(() => (days ? days.slice(-weeks * 7) : []), [days, weeks]);
  const total = useMemo(() => (days || []).reduce((n, d) => n + d.count, 0), [days]);
  const max = useMemo(() => Math.max(1, ...view.map((d) => d.count)), [view]);

  return (
    <Wrap>
      <div className="bar">
        <span className="dots" aria-hidden>
          <i /><i /><i />
        </span>
        <span className="path">github · atividade</span>
      </div>
      <div className="body">
        {days ? (
          <>
            <div className="sum">
              <strong>{total.toLocaleString("pt-BR")}</strong>
              <span>contribuições no último ano</span>
            </div>
            <div className="grid" role="img" aria-label="Mapa de contribuições do GitHub das duas contas somadas">
              {view.map((d, i) => (
                <span
                  key={d.date}
                  className={`cell l${levelOf(d.count, max)}`}
                  style={{ animationDelay: `${Math.min(i * 3, 900)}ms` }}
                  title={`${d.count} em ${d.date}`}
                />
              ))}
            </div>
            <div className="foot">
              <div className="accounts">
                {accounts.map((a) => (
                  <a key={a.user} href={`https://github.com/${a.user}`} target="_blank" rel="noopener noreferrer">
                    @{a.user}
                  </a>
                ))}
              </div>
              <div className="legend" aria-hidden>
                menos <span className="cell" /> <span className="cell l1" /> <span className="cell l2" />
                <span className="cell l3" /> <span className="cell l4" /> mais
              </div>
            </div>
          </>
        ) : (
          <p className="empty">
            {failed ? (
              <>
                Veja a atividade no GitHub:{" "}
                {users.map((u, i) => (
                  <span key={u}>
                    {i > 0 && " · "}
                    <a href={`https://github.com/${u}`} target="_blank" rel="noopener noreferrer">
                      @{u}
                    </a>
                  </span>
                ))}
              </>
            ) : (
              "Carregando atividade…"
            )}
          </p>
        )}
      </div>
    </Wrap>
  );
}
