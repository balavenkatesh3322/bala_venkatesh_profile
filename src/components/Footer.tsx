import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950/80 border-t border-white/5 py-10 px-6 md:px-12 lg:px-24 text-slate-500 z-20 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
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
    </footer>
  );
}
