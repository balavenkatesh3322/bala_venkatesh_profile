import React from 'react';
import { Bot, LineChart, Award, ScanFace, FlaskConical, FileText, Github, ArrowUpRight, Globe } from 'lucide-react';
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
            Free tools for developers worldwide.
          </p>
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
                data-tilt
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
