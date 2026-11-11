import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import WaterWaveEffect from './WaterWaveEffect';
import LiveImpactRace, { type RaceDomain } from './LiveImpactRace';

export default function AIWorkflowAcademy() {
  const [raceDomain, setRaceDomain] = useState<RaceDomain>('business');

  return (
    <section id="ai-case-animation" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-950 text-white overflow-hidden border-t border-b border-white/5 z-20">
      {/* Invisible Anchor for backward-compatible #case-studies links */}
      <div id="case-studies" className="absolute -top-24 opacity-0 pointer-events-none" />
      <WaterWaveEffect variant="center" color="cyan" />

      {/* Ambient background glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* SHORT, CATCHY SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[10px] font-mono text-cyan-400 tracking-widest uppercase relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.15)] border border-cyan-500/20">
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 animate-[pulse_3s_infinite]" />
            <span className="relative flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Live · Real Production Metrics
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Bala&apos;s Production AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
              In Live Action
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl leading-relaxed">
            Same work, same clock: manual vs Bala's AI.
          </p>
        </div>

        {/* Live value: manual vs AI racing on the same clock */}
        <LiveImpactRace domain={raceDomain} onDomainChange={setRaceDomain} />

        {/* BOTTOM CTA: DIRECT CONTACT FOR ENTERPRISE ARCHITECTURE */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-gradient-to-tr from-emerald-500/10 via-slate-950 to-cyan-500/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-2xl">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Quantified Production Impact
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Want results like these?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Let's build yours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919003812808?text=Hi%20Bala%2C%20I%20saw%20your%20interactive%20AI%20simulations%20and%20would%20love%20to%20discuss%20architecting%20a%20solution%20with%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Instant WhatsApp Chat</span>
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
