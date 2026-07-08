import React from 'react';
import { GraduationCap, School, ArrowUpRight, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { eduData, certificationsData } from '../data';

export default function Education() {
  return (
    <section id="education" className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blur */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 items-center text-center">
        {/* Academic section */}
        <div className="flex flex-col gap-8 items-center w-full max-w-2xl mx-auto">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Credentials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100 mt-2">
              Education
            </h2>
          </div>

          <div className="w-full text-left">
            {eduData
              .filter((edu) => edu.location.toLowerCase().includes('london'))
              .map((edu) => {
                const IconComp = edu.iconType === 'graduation' ? GraduationCap : School;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    key={edu.id}
                    className="group p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-cyan-500/30 hover:border-cyan-400 flex flex-col sm:flex-row gap-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  >
                    {/* Glowing background spot */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300 shadow-lg shadow-cyan-500/10">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col gap-2 justify-center flex-1">
                      <span className="text-xs font-mono text-cyan-400 font-black tracking-widest uppercase">
                        {edu.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100">
                        {edu.degree}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-300 font-medium">
                        {edu.school}
                      </p>
                      <div className="mt-2.5 self-start">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-mono font-black border border-cyan-400/30 tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.25)] animate-pulse">
                          📍 {edu.location}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
