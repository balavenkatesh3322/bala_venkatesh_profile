import React from 'react';
import { Bot, LineChart, Award, ScanFace, FlaskConical, FileText, Github, ArrowUpRight, Globe, Sparkles, ExternalLink, Cpu, Boxes } from 'lucide-react';
import { motion } from 'motion/react';
import { ossReposData } from '../data';
import WaterWaveEffect from './WaterWaveEffect';
import SlideToOpenRepo from './SlideToOpenRepo';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe: Globe,
  Bot: Bot,
  LineChart: LineChart,
  Award: Award,
  ScanFace: ScanFace,
  FlaskConical: FlaskConical,
  FileText: FileText
};

export default function OpenSource() {
  return (
    <section id="open-source" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      <WaterWaveEffect variant="top-right" color="cyan" />
      {/* Decorative Blob */}
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-left flex flex-col gap-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Community & Inspiration
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100">
            Bala Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Open Source Projects
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            Open-source projects and developer resources shared freely with developers around the globe.
          </p>
        </div>

        {/* Featured Showcase Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Featured Showcase Banner 1: Bala AI Studio Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-7 rounded-3xl glass-panel bg-gradient-to-br from-cyan-950/70 via-slate-900/90 to-indigo-950/70 border border-cyan-400/50 flex flex-col justify-between gap-6 text-left shadow-2xl relative overflow-hidden group hover:border-cyan-300 transition-all"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30">
                <Sparkles className="w-6 h-6 text-slate-950 animate-pulse" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-cyan-400" /> Featured Showcase
                  </span>
                  <span className="text-cyan-400 text-xs font-mono font-bold">BALA APP STORE</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Bala App Store
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Explore Bala's full suite of interactive AI applications, generative agents, RAG implementations, and web products live in one place.
                </p>
              </div>
            </div>

            <a
              href="https://balavenkatesh3322.github.io/bala-ai-studio/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto self-start px-6 py-3 bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-300 hover:from-cyan-300 hover:to-indigo-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 shrink-0 group/btn cursor-pointer hover:scale-[1.02] relative z-10"
            >
              <span>Explore Bala App Store</span>
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Featured Showcase Banner 2: Neural Decode (3D AI Architectures) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="p-6 sm:p-7 rounded-3xl glass-panel bg-gradient-to-br from-purple-950/70 via-slate-900/90 to-indigo-950/70 border border-purple-400/50 flex flex-col justify-between gap-6 text-left shadow-2xl relative overflow-hidden group hover:border-purple-300 transition-all"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-400 to-indigo-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30">
                <Boxes className="w-6 h-6 text-slate-950 animate-pulse" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-400/20 border border-purple-400/40 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-purple-400" /> Featured Showcase
                  </span>
                  <span className="text-purple-300 text-xs font-mono font-bold">3D AI VISUALIZER</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Neural Decode — 3D AI Architectures
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Interactive 3D spatial visualizer built by Bala to decode complex neural network architectures, layer mechanics, and deep learning models in 3D.
                </p>
              </div>
            </div>

            <a
              href="https://neuraldecode.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto self-start px-6 py-3 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-300 hover:from-purple-300 hover:to-indigo-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2.5 shrink-0 group/btn cursor-pointer hover:scale-[1.02] relative z-10"
            >
              <span>Explore 3D AI Architectures</span>
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Featured Showcase Banner 3: Open LLM Registry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="p-6 sm:p-7 rounded-3xl glass-panel bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-teal-950/60 border border-emerald-400/40 flex flex-col justify-between gap-6 text-left shadow-2xl relative overflow-hidden group hover:border-emerald-300 transition-all"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                <Cpu className="w-6 h-6 text-slate-950 animate-pulse" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-emerald-400" /> Featured Showcase
                  </span>
                  <span className="text-emerald-400 text-xs font-mono font-bold">LLM REGISTRY</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Open LLM Registry
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Comprehensive open-source catalog & directory for open weights Large Language Models, architectures, and evaluation benchmarks.
                </p>
              </div>
            </div>

            <a
              href="https://balavenkatesh3322.github.io/open-llm-registry/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto self-start px-6 py-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 shrink-0 group/btn cursor-pointer hover:scale-[1.02] relative z-10"
            >
              <span>Explore LLM Registry</span>
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Featured Showcase Banner 4: Awesome Developer Portfolio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="p-6 sm:p-7 rounded-3xl glass-panel bg-gradient-to-br from-indigo-950/50 via-slate-900/80 to-purple-950/50 border border-indigo-500/30 flex flex-col justify-between gap-6 text-left shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 shadow-lg">
                <Globe className="w-6 h-6 text-indigo-300 animate-pulse" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-indigo-400" /> Featured Showcase
                  </span>
                  <span className="text-slate-400 text-xs font-mono">2,000+ Portfolios</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Awesome Developer Portfolio
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Browse 2,000+ world-class developer portfolio designs curated to inspire engineers. Add your own portfolio to showcase your work to the world!
                </p>
              </div>
            </div>

            <a
              href="https://balavenkatesh3322.github.io/awesome-developer-porfolio/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto self-start px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-black rounded-2xl text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2.5 shrink-0 group/btn cursor-pointer hover:scale-[1.02] relative z-10"
            >
              <span>Browse 2000+ Portfolios</span>
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* OSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ossReposData.map((repo, idx) => {
            const IconComp = iconMap[repo.iconName] || FileText;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={repo.id}
                className="group p-6 rounded-2.5xl bg-white/5 border border-white/10 hover:border-cyan-500/30 flex flex-col justify-between gap-5 shadow-xl hover:-translate-y-1.5 hover:shadow-black/60 transition-all duration-300 text-left"
              >
                <div className="flex flex-col gap-4">
                  {/* Repo Header & Icon */}
                  <div className="flex items-center justify-between gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${repo.bgHex}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <a
                      href={repo.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
                      title="Open in new tab"
                    >
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      <a href={repo.githubLink} target="_blank" rel="noreferrer" className="hover:underline">
                        {repo.name}
                      </a>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {repo.desc}
                    </p>
                  </div>

                  {/* Tech stack badge */}
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-500 pt-1">
                    <Github className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                    <span>{repo.tech}</span>
                  </div>
                </div>

                {/* iPhone Slide to Call / Attend Option Slider */}
                <div className="pt-3 border-t border-white/5">
                  <SlideToOpenRepo
                    url={repo.githubLink}
                    label="slide to open repo"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
