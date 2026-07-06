import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-16 px-6 md:px-12 lg:px-24 bg-slate-950/40 z-20 overflow-hidden">
      {/* Subtle background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          <div className="relative inline-flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-md overflow-hidden max-w-4xl w-full">
            {/* Gloss shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
            
            <div className="flex flex-col items-center gap-3.5 relative z-10">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-emerald-100 to-cyan-300 leading-tight">
                "Aspire to Inspire Before I Expire"
              </h3>
              <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/40 to-emerald-500/40 mt-1" />
              <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-mono font-medium mt-1">
                My Core Philosophy &amp; Life Mission
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
