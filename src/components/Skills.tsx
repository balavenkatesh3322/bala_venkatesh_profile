import React, { useState } from 'react';
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
  Cpu,
  Layers,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillItem {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  glowClass: string;
}

interface ToolkitCategory {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  subtitle: string;
  businessImpact: string;
  skills: SkillItem[];
}

const categories: ToolkitCategory[] = [
  {
    id: 'agentic',
    title: 'Agentic & Generative AI',
    badge: 'Enterprise Automation',
    icon: Brain,
    subtitle: 'Autonomous workflows and self-improving knowledge agents',
    businessImpact: '⚡ Automates 80%+ of manual compliance reviews, secure document indexing, and operations routing.',
    skills: [
      { name: 'Generative AI', desc: 'Bespoke LLM integrations to automate high-volume operations & analytical decisions.', icon: Brain, colorClass: 'text-purple-400', glowClass: 'group-hover:border-purple-500/30 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]' },
      { name: 'RAG Systems', desc: 'Secure retrieval-augmented generation pipelines for fast Q&A over private archives.', icon: Search, colorClass: 'text-cyan-400', glowClass: 'group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]' },
      { name: 'crewAI', desc: 'Multi-agent coordination platforms designed to execute parallel, multi-role expert workflows.', icon: Users, colorClass: 'text-emerald-400', glowClass: 'group-hover:border-emerald-500/30 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]' },
      { name: 'LangGraph', desc: 'Stateful, cyclical agent routing frameworks to manage complex diagnostic workflows.', icon: Compass, colorClass: 'text-indigo-400', glowClass: 'group-hover:border-indigo-500/30 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]' },
      { name: 'LangChain', desc: 'Modular chains connecting models, external tools, databases, and application layouts.', icon: LinkIcon, colorClass: 'text-blue-400', glowClass: 'group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]' },
      { name: 'Prompt Engineering', desc: 'Token-optimized prompt templating to reduce latency, prevent hallucinations, and lower costs.', icon: Sparkles, colorClass: 'text-yellow-400', glowClass: 'group-hover:border-yellow-500/30 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.15)]' }
    ]
  },
  {
    id: 'cognitive',
    title: 'Cognitive NLP & Vision',
    badge: 'Cognitive Intelligence',
    icon: Terminal,
    subtitle: 'Structuring intelligence from high-volume audio, text, and visual sources',
    businessImpact: '⚡ Converts legacy file silos, images, and raw customer recordings into structured, searchable tables.',
    skills: [
      { name: 'NLP', desc: 'Domain-specific Named Entity Recognition (NER) to automate documentation.', icon: Terminal, colorClass: 'text-emerald-400', glowClass: 'group-hover:border-emerald-500/30 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]' },
      { name: 'Computer Vision', desc: 'Custom deep neural classifiers configured to run real-time anomaly inspections.', icon: ScanFace, colorClass: 'text-rose-400', glowClass: 'group-hover:border-rose-500/30 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.15)]' },
      { name: 'PyTorch', desc: 'Robust model architecture fine-tuning with custom proprietary weights and datasets.', icon: Flame, colorClass: 'text-red-400', glowClass: 'group-hover:border-red-500/30 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]' },
      { name: 'Python', desc: 'Core analytical backbone for mathematical programming, pipelines, and AI engineering.', icon: Code, colorClass: 'text-sky-400', glowClass: 'group-hover:border-sky-500/30 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]' }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Enterprise MLOps & Architecture',
    badge: 'Scale & Performance',
    icon: Cloud,
    subtitle: 'Deploying high-throughput model endpoints with robust microservices',
    businessImpact: '⚡ Implements highly secure, containerized cloud and on-prem architectures running 24/7.',
    skills: [
      { name: 'Azure Cloud', desc: 'Architecting secure model hosting, policy rules, and automated cloud pipelines.', icon: Cloud, colorClass: 'text-sky-400', glowClass: 'group-hover:border-sky-500/30 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]' },
      { name: 'Docker', desc: 'Workload isolation and containerized environments to ensure reliable runtime.', icon: Box, colorClass: 'text-cyan-400', glowClass: 'group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]' },
      { name: 'FastAPI', desc: 'Ultra-fast, asynchronous REST APIs tailored for model hosting and pipeline triggers.', icon: Zap, colorClass: 'text-emerald-400', glowClass: 'group-hover:border-emerald-500/30 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]' },
      { name: 'Vector DBs', desc: 'Optimized vector indexes (pgvector, Qdrant) handling ultra-low latency similarity queries.', icon: Database, colorClass: 'text-indigo-400', glowClass: 'group-hover:border-indigo-500/30 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]' },
      { name: 'Ollama', desc: 'Running smaller, highly optimized open-source model weights fully offline and local.', icon: Cpu, colorClass: 'text-fuchsia-400', glowClass: 'group-hover:border-fuchsia-500/30 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.15)]' },
      { name: 'Java', desc: 'Scalable backend architectures and legacy enterprise systems handling heavy logistics streams.', icon: Code, colorClass: 'text-orange-400', glowClass: 'group-hover:border-orange-500/30 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]' }
    ]
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>('agentic');

  const currentCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Premium Background Glow Nodes */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest font-mono">
            <Layers className="w-3.5 h-3.5" />
            Capability Suite
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100 mt-1">
            Business{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              Toolkit
            </span>
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed mt-1">
            Enterprise-ready frameworks, cloud systems, and cognitive intelligence curated to solve core business problems.
          </p>
        </div>

        {/* Swipeable Tabs Container (Optimized for Mobile with Horizontal Scroll + Subtle Clues) */}
        <div className="w-full flex flex-col gap-2">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest text-center sm:hidden mb-1 flex items-center justify-center gap-1">
            <span>Swipe Left/Right to Explore Capabilities</span>
            <Activity className="w-3 h-3 animate-pulse text-cyan-500" />
          </div>
          
          <div className="flex overflow-x-auto scrollbar-none sm:justify-center items-center gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeTab === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2.5 px-4.5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
                    isActive
                      ? 'glass-panel text-cyan-300 shadow-[0_4px_20px_rgba(6,182,212,0.15)] border-2 border-cyan-400/50'
                      : 'glass-panel text-slate-400 hover:text-slate-200 hover:glass-panel-hover'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panel Content Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full flex flex-col gap-8"
          >
            {/* Category Summary Glass Card */}
            <div className="relative p-6 sm:p-8 rounded-3xl glass-panel overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/[0.02] via-transparent to-indigo-500/[0.02] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-cyan-400/10 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                    {currentCategory.badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                    {currentCategory.subtitle}
                  </h3>
                </div>

                {/* Business Value Stat Card */}
                <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 md:max-w-md w-full">
                  <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider">
                      Business Outcome
                    </div>
                    <p className="text-xs text-slate-300 font-semibold mt-0.5 leading-snug">
                      {currentCategory.businessImpact}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid of Modular Business-Level Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
              {currentCategory.skills.map((skill, idx) => {
                const SkillIcon = skill.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    key={skill.name}
                    className={`group relative p-5 rounded-2.5xl glass-panel glass-panel-hover flex flex-col gap-3 text-left ${skill.glowClass}`}
                  >
                    {/* Floating Glow Spot */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/[0.015] blur-xl pointer-events-none transition-all duration-500" />
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl glass-panel group-hover:bg-slate-900 flex items-center justify-center text-slate-400 transition-all duration-300">
                          <SkillIcon className={`w-4.5 h-4.5 transition-colors ${skill.colorClass}`} />
                        </div>
                        <h4 className="text-sm font-bold tracking-tight text-slate-200 group-hover:text-white transition-colors">
                          {skill.name}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {skill.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
