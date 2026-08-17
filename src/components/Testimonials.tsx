import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2, Building2, Stethoscope, Cpu, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { testimonialsData } from '../data';
import WaterWaveEffect from './WaterWaveEffect';

export default function Testimonials() {
  const getCategoryTheme = (category: 'banking' | 'healthcare' | 'agritech') => {
    switch (category) {
      case 'banking':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-400/50',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          icon: Building2,
          glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
          metricText: 'text-emerald-400'
        };
      case 'healthcare':
        return {
          border: 'border-cyan-500/30 hover:border-cyan-400/50',
          badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          icon: Stethoscope,
          glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
          metricText: 'text-cyan-400'
        };
      case 'agritech':
      default:
        return {
          border: 'border-violet-500/30 hover:border-violet-400/50',
          badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
          icon: Cpu,
          glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
          metricText: 'text-violet-400'
        };
    }
  };

  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5 z-20">
      <WaterWaveEffect variant="dual" color="cyan" />

      {/* Decorative ambient blurs */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-14">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[10px] font-mono text-cyan-400 tracking-widest uppercase relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.15)] border border-cyan-500/20">
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 animate-[pulse_3s_infinite]" />
            <span className="relative flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Verified Endorsements
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-100 leading-tight">
            Validated by Enterprise Leaders,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
              Founders & Physicians
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
            Real outcomes and testimonials from leaders who deployed AI systems built by Bala.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {testimonialsData.map((test, idx) => {
            const theme = getCategoryTheme(test.domainCategory);
            const CategoryIcon = theme.icon;

            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                key={test.id}
                className={`group p-6 sm:p-7 rounded-3xl bg-slate-900/60 hover:bg-slate-900/90 border ${theme.border} shadow-2xl ${theme.glow} flex flex-col justify-between gap-6 transition-all duration-300 hover:-translate-y-1.5 text-left relative overflow-hidden backdrop-blur-md`}
              >
                {/* Subtle top indicator highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Decorative Quote Mark */}
                <MessageSquareQuote className="absolute top-6 right-6 w-10 h-10 text-white/[0.04] group-hover:text-white/[0.08] transition-colors pointer-events-none" />

                {/* Top Row: Domain Badge & Star Rating */}
                <div className="flex flex-col gap-3 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${theme.badgeBg}`}>
                      <CategoryIcon className="w-3 h-3" />
                      <span>{test.domainBadge}</span>
                    </span>

                    {test.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 font-semibold" title="Verified Collaborator">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  {/* Rating Stars & Quantified Metric Pill */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1 text-amber-400">
                      {Array.from({ length: test.stars }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Quote */}
                <div className="flex flex-col gap-3 relative z-10">
                  <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal italic">
                    "{test.quote}"
                  </p>

                  {/* Quantified Highlight Metric */}
                  <div className="mt-1 p-2.5 rounded-xl bg-slate-950/80 border border-white/10 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className={`text-[11px] font-mono font-bold ${theme.metricText}`}>
                      {test.highlightMetric}
                    </span>
                  </div>
                </div>

                {/* Avatar & Executive Profile */}
                <div className="flex items-center gap-3.5 border-t border-white/10 pt-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/15 shrink-0 bg-slate-900 shadow-md flex items-center justify-center font-mono font-black text-cyan-400 text-sm">
                    <img
                      src={test.avatarUrl}
                      alt={test.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="hidden group-hover:hidden">{test.avatarPlaceholder}</span>
                  </div>

                  <div className="flex flex-col text-left">
                    <div className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      <span>{test.name}</span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      {test.role}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400 font-bold mt-0.5">
                      {test.organization}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom Social Proof Trust Banner */}
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">
                100% Verified Track Record Across Regulated & Edge Environments
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Standard Chartered (India) • Phraze Health (Silicon Valley) • AIBOTS (Malaysia) • Teesside University (London)
              </div>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/bala-venkatesh-67964247/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300 flex items-center gap-2 transition-all cursor-pointer shrink-0 hover:scale-[1.02]"
          >
            <span>View All LinkedIn Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
