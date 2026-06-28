import React from 'react';
import { Lightbulb, Brain, Code, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { servicesData } from '../data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb: Lightbulb,
  Brain: Brain,
  Code: Code,
  Users: Users
};

export default function Services() {
  return (
    <section id="services" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blur */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            What I Do
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100">
            Your Partner in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              AI Innovation
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((srv, idx) => {
            const IconComp = iconMap[srv.iconName] || Brain;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={srv.id}
                className="group p-6 rounded-2.5xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 shadow-xl flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2 text-left"
              >
                <div className="flex justify-between items-center">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-600 font-bold tracking-wider">
                    {srv.num}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-cyan-500 hover:text-slate-950 border border-white/10 hover:border-cyan-400 rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:scale-105"
          >
            Start a Conversation <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
