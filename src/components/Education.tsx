import React from 'react';
import { GraduationCap, School, ArrowUpRight, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { eduData, certificationsData } from '../data';

export default function Education() {
  return (
    <section id="education" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blur */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 text-left">
        {/* Academic section */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Credentials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100 mt-2">
              Education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eduData.map((edu, idx) => {
              const IconComp = edu.iconType === 'graduation' ? GraduationCap : School;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={edu.id}
                  className="group p-6 rounded-2.5xl bg-white/5 border border-white/10 hover:border-cyan-500/30 flex gap-4 sm:gap-5 shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1.5 justify-center">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider uppercase">
                      {edu.year}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {edu.school} • <span className="text-slate-500">{edu.location}</span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications section */}
        <div className="flex flex-col gap-8 mt-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <Award className="w-6 h-6 text-indigo-400" />
            Professional Certifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificationsData.map((cert, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={cert.id}
                className="group p-6 rounded-2.5xl bg-white/5 border border-white/10 hover:border-indigo-500/30 flex gap-4 sm:gap-5 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1.5 justify-center flex-1">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold tracking-wider uppercase">
                    {cert.issuer}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                    {cert.title}
                  </h4>
                  <div className="pt-1.5">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Verify Credential <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
