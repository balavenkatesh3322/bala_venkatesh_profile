import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Terminal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { statsData } from '../data';

export default function Hero() {
  // Simple elegant counter effects using react hooks
  const [counts, setCounts] = useState({ clients: 0, projects: 0, experience: 0 });
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);

  const systemStatuses = [
    "Brainstorming custom GenAI agents... 🤖",
    "Converting complex tech into 10x business ROI 📈",
    "Testing interactive AI sandboxes & code ⚡",
    "Optimizing enterprise RAG pipelines 🎯",
    "Writing Chapter 4 of my upcoming AI Book 📖",
    "Developing scalable full-stack applications 🚀",
    "Refining custom LLM prompt strategies 💻",
    "Mentoring builders & designing architecture 🏛️",
    "Available for custom enterprise AI projects 🤝"
  ];

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setActiveStatusIdx((prev) => (prev + 1) % systemStatuses.length);
    }, 2800);
    return () => clearInterval(statusInterval);
  }, []);

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
          <div className="flex flex-col gap-4">
            <div className="flex items-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-slate-900/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 w-full sm:w-auto overflow-hidden"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-slate-400 text-[9px] sm:text-[10px] tracking-widest uppercase shrink-0">Bala Status:</span>
                <div className="h-4 overflow-hidden relative flex-1 sm:w-64 md:w-80 min-w-[110px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeStatusIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute text-cyan-300 font-bold tracking-normal text-[10px] sm:text-xs whitespace-nowrap truncate max-w-full"
                    >
                      {systemStatuses[activeStatusIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
            
            {/* Inspirational Slogan Banner */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="text-xs sm:text-sm font-mono text-cyan-400/90 border-l-2 border-cyan-400/50 pl-3.5 italic tracking-wide"
            >
              "Technology becomes valuable only when solving a business problem"
            </motion.div>
          </div>

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


          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2 w-full"
          >
            <a
              href="https://wa.me/919003812808?text=Hi%20Bala%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20business%20AI%20solution%20with%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-102 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
              Get AI Solution Now
            </a>
            <a
              href="#workflow-academy"
              className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold hover:scale-102 transition-all flex items-center justify-center gap-2 text-sm text-slate-200 cursor-pointer"
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
                src="images/Bala_profile_pic.jpg"
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

      {/* Centered Scroll Down Cue with Micro-Interaction */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 cursor-pointer group select-none"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <motion.span 
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] font-mono tracking-[0.3em] text-slate-400 group-hover:text-cyan-400 group-hover:tracking-[0.35em] transition-all duration-300 uppercase font-bold"
        >
          Scroll to Explore Systems
        </motion.span>
        
        <div className="w-[20px] h-[34px] rounded-full border border-slate-700 group-hover:border-cyan-400/80 flex justify-center p-1.5 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm bg-slate-950/25">
          <motion.div
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          />
        </div>
        
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors animate-bounce" />
      </div>
    </section>
  );
}
