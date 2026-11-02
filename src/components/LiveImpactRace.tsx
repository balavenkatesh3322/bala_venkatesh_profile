import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Zap } from 'lucide-react';

/**
 * "Manual vs AI" live race: both lanes process the same work on a live clock, counters climb,
 * and the value saved accumulates in front of the visitor. Numbers come from the real
 * case-study metrics; banking/healthcare run on a 60x clock (1 second = 1 minute, labelled),
 * agritech runs in true real time.
 */
export type RaceDomain = 'business' | 'innovation' | 'problem_solving';

interface RaceConfig {
  tab: string;
  unit: string; // singular work item
  units: string;
  manual: { label: string; seconds: number }; // simulated seconds per item
  ai: { label: string; seconds: number };
  timeScale: number; // simulated seconds per real second
  clockNote: string;
  savedLabel: string;
  formatSaved: (simSecondsSaved: number) => string;
  accent: string; // tailwind text colour for the AI lane
  bar: string; // tailwind bg for the AI bar
}

const hm = (s: number) => {
  const m = Math.floor(s / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m` : `${m}m ${String(Math.floor(s % 60)).padStart(2, '0')}s`;
};

const RACES: Record<RaceDomain, RaceConfig> = {
  business: {
    tab: 'Banking',
    unit: 'security review',
    units: 'security reviews',
    manual: { label: 'Manual review', seconds: 15 * 60 },
    ai: { label: "Bala's RAG agent", seconds: 1.8 * 60 },
    timeScale: 60,
    clockNote: '60× speed · 1 sec = 1 min',
    savedLabel: 'Engineer time saved',
    formatSaved: hm,
    accent: 'text-emerald-300',
    bar: 'bg-emerald-400',
  },
  innovation: {
    tab: 'Agritech',
    unit: 'crop diagnosis',
    units: 'crop diagnoses',
    manual: { label: 'Cloud model · rural 2G', seconds: 1.84 },
    ai: { label: 'On-device TFLite', seconds: 0.068 },
    timeScale: 1,
    clockNote: 'Real time',
    savedLabel: 'Farmer wait time saved',
    formatSaved: (s) => `${s.toFixed(1)}s`,
    accent: 'text-violet-300',
    bar: 'bg-violet-400',
  },
  problem_solving: {
    tab: 'Healthcare',
    unit: 'patient note',
    units: 'patient notes',
    manual: { label: 'Doctor typing notes', seconds: 15.5 * 60 },
    ai: { label: 'Ambient AI scribe', seconds: 1.8 * 60 },
    timeScale: 60,
    clockNote: '60× speed · 1 sec = 1 min',
    savedLabel: 'Doctor time given back',
    formatSaved: hm,
    accent: 'text-cyan-300',
    bar: 'bg-cyan-400',
  },
};

interface Snapshot {
  simTime: number;
  manualDone: number;
  aiDone: number;
  manualProgress: number;
  aiProgress: number;
}

const ZERO: Snapshot = { simTime: 0, manualDone: 0, aiDone: 0, manualProgress: 0, aiProgress: 0 };

export default function LiveImpactRace({
  domain,
  onDomainChange,
}: {
  domain: RaceDomain;
  onDomainChange: (d: RaceDomain) => void;
}) {
  const cfg = RACES[domain];
  const [snap, setSnap] = useState<Snapshot>(ZERO);
  const [playing, setPlaying] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const simRef = useRef(0);
  const visibleRef = useRef(false);

  // restart when the domain changes
  useEffect(() => {
    simRef.current = 0;
    setSnap(ZERO);
  }, [domain]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visibleRef.current = e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    let lastPaint = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!visibleRef.current) return; // only run while on screen
      simRef.current += dt * cfg.timeScale;
      if (now - lastPaint < 50) return; // ~20 updates/sec is plenty for counters
      lastPaint = now;
      const t = simRef.current;
      setSnap({
        simTime: t,
        manualDone: Math.floor(t / cfg.manual.seconds),
        aiDone: Math.floor(t / cfg.ai.seconds),
        manualProgress: (t % cfg.manual.seconds) / cfg.manual.seconds,
        aiProgress: (t % cfg.ai.seconds) / cfg.ai.seconds,
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, cfg]);

  const speedup = cfg.manual.seconds / cfg.ai.seconds;
  // time saved = the manual time the AI's finished work would have taken, minus the AI's time
  const saved = snap.aiDone * (cfg.manual.seconds - cfg.ai.seconds);
  const lanes = [
    { key: 'manual', label: cfg.manual.label, per: cfg.manual.seconds, done: snap.manualDone, progress: snap.manualProgress, text: 'text-slate-300', bar: 'bg-slate-500' },
    { key: 'ai', label: cfg.ai.label, per: cfg.ai.seconds, done: snap.aiDone, progress: snap.aiProgress, text: cfg.accent, bar: cfg.bar },
  ];
  const perLabel = (s: number) => (s < 60 ? (s < 1 ? `${Math.round(s * 1000)} ms` : `${s.toFixed(2)} s`) : `${+(s / 60).toFixed(1)} min`);

  return (
    <div ref={rootRef} className="rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-md p-5 sm:p-7 flex flex-col gap-6 shadow-2xl">
      {/* tabs + controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950/70 border border-white/10" role="tablist">
          {(Object.keys(RACES) as RaceDomain[]).map((d) => (
            <button
              key={d}
              role="tab"
              aria-selected={d === domain}
              onClick={() => onDomainChange(d)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                d === domain ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {RACES[d].tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE · {cfg.clockNote}
          </span>
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
            className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300"
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              simRef.current = 0;
              setSnap(ZERO);
              setPlaying(true);
            }}
            aria-label="Restart"
            className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* lanes */}
      <div className="flex flex-col gap-4">
        {lanes.map((l) => (
          <div key={l.key} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2">
            <div className="flex items-baseline justify-between gap-3 min-w-0">
              <span className={`text-sm font-bold truncate ${l.text}`}>{l.label}</span>
              <span className="text-[11px] font-mono text-slate-500 shrink-0">{perLabel(l.per)} / {cfg.unit}</span>
            </div>
            <div className={`row-span-2 text-right font-black tabular-nums text-3xl sm:text-4xl ${l.text}`}>
              {l.done.toLocaleString()}
            </div>
            <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full ${l.bar} ${l.key === 'ai' && l.per * (1 / cfg.timeScale) < 0.25 ? 'opacity-90' : ''}`}
                style={{ width: `${(l.key === 'ai' && l.per / cfg.timeScale < 0.25 ? 1 : l.progress) * 100}%` }}
              />
            </div>
          </div>
        ))}
        <div className="text-[11px] font-mono text-slate-500 -mt-1">{cfg.units} completed · same clock, same work</div>
      </div>

      {/* value */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">{cfg.savedLabel}</div>
          <div className={`mt-1 text-2xl sm:text-3xl font-black tabular-nums ${cfg.accent}`}>{cfg.formatSaved(saved)}</div>
        </div>
        <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Speed-up</div>
          <div className="mt-1 text-2xl sm:text-3xl font-black tabular-nums text-white flex items-center gap-1.5">
            <Zap className="w-6 h-6 text-amber-300" />
            {speedup >= 10 ? Math.round(speedup) : speedup.toFixed(1)}×
          </div>
        </div>
      </div>
    </div>
  );
}
