"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "@/components/ui/icons";
import Link from "next/link";
import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import { Lead, Page, PageTitle, Wrap } from "@/components/ui/layout";
import { play } from "@/lib/sound";
import { useLang } from "@/i18n/provider";

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; margin-top: 56px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;

const Card = styled.section`
  position: relative; border: 1px solid color-mix(in srgb, var(--accent) 35%, var(--line)); border-radius: 6px; overflow: hidden; background: color-mix(in srgb, var(--card) 85%, transparent);
  .bar { height: 30px; display: flex; align-items: center; gap: 6px; padding: 0 12px; background: linear-gradient(90deg, var(--accent), var(--accent-2) 55%, var(--lilac)); }
  .bar i { width: 10px; height: 10px; border: 2px solid var(--paper); display: block; }
  .bar b { margin-left: 8px; font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500; color: var(--on-accent); letter-spacing: 0.06em; text-transform: uppercase; }
  .stage { display: grid; place-items: center; min-height: 280px; padding: 28px; }
  .hint { padding: 0 24px 20px; color: var(--muted); font-size: 0.95rem; }
  .panel { border-top: 1px solid var(--line); padding: 14px 20px 18px; display: grid; gap: 10px; font-family: var(--font-mono); font-size: 0.78rem; }
  .panel h2 { color: var(--accent-ink); font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.7rem; }
  .row { display: flex; align-items: center; justify-content: space-between; gap: 16px; color: var(--muted); }
  .row input[type="checkbox"] { accent-color: var(--accent); width: 16px; height: 16px; }
  .row input[type="range"] { accent-color: var(--accent); width: 120px; }
`;

const Switch = styled.button`
  position: relative; width: 150px; height: 76px; border-radius: 99px; border: 0; cursor: pointer; padding: 0; background: #2b3036; transition: background 0.3s ease; box-shadow: inset 0 2px 6px rgba(0,0,0,0.5);
  &[aria-checked="true"] { background: var(--accent); }
  .knob { position: absolute; top: 7px; left: 7px; width: 62px; height: 62px; border-radius: 50%; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.4); }
  .hand { position: absolute; right: -34px; top: 14px; width: 48px; height: 48px; pointer-events: none; }
`;

function Hand() {
  return (
    <svg viewBox="0 0 48 48" className="hand" aria-hidden>
      <path d="M4 26c0-8 8-12 16-12h10c6 0 10 3 10 8s-4 8-10 8H20c-8 0-16-2-16-4Z" fill="#e9c9a8" stroke="#04130d" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 14c0-4 3-6 6-6" stroke="#04130d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="2" y="20" width="10" height="14" rx="4" fill="#2eebaa" stroke="#04130d" strokeWidth="2" />
    </svg>
  );
}

function StubbornToggle() {
  const { t } = useLang();
  const l = t.lab;
  const [on, setOn] = useState(false);
  const [stubborn, setStubborn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const hand = useAnimationControls();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const click = () => {
    if (on) { setOn(false); play("click"); return; }
    setOn(true); play("click");
    if (!stubborn) return;
    const d = 700 / speed;
    timers.current.push(setTimeout(async () => {
      play("pop");
      await hand.start({ x: [40, -34], opacity: [0, 1], transition: { duration: 0.25 / speed } });
      setOn(false); play("click");
      await hand.start({ x: 40, opacity: 0, transition: { duration: 0.3 / speed, delay: 0.15 } });
    }, d));
  };

  return (
    <Card>
      <div className="bar" aria-hidden><i /><i /><i /><b>{l.toggleTitle}</b></div>
      <div className="stage">
        <Switch type="button" role="switch" aria-checked={on} aria-label={l.toggleTitle} onClick={click}>
          <motion.span className="knob" animate={{ x: on ? 74 : 0 }} transition={{ type: "spring", stiffness: 420, damping: 24 }} />
          <motion.span className="hand" style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0, overflow: "visible" }} initial={{ x: 40, opacity: 0 }} animate={hand} aria-hidden>
            <Hand />
          </motion.span>
        </Switch>
      </div>
      <p className="hint">{l.toggleHint} · <b style={{ color: on ? "var(--accent)" : "var(--muted)" }}>{on ? l.on : l.off}</b></p>
      <div className="panel">
        <h2>{"// "}{l.panel}</h2>
        <label className="row"><span>{l.stubborn}</span><input type="checkbox" checked={stubborn} onChange={(e) => setStubborn(e.target.checked)} /></label>
        <label className="row"><span>{l.speed}</span><input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} /></label>
      </div>
    </Card>
  );
}

function CoinFlip() {
  const { t } = useLang();
  const l = t.lab;
  const [turns, setTurns] = useState(0);
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [busy, setBusy] = useState(false);
  const [power, setPower] = useState(3);
  const press = useRef(0);

  const toss = (hold = 0.5) => {
    if (busy) return;
    setBusy(true); setResult(null);
    const heads = Math.random() < 0.5;
    const spins = Math.round(power + hold * 3);
    const next = Math.ceil(turns / 2) * 2 + spins * 2 + (heads ? 0 : 1);
    setTurns(next); play("peel");
    setTimeout(() => { setResult(heads ? "heads" : "tails"); setBusy(false); play(heads ? "on" : "tick"); }, 1300);
  };

  return (
    <Card>
      <div className="bar" aria-hidden><i /><i /><i /><b>{l.coinTitle}</b></div>
      <div className="stage" style={{ perspective: 700 }}>
        <motion.button
          type="button"
          aria-label={l.flip}
          onPointerDown={() => { press.current = performance.now(); }}
          onPointerUp={() => toss(Math.min(1, (performance.now() - press.current) / 1000))}
          animate={{ rotateY: turns * 180, y: busy ? [0, -90, 0] : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", y: { duration: 1.2, times: [0, 0.45, 1] } }}
          style={{ position: "relative", width: 120, height: 120, border: 0, background: "none", padding: 0, cursor: "pointer", transformStyle: "preserve-3d" }}
        >
          <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #fff7c2, #e6b800 60%, #8a6a00)", border: "4px solid #b88a00", backfaceVisibility: "hidden", fontSize: "3rem" }}>☕</span>
          <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #f4fff9, #2eebaa 60%, #0b6b4f)", border: "4px solid #1fcf94", backfaceVisibility: "hidden", transform: "rotateY(180deg)", fontSize: "3rem" }}>🍵</span>
        </motion.button>
      </div>
      <p className="hint">{result ? (result === "heads" ? l.heads : l.tails) : l.coinHint}</p>
      <div className="panel">
        <h2>{"// "}{l.panel}</h2>
        <label className="row"><span>{l.speed}</span><input type="range" min="2" max="6" step="1" value={power} onChange={(e) => setPower(Number(e.target.value))} /></label>
        <button type="button" onClick={() => toss(0.4)} className="btn p" style={{ justifySelf: "start", marginTop: 4, padding: "8px 16px", border: "1px solid var(--accent)", borderRadius: 6, background: "transparent", color: "var(--accent-ink)", cursor: "pointer", fontFamily: "inherit" }}>{l.flip}</button>
      </div>
    </Card>
  );
}

export default function LabView() {
  const { t } = useLang();
  return (
    <Wrap>
      <Page>
        <Link href="/home" style={{ color: "var(--muted)" }}><ArrowLeft style={{ marginRight: 6 }} />{t.lab.back}</Link>
        <PageTitle style={{ marginTop: 24 }}>{t.lab.title}</PageTitle>
        <Lead>{t.lab.lead}</Lead>
        <Grid>
          <StubbornToggle />
          <CoinFlip />
        </Grid>
      </Page>
    </Wrap>
  );
}
