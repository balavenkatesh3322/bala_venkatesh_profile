import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Cpu, 
  DollarSign, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  BarChart3, 
  Flame, 
  Activity, 
  MousePointerClick,
  Sparkles,
  Users,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface BottleneckType {
  id: string;
  name: string;
  beforeLabel: string;
  afterLabel: string;
  beforeCost: number; // relative weight
  afterCost: number;
  beforeSpeed: string;
  afterSpeed: string;
  strategy: string;
  color: string;
  techStack: string[];
}

const bottlenecks: BottleneckType[] = [
  {
    id: 'manual',
    name: 'Manual Operations & High Backlogs',
    beforeLabel: 'Manual document sorting, repetitive manual entries, slow customer follow-ups.',
    afterLabel: 'Automated server-side GenAI workflows, intelligent OCR, and autonomous router agents.',
    beforeCost: 85,
    afterCost: 15,
    beforeSpeed: 'Takes hours/days',
    afterSpeed: 'Instant (milliseconds)',
    strategy: 'Builds secure LLM proxy server-side pipelines with self-hosted vectors, enabling agents to parse documents in parallel with zero manual overhead.',
    color: 'cyan',
    techStack: ['Gemini Pro API', 'LangGraph Supervisor', 'Node.js Express Proxy', 'Vector DB']
  },
  {
    id: 'infra',
    name: 'Expensive Legacy Cloud Infrastructure',
    beforeLabel: 'Over-provisioned VMs, bloated databases, high cold starts, and idle cloud billing.',
    afterLabel: 'Serverless containers (Cloud Run), scale-to-zero databases, and bundle optimization.',
    beforeCost: 90,
    afterCost: 35,
    beforeSpeed: 'High Idle Overhead',
    afterSpeed: 'Pay-per-execution / Zero Idle Cost',
    strategy: 'Migrates monolithic servers into containerized Cloud Run jobs with scale-to-zero capabilities, and introduces edge caching to slash API calls.',
    color: 'indigo',
    techStack: ['Docker & Cloud Run', 'Scale-to-zero PostgreSQL', 'Nginx Cache Routing', 'CJS/ESM Bundle Optimizer']
  },
  {
    id: 'product',
    name: 'Outdated UX & Low User Conversions',
    beforeLabel: 'Cluttered static templates, rigid unresponsive views, no micro-animations, stale style.',
    afterLabel: 'Premium fluid Glassmorphism interfaces, motion choreography, and high-conversion loops.',
    beforeCost: 75,
    afterCost: 20,
    beforeSpeed: 'High bounce rate',
    afterSpeed: 'Captivating visual delight',
    strategy: 'Applies rigorous Swiss typographic grids, flawless off-white/charcoal contrasts, and interactive feedback indicators that retain visitors longer.',
    color: 'pink',
    techStack: ['Tailwind CSS 4.0', 'Motion/React Choreography', 'Responsive Canvas Engines', 'Lucide Vector Icons']
  },
  {
    id: 'offline',
    name: 'No Connectivity / Slow Rural Operation',
    beforeLabel: 'App completely breaks when offline, slow data transfer over 2G/3G networks.',
    afterLabel: 'On-device tiny models (TFLite), local SQL databases, and sync queues.',
    beforeCost: 80,
    afterCost: 25,
    beforeSpeed: 'Fails / Infinite Loading',
    afterSpeed: 'Instant Offline Processing',
    strategy: 'Implements locally cached state machines combined with lightweight on-device models that process inputs locally and sync once network restores.',
    color: 'emerald',
    techStack: ['On-Device TFLite', 'SQLite Local Stores', 'Network Sync Queues', 'Service Workers']
  }
];

