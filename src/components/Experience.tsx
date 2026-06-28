import React, { useState } from 'react';
import { Calendar, ArrowRight, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { experienceData } from '../data';

export default function Experience() {
  const [activeTab, setActiveTab] = useState(experienceData[0].id);

  const activeExp = experienceData.find((exp) => exp.id === activeTab) || experienceData[0];

  return (
    <section id="experience" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blur */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-left flex flex-col gap-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100">
            10 Years of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Impact
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            From agile startup data labs to leading global banks — designing and deploying AI pipelines that matter.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-4">
          {/* Tabs Selector */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none snap-x border-b lg:border-b-0 lg:border-l border-white/10 lg:pr-4">
            {experienceData.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`snap-center flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-left whitespace-nowrap transition-all duration-300 ${
                  activeTab === exp.id
                    ? 'bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-400 border border-cyan-500/20 lg:border-l-2 lg:border-l-cyan-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    activeTab === exp.id ? 'bg-cyan-400 shadow-md shadow-cyan-400/50' : 'bg-slate-600'
                  }`}
                />
                {exp.company}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="lg:col-span-8 relative min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl text-left flex flex-col gap-5"
              >
                {/* Role & Company Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-cyan-400" />
                      {activeExp.role}
                    </h3>
                    <div className="text-sm font-bold text-indigo-400 mt-1">
                      {activeExp.company}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 h-fit w-fit">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {activeExp.date}
                  </div>
                </div>

                {/* Highlights list */}
                <ul className="flex flex-col gap-3.5">
                  {activeExp.highlights.map((hl, i) => (
                    <li key={i} className="flex gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      {/* Sub-text highlight styling */}
                      <span dangerouslySetInnerHTML={{
                        __html: hl
                          .replace(/80%/g, '<span class="text-rose-400 font-bold font-mono">80%</span>')
                          .replace(/60%/g, '<span class="text-rose-400 font-bold font-mono">~60%</span>')
                          .replace(/15 minutes to under 2 minutes/g, '<span class="text-rose-400 font-bold">15 minutes to under 2 minutes</span>')
                          .replace(/Best Performer of the Year 2024/g, '<span class="text-amber-400 font-bold">Best Performer of the Year 2024</span>')
                          .replace(/Crop Doctor/g, '<span class="text-cyan-400 font-semibold">Crop Doctor</span>')
                          .replace(/TFLite/g, '<span class="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/10">TFLite</span>')
                          .replace(/RAG-based system/g, '<span class="text-cyan-400 font-semibold">RAG-based system</span>')
                      }} />
                    </li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {activeExp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
