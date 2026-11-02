import React, { useEffect, useRef, useState } from 'react';

/**
 * Interactive hanging lamp, rendered as an overlay inside the Hero section:
 *  - wall switch toggles the bulb (with a little start-up flicker)
 *  - drag the shade to swing it (pendulum physics)
 *  - pull back the slingshot pebble and let go to hit the shade, the bulb or the switch
 *  - a direct bulb hit shatters it; "replace bulb" screws in a new one
 *  - all sounds are synthesized with the Web Audio API (no audio files)
 */

// ---------- tuning ----------
const STEP = 1 / 120;
const G_LAMP = 2000;
const G_PEBBLE = 1400;
const G_PART = 1300;
const SHADE_TOP = 13; // half-width of shade at the top
const SHADE_BOT = 64; // half-width of shade at the rim
const SHADE_H = 62;
const BULB_Y = 76;
const BULB_R = 15;
const PEBBLE_R = 7;
const MAX_PULL = 130;
const LAUNCH = 12;
const CONE_SPREAD = 0.92; // edges graze the shade rim
const DARK = 0.975; // how dark the room is with the lights off (it lifts a little when they're on)
const LIGHT_SCALE = 0.125; // the light mask is drawn at 1/8 size; smooth upscaling softens the beam edges
const IDLE_SWING = 0.07; // radians - the lamps never stop gently swinging
const LG = 1024; // tailwind lg breakpoint, where the hero becomes two columns

type Vec = { x: number; y: number };
interface Pebble { x: number; y: number; vx: number; vy: number; life: number; shadeCd: number; resting: boolean }
interface Particle {
  x: number; y: number; vx: number; vy: number; life: number; max: number;
  size: number; rot: number; vr: number; kind: 'shard' | 'spark';
}

// ---------- sound ----------
class LampAudio {
  ac: AudioContext | null = null;
  noiseBuf: AudioBuffer | null = null;
  enabled = true;

  ctx(): AudioContext | null {
    if (!this.enabled) return null;
    try {
      if (!this.ac) {
        const C = window.AudioContext || (window as any).webkitAudioContext;
        if (!C) return null;
        this.ac = new C();
      }
      if (this.ac.state === 'suspended') this.ac.resume();
      return this.ac;
    } catch {
      return null;
    }
  }

