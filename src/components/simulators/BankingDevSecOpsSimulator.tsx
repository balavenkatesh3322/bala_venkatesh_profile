import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  GitPullRequest, 
  GitMerge, 
  CheckCircle2, 
  Zap, 
  RefreshCw, 
  Terminal, 
  Lock, 
  Cpu, 
  FileCode, 
  Clock, 
  Layers, 
  Flame,
  Search,
  ArrowRight
} from 'lucide-react';

export default function BankingDevSecOpsSimulator() {
  const [scanStep, setScanStep] = useState<'idle' | 'parsing' | 'vector_rag' | 'violation_detected' | 'auto_remediating' | 'approved'>('parsing');
  const [scanProgress, setScanProgress] = useState(35);
  const [latencyCounter, setLatencyCounter] = useState('01:48');

  useEffect(() => {
    const cycle = setInterval(() => {
      setScanStep((prev) => {
        if (prev === 'idle') return 'parsing';
        if (prev === 'parsing') return 'vector_rag';
        if (prev === 'vector_rag') return 'violation_detected';
        if (prev === 'violation_detected') return 'auto_remediating';
        if (prev === 'auto_remediating') return 'approved';
        return 'parsing';
      });
    }, 3800);

    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="w-full h-full min-h-[460px] bg-slate-950/90 rounded-2.5xl p-4 sm:p-6 flex flex-col justify-between gap-4 border border-emerald-500/20 text-left font-sans relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      
      {/* Background cyber grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP STATUS HUD */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white tracking-tight">
                Standard Chartered CI/CD Gate
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold uppercase border border-emerald-500/30">
                Live AST-RAG
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Repo: scb-global-infra / PR #2408
            </p>
          </div>
        </div>

        {/* Turnaround stopwatch pill */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-white/10 px-3 py-1.5 rounded-xl">
          <div className="flex flex-col text-right">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Latency Benchmark</span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-black text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>1.8 min (was 15:00)</span>
            </div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <span className="text-[10px] font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
            -88% Time
          </span>
        </div>
      </div>

      {/* PIPELINE STAGES VISUALIZER */}
      <div className="relative z-10 grid grid-cols-4 gap-2">
        {[
          { id: 'parsing', label: '1. AST Parser', icon: FileCode, desc: 'IaC Tokenizer' },
          { id: 'vector_rag', label: '2. Policy Vector RAG', icon: Search, desc: 'Cosine Match' },
          { id: 'violation_detected', label: '3. Anomaly Catch', icon: AlertTriangle, desc: 'Misconfig Found' },
          { id: 'auto_remediating', label: '4. PR Self-Healing', icon: GitMerge, desc: 'Auto-Patched' }
        ].map((stg) => {
          const Icon = stg.icon;
          const isActive = scanStep === stg.id;
          const isDone = (
            (stg.id === 'parsing' && scanStep !== 'parsing') ||
            (stg.id === 'vector_rag' && ['violation_detected', 'auto_remediating', 'approved'].includes(scanStep)) ||
            (stg.id === 'violation_detected' && ['auto_remediating', 'approved'].includes(scanStep)) ||
            (stg.id === 'auto_remediating' && scanStep === 'approved')
          );

          return (
            <div
              key={stg.id}
              className={`p-2 sm:p-2.5 rounded-xl border flex flex-col gap-1 transition-all duration-300 ${
                isActive 
                  ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : isDone
                  ? 'bg-slate-900/80 border-emerald-500/30 text-slate-300'
                  : 'bg-white/[0.02] border-white/5 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400 animate-pulse' : isDone ? 'text-emerald-500' : 'text-slate-600'}`} />
                {isDone ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ) : null}
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold leading-tight truncate">
                {stg.label}
              </span>
              <span className="text-[8px] font-mono text-slate-400 hidden sm:block">
                {stg.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* CODE & LIVE SCAN DIFF CONSOLE */}
      <div className="relative z-10 bg-slate-900/90 rounded-xl p-3 sm:p-4 border border-white/10 flex flex-col gap-2.5 font-mono text-[11px] shadow-inner">
        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>terraform/scb_security_group.tf</span>
          </div>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AST Node #8410 Checked
          </span>
        </div>

        {/* Live scanning code snippet */}
        <div className="flex flex-col gap-1 text-slate-300 leading-relaxed overflow-hidden">
          <div className="text-slate-500">1  resource "aws_security_group_rule" "ingress_rule" &#123;</div>
          <div className="text-slate-500">2    type              = "ingress"</div>
          <div className="text-slate-500">3    from_port         = 443</div>
          <div className="text-slate-500">4    to_port           = 443</div>
          
          <AnimatePresence mode="wait">
            {scanStep === 'violation_detected' ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="bg-rose-500/15 border-l-2 border-rose-500 p-1 rounded-r text-rose-300 flex items-center justify-between"
              >
                <span>5 -  cidr_blocks       = ["0.0.0.0/0"]  # VIOLATION: SCB-SEC-04</span>
                <span className="text-[9px] bg-rose-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                  RISK HIGH
                </span>
              </motion.div>
            ) : scanStep === 'auto_remediating' || scanStep === 'approved' ? (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-emerald-500/15 border-l-2 border-emerald-400 p-1 rounded-r text-emerald-300 flex items-center justify-between"
              >
                <span>5 +  cidr_blocks       = ["10.240.0.0/16"] # AUTO-REMEDIATED BY AI</span>
                <span className="text-[9px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                  COMPLIANT
                </span>
              </motion.div>
            ) : (
              <div className="text-amber-300 bg-amber-500/10 p-1 rounded">
                5    cidr_blocks       = ["0.0.0.0/0"]  # Vector scanning against CIS benchmark...
              </div>
            )}
          </AnimatePresence>

          <div className="text-slate-500">6  &#125;</div>
        </div>

        {/* Live Vector Match Confirmation */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
          <span className="text-slate-400">
            Policy Rule: <strong className="text-white">SCB Global Cloud Standard CIS 1.4</strong>
          </span>
          <span className="text-emerald-400 font-bold">
            Vector Similarity: 99.4% Match
          </span>
        </div>
      </div>

      {/* BOTTOM ACTION & STATS FOOTER */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>400+ Enterprise Repos Governed</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] font-mono text-cyan-400 font-bold">
            0 Blocked Release Trains
          </span>
        </div>

        <button
          onClick={() => setScanStep('parsing')}
          className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Re-Simulate CI/CD Gate</span>
        </button>
      </div>

    </div>
  );
}
