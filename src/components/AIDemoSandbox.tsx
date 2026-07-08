import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Bot, Terminal, CheckCircle2, ChevronRight, Loader2, 
  Zap, Users, AlertTriangle, Cpu, Layers, DollarSign, Clock, 
  TrendingUp, RefreshCw, Trophy, MessageSquare, Award, ArrowRight, ShieldAlert, Play, HeartHandshake
} from 'lucide-react';

// Game Types
interface Agent {
  id: string;
  name: string;
  cost: number;
  backlogReduction: number; // Hours saved per round
  growthBoost: number; // Percentage growth boost
  description: string;
  techStack: string;
  icon: any;
}

interface Crisis {
  id: number;
  title: string;
  description: string;
  backlogIncrease: number;
  recommendation: string;
  options: {
    text: string;
    action: () => void;
  }[];
}

const AVAILABLE_AGENTS: Agent[] = [
  {
    id: 'router',
    name: "Semantic Intent Router",
    cost: 8000,
    backlogReduction: 35,
    growthBoost: 20,
    description: "Intelligently classifies, tags, and routes inbound enterprise communications instantly.",
    techStack: "Gemini, LangGraph routing, Redis caching",
    icon: Cpu
  },
  {
    id: 'rag',
    name: "Vector RAG Knowledge Base",
    cost: 12000,
    backlogReduction: 45,
    growthBoost: 30,
    description: "Provides instant human-grade answers to internal guidelines, manuals, and client files.",
    techStack: "pgvector, Hybrid Keyword-Dense Search, Chunking Pipeline",
    icon: Layers
  },
  {
    id: 'crew',
    name: "CrewAI CRM Sales Agent",
    cost: 15000,
    backlogReduction: 60,
    growthBoost: 50,
    description: "Scrapes inbound sign-up domains, enriches lead data, drafts personalized responses, and pushes alerts.",
    techStack: "CrewAI Framework, HubSpot API, Deeplead Scraper",
    icon: Users
  },
  {
    id: 'finance',
    name: "Multi-Agent Document Auditor",
    cost: 10000,
    backlogReduction: 40,
    growthBoost: 25,
    description: "Automates multi-page financial ledger audits, extracts key data, and flags line-item risks.",
    techStack: "OCR engine, Structured JSON schema matching, Gemini model validation",
    icon: Database
  }
];

