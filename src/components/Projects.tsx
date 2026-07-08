import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { projectsData } from '../data';

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blob */}
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="text-left flex flex-col gap-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Work
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100">
              Bringing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Ideas to Life
              </span>
            </h2>
          </div>
          <a
            href="https://github.com/balavenkatesh3322"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-3 glass-panel glass-panel-hover rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-xs text-slate-200"
          >
            <Github className="w-4 h-4 text-cyan-400" /> All on GitHub
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={project.id}
              className="group rounded-2.5xl glass-panel glass-panel-hover overflow-hidden flex flex-col text-left"
            >
              {/* Card visual thumb */}
              <div className={`h-40 bg-gradient-to-br ${project.bgGradient} border-b border-white/5 flex items-center justify-center text-5xl relative overflow-hidden shrink-0 transition-transform duration-500`}>
                {/* Visual glow on thumbnail hover */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </span>
              </div>

              {/* Card body */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full glass-panel text-[9px] font-mono font-bold text-cyan-400 tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{
                    __html: project.desc
                      .replace(/Best Performer award 2024/g, '<span class="text-amber-400 font-semibold">Best Performer award 2024</span>')
                      .replace(/60% reduction/g, '<span class="text-rose-400 font-bold">60% reduction</span>')
                  }} />
                </div>

                {project.githubLink && (
                  <div className="pt-2">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
