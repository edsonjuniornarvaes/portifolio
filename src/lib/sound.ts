/**
 * Sons do site, gerados na hora com Web Audio (nenhum arquivo de áudio).
 * Começam desligados; quem liga é o botão de som, e a escolha fica guardada no navegador.
 */
type Win = Window & { webkitAudioContext?: typeof AudioContext };

let ctx: AudioContext | null = null;
let on = true;
const listeners = new Set<() => void>();
const last: Record<string, number> = {};

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const C = window.AudioContext || (window as Win).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  return ctx;
}

/** Navegadores só liberam áudio depois do primeiro toque/clique/tecla: destrava na primeira interação. */
let unlocked = false;
function unlockOnFirstGesture() {
  if (unlocked || typeof window === "undefined") return;
  unlocked = true;
  const go = () => {
    audio();
    window.removeEventListener("pointerdown", go);
    window.removeEventListener("keydown", go);
  };
  window.addEventListener("pointerdown", go, { passive: true });
  window.addEventListener("keydown", go);
}

export function loadSoundPreference() {
  try {
    on = localStorage.getItem("sound") !== "0";
  } catch {
    on = true;
  }
  unlockOnFirstGesture();
  listeners.forEach((l) => l());
}

export const soundOn = () => on;

export function subscribeSound(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

export function setSound(v: boolean) {
  on = v;
  try {
    localStorage.setItem("sound", v ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (v) {
    audio();
    play("on");
  }
  listeners.forEach((l) => l());
}

/** Escala pentatônica: qualquer sequência de notas soa bem. */
const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];
const hz = (semi: number, base = 196) => base * Math.pow(2, semi / 12);

function tone(c: AudioContext, o: { f: number; f2?: number; type?: OscillatorType; dur: number; vol: number; attack?: number; when?: number }) {
  const t0 = c.currentTime + (o.when ?? 0);
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = o.type ?? "sine";
  osc.frequency.setValueAtTime(o.f, t0);
  if (o.f2) osc.frequency.exponentialRampToValueAtTime(o.f2, t0 + o.dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(o.vol, t0 + (o.attack ?? 0.006));
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + o.dur + 0.05);
}

/** Corda de violão de verdade: síntese Karplus-Strong (ruído que circula numa linha de atraso e vai se apagando). */
const strings = new Map<number, AudioBuffer>();
function guitar(c: AudioContext, f: number, vol: number) {
  const key = Math.round(f * 10);
  let buf = strings.get(key);
  if (!buf) {
    const sr = c.sampleRate, n = Math.floor(sr * 2.2), len = Math.max(2, Math.round(sr / f));
    buf = c.createBuffer(1, n, sr);
    const out = buf.getChannelData(0), line = new Float32Array(len);
    let prev = 0;
    for (let i = 0; i < len; i++) { const x = Math.random() * 2 - 1; line[i] = (x + prev) * 0.5; prev = x; } // palheta macia
    let idx = 0;
    for (let i = 0; i < n; i++) {
      const a = line[idx], b = line[(idx + 1) % len];
      out[i] = a;
      line[idx] = (a + b) * 0.5 * 0.9975; // média = perde agudos aos poucos, como a corda real
      idx = (idx + 1) % len;
    }
    strings.set(key, buf);
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const body = c.createBiquadFilter(); // caixa do violão
  body.type = "lowpass"; body.frequency.value = 2600; body.Q.value = 0.7;
  const g = c.createGain();
  g.gain.value = Math.min(0.6, vol * 2.4);
  src.connect(body).connect(g).connect(c.destination);
  src.start();
}

function noise(c: AudioContext, dur: number, vol: number, f1: number, f2: number) {
  const n = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 1.2;
  bp.frequency.setValueAtTime(f1, c.currentTime);
  bp.frequency.exponentialRampToValueAtTime(f2, c.currentTime + dur);
  const g = c.createGain();
  g.gain.value = vol;
  src.connect(bp).connect(g).connect(c.destination);
  src.start();
}

export type SoundName = "pluck" | "tick" | "pop" | "peel" | "click" | "on" | "hover" | "select" | "chirp" | "drop";

/** Toca um som. `n` escolhe a nota (corda) e `v` a força (0 a 1). */
export function play(name: SoundName, n = 0, v = 0.6) {
  if (!on) return;
  const now = performance.now();
  const gap = name === "pluck" ? 70 : name === "hover" ? 90 : name === "chirp" ? 350 : 25;
  if (now - (last[name] ?? 0) < gap) return;
  last[name] = now;
  const c = audio();
  if (!c) return;
  const vol = Math.max(0.03, Math.min(0.3, v * 0.28));
  switch (name) {
    case "pluck": {
      const f = hz(SCALE[Math.abs(n) % SCALE.length] + 12 * Math.floor(Math.abs(n) / SCALE.length % 2), 110);
      guitar(c, f, vol);
      break;
    }
    case "tick":
      tone(c, { f: 1500, f2: 900, type: "square", dur: 0.03, vol: 0.05 });
      break;
    case "hover":
      tone(c, { f: 880 + (n % 5) * 60, type: "sine", dur: 0.05, vol: 0.04 });
      break;
    case "pop":
      tone(c, { f: 260, f2: 640, type: "sine", dur: 0.09, vol: 0.2 });
      break;
    case "peel":
      noise(c, 0.18, 0.12, 700, 3200);
      break;
    case "click":
      tone(c, { f: 180, f2: 90, type: "square", dur: 0.06, vol: 0.12 });
      noise(c, 0.04, 0.08, 2400, 1200);
      break;
    case "chirp": {
      // pássaro: dois ou três pios curtos, cada um subindo e caindo de tom
      const base = 2400 + (n % 4) * 220;
      const notes = 2 + (n % 2);
      const k = vol / 0.168; // volume proporcional (padrão = 0,6)
      for (let i = 0; i < notes; i++) {
        tone(c, { f: base, f2: base * 1.35, type: "sine", dur: 0.09, vol: 0.05 * k, attack: 0.008, when: i * 0.12 });
        tone(c, { f: base * 1.35, f2: base * 0.9, type: "sine", dur: 0.07, vol: 0.04 * k, attack: 0.004, when: i * 0.12 + 0.07 });
      }
      break;
    }
    case "drop":
      tone(c, { f: 520, f2: 180, type: "sine", dur: 0.14, vol: 0.12 });
      noise(c, 0.05, 0.05, 1800, 600);
      break;
    case "select":
      tone(c, { f: 740, type: "square", dur: 0.06, vol: 0.07 });
      tone(c, { f: 1110, type: "square", dur: 0.09, vol: 0.07, when: 0.055 });
      break;
    case "on":
      tone(c, { f: hz(0, 262), dur: 0.18, vol: 0.18 });
      tone(c, { f: hz(7, 262), dur: 0.26, vol: 0.18, when: 0.09 });
      break;
  }
}
