import React from 'react';
import { ArrowUpRight, Github, Globe, Play, Star } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Gateway to Build with Bala (the Bala App Store): the root site for every app Bala ships.
 * Styled after build-with-bala.vercel.app (dark + pink). Stays dark in the light theme.
 */
const STORE = 'https://build-with-bala.vercel.app/';
const BASE = (import.meta as any).env?.BASE_URL ?? './';
const ref = (u: string) => `${u}${u.includes('?') ? '&' : '?'}ref=portfolio`;

const CATEGORIES = [
  ['Learn AI in 3D', 4],
  ['AI tools', 4],
  ['Collections', 7],
  ['Lab', 3],
  ['Data & ML', 1],
  ['Games', 1],
] as const;

const LIVE = [
  { name: 'AgentDecode 3D', tag: 'Learn AI in 3D', solves: 'Agents, RAG and MCP are taught with walls of text.', url: 'https://agentdecode.vercel.app/', img: 'agentdecode.jpg' },
  { name: 'NeuralDecode 3D', tag: 'Learn AI in 3D', solves: 'Neural architectures feel like black boxes.', url: 'https://neuraldecode.vercel.app/', img: 'neuraldecode.jpg' },
  { name: '3D Agent Lab', tag: 'Learn AI in 3D', solves: 'Multi-agent systems are abstract.', url: 'https://agentlab3d.vercel.app/', img: 'agentlab.jpg' },
  { name: 'Career Roadmap Galaxy', tag: 'Learn AI in 3D', solves: 'Career roadmaps are flat lists of hundreds of boxes.', url: 'https://career-roadmap-galaxy.vercel.app', img: 'career-roadmap-galaxy.jpg' },
  { name: 'Throne Chess 3D', tag: 'Games', solves: 'Online chess looks the same everywhere.', url: 'https://throne3dchess.vercel.app/', img: 'throne3dchess.jpg' },
];

export default function BalaAppStore() {
  return (
    <section
      id="app-store"
      data-keep-dark
      className="relative py-20 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden text-white border-b border-white/5 z-20 bg-[#0d0a12]"
    >
      {/* soft pink / violet light, like the store's floating shapes */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[460px] h-[460px] bg-violet-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-5 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center font-mono font-black text-sm shadow-lg shadow-pink-500/30">&lt;/&gt;</span>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-pink-400">Build with Bala · App Store</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]">
              Every app.
              <br />
              <span className="text-pink-500">One store.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-md">
              41 AI apps, each built to solve a real problem. Try any of them free in seconds, then see exactly how it was built.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm"><b className="text-white">41</b> <span className="text-slate-400">apps</span></span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><b className="text-white">8</b> <span className="text-slate-400">live to try</span></span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /><b className="text-white">2,269+</b> <span className="text-slate-400">GitHub stars</span></span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <a
                href={ref(STORE)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow-lg shadow-pink-600/30 transition-colors"
              >
                Open the App Store <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-slate-300">
                <span className="text-pink-400">›_</span> open bala-app-store --free
              </span>
            </div>
          </motion.div>

          {/* store preview */}
          <motion.a
            href={ref(STORE)}
            target="_blank"
            rel="noreferrer"
            data-tilt
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 group block rounded-2xl overflow-hidden border border-white/10 hover:border-pink-400/60 bg-black shadow-[0_30px_80px_-20px_rgba(236,72,153,0.35)] transition-colors"
          >
            <div className="flex items-center gap-2 px-3 h-8 bg-[#1b1622] border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-2 flex-1 max-w-[280px] truncate rounded-md bg-black/50 px-2.5 py-0.5 text-[10px] font-mono text-slate-400">build-with-bala.vercel.app</span>
            </div>
            <img
              src={`${BASE}previews/build-with-bala.jpg`}
              alt="Build with Bala: the Bala App Store home page"
              loading="lazy"
              width={1280}
              height={800}
              className="block w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.015] transition-transform duration-500"
            />
          </motion.a>
        </div>

        {/* categories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(([name, n]) => (
            <a
              key={name}
              href={ref(STORE)}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-pink-500/15 border border-white/10 hover:border-pink-400/50 text-sm font-semibold text-slate-200 transition-colors"
            >
              {name} <span className="ml-1 text-pink-400 font-mono text-xs">{n}</span>
            </a>
          ))}
        </div>

        {/* live apps */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {LIVE.map((app) => (
            <a
              key={app.name}
              href={ref(app.url)}
              target="_blank"
              rel="noreferrer"
              data-tilt
              className="group flex flex-col rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 hover:border-pink-400/50 transition-colors"
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-violet-900 to-pink-900 overflow-hidden">
                {app.img ? (
                  <img src={`${BASE}previews/${app.img}`} alt="" loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <Globe className="absolute inset-0 m-auto w-10 h-10 text-pink-200/80" />
                )}
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-emerald-500 text-[9px] font-mono font-black text-slate-950">LIVE</span>
              </div>
              <div className="flex flex-col gap-1 p-3 flex-1">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-pink-400">{app.tag}</span>
                <span className="text-sm font-bold text-white leading-tight">{app.name}</span>
                <span className="text-[11px] text-slate-400 leading-snug"><b className="text-slate-300">Solves:</b> {app.solves}</span>
                <span className="mt-auto pt-1 inline-flex items-center gap-1 text-[11px] font-bold text-pink-300 group-hover:text-white">
                  <Play className="w-3 h-3 fill-current" /> Try it live
                </span>
              </div>
            </a>
          ))}
          <a
            href={ref(STORE)}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-pink-400/40 hover:border-pink-300 bg-pink-500/5 hover:bg-pink-500/10 p-4 text-center transition-colors"
          >
            <span className="text-3xl font-black text-pink-400">+36</span>
            <span className="text-sm font-bold text-white">more apps in the store</span>
            <span className="inline-flex items-center gap-1 text-xs text-pink-300 group-hover:text-white">
              <Github className="w-3.5 h-3.5" /> See how each is built <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
