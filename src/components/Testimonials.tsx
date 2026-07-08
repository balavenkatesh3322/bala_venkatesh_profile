import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { motion } from 'motion/react';
import { testimonialsData } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blur */}
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100">
            Voices from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              My Network
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((test, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={test.id}
              className="group p-6 rounded-2.5xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/20 shadow-xl flex flex-col justify-between gap-6 transition-all duration-300 hover:-translate-y-1 text-left relative"
            >
              {/* Decorative Quote Icon */}
              <MessageSquareQuote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-cyan-500/10 transition-colors" />

              <div className="flex flex-col gap-4">
                {/* Star rating */}
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: test.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light italic relative z-10">
                  "{test.quote}"
                </p>
              </div>

              {/* Avatar & Info */}
              <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/10 shrink-0 bg-slate-900">
                  <img
                    src={test.avatarUrl}
                    alt={test.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/48x48/0c112a/ffffff?text=${test.avatarPlaceholder}`;
                    }}
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {test.name}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-mono tracking-wider mt-0.5 leading-none">
                    {test.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