export default function BusinessImprover() {
  const [selectedId, setSelectedId] = useState<string>('manual');
  const [teamSize, setTeamSize] = useState<number>(15);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);

  const activeBottleneck = bottlenecks.find(b => b.id === selectedId) || bottlenecks[0];

  // Calculate dynamic business savings metrics
  const monthlySalaryEstimate = 5000; // Average cost of employee/operational hours
  const beforeExpense = Math.round(teamSize * monthlySalaryEstimate * (activeBottleneck.beforeCost / 100));
  const afterExpense = Math.round(teamSize * monthlySalaryEstimate * (activeBottleneck.afterCost / 100));
  const savings = beforeExpense - afterExpense;
  const timeSavedPercent = 100 - Math.round((activeBottleneck.afterCost / activeBottleneck.beforeCost) * 100);

  // Rotate simulator visual steps
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, [isSimulating, selectedId]);

  return (
    <section id="business-improver" className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-950 text-white overflow-hidden border-b border-white/5 z-20">
      
      {/* Decorative premium floating ambient blur vectors */}
      <div className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] bg-indigo-500/[0.04] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] bg-cyan-500/[0.04] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-left flex flex-col gap-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              Scale & Automate Your Company
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              How Bala Improves Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400">Business with Tech</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
              Bala doesn't just write code. He crafts custom, intelligent architectures that eliminate friction, cut high operational bills, and automate manually intensive pipelines.
            </p>
          </div>

          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-xs font-mono font-bold text-slate-300">Live ROI Simulator Active</span>
          </div>
        </div>

        {/* INTERACTIVE WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: SELECTOR & METRICS (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            {/* STEP 1: SELECT BOTTLENECK */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 flex flex-col gap-5">
              <div>
                <span className="text-[9px] font-mono font-bold uppercase text-slate-500 tracking-wider">Interactive Diagnostic</span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">Select Your Current Tech Bottleneck</h3>
              </div>

              <div className="flex flex-col gap-3">
                {bottlenecks.map((b) => {
                  const isSelected = b.id === selectedId;
                  return (
                    <button
                      key={b.id}
                      onClick={() => {
                        setSelectedId(b.id);
                        setActiveStep(0);
                      }}
                      className={`group w-full p-4 rounded-2xl text-left border transition-all duration-300 select-none cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-cyan-500/[0.07] border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                          : 'glass-panel glass-panel-hover'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-cyan-500/20 text-cyan-300' 
                            : 'bg-white/5 text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {b.id === 'manual' && <Layers className="w-4 h-4" />}
                          {b.id === 'infra' && <DollarSign className="w-4 h-4" />}
                          {b.id === 'product' && <BarChart3 className="w-4 h-4" />}
                          {b.id === 'offline' && <Cpu className="w-4 h-4" />}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-xs font-black transition-colors ${isSelected ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'}`}>
                            {b.name}
                          </span>
                          <span className="text-[10px] text-slate-500 mt-0.5 max-w-[240px] truncate">
                            {b.techStack.join(' • ')}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                        isSelected ? 'transform translate-x-1 text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: METRIC SCALE SLIDER */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono font-bold uppercase text-slate-500 tracking-wider">Scalability Estimator</span>
                  <h3 className="text-base font-extrabold text-white mt-0.5">Scale Your Operational Team</h3>
                </div>
                <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-xs font-mono font-black text-cyan-300">
                  {teamSize} Members
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  <span>Small Startup (2)</span>
                  <span>Enterprise (100)</span>
                </div>
              </div>

              {/* SAVINGS HIGHLIGHT BAR */}
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Estimated Monthly Savings</span>
                  <span className="text-2xl font-black text-emerald-400">${savings.toLocaleString()}</span>
                </div>
                <div className="text-right flex flex-col">
                  <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Efficiency Increase</span>
                  <span className="text-lg font-black text-cyan-400">+{timeSavedPercent}% Faster</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: DYNAMIC SIMULATOR GRAPH & AFTER STREAM (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex-1 rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative min-h-[460px] text-left">
              
              {/* Top ambient glowing decoration */}
              <div className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
                activeBottleneck.id === 'manual' ? 'bg-cyan-500/10' :
                activeBottleneck.id === 'infra' ? 'bg-indigo-500/10' :
                activeBottleneck.id === 'product' ? 'bg-pink-500/10' : 'bg-emerald-500/10'
              }`} />

              {/* SIMULATOR SCREEN HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Transformation Sandbox</span>
                  <h3 className="text-base font-extrabold text-white mt-0.5">Continuous Automation Stream</h3>
                </div>

                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-[9px] font-mono font-bold text-red-400">
                    Legacy Workflow
                  </span>
                  <span className="text-slate-600 self-center">➔</span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono font-bold text-emerald-400">
                    Bala's Stack
                  </span>
                </div>
              </div>

              {/* CENTRAL STAGE: BEFORE VS AFTER FLOW VISUAL */}
              <div className="flex-1 flex flex-col justify-center py-6 sm:py-8 gap-8 relative z-10">
                
                {/* BEFORE ROW (Legacy System) */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" /> Before Optimization
                    </span>
                    <span className="text-xs font-mono text-slate-500">{activeBottleneck.beforeSpeed}</span>
                  </div>

                  {/* Flow pipeline */}
                  <div className="relative h-12 rounded-xl bg-slate-900/60 border border-white/5 flex items-center px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/[0.02]" />
                    <p className="text-xs text-slate-400 font-medium z-10 max-w-[85%] leading-relaxed truncate">
                      {activeBottleneck.beforeLabel}
                    </p>

                    {/* Bottleneck indicator */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[8px] font-mono font-bold text-red-400 animate-pulse">
                      <Flame className="w-2.5 h-2.5" /> High Friction
                    </div>
                    
                    {/* Animated slow sluggish flow dots */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500/10 overflow-hidden">
                      <motion.div 
                        className="h-full w-20 bg-red-500/40"
                        animate={{ x: [-80, 500] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  </div>
                </div>

                {/* TRANSFER ANIMATION ICON */}
                <div className="flex justify-center -my-3">
                  <div className="w-8 h-8 rounded-full glass-panel border-cyan-500/30 flex items-center justify-center animate-[bounce_2s_infinite]">
                    <Zap className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                {/* AFTER ROW (Bala's Clean Code Stack) */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Optimized Tech Pipeline
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{activeBottleneck.afterSpeed}</span>
                  </div>

                  {/* Flow pipeline */}
                  <div className="relative h-12 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/20 flex items-center px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.02] to-indigo-500/[0.02]" />
                    
                    <p className="text-xs text-slate-200 font-bold z-10 max-w-[85%] leading-relaxed truncate flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      {activeBottleneck.afterLabel}
                    </p>

                    {/* Optimized indicator */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[8px] font-mono font-bold text-emerald-400">
                      <CheckCircle className="w-2.5 h-2.5" /> Automated
                    </div>

                    {/* Animated hyper-speed glowing dots */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500/10 overflow-hidden">
                      <motion.div 
                        className="h-full w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_8px_#06b6d4]"
                        animate={{ x: [-100, 600] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* STRATEGY SUMMARY ACCORDION */}
              <div className="border-t border-white/5 pt-5 flex flex-col gap-3 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">How Bala Implements This</span>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mt-1">
                    {activeBottleneck.strategy}
                  </p>
                </div>

                {/* TECHNOLOGY SHIELDS USED */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[9px] font-mono text-slate-500 font-bold self-center mr-1">Deployed via:</span>
                  {activeBottleneck.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 rounded-lg glass-panel text-[9px] font-mono font-bold text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* STATS STRIP / VALUE CARD CAROUSEL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl glass-panel text-left flex flex-col gap-2.5 hover:border-cyan-500/20 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">50% +</span>
            <h4 className="text-xs font-bold text-slate-200">Server Bill Reductions</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">By converting traditional persistent server machines to scale-to-zero container routing.</p>
          </div>

          <div className="p-6 rounded-3xl glass-panel text-left flex flex-col gap-2.5 hover:border-indigo-500/20 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-black text-indigo-400">10x</span>
            <h4 className="text-xs font-bold text-slate-200">Execution Speedup</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Leveraging highly parallel server-side pipelines and on-device offline storage systems.</p>
          </div>

          <div className="p-6 rounded-3xl glass-panel text-left flex flex-col gap-2.5 hover:border-pink-500/20 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-black text-pink-400">80%</span>
            <h4 className="text-xs font-bold text-slate-200">Operational Automation</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Replacing manually bloated workflows with smart sovereign AI router agents and LLM scrapers.</p>
          </div>

          <div className="p-6 rounded-3xl glass-panel text-left flex flex-col gap-2.5 hover:border-emerald-500/20 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">0%</span>
            <h4 className="text-xs font-bold text-slate-200">Hallucination Guarantee</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Grounded retrieval structures ensure all synthetic outcomes correspond to verified policies.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
