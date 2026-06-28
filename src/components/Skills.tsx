import React from 'react';
import {
  Code,
  Brain,
  Link as LinkIcon,
  Compass,
  Users,
  Sparkles,
  Terminal,
  ScanFace,
  Flame,
  Cloud,
  Box,
  Zap,
  Database,
  Search,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { skillsData } from '../data';

// Map skills to icons and specific glow borders
interface SkillConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const skillConfigs: Record<string, SkillConfig> = {
  'Python': { icon: Code, color: 'group-hover:text-blue-400 group-hover:border-blue-400/30' },
  'Java': { icon: Code, color: 'group-hover:text-orange-400 group-hover:border-orange-400/30' },
  'Generative AI': { icon: Brain, color: 'group-hover:text-purple-400 group-hover:border-purple-400/30' },
  'LangChain': { icon: LinkIcon, color: 'group-hover:text-cyan-400 group-hover:border-cyan-400/30' },
  'LangGraph': { icon: Compass, color: 'group-hover:text-indigo-400 group-hover:border-indigo-400/30' },
  'crewAI': { icon: Users, color: 'group-hover:text-teal-400 group-hover:border-teal-400/30' },
  'Prompt Engineering': { icon: Sparkles, color: 'group-hover:text-yellow-400 group-hover:border-yellow-400/30' },
  'NLP': { icon: Terminal, color: 'group-hover:text-emerald-400 group-hover:border-emerald-400/30' },
  'Computer Vision': { icon: ScanFace, color: 'group-hover:text-rose-400 group-hover:border-rose-400/30' },
  'PyTorch': { icon: Flame, color: 'group-hover:text-red-500 group-hover:border-red-500/30' },
  'Azure Cloud': { icon: Cloud, color: 'group-hover:text-sky-400 group-hover:border-sky-400/30' },
  'Docker': { icon: Box, color: 'group-hover:text-cyan-500 group-hover:border-cyan-500/30' },
  'FastAPI': { icon: Zap, color: 'group-hover:text-emerald-400 group-hover:border-emerald-400/30' },
  'Vector DBs': { icon: Database, color: 'group-hover:text-blue-400 group-hover:border-blue-400/30' },
  'RAG Systems': { icon: Search, color: 'group-hover:text-indigo-400 group-hover:border-indigo-400/30' },
  'Ollama': { icon: Cpu, color: 'group-hover:text-fuchsia-400 group-hover:border-fuchsia-400/30' },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blob */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Toolkit
            </span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {skillsData.map((skill, idx) => {
            const config = skillConfigs[skill] || { icon: Code, color: 'group-hover:text-cyan-400' };
            const IconComp = config.icon;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.02 }}
                key={skill}
                className={`group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 ${config.color} text-left cursor-default`}
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 group-hover:bg-slate-900 flex items-center justify-center text-slate-400 transition-colors duration-300">
                  <IconComp className="w-4.5 h-4.5 transition-colors" />
                </div>
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-300 group-hover:text-white transition-colors">
                  {skill}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