export default function AIDemoSandbox() {
  // Game States
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover'>('intro');
  const [round, setRound] = useState(1);
  const [backlog, setBacklog] = useState(160); // In hours/week of manual work
  const [growth, setGrowth] = useState(100); // Business growth multiplier
  const [capital, setCapital] = useState(38000); // Available tech budget
  
  const [deployedAgentIds, setDeployedAgentIds] = useState<string[]>([]);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [adviceBox, setAdviceBox] = useState<string>("Welcome to the Operations Room! Check our manual backlog and choose your AI deployment strategy wisely. Let's automate these bottlenecks! - Bala");
  
  // Highscore metric
  const [grade, setGrade] = useState<'A+' | 'A' | 'B' | 'C'>('C');

  // Triggering visual node flashes
  const [flashNode, setFlashNode] = useState<string | null>(null);

  // Restart Game
  const resetGame = () => {
    setRound(1);
    setBacklog(160);
    setGrowth(100);
    setCapital(38000);
    setDeployedAgentIds([]);
    setTerminalLogs([]);
    setShowTerminal(false);
    setGameState('playing');
    setAdviceBox("We have severe bottleneck issues. Our customer support is completely backlogged with 160 hours of manual lookup every single week! I highly recommend deploying the Semantic Intent Router or Vector RAG base to free up your team's bandwidth immediately. - Bala");
  };

  // Run terminal animations simulate tech deployments
  const triggerTerminalDeployment = (agent: Agent) => {
    setShowTerminal(true);
    setTerminalLogs([
      `[CRITICAL_SYSTEM] Initiating deployment: ${agent.name}...`,
      `[COMPILING] Building container using enterprise-grade parameters...`,
      `[SECURITY] Confirming secure TLS proxy endpoints...`
    ]);

    // Step-by-step log addition
    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[ORCHESTRATOR] Initializing backend: ${agent.techStack}...`]);
    }, 600);

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[VECTOR_DB] Setting up semantic indexes and loading schemas...`]);
    }, 1200);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev, 
        `[SUCCESS] Deployed successfully! Reclaiming ${agent.backlogReduction} hours/week of manual human labor!`,
        `[SYSTEM] Growth vectors accelerated by +${agent.growthBoost}%.`
      ]);
    }, 1800);
  };

  // Buy and deploy an Agent
  const buyAgent = (agent: Agent) => {
    if (deployedAgentIds.includes(agent.id)) return;
    if (capital < agent.cost) {
      setAdviceBox("We don't have enough capital in the tech budget to finance this agent. Resolve current rounds to build more operational credit! - Bala");
      return;
    }

    setCapital(prev => prev - agent.cost);
    setDeployedAgentIds(prev => [...prev, agent.id]);
    setBacklog(prev => Math.max(0, prev - agent.backlogReduction));
    setGrowth(prev => prev + agent.growthBoost);

    // Trigger visual terminal feedback
    triggerTerminalDeployment(agent);

    // Bala commentary custom
    if (agent.id === 'router') {
      setAdviceBox("Superb decision! Our Semantic Router is now classifying support tickets in 150ms. No more manual sorting fatigue for the help desk! - Bala");
    } else if (agent.id === 'rag') {
      setAdviceBox("Vector RAG deployed! Your personnel are retrieving exact legal clauses and standard product policy matches in single-click searches. - Bala");
    } else if (agent.id === 'crew') {
      setAdviceBox("Incredible! The CrewAI crew is active. Sales reps are waking up to pre-scored leads and draft contracts already sitting in HubSpot. - Bala");
    } else if (agent.id === 'finance') {
      setAdviceBox("Finance audit bot is live! Processing random tax files and supplier receipts, saving the CFO hours of manual cell reconciliation. - Bala");
    }
  };

  // Move to next round
  const nextRound = () => {
    if (round >= 4) {
      // Calculate final score grade
      const finalScore = growth - (backlog * 1.5);
      if (finalScore >= 180 && backlog === 0) setGrade('A+');
      else if (finalScore >= 140) setGrade('A');
      else if (finalScore >= 80) setGrade('B');
      else setGrade('C');
      
      setGameState('gameover');
      return;
    }

    const nextR = round + 1;
    setRound(nextR);
    setShowTerminal(false);

    // Apply round changes (new crisis increase backdrop backlog, grant round budget credit)
    setCapital(prev => prev + 12000); // Earn money for staying alive!
    
    if (nextR === 2) {
      setBacklog(prev => prev + 50);
      setAdviceBox("ROUND 2: Crisis! Lead responses are lagging behind competitors by 8 hours. Customers are jumping ship. Our manual backlog increased by +50 hours! Deploy the CRM Sales Agent to salvage these deals. - Bala");
    } else if (nextR === 3) {
      setBacklog(prev => prev + 40);
      setAdviceBox("ROUND 3: Crisis! Audit season is here. We have 400 legacy customer contracts to scan for risk and liability limits. Backlog increased by +40 hours. Our Document Auditor will solve this instantly! - Bala");
    } else if (nextR === 4) {
      setBacklog(prev => prev + 30);
      setAdviceBox("ROUND 4: Final Push! Operational scale is spiking. We need to unify our entire multi-agent ecosystem. Deploy any missing agent models now to clear your backlog completely! - Bala");
    }
  };

  // Generate proposal WhatsApp query
  const getProposalMessage = () => {
    return `Hi Bala, I just played your AI Agent Tycoon game! I saved the enterprise with a Grade ${grade} score (Backlog: ${backlog} hrs/wk remaining, Growth: ${growth}%). I would love to schedule a quick consultation to discuss how to build custom agents for our business!`;
  };

  const getWhatsAppLink = () => {
    return `https://wa.me/919003812808?text=${encodeURIComponent(getProposalMessage())}`;
  };

  return (
    <section id="demo" className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-950 border-t border-white/5 overflow-hidden">
      {/* Visual Ambiance Spots */}
      <div className="absolute top-[15%] left-[-15%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Intro / Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Interactive Client Experience
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            Bala's <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">AI Agent Tycoon</span> Game
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Can custom AI agents save a business from manual gridlock? Play this interactive strategy simulator. Hire specialized digital workers designed by <strong>Bala Venkatesh</strong>, optimize your backlog, and unlock your enterprise potential!
          </motion.p>
        </div>

        {/* GAME CONTAINER CARDS */}
        <div className="w-full glass-panel rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] min-h-[580px] flex flex-col">
          
          <AnimatePresence mode="wait">
            
            {/* INTRO SCREEN */}
            {gameState === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center justify-center text-center p-8 md:p-16 my-auto max-w-2xl mx-auto gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Bot className="w-8 h-8 animate-bounce" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl font-black text-white">Your Mission: Rescue Nexus ScaleUp</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    You are the new COO of Nexus Corp. Your team is burning out under a crushing <strong className="text-rose-400">160 hrs/week manual backlog</strong>. 
                    You have exactly 4 rounds to deploy custom agent crews, clear the bottlenecks, and accelerate growth before your budget runs dry!
                  </p>
                </div>

                {/* Meet the expert banner */}
                <div className="w-full p-4 rounded-2xl glass-panel flex gap-4 items-center text-left">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider block">Lead AI Architect Advisor</span>
                    <h4 className="text-xs font-bold text-slate-200">Bala Venkatesh</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Bala's agent systems will guide your strategy and provide live telemetry insights throughout the operation.</p>
                  </div>
                </div>

                <button
                  onClick={resetGame}
                  className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 hover:scale-105 transition-all select-none cursor-pointer hover:from-cyan-400 hover:to-indigo-400 shadow-lg shadow-cyan-500/10"
                >
                  <Play className="w-4 h-4 fill-slate-950" /> Start AI Rescue Mission
                </button>
              </motion.div>
            )}

            {/* PLAYING SCREEN */}
            {gameState === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 flex-1"
              >
                {/* Left Side: Stats and Agent Market (lg:col-span-7) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col gap-6 text-left border-b lg:border-b-0 lg:border-r border-white/5">
                  
                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-3 glass-panel p-4 rounded-2xl">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Manual Backlog</span>
                      <span className={`text-lg font-black ${backlog > 100 ? 'text-rose-400' : backlog > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {backlog} hrs/wk
                      </span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-3">
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Business Growth</span>
                      <span className="text-lg font-black text-cyan-400 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {growth}%
                      </span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-3">
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Tech Budget</span>
                      <span className="text-lg font-black text-emerald-400">
                        ${capital.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Core Content headers */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Round {round} of 4</span>
                      <h3 className="text-base font-extrabold text-white">Deploy Bala's Custom Agents</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded glass-panel text-[10px] font-mono font-bold text-slate-400">
                      Credits per round: +$12,000
                    </span>
                  </div>

                  {/* Available Agents Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {AVAILABLE_AGENTS.map((agent) => {
                      const Icon = agent.icon;
                      const isDeployed = deployedAgentIds.includes(agent.id);
                      const cannotAfford = capital < agent.cost;
                      return (
                        <div 
                          key={agent.id}
                          className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                            isDeployed 
                              ? 'bg-cyan-500/10 border-cyan-500/40 shadow-md shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                              : 'glass-panel glass-panel-hover'
                          }`}
                        >
                          {isDeployed && (
                            <span className="absolute top-3 right-3 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-400 text-[8px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                              Active
                            </span>
                          )}

                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <div className={`p-2 rounded-lg ${isDeployed ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400'}`}>
                                <Icon className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <h4 className="text-xs font-black text-slate-200">{agent.name}</h4>
                                <span className="text-[8px] font-mono text-slate-500">Tech: {agent.techStack}</span>
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-snug">
                              {agent.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[8px] text-slate-500 font-mono">Impact Metrics</span>
                              <span className="text-[10px] font-bold text-slate-300">
                                -{agent.backlogReduction} hrs / +{agent.growthBoost}%
                              </span>
                            </div>

                            {!isDeployed ? (
                              <button
                                onClick={() => buyAgent(agent)}
                                disabled={cannotAfford}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 cursor-pointer select-none ${
                                  cannotAfford 
                                    ? 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 hover:scale-105 hover:from-cyan-400 hover:to-indigo-400 shadow-md'
                                }`}
                              >
                                <DollarSign className="w-3 h-3" /> Hire (${agent.cost.toLocaleString()})
                              </button>
                            ) : (
                              <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Operational
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions footer */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live Advisor: Online
                    </div>

                    <button
                      onClick={nextRound}
                      className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 font-black rounded-xl text-xs flex items-center gap-1 hover:scale-103 transition-all cursor-pointer select-none"
                    >
                      <span>{round === 4 ? 'Finish Operation' : 'Advance to Next Round'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

                {/* Right Side: Bala's Advice & Active Terminal (lg:col-span-5) */}
                <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-950/10 backdrop-blur-md flex flex-col justify-between gap-6">
                  
                  {/* Advisor Card (Bala Venkatesh Avatar) */}
                  <div className="p-4 rounded-3xl glass-panel border border-indigo-500/20 text-left relative overflow-hidden flex flex-col gap-3">
                    <div className="absolute top-0 right-0 p-2.5 bg-indigo-500/10 text-indigo-400 font-mono text-[8px] uppercase tracking-wider font-extrabold">
                      Active Advisor
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Avatar icon */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 p-[1.5px] shrink-0">
                        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-black text-xs text-cyan-400">
                          Bala
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-200">Bala Venkatesh</h4>
                        <span className="text-[9px] text-slate-400">AI Architect &amp; Data Scientist</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950/40 backdrop-blur-sm rounded-2xl border border-white/5">
                      <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">
                        "{adviceBox}"
                      </p>
                    </div>
                  </div>

                  {/* Terminal Orchestration Viewer */}
                  <div className="flex-1 glass-panel rounded-3xl p-4 font-mono text-[10px] leading-relaxed text-left flex flex-col justify-between min-h-[220px]">
                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-bold text-slate-400 uppercase tracking-wider">AI Operations Feed</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    {/* Log list */}
                    <div className="flex-1 overflow-y-auto max-h-[160px] scrollbar-none flex flex-col gap-1.5 py-1">
                      {terminalLogs.length === 0 ? (
                        <div className="text-slate-600 text-center my-auto">
                          [Console Idle] Deploy an agent to view technical terminal telemetry feeds.
                        </div>
                      ) : (
                        terminalLogs.map((log, i) => (
                          <div 
                            key={i} 
                            className={`whitespace-pre-wrap animate-[fadeIn_0.2s_ease-out] ${
                              log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold' :
                              log.includes('[CRITICAL') ? 'text-cyan-400' : 'text-slate-400'
                            }`}
                          >
                            {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* GAMEOVER SCREEN */}
            {gameState === 'gameover' && (
              <motion.div
                key="gameover"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center justify-center text-center p-8 md:p-16 my-auto max-w-2xl mx-auto gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 relative">
                  <Trophy className="w-10 h-10 animate-bounce" />
                  <span className="absolute -top-1 -right-1 bg-cyan-400 text-slate-950 font-mono font-extrabold text-xs px-2 py-0.5 rounded-full">
                    {grade}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white">Mission Evaluation Complete!</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    You completed the 4 rounds of operation scaling and optimization. Let's see how well you did with the custom tech stack:
                  </p>
                </div>

                {/* Score Report Grid */}
                <div className="grid grid-cols-2 gap-4 w-full text-left bg-slate-950/60 p-5 rounded-2xl border border-white/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Operational Grade</span>
                    <strong className="text-xl font-black text-cyan-400 flex items-center gap-1.5">
                      <Award className="w-5 h-5 text-indigo-400" /> Grade {grade}
                    </strong>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Final Business Growth</span>
                    <strong className="text-xl font-black text-emerald-400">{growth}%</strong>
                  </div>
                  <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-white/5 col-span-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Unresolved Manual Backlog</span>
                    <strong className={`text-sm font-black ${backlog === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {backlog === 0 ? '0 hours! 100% Fully Automated!' : `${backlog} hours/week manual lookup remaining.`}
                    </strong>
                  </div>
                </div>

                {/* Bala's Final verdict */}
                <div className="w-full p-4 rounded-2xl bg-slate-950/40 border border-indigo-500/10 flex gap-4 text-left items-start">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold text-[10px] text-cyan-300 shrink-0 mt-0.5">
                    Bala
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    {grade === 'A+' ? (
                      `"Phenomenal job! You achieved a perfect A+ score. Our business is running 100% friction-free with autonomous data ingestion and RAG search. Let's chat to deploy this setup for your organization! - Bala"`
                    ) : grade === 'A' ? (
                      `"Outstanding score! You successfully automated almost the entire bottleneck. With a bit of custom scaling, your team won't ever look back. Let's look over your custom business blueprint together! - Bala"`
                    ) : (
                      `"We survived the bottlenecks, but manual drag is still causing our personnel some strain. I would love to analyze your business flow and show you how easy it is to reach perfect zero-backlog automation! - Bala"`
                    )}
                  </p>
                </div>

                {/* Call-to-actions */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    onClick={resetGame}
                    className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all select-none cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Replay Game
                  </button>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all hover:scale-103 active:scale-97 select-none cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 fill-slate-950" /> Claim AI Certificate (Consult Bala)
                  </a>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}

// Simple absolute database Icon declaration if missing
function Database(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
