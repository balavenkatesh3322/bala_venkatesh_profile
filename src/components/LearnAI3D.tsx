import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Bot, Boxes } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * "Learn AI in 3D": AgentDecode and NeuralDecode shown as browser windows playing a short
 * recording of each home page. Videos only download and play while on screen, and stay on
 * the poster frame for visitors who prefer reduced motion.
 *
 * The sites send X-Frame-Options: SAMEORIGIN, so they can't be embedded live yet; the
 * cards open the real site in a new tab.
 */
const BASE = (import.meta as any).env?.BASE_URL ?? './';

const APPS = [
  {
    key: 'agentdecode',
    name: 'AgentDecode 3D',
    url: 'https://agentdecode.vercel.app/',
    host: 'agentdecode.vercel.app',
    pitch: 'Watch prompts, tool calls and agent hand-offs light up in 3D.',
    stats: ['84 topics', '22 RAG types', 'Agents · MCP'],
    cta: 'Learn agents in 3D',
    icon: Bot,
    accent: 'text-amber-300',
    ring: 'hover:border-amber-300/60',
    glow: 'bg-amber-400/15',
    button: 'from-amber-300 via-orange-400 to-amber-200',
  },
  {
    key: 'neuraldecode',
    name: 'NeuralDecode 3D',
    url: 'https://neuraldecode.vercel.app/',
    host: 'neuraldecode.vercel.app',
    pitch: 'See tensors flow through GPT, BERT, CLIP and Diffusion, layer by layer.',
    stats: ['18 architectures', 'Real param counts', 'Import ONNX'],
    cta: 'See inside models',
    icon: Boxes,
    accent: 'text-purple-300',
    ring: 'hover:border-purple-300/60',
    glow: 'bg-purple-400/15',
    button: 'from-purple-400 via-indigo-400 to-purple-300',
  },
];

const withRef = (url: string) => `${url}?ref=portfolio`;

function PreviewVideo({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = false;
    // nothing downloads until the card is within ~1 screen of the viewport
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        v.poster = `${BASE}previews/${name}.jpg`;
        if (!reduced) v.src = `${BASE}previews/${name}.mp4`;
        if (visible) v.play().catch(() => {});
        near.disconnect();
      },
      { rootMargin: '800px 0px' },
    );
    const onScreen = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (reduced || !v.src) return;
        if (visible) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    // some GPU decoders reject H.264; fall back to the VP9 copy once
    const onError = () => {
      if (v.src.endsWith('.webm')) return;
      v.src = `${BASE}previews/${name}.webm`;
      if (visible) v.play().catch(() => {});
    };
    v.addEventListener('error', onError);
    near.observe(v);
    onScreen.observe(v);
    return () => {
      near.disconnect();
      onScreen.disconnect();
      v.removeEventListener('error', onError);
    };
  }, [name]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover bg-[#f6f3ee]"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}

export default function LearnAI3D() {
  return (
    <section
      id="learn-3d"
      className="relative py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5 z-20"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 text-left"
        >
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">Free · interactive · no sign-up</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100">
            Learn AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400">in 3D</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            Two free apps Bala built. Watch how agents and models actually run.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {APPS.map((app, i) => {
            const Icon = app.icon;
            return (
              <motion.a
                key={app.key}
                href={withRef(app.url)}
                target="_blank"
                rel="noreferrer"
                data-tilt
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative flex flex-col rounded-3xl border border-white/10 ${app.ring} bg-slate-900/70 overflow-hidden shadow-2xl transition-colors`}
              >
                <div className={`absolute -top-20 -right-20 w-72 h-72 ${app.glow} rounded-full blur-3xl pointer-events-none`} />

                {/* browser window */}
                <div className="relative m-3 sm:m-4 mb-0 sm:mb-0 rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                  <div className="flex items-center gap-2 px-3 h-8 bg-slate-800/80 border-b border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 flex-1 max-w-[260px] truncate rounded-md bg-slate-950/70 px-2.5 py-0.5 text-[10px] font-mono text-slate-400">
                      {app.host}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                    </span>
                  </div>
                  <div className="relative aspect-[8/5]">
                    <PreviewVideo name={app.key} />
                  </div>
                </div>

                {/* copy */}
                <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-5 p-5 sm:p-6">
                  <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${app.accent}`} />
                      <h3 className="text-xl sm:text-2xl font-black">{app.name}</h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{app.pitch}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {app.stats.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${app.button} text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide shadow-lg group-hover:scale-[1.03] transition-transform`}
                  >
                    {app.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