  tone(freq: number, dur: number, o: { type?: OscillatorType; gain?: number; to?: number; delay?: number } = {}) {
    const ac = this.ctx();
    if (!ac) return;
    const t = ac.currentTime + (o.delay ?? 0);
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = o.type ?? 'sine';
    osc.frequency.setValueAtTime(freq, t);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, o.gain ?? 0.1), t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(ac.destination);
    osc.start(t);
    osc.stop(t + dur + 0.03);
  }

  noise(dur: number, o: { gain?: number; freq?: number; q?: number; type?: BiquadFilterType; delay?: number } = {}) {
    const ac = this.ctx();
    if (!ac) return;
    if (!this.noiseBuf) {
      const len = ac.sampleRate;
      this.noiseBuf = ac.createBuffer(1, len, ac.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    const t = ac.currentTime + (o.delay ?? 0);
    const src = ac.createBufferSource();
    src.buffer = this.noiseBuf;
    const f = ac.createBiquadFilter();
    f.type = o.type ?? 'bandpass';
    f.frequency.value = o.freq ?? 3000;
    f.Q.value = o.q ?? 1;
    const g = ac.createGain();
    g.gain.setValueAtTime(Math.max(0.0002, o.gain ?? 0.2), t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(ac.destination);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.03);
  }

  click() {
    this.noise(0.03, { gain: 0.35, freq: 2600, type: 'highpass' });
    this.tone(1500, 0.025, { type: 'square', gain: 0.03 });
    this.tone(170, 0.06, { gain: 0.14 });
  }

  clang(strength: number) {
    const v = Math.min(1, Math.max(0.15, strength));
    const partials: Array<[number, number]> = [[430, 1], [1090, 0.55], [1870, 0.32], [2760, 0.16]];
    partials.forEach(([f, a]) =>
      this.tone(f * (0.97 + Math.random() * 0.06), 0.45 + 0.5 * a, { gain: 0.11 * v * a, type: 'sine' }),
    );
    this.noise(0.04, { gain: 0.22 * v, freq: 3600 });
  }

  glass() {
    this.noise(0.08, { gain: 0.5, freq: 900, type: 'lowpass' });
    this.noise(0.55, { gain: 0.35, freq: 5200, q: 0.6 });
    for (let i = 0; i < 12; i++) {
      this.tone(2400 + Math.random() * 5200, 0.06 + Math.random() * 0.14, {
        type: 'triangle', gain: 0.045, delay: Math.random() * 0.4,
      });
    }
  }

  twang(p: number) {
    this.tone(240, 0.24, { type: 'triangle', to: 75, gain: 0.16 * p + 0.03 });
    this.noise(0.07, { gain: 0.14 * p + 0.03, freq: 700 });
  }

  creak(p: number) {
    this.tone(60 + p * 110, 0.06, { type: 'sawtooth', gain: 0.022, to: 55 + p * 95 });
  }

  filament() {
    this.tone(3100, 0.14, { gain: 0.018 });
    this.noise(0.18, { gain: 0.025, freq: 6500 });
  }

  bump(strength: number) {
    this.noise(0.05, { gain: 0.15 * Math.min(1, strength), freq: 500, type: 'lowpass' });
  }

  screw() {
    for (let i = 0; i < 4; i++) {
      this.noise(0.035, { gain: 0.16, freq: 1800 + i * 350, delay: i * 0.09 });
      this.tone(900 + i * 80, 0.03, { type: 'square', gain: 0.012, delay: i * 0.09 });
    }
  }

  close() {
    try { this.ac?.close(); } catch { /* ignore */ }
    this.ac = null;
  }
}

// ---------- helpers ----------
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * Drop inside a `relative` section. The lamp hangs beside the element marked
 * `data-lamp-col` (the hero's right column) and the wall switch + HUD sit in
 * the gutter. The canvas never blocks clicks: it only grabs the pointer when a
 * press lands on the slingshot pouch or the lamp shade.
 */
export default function HeroLamp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const switchRef = useRef<HTMLButtonElement>(null);
  const apiRef = useRef<{
    toggle: () => void;
    replace: () => void;
    setSound: (on: boolean) => void;
    setWordsLamp: (on: boolean) => void;
  } | null>(null);
  // Setting: second bulb over the headline (desktop only). Off by default, remembered per browser.
  const [wordsLampOn] = useState(() => {
    try {
      return localStorage.getItem('heroWordsLamp') === 'on';
    } catch {
      return false;
    }
  });
  const wordsLampRef = useRef(wordsLampOn);
  const [ui, setUi] = useState({ on: false, broken: false, shots: 0, bulbs: 0, sound: true, wordsLamp: wordsLampOn });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    const panel = panelRef.current;
    const switchEl = switchRef.current;
    if (!section || !canvas || !panel || !switchEl) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const audio = new LampAudio();
    // offscreen, low-resolution light mask
    const glow = document.createElement('canvas');
    const gctx = glow.getContext('2d');
    if (!gctx) return;
    let W = 0, H = 0, DPR = 1;

    interface Rect { x: number; y: number; w: number; h: number }
    interface LampState {
      ax: number; ay: number; len: number; theta: number; omega: number;
      broken: boolean; I: number; flicker: number;
      spread: number; R: number;
    }
    const makeLamp = (theta: number): LampState => ({
      ax: 0, ay: 0, len: 100, theta, omega: 0, broken: false, I: 0, flicker: 0,
      spread: CONE_SPREAD, R: 800,
    });
    const photoLamp = makeLamp(-IDLE_SWING);
    const wordsLamp = makeLamp(IDLE_SWING); // desktop only
    let lamps: LampState[] = [photoLamp];

    const light = { on: false, flash: 0 }; // switched on by the intro shortly after load
    const sling = {
      rest: { x: 0, y: 0 } as Vec, pouch: { x: 0, y: 0 } as Vec, pv: { x: 0, y: 0 } as Vec,
      loaded: true, reload: 0, lastCreak: 0,
    };
    const stats = { shots: 0, bulbs: 0 };
    const mouse: Vec = { x: -999, y: -999 };
    let grab: null | 'sling' | LampState = null;
    let pebbles: Pebble[] = [];
    let parts: Particle[] = [];
    let switchRect = { x: 0, y: 0, w: 0, h: 0 };
    let switchCd = 0;
    // demo: until the visitor grabs the slingshot, it pulls itself back on a loop,
    // aimed so the dotted path runs through the photo lamp's bulb
    const demo = { active: true, t: 0, dir: { x: 0, y: 1 } as Vec };
    const DEMO_PULL = 115;
    const DEMO_START = 2.0; // seconds - after the lights come on
    const DEMO_CYCLE = 2.6;
    // the dark 'room'; on mobile it starts below the headline so that stays readable
    let stageBottom = 0; // darkness covers the hero from the top down to here

    const sync = () =>
      setUi((u) => ({
        ...u, on: light.on, broken: lamps.some((l) => l.broken), shots: stats.shots, bulbs: stats.bulbs,
      }));

    // ----- lamp geometry -----
    const leff = (L: LampState) => L.len + 40;
    const origin = (L: LampState): Vec => ({ x: L.ax + Math.sin(L.theta) * L.len, y: L.ay + Math.cos(L.theta) * L.len });
    const toWorld = (L: LampState, lx: number, ly: number): Vec => {
      const o = origin(L), c = Math.cos(L.theta), s = Math.sin(L.theta);
      return { x: o.x + lx * c + ly * s, y: o.y - lx * s + ly * c };
    };
    const toLocal = (L: LampState, x: number, y: number): Vec => {
      const o = origin(L), c = Math.cos(L.theta), s = Math.sin(L.theta);
      const dx = x - o.x, dy = y - o.y;
      return { x: dx * c - dy * s, y: dx * s + dy * c };
    };
    const dirToWorld = (L: LampState, lx: number, ly: number): Vec => {
      const c = Math.cos(L.theta), s = Math.sin(L.theta);
      return { x: lx * c + ly * s, y: -lx * s + ly * c };
    };
    const insideShade = (L: LampState, p: Vec, margin: number) => {
      const l = toLocal(L, p.x, p.y);
      if (l.y < -margin || l.y > BULB_Y + BULB_R + margin) return false;
      if (l.y > SHADE_H) return Math.abs(l.x) < BULB_R + margin; // bulb area
      const hw = SHADE_TOP + (SHADE_BOT - SHADE_TOP) * clamp(l.y / SHADE_H, 0, 1) + margin;
      return Math.abs(l.x) < hw;
    };
    const kickLamp = (L: LampState, at: Vec, fx: number, fy: number, scale: number) => {
      const rx = at.x - L.ax, ry = at.y - L.ay;
      const l = leff(L);
      L.omega += (scale * (ry * fx - rx * fy)) / (l * l);
    };
    // aim a natural cone at a target: the light leaves the rim and widens just enough to reach
    // both sides of the target a little below its top, then fades out past its bottom
    // the beam's width comes from the shade itself (light leaves through the rim);
    // R is how far the light reaches before it fades out
    const aimCone = (L: LampState, _left: number, _right: number, _top: number, bottom: number) => {
      L.R = Math.max(700, (bottom - (L.ay + L.len)) * 1.6);
    };

    // ----- layout -----
    const resize = () => {
      const r = section.getBoundingClientRect();
      W = r.width;
      H = r.height;
      // phones: 1.5x is visually identical for soft light and ~45% fewer pixels to fill each frame
      DPR = Math.min(window.devicePixelRatio || 1, W >= LG ? 2 : 1.5);
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      glow.width = Math.max(1, Math.ceil(W * LIGHT_SCALE));
      glow.height = Math.max(1, Math.ceil(H * LIGHT_SCALE));

      const colEl = section.querySelector<HTMLElement>('[data-lamp-col]');
      const col = colEl ? colEl.getBoundingClientRect() : null;
      const colLeft = col ? col.left - r.left : W * 0.6;
      const colTop = col ? col.top - r.top : H * 0.5;
      const photo: Rect | null = col ? { x: colLeft, y: colTop, w: col.width, h: col.height } : null;

      if (W >= LG) {
        // desktop: two lamps - one over Bala's photo, one over the headline.
        // Everything else in the hero stays dark.
        stageBottom = Infinity;
        photoLamp.ax = col ? colLeft + col.width / 2 : W * 0.75;
        photoLamp.ay = 0;
        photoLamp.len = clamp(colTop - 170, 66, 200); // hang high: more distance = a cleaner cone

        const h1 = section.querySelector('h1');
        let tr = { left: W * 0.08, top: H * 0.3, width: 480 };
        if (h1) {
          const range = document.createRange();
          range.selectNodeContents(h1);
          const b = range.getBoundingClientRect();
          tr = { left: b.left - r.left, top: b.top - r.top, width: b.width };
        }
        const textColEl = section.querySelector<HTMLElement>('[data-lamp-words]') ?? h1?.parentElement;
        const tc = textColEl ? textColEl.getBoundingClientRect() : null;
        wordsLamp.ax = tr.left + tr.width / 2;
        wordsLamp.ay = 0;
        wordsLamp.len = clamp(tr.top - 190, 66, 200); // hang high: more distance = a cleaner cone
        const textBottom = tc ? tc.bottom - r.top : tr.top + 420;
        lamps = wordsLampRef.current ? [wordsLamp, photoLamp] : [photoLamp];
        // reach both ends of the headline's first line; fade out below the stats
        aimCone(wordsLamp, tr.left, tr.left + tr.width, tr.top, Math.max(textBottom + 24, tr.top + 300));

        // slingshot stands in the gap between the words and the photo:
        // a clear shot at both lamps
        sling.rest = {
          x: (tr.left + tr.width + colLeft) / 2,
          y: clamp(H * 0.58, colTop + 120, H - 150),
        };
        // switch + HUD in the right gutter
        panel.style.left = `${W - 76}px`;
        panel.style.width = '';
        panel.style.top = `${Math.round(H * 0.3)}px`;
      } else {
        // mobile/tablet: the photo comes first. One lamp hangs centred over it,
        // switch on the right of the gap, slingshot right under the photo, headline after
        const colBottom = col ? col.bottom - r.top : H - 200;
        const gapTop = colTop - 176;
        photoLamp.ax = col ? colLeft + col.width / 2 : W / 2;
        photoLamp.ay = gapTop + 6;
        photoLamp.len = 46;
        lamps = [photoLamp];
        sling.rest = { x: photoLamp.ax, y: colBottom + 64 };
        stageBottom = sling.rest.y + 160;
        panel.style.left = '16px';
        panel.style.width = `${W - 32}px`;
        panel.style.top = `${Math.round(gapTop + 22)}px`;
      }
      if (photo) aimCone(photoLamp, photo.x, photo.x + photo.w, photo.y, photo.y + photo.h);
      // find the pull direction whose shot passes through the photo bulb (lamp at rest)
      {
        const target = { x: photoLamp.ax, y: photoLamp.ay + photoLamp.len + BULB_Y };
        let best = Infinity;
        for (let a = -1.5; a <= 1.5; a += 0.01) {
          const d = { x: -Math.sin(a), y: Math.cos(a) }; // pull direction (mostly downwards)
          let x = sling.rest.x + d.x * DEMO_PULL, y = sling.rest.y + d.y * DEMO_PULL;
          let vx = -d.x * DEMO_PULL * LAUNCH, vy = -d.y * DEMO_PULL * LAUNCH;
          let miss = Infinity;
          for (let i = 0; i < 300; i++) {
            vy += G_PEBBLE / 240; x += vx / 240; y += vy / 240;
            miss = Math.min(miss, Math.hypot(x - target.x, y - target.y));
            if (vy > 0 && y > target.y + 40) break;
          }
          if (miss < best) { best = miss; demo.dir = d; }
        }
      }
      if (grab !== 'sling') {
        sling.pouch = { ...sling.rest };
        sling.pv = { x: 0, y: 0 };
      }
      const s = switchEl.getBoundingClientRect();
      switchRect = { x: s.left - r.left, y: s.top - r.top, w: s.width, h: s.height };
    };

    // ----- actions -----
    // intro = the automatic switch-on when the page opens: a longer, stuttering flicker,
    // and silent (browsers block audio until the visitor interacts with the page)
    const toggle = (intro = false) => {
      light.on = !light.on;
      if (!intro) audio.click();
      if (light.on && lamps.some((l) => !l.broken)) {
        for (const l of lamps) if (!l.broken) l.flicker = intro ? rand(0.6, 0.9) : rand(0.2, 0.4);
        if (!intro) audio.filament();
      }
      sync();
    };

    const breakBulb = (L: LampState, vx: number, vy: number) => {
      if (L.broken) return;
      const wasLit = L.I > 0.2;
      L.broken = true;
      L.I = 0;
      light.flash = Math.max(light.flash, wasLit ? 1 : 0.25);
      stats.bulbs++;
      audio.glass();
      const b = toWorld(L, 0, BULB_Y);
      for (let i = 0; i < 18; i++) {
        parts.push({
          x: b.x + rand(-8, 8), y: b.y + rand(-8, 8),
          vx: rand(-260, 260) + vx * 0.25, vy: rand(-320, 120) + vy * 0.25,
          life: rand(1.2, 2.2), max: 2.2, size: rand(2.5, 6), rot: rand(0, 6.28), vr: rand(-14, 14), kind: 'shard',
        });
      }
      if (wasLit) {
        for (let i = 0; i < 26; i++) {
          const a = rand(0, Math.PI * 2), sp = rand(150, 520);
          parts.push({
            x: b.x, y: b.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
            life: rand(0.25, 0.7), max: 0.7, size: rand(1, 2.2), rot: 0, vr: 0, kind: 'spark',
          });
        }
      }
      sync();
    };

    const replace = () => {
      const broken = lamps.filter((l) => l.broken);
      if (!broken.length) return;
      audio.screw();
      for (const l of broken) {
        l.broken = false;
        if (light.on) l.flicker = 0.45;
      }
      if (light.on) setTimeout(() => audio.filament(), 380);
      sync();
    };

    const shoot = () => {
      const dx = sling.rest.x - sling.pouch.x;
      const dy = sling.rest.y - sling.pouch.y;
      const pull = Math.hypot(dx, dy);
      if (pull < 14 || !sling.loaded) return;
      pebbles.push({ x: sling.pouch.x, y: sling.pouch.y, vx: dx * LAUNCH, vy: dy * LAUNCH, life: 0, shadeCd: 0, resting: false });
      if (pebbles.length > 8) pebbles.shift();
      stats.shots++;
      sling.loaded = false;
      sling.reload = 0.45;
      sling.pv = { x: dx * 16, y: dy * 16 };
      audio.twang(pull / MAX_PULL);
      sync();
    };

    apiRef.current = {
      toggle,
      replace,
      setSound: (on: boolean) => {
        audio.enabled = on;
      },
      setWordsLamp: (on: boolean) => {
        wordsLampRef.current = on;
        try {
          localStorage.setItem('heroWordsLamp', on ? 'on' : 'off');
        } catch {
          /* private mode: setting just isn't remembered */
        }
        resize();
        if (on) {
          // the new bulb comes on with the usual stutter
          wordsLamp.I = 0;
          if (light.on && !wordsLamp.broken) wordsLamp.flicker = 0.5;
        }
        audio.click();
        sync();
      },
    };

    // ----- simulation -----
    const collideLamp = (L: LampState, p: Pebble) => {
      // bulb
      if (!L.broken) {
        const b = toWorld(L, 0, BULB_Y);
        if (Math.hypot(p.x - b.x, p.y - b.y) < BULB_R + PEBBLE_R) {
          kickLamp(L, b, p.vx, p.vy, 0.08);
          breakBulb(L, p.vx, p.vy);
          p.vx *= 0.55;
          p.vy *= 0.55;
        }
      }
      // shade
      if (p.shadeCd > 0) return;
      const l = toLocal(L, p.x, p.y);
      if (l.y <= -PEBBLE_R || l.y >= SHADE_H + PEBBLE_R) return;
      const t = clamp(l.y / SHADE_H, 0, 1);
      const hw = SHADE_TOP + (SHADE_BOT - SHADE_TOP) * t + PEBBLE_R;
      if (Math.abs(l.x) >= hw) return;
      const dBottom = SHADE_H + PEBBLE_R - l.y;
      const dSide = hw - Math.abs(l.x);
      const dTop = l.y + PEBBLE_R;
      let nl: Vec;
      let push: number;
      if (dBottom <= dSide && dBottom <= dTop) {
        nl = { x: 0, y: 1 };
        push = dBottom;
      } else if (dTop <= dSide) {
        nl = { x: 0, y: -1 };
        push = dTop;
      } else {
        const nx = Math.sign(l.x || 1) * SHADE_H, ny = -(SHADE_BOT - SHADE_TOP);
        const m = Math.hypot(nx, ny);
        nl = { x: nx / m, y: ny / m };
        push = dSide;
      }
      const n = dirToWorld(L, nl.x, nl.y);
      const rx = p.x - L.ax, ry = p.y - L.ay;
      // velocity of the lamp surface at the contact point
      const svx = L.omega * ry, svy = -L.omega * rx;
      const vn = (p.vx - svx) * n.x + (p.vy - svy) * n.y;
      if (vn < 0) {
        const j = -(1 + 0.45) * vn;
        p.vx += j * n.x * 0.85;
        p.vy += j * n.y * 0.85;
        kickLamp(L, { x: p.x, y: p.y }, -n.x * j, -n.y * j, 0.22);
        audio.clang(Math.abs(vn) / 1300);
        p.shadeCd = 0.06;
      }
      p.x += n.x * (push + 0.5);
      p.y += n.y * (push + 0.5);
    };

    const stepPebble = (p: Pebble, dt: number) => {
      if (p.resting) {
        p.life += dt;
        return;
      }
      p.vy += G_PEBBLE * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life += dt;
      p.shadeCd = Math.max(0, p.shadeCd - dt);

      for (const L of lamps) collideLamp(L, p);

      // wall switch
      if (
        switchCd <= 0 &&
        p.x > switchRect.x - PEBBLE_R && p.x < switchRect.x + switchRect.w + PEBBLE_R &&
        p.y > switchRect.y - PEBBLE_R && p.y < switchRect.y + switchRect.h + PEBBLE_R
      ) {
        switchCd = 0.4;
        toggle();
        p.vx *= -0.45;
        p.vy *= 0.5;
      }

      // walls & floor
      if (p.x < PEBBLE_R && p.vx < 0) { p.x = PEBBLE_R; p.vx *= -0.5; }
      if (p.x > W - PEBBLE_R && p.vx > 0) { p.x = W - PEBBLE_R; p.vx *= -0.5; }
      const floor = H - 12;
      if (p.y > floor && p.vy > 0) {
        p.y = floor;
        if (p.vy > 220) audio.bump(p.vy / 900);
        p.vy *= -0.35;
        p.vx *= 0.7;
        if (Math.abs(p.vy) < 70) {
          p.vy = 0;
          if (Math.abs(p.vx) < 30) p.resting = true;
        }
      }
    };

    const stepLamp = (L: LampState, dt: number) => {
      if (grab === L) {
        const target = clamp(Math.atan2(mouse.x - L.ax, Math.max(20, mouse.y - L.ay)), -1.2, 1.2);
        L.omega += ((target - L.theta) * 70 - L.omega * 11) * dt;
      } else {
        const g = G_LAMP / leff(L);
        L.omega += (-g * Math.sin(L.theta) - 0.22 * L.omega) * dt;
        // keep a gentle idle swing going: top up energy when it drops below the idle level
        const E = 0.5 * L.omega * L.omega + g * (1 - Math.cos(L.theta));
        const E0 = g * (1 - Math.cos(IDLE_SWING));
        if (E < E0) L.omega += Math.sign(L.omega || 1) * 0.6 * dt;
      }
      L.theta += L.omega * dt;
      if (Math.abs(L.theta) > 1.45) {
        L.theta = Math.sign(L.theta) * 1.45;
        L.omega *= -0.3;
      }

      // light intensity
      const target = light.on && !L.broken ? 1 : 0;
      if (L.flicker > 0 && target === 1) {
        L.flicker -= dt;
        L.I = Math.random() < 0.45 ? rand(0.05, 0.3) : rand(0.7, 1);
      } else if (L.broken) {
        L.I = 0;
      } else {
        L.I += (target - L.I) * Math.min(1, dt * (target > L.I ? 16 : 9));
      }
    };

    const step = (dt: number) => {
      for (const L of lamps) stepLamp(L, dt);

      // slingshot pouch
      // demo pull-back: ease out to DEMO_PULL, hold, then let the spring snap it back
      if (demo.active && grab !== 'sling' && sling.loaded) {
        demo.t += dt;
        const p = (demo.t - DEMO_START) % DEMO_CYCLE;
        if (demo.t > DEMO_START && p < 1.3) {
          const k = p < 0.9 ? 1 - Math.pow(1 - p / 0.9, 3) : 1;
          const pull = DEMO_PULL * k + (p >= 0.9 ? Math.sin(p * 40) * 1.5 : 0);
          sling.pouch = { x: sling.rest.x + demo.dir.x * pull, y: sling.rest.y + demo.dir.y * pull };
          sling.pv = { x: 0, y: 0 };
        }
      }
      if (grab === 'sling') {
        let dx = mouse.x - sling.rest.x, dy = mouse.y - sling.rest.y;
        const d = Math.hypot(dx, dy);
        if (d > MAX_PULL) { dx *= MAX_PULL / d; dy *= MAX_PULL / d; }
        sling.pouch = { x: sling.rest.x + dx, y: sling.rest.y + dy };
        sling.pv = { x: 0, y: 0 };
        const pull = Math.min(d, MAX_PULL);
        if (Math.abs(pull - sling.lastCreak) > 22) {
          audio.creak(pull / MAX_PULL);
          sling.lastCreak = pull;
        }
      } else {
        const ax = (sling.rest.x - sling.pouch.x) * 520 - sling.pv.x * 13;
        const ay = (sling.rest.y - sling.pouch.y) * 520 - sling.pv.y * 13;
        sling.pv.x += ax * dt;
        sling.pv.y += ay * dt;
        sling.pouch.x += sling.pv.x * dt;
        sling.pouch.y += sling.pv.y * dt;
      }
      if (!sling.loaded) {
        sling.reload -= dt;
        if (sling.reload <= 0) sling.loaded = true;
      }

      switchCd = Math.max(0, switchCd - dt);
      for (const p of pebbles) stepPebble(p, dt);
      pebbles = pebbles.filter((p) => p.life < (p.resting ? 4 : 6) && p.y < H + 60);

      for (const q of parts) {
        q.vy += (q.kind === 'spark' ? 500 : G_PART) * dt;
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.rot += q.vr * dt;
        q.life -= dt;
        if (q.kind === 'shard' && q.y > H - 8 && q.vy > 0) {
          q.y = H - 8;
          q.vy *= -0.3;
          q.vx *= 0.6;
          q.vr *= 0.5;
        }
      }
      parts = parts.filter((q) => q.life > 0);
      light.flash *= Math.pow(0.004, dt);
    };

    // ----- rendering -----
    const drawLamp = (L: LampState) => {
      const I = L.I;
      const o = origin(L);
      // cord
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(L.ax, L.ay);
      ctx.lineTo(o.x, o.y);
      ctx.stroke();
      // ceiling mount
      ctx.fillStyle = '#334155';
      ctx.fillRect(L.ax - 14, L.ay, 28, 5);

      ctx.save();
      ctx.translate(o.x, o.y);
      ctx.rotate(-L.theta);

      // shade body
      ctx.beginPath();
      ctx.moveTo(-SHADE_TOP, 0);
      ctx.lineTo(SHADE_TOP, 0);
      ctx.quadraticCurveTo(SHADE_TOP + 8, SHADE_H * 0.5, SHADE_BOT, SHADE_H);
      ctx.lineTo(-SHADE_BOT, SHADE_H);
      ctx.quadraticCurveTo(-SHADE_TOP - 8, SHADE_H * 0.5, -SHADE_TOP, 0);
      ctx.closePath();
      const sg = ctx.createLinearGradient(-SHADE_BOT, 0, SHADE_BOT, 0);
      sg.addColorStop(0, '#0f172a');
      sg.addColorStop(0.38, '#334155');
      sg.addColorStop(0.55, '#64748b');
      sg.addColorStop(1, '#0f172a');
      ctx.fillStyle = sg;
      ctx.fill();
      ctx.strokeStyle = 'rgba(34,211,238,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // top cap
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.ellipse(0, 0, SHADE_TOP + 1, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // inside of the rim (lit from within)
      ctx.beginPath();
      ctx.ellipse(0, SHADE_H, SHADE_BOT, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = I > 0.01 ? `rgba(255,214,150,${0.15 + 0.8 * I})` : '#070b12';
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // socket
      ctx.fillStyle = '#9ca3af';
      ctx.fillRect(-7, SHADE_H - 4, 14, 8);
      ctx.fillStyle = '#6b7280';
      for (let i = 0; i < 3; i++) ctx.fillRect(-7, SHADE_H - 3 + i * 2.6, 14, 1);

      if (!L.broken) {
        // bulb glass
        const by = BULB_Y;
        if (I > 0.01) {
          ctx.shadowColor = `rgba(255,200,120,${I})`;
          ctx.shadowBlur = 40 * I;
        }
        const bg = ctx.createRadialGradient(-4, by - 5, 2, 0, by, BULB_R);
        bg.addColorStop(0, I > 0.01 ? `rgba(255,252,235,${0.5 + 0.5 * I})` : 'rgba(226,232,240,0.55)');
        bg.addColorStop(1, I > 0.01 ? `rgba(255,205,120,${0.35 + 0.6 * I})` : 'rgba(148,163,184,0.25)');
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(0, by, BULB_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(226,232,240,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        // filament
        ctx.strokeStyle = I > 0.01 ? `rgba(255,250,225,${0.6 + 0.4 * I})` : 'rgba(120,113,108,0.9)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-3, SHADE_H + 3);
        ctx.lineTo(-3, by - 2);
        ctx.lineTo(-1.5, by + 2);
        ctx.lineTo(0, by - 2);
        ctx.lineTo(1.5, by + 2);
        ctx.lineTo(3, by - 2);
        ctx.lineTo(3, SHADE_H + 3);
        ctx.stroke();
        // highlight
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, by, BULB_R - 4, Math.PI * 1.1, Math.PI * 1.45);
        ctx.stroke();
      } else {
        // jagged remains of the bulb
        ctx.fillStyle = 'rgba(203,213,225,0.35)';
        ctx.strokeStyle = 'rgba(226,232,240,0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-8, SHADE_H + 3);
        ctx.lineTo(-10, SHADE_H + 10);
        ctx.lineTo(-6, SHADE_H + 8);
        ctx.lineTo(-3, SHADE_H + 14);
        ctx.lineTo(1, SHADE_H + 9);
        ctx.lineTo(5, SHADE_H + 13);
        ctx.lineTo(9, SHADE_H + 7);
        ctx.lineTo(8, SHADE_H + 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = 'rgba(120,113,108,0.9)';
        ctx.beginPath();
        ctx.moveTo(-2, SHADE_H + 4);
        ctx.lineTo(-4, SHADE_H + 17);
        ctx.moveTo(2, SHADE_H + 4);
        ctx.lineTo(5, SHADE_H + 16);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawSlingshot = () => {
      const { rest, pouch } = sling;
      const lp = { x: rest.x - 26, y: rest.y - 4 };
      const rp = { x: rest.x + 26, y: rest.y - 4 };
      const pull = Math.hypot(pouch.x - rest.x, pouch.y - rest.y);
      const band = Math.max(1.6, 4 - pull / 55);

      // back band
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = band;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lp.x, lp.y);
      ctx.lineTo(pouch.x, pouch.y);
      ctx.stroke();

      // fork
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(rest.x, Math.min(H - 10, rest.y + 120));
      ctx.lineTo(rest.x, rest.y + 52);
      ctx.moveTo(rest.x, rest.y + 54);
      ctx.quadraticCurveTo(rest.x - 26, rest.y + 40, lp.x, lp.y);
      ctx.moveTo(rest.x, rest.y + 54);
      ctx.quadraticCurveTo(rest.x + 26, rest.y + 40, rp.x, rp.y);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(253,230,138,0.25)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(rest.x - 2, Math.min(H - 12, rest.y + 118));
      ctx.lineTo(rest.x - 2, rest.y + 54);
      ctx.stroke();

      // pouch + loaded pebble
      ctx.save();
      ctx.translate(pouch.x, pouch.y);
      ctx.rotate(Math.atan2(pouch.y - rest.y, pouch.x - rest.x) + Math.PI / 2);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(-11, -3, 22, 8);
      ctx.restore();
      if (sling.loaded) drawPebble(pouch.x, pouch.y, 1);

      // front band
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = band;
      ctx.beginPath();
      ctx.moveTo(rp.x, rp.y);
      ctx.lineTo(pouch.x, pouch.y);
      ctx.stroke();
      ctx.lineCap = 'butt';
    };

    const drawPebble = (x: number, y: number, alpha: number) => {
      const g = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, PEBBLE_R);
      g.addColorStop(0, `rgba(203,213,225,${alpha})`);
      g.addColorStop(1, `rgba(71,85,105,${alpha})`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, PEBBLE_R, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      // ---- the light: soft beams, drawn small + blurred into a mask
      const anyI = lamps.reduce((m, l) => Math.max(m, l.I), 0);
      gctx.setTransform(1, 0, 0, 1, 0, 0);
      gctx.clearRect(0, 0, glow.width, glow.height);
      if (anyI > 0.002) {
        gctx.setTransform(LIGHT_SCALE, 0, 0, LIGHT_SCALE, 0, 0);
        const far = Math.max(W, H) * 2.5;
        for (const L of lamps) {
          const I = L.I;
          if (I <= 0.002) continue;
          // the beam: from the shade's rim, along the line from the top of the shade through each rim edge
          const apex = toWorld(L, 0, 2);
          const rl = toWorld(L, -(SHADE_BOT - 4), SHADE_H);
          const rr = toWorld(L, SHADE_BOT - 4, SHADE_H);
          const nl = Math.hypot(rl.x - apex.x, rl.y - apex.y);
          const nr = Math.hypot(rr.x - apex.x, rr.y - apex.y);
          const ul = { x: (rl.x - apex.x) / nl, y: (rl.y - apex.y) / nl };
          const ur = { x: (rr.x - apex.x) / nr, y: (rr.y - apex.y) / nr };
          const b = toWorld(L, 0, BULB_Y);
          const grd = gctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, L.R);
          grd.addColorStop(0, `rgba(255,214,160,${I})`);
          grd.addColorStop(0.4, `rgba(255,200,140,${I * 0.82})`);
          grd.addColorStop(1, 'rgba(255,190,120,0)');
          gctx.fillStyle = grd;
          gctx.beginPath();
          gctx.moveTo(rl.x, rl.y);
          gctx.lineTo(rr.x, rr.y);
          gctx.lineTo(rr.x + ur.x * far, rr.y + ur.y * far);
          gctx.lineTo(rl.x + ul.x * far, rl.y + ul.y * far);
          gctx.closePath();
          gctx.fill();
          // halo around the bulb
          const halo = gctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 130);
          halo.addColorStop(0, `rgba(255,210,150,${I * 0.5})`);
          halo.addColorStop(1, 'rgba(255,210,150,0)');
          gctx.fillStyle = halo;
          gctx.fillRect(b.x - 130, b.y - 130, 260, 260);
        }
      }

      // ---- the room: near-black, lifting slightly when a light is on
      ctx.globalCompositeOperation = 'source-over';
      const darkA = DARK - anyI * 0.1;
      const fade = stageBottom < H ? 80 : 0;
      const darkEnd = Math.min(stageBottom, H);
      ctx.fillStyle = `rgba(3,4,5,${darkA})`;
      ctx.fillRect(0, 0, W, darkEnd - fade);
      if (fade) {
        const eg = ctx.createLinearGradient(0, darkEnd - fade, 0, darkEnd);
        eg.addColorStop(0, `rgba(3,4,5,${darkA})`);
        eg.addColorStop(1, 'rgba(3,4,5,0)');
        ctx.fillStyle = eg;
        ctx.fillRect(0, darkEnd - fade, W, fade);
      }
      if (anyI > 0.002) {
        // cut the beams out of the darkness, then add a faint warm haze inside them
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(glow, 0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 0.13;
        ctx.drawImage(glow, 0, 0, W, H);
        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = 'source-over';
      if (light.flash > 0.01) {
        ctx.fillStyle = `rgba(255,244,225,${0.55 * light.flash})`;
        ctx.fillRect(0, 0, W, H);
      }

      for (const L of lamps) drawLamp(L);
      // dotted flight path while the slingshot is drawn back (by the visitor or the demo)
      {
        const dx = sling.rest.x - sling.pouch.x, dy = sling.rest.y - sling.pouch.y;
        const pull = Math.hypot(dx, dy);
        if (sling.loaded && pull > 20 && (grab === 'sling' || demo.active)) {
          let x = sling.pouch.x, y = sling.pouch.y, vx = dx * LAUNCH, vy = dy * LAUNCH;
          ctx.fillStyle = 'rgba(253,230,138,1)';
          for (let i = 1; i <= 26; i++) {
            const h = 0.03;
            vy += G_PEBBLE * h; x += vx * h; y += vy * h;
            if (y > H || x < 0 || x > W) break;
            ctx.globalAlpha = 0.6 * (1 - i / 28) * Math.min(1, pull / 60);
            ctx.beginPath();
            ctx.arc(x, y, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      }
      drawSlingshot();
      if (demo.active && demo.t > DEMO_START && grab !== 'sling') {
        // a "finger" on the pouch, pulsing, so it reads as something to grab
        const pulse = (Math.sin(performance.now() / 180) + 1) / 2;
        ctx.strokeStyle = `rgba(253,230,138,${0.35 + 0.4 * pulse})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sling.pouch.x, sling.pouch.y, 16 + pulse * 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(253,230,138,0.25)';
        ctx.beginPath();
        ctx.arc(sling.pouch.x, sling.pouch.y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      if (stats.shots === 0 && grab !== 'sling') {
        ctx.font = '500 10px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillStyle = 'rgba(203,213,225,0.55)';
        if (sling.rest.y + 150 < H) {
          ctx.textAlign = 'center';
          ctx.fillText('pull back & let go', sling.rest.x, sling.rest.y + 140);
        } else {
          ctx.textAlign = 'left';
          ctx.fillText('← pull back & let go', sling.rest.x + 40, sling.rest.y + 4);
        }
      }
      for (const p of pebbles) {
        const fade = p.resting ? clamp(4 - p.life, 0, 1) : 1;
        drawPebble(p.x, p.y, fade);
      }

      for (const q of parts) {
        const a = clamp(q.life / q.max, 0, 1);
        if (q.kind === 'spark') {
          ctx.globalCompositeOperation = 'lighter';
          ctx.strokeStyle = `rgba(255,190,90,${a})`;
          ctx.lineWidth = q.size;
          ctx.beginPath();
          ctx.moveTo(q.x, q.y);
          ctx.lineTo(q.x - q.vx * 0.02, q.y - q.vy * 0.02);
          ctx.stroke();
          ctx.globalCompositeOperation = 'source-over';
        } else {
          ctx.save();
          ctx.translate(q.x, q.y);
          ctx.rotate(q.rot);
          ctx.fillStyle = `rgba(203,213,225,${0.75 * a})`;
          ctx.beginPath();
          ctx.moveTo(0, -q.size);
          ctx.lineTo(q.size * 0.8, q.size * 0.6);
          ctx.lineTo(-q.size * 0.7, q.size * 0.4);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    };

    // ----- loop (paused while off-screen) -----
    let raf = 0;
    let last = 0;
    let acc = 0;
    let visible = false;
    let frameNo = 0;
    const frame = (t: number) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : STEP;
      last = t;
      acc += dt;
      while (acc >= STEP) {
        step(STEP);
        acc -= STEP;
      }
      // physics always runs at full rate; on phones we paint every other frame (30fps is
      // plenty for a slow swing and halves the drawing cost)
      frameNo++;
      if (W >= LG || frameNo % 2 === 0 || grab) render();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(section);
    const ro = new ResizeObserver(() => {
      resize();
      render();
    });
    ro.observe(section);
    resize();
    render();
    // fonts/images can shift the hero columns after first paint
    const relayout = setTimeout(resize, 1200);
    // the room opens dark, then someone flips the switch
    const intro = setTimeout(() => { if (!light.on) toggle(true); }, 900);

    // ----- input -----
    const local = (clientX: number, clientY: number): Vec => {
      const r = canvas.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };
    const hitKind = (p: Vec): null | 'sling' | LampState => {
      if (sling.loaded && Math.hypot(p.x - sling.pouch.x, p.y - sling.pouch.y) < 36) return 'sling';
      for (const L of lamps) if (insideShade(L, p, 8)) return L;
      return null;
    };

    const onDown = (e: PointerEvent) => {
      const p = local(e.clientX, e.clientY);
      const k = hitKind(p);
      if (!k) return;
      audio.ctx(); // unlock audio on first gesture
      grab = k;
      if (k === 'sling') demo.active = false; // they've got it
      mouse.x = p.x;
      mouse.y = p.y;
      sling.lastCreak = 0;
      section.setPointerCapture(e.pointerId);
      section.style.cursor = 'grabbing';
      e.preventDefault();
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e.clientX, e.clientY);
      mouse.x = p.x;
      mouse.y = p.y;
      if (!grab) section.style.cursor = hitKind(p) ? 'grab' : '';
    };
    const onUp = (e: PointerEvent) => {
      if (!grab) return;
      if (grab === 'sling') shoot();
      grab = null;
      if (section.hasPointerCapture(e.pointerId)) section.releasePointerCapture(e.pointerId);
      section.style.cursor = '';
    };
    // stop the page from scrolling only when the touch starts on the slingshot or the lamp
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t && hitKind(local(t.clientX, t.clientY))) e.preventDefault();
    };

    section.addEventListener('pointerdown', onDown);
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerup', onUp);
    section.addEventListener('pointercancel', onUp);
    section.addEventListener('touchstart', onTouchStart, { passive: false });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(relayout);
      clearTimeout(intro);
      io.disconnect();
      ro.disconnect();
      section.removeEventListener('pointerdown', onDown);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerup', onUp);
      section.removeEventListener('pointercancel', onUp);
      section.removeEventListener('touchstart', onTouchStart);
      audio.close();
      apiRef.current = null;
      section.style.cursor = '';
    };
  }, []);

  const lit = ui.on && !ui.broken;
  const state = ui.broken ? 'broken' : ui.on ? 'on' : 'off';

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true" />

      {/* wall switch + tiny HUD, positioned from the effect */}
      <div
        ref={panelRef}
        className="absolute z-30 flex flex-row-reverse justify-between lg:flex-col lg:justify-start items-start lg:items-center gap-3 select-none"
        style={{ left: -999, top: 0 }}
      >
        <button
          ref={switchRef}
          type="button"
          role="switch"
          aria-checked={ui.on}
          aria-label="Light switch"
          title="Light switch"
          onClick={() => apiRef.current?.toggle()}
          className={`w-[52px] h-[88px] shrink-0 rounded-lg bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-500/60 shadow-[0_6px_18px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between py-1.5 transition-[filter] duration-300 ${lit ? 'brightness-100' : 'brightness-[0.5]'}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
          <span className="font-mono text-[7px] font-bold text-slate-600 leading-none">ON</span>
          <span className="relative w-5 h-9 rounded-sm bg-slate-500/50 shadow-inner">
            <span
              className={`absolute left-[2px] right-[2px] h-[18px] rounded-sm bg-gradient-to-b from-white to-slate-200 shadow transition-all duration-150 ${ui.on ? 'top-[2px]' : 'top-[16px]'}`}
            />
          </span>
          <span className="font-mono text-[7px] font-bold text-slate-600 leading-none">OFF</span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors ${ui.on ? 'bg-slate-500' : 'bg-orange-400 shadow-[0_0_8px_2px_rgba(251,146,60,0.8)]'}`}
          />
        </button>

        <div className="flex flex-col items-start lg:items-center gap-1 font-mono text-[10px] leading-4 text-slate-500 lg:text-center">
          <span>
            lamp <b className={lit ? 'text-amber-300' : 'text-slate-300'}>{state}</b>
          </span>
          <span>
            shots <b className="text-slate-300">{ui.shots}</b>
          </span>
          <span>
            bulbs <b className="text-slate-300">{ui.bulbs}</b>
          </span>
          <button
            type="button"
            onClick={() => {
              const next = !ui.sound;
              apiRef.current?.setSound(next);
              setUi((u) => ({ ...u, sound: next }));
            }}
            className="mt-1 px-1.5 py-0.5 rounded border border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors"
          >
            sound {ui.sound ? 'on' : 'off'}
          </button>
          {/* desktop-only setting: second bulb over the headline */}
          <button
            type="button"
            role="switch"
            aria-checked={ui.wordsLamp}
            onClick={() => {
              const next = !ui.wordsLamp;
              apiRef.current?.setWordsLamp(next);
              setUi((u) => ({ ...u, wordsLamp: next }));
            }}
            className={`hidden lg:block mt-1 px-1.5 py-0.5 rounded border transition-colors ${
              ui.wordsLamp ? 'border-amber-400/60 text-amber-300' : 'border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-500'
            }`}
          >
            2nd bulb {ui.wordsLamp ? 'on' : 'off'}
          </button>
          {ui.broken && (
            <button
              type="button"
              onClick={() => apiRef.current?.replace()}
              className="mt-1 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition-colors"
            >
              new bulb
            </button>
          )}
        </div>
      </div>
    </>
  );
}
