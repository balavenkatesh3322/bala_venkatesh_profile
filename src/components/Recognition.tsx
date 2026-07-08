import React from 'react';
import { Award, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Recognition() {
  return (
    <section id="recognition" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blob */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-8 items-center text-center">
        <div className="flex flex-col gap-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-yellow-400">
            Recognition
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100">
            Moments That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400">
              Matter
            </span>
          </h2>
        </div>

        {/* Award Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group p-8 md:p-10 rounded-3xl bg-gradient-to-tr from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/20 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left overflow-hidden"
        >
          {/* Subtle inner gold glow */}
          <div className="absolute inset-0 bg-yellow-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          {/* Trophy Icon Container */}
          <div className="w-16 h-16 rounded-2.5xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-yellow-500/10">
            <Award className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 leading-tight">
              Best Performer of the Year 2024
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Recognized by <strong className="text-slate-100 font-bold">Standard Chartered Bank</strong> for pioneering advanced AI-driven DevSecOps security verification workflows. Automating continuous compliance evaluations transformed complex validation workloads into lightning-fast CI/CD stages.
            </p>
            
            {/* Badge Tag */}
            <div className="mt-2.5 w-fit inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] sm:text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-current" />
              Standard Chartered Bank
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
