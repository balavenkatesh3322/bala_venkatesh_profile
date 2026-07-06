import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/5 py-10 px-6 md:px-12 lg:px-24 z-20">
      {/* Decorative subtle ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 text-xs font-mono text-slate-500">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            © 2026 <span className="text-slate-300 font-semibold">Bala Venkatesh</span>.
          </div>

          {/* Nav footer */}
          <div className="flex gap-6 flex-wrap justify-center text-[11px] sm:text-xs">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={handleScrollTop}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500 hover:text-slate-950 border border-white/10 hover:border-cyan-400 flex items-center justify-center text-slate-300 transition-all duration-300 cursor-pointer group shadow-lg"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

