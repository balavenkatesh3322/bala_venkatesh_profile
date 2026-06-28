import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { statsData } from '../data';

export default function Hero() {
  // Simple elegant counter effects using react hooks
  const [counts, setCounts] = useState({ clients: 0, projects: 0, experience: 0 });

  useEffect(() => {
    const clientsTarget = 42;
    const projectsTarget = 52;
    const experienceTarget = 10;
    const duration = 1500; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        clients: Math.floor(ease * clientsTarget),
        projects: Math.floor(ease * projectsTarget),
        experience: Math.floor(ease * experienceTarget),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 lg:pt-28 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-slate-950 text-white">
      {/* Background Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-600/15 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-600/10 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none animate-pulse-glow-delayed"></div>
      <div className="absolute top-[30%] right-[10%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Text & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-indigo-300">Available to Provide AI Business Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-slate-100"
          >
            Turning <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">AI</span> into
            <br />
            <span className="font-display italic font-light pr-2">Measurable</span>
            <br className="hidden sm:block" />
            Business Value
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            I build <span className="text-cyan-400 font-medium">high-ROI Generative AI</span> pipelines, secure <span className="text-cyan-400 font-medium">RAG</span> systems, and <span className="text-indigo-400 font-medium">Computer Vision</span> solutions. Designed specifically for Founders &amp; CEOs seeking production-grade AI shipped in weeks, not months.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2"
          >
            <a
              href="https://wa.me/919003812808?text=Hi%20Bala%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20business%20AI%20solution%20with%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-102 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
              Get AI Solution Now
            </a>
            <a
              href="#projects"
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold hover:scale-102 transition-all flex items-center justify-center gap-2 text-sm text-slate-200"
            >
              View My Work
            </a>
          </motion.div>

          {/* Guarantees Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mt-5 text-[11px] text-slate-400 font-mono font-medium"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> NDA &amp; IP Compliant</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-cyan-400" /> Fast Weekly Deliverables</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-cyan-400" /> Fixed Price Quotes</span>
          </motion.div>

          {/* Stats Counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-6 pt-8 border-t border-white/5 max-w-md"
          >
            {statsData.map((stat) => {
              let currentValue = stat.value;
              if (stat.id === 'clients') currentValue = counts.clients;
              if (stat.id === 'projects') currentValue = counts.projects;
              if (stat.id === 'experience') currentValue = counts.experience;

              return (
                <div key={stat.id} className="text-left">
                  <div className="text-2xl sm:text-3.5xl font-black text-white flex items-baseline">
                    <span className="font-sans tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                      {currentValue}
                    </span>
                    <span className="text-cyan-400 font-light text-xl ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-mono tracking-wider uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Right: Modern Mockup & Floating Cards */}
        <div className="lg:col-span-5 relative flex items-center justify-center mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] rounded-3xl overflow-visible"
          >
            {/* Morphing ambient shape behind profile */}
            <div className="absolute inset-[-12px] bg-gradient-to-tr from-cyan-500/20 to-indigo-500/10 rounded-[36px] blur-md"></div>

            {/* Profile image container */}
            <div className="relative w-full h-full rounded-2.5xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <img
                src="https://balavenkatesh3322.github.io/bala_venkatesh_profile/images/Bala_profile_pic.jpg"
                alt="Bala Venkatesh"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/400x533/0c1129/ffffff?text=BV';
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
