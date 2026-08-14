import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Clock, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Award,
  ChevronRight,
  Database,
  Smartphone
} from 'lucide-react';
import WaterWaveEffect from './WaterWaveEffect';

interface CaseStudy {
  id: string;
  category: string;
  badgeColor: string;
  client: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  metrics: {
    label: string;
    before: string;
    after: string;
    delta: string;
    positive: boolean;
  }[];
  techStack: string[];
  accolade?: string;
  icon: React.ElementType;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'devsecops-rag',
    category: 'Enterprise DevSecOps & RAG',
    badgeColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    client: 'Standard Chartered Bank',
    title: 'Automated Cloud Security Misconfiguration Verification via RAG',
    summary: 'Replaced manual infrastructure audit bottlenecks with an autonomous AST + RAG verification pipeline directly integrated into Azure DevOps CI/CD gates.',
    problem: 'Manual compliance and security audits across 400+ Azure DevOps repositories took ~45 hours/week per engineering group, causing multi-day deployment queues and alert fatigue.',
    solution: 'Designed a hybrid AST parser and Vector RAG pipeline that extracts Infrastructure-as-Code (Terraform/Bicep) rules, semantically matches them against bank policy vectors, and automatically generates compliance approvals.',
    metrics: [
      { label: 'Security Review Latency', before: '15.0 min / check', after: '1.8 min / check', delta: '-88% Time Slashed', positive: true },
      { label: 'Audit False Positive Noise', before: '18.4% false alarms', after: '4.2% precision', delta: '-77% Noise Reduction', positive: true },
      { label: 'Policy CI/CD Gate Coverage', before: '35% sample audits', after: '100% continuous', delta: '3x Full Surface Coverage', positive: true }
    ],
    techStack: ['Azure DevOps', 'Hybrid RAG', 'Vector Embeddings', 'Python', 'AST Parsers', 'LangChain'],
    accolade: 'Awarded "Best Performer of the Year 2024" for outstanding DevSecOps innovation.',
    icon: ShieldCheck
  },
  {
    id: 'crop-doctor-edge',
    category: 'On-Device Edge Computer Vision',
    badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    client: 'Bighaat ("Crop Doctor")',
    title: 'Offline Neural Plant Pathology Diagnosis for 2M+ Farmers',
    summary: 'Compressed deep convolutional vision models to run sub-70ms on low-cost smartphones without internet connectivity in rural farmland.',
    problem: 'Over 2,000,000 farmers in remote regions suffered 25-30% crop yield loss due to delayed disease identification caused by patchy 2G/3G connectivity.',
    solution: 'Engineered lightweight multi-scale CNN classifiers, optimized with INT8 post-training quantization, and compiled to an on-device TensorFlow Lite runtime with 0MB network dependency.',
    metrics: [
      { label: 'Model Inference Latency', before: '1,850 ms (Cloud)', after: '68 ms (Local Edge)', delta: '27x Faster Execution', positive: true },
      { label: 'Network Bandwidth Required', before: '100% Online Only', after: '0 MB (100% Offline)', delta: 'Zero Cloud Cost', positive: true },
      { label: 'Field Diagnosis Accuracy', before: '71.2% (Heuristics)', after: '94.8% Top-1 Acc', delta: '+23.6% Precision Boost', positive: true }
    ],
    techStack: ['TensorFlow Lite', 'INT8 Quantization', 'PyTorch', 'MobileNetV3', 'OpenCV', 'Android NDK'],
    accolade: 'Scaled to 2M+ active farmers across diverse variable field lighting conditions.',
    icon: Smartphone
  },
  {
    id: 'clinical-nlp-scribe',
    category: 'Healthcare Acoustic AI & Clinical NLP',
    badgeColor: 'from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/30',
    client: 'Medosys & Phraze Health',
    title: 'Speech-to-Structured-EHR Clinical Scribe & Medical NER',
    summary: 'Automated live medical chart documentation from doctor-patient verbal consultations, cutting record-drafting time from 15 mins to under 2 mins.',
    problem: 'Physicians spent 15-18 minutes typing Electronic Health Records (EHR) per consultation, causing clinician burnout and capping patient appointments at 14/day.',
    solution: 'Built a streaming acoustic speech-to-text pipeline coupled with domain-specific Medical Named Entity Recognition (NER) and clinical summarization transformers to extract ICD codes, medications, and dosages.',
    metrics: [
      { label: 'Documentation Time / Patient', before: '15.5 minutes', after: '1.8 minutes', delta: '-88% Admin Overhead', positive: true },
      { label: 'Daily Patient Consultation Capacity', before: '14 patients / day', after: '21 patients / day', delta: '+50% Clinic Throughput', positive: true },
      { label: 'Prescription Entity Extraction', before: '82.0% (Manual Key)', after: '98.2% Precision', delta: '+16.2% Accuracy', positive: true }
    ],
    techStack: ['Acoustic Speech-to-Text', 'Medical NER', 'Transformers', 'FastAPI', 'EHR Integration', 'Python'],
    accolade: 'Adopted across clinical outpatient departments with zero manual transcription backlogs.',
    icon: Activity
  }
];

export default function CaseStudies() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);

  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-950 text-white overflow-hidden border-b border-white/5 z-10">
      <WaterWaveEffect variant="dual" color="cyan" />

      {/* Ambient background glows */}
      <div className="absolute top-[25%] left-[-8%] w-[450px] h-[450px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-8%] w-[450px] h-[450px] bg-indigo-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-left flex flex-col gap-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[10px] font-mono text-cyan-400 uppercase tracking-widest border border-cyan-500/20">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              Verified Production Benchmarks
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Case Studies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400">Impact Metrics</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
              Real architectures deployed into production. Exact before vs. after metrics across Tier-1 banking, agricultural edge devices, and clinical health systems.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-cyan-500 hover:text-slate-950 border border-white/10 hover:border-cyan-400 text-xs sm:text-sm font-bold text-white transition-all duration-300 flex items-center gap-2 group cursor-pointer shadow-inner"
            >
              <span>Request Custom Architecture</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* CASE STUDIES SELECTOR TABS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CASE_STUDIES.map((study) => {
            const IconComp = study.icon;
            const isSelected = study.id === selectedCaseId;
            return (
              <button
                key={study.id}
                onClick={() => setSelectedCaseId(study.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer border flex flex-col gap-3 relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/30'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border ${study.badgeColor}`}>
                    {study.client}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${
                    isSelected ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className={`text-sm sm:text-base font-bold transition-colors line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}>
                    {study.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="caseStudyActiveGlow"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ACTIVE CASE STUDY DETAIL CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 md:p-10 rounded-3xl glass-panel border border-white/10 relative overflow-hidden text-left flex flex-col gap-8"
          >
            {/* Top Overview Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${activeCase.badgeColor}`}>
                    {activeCase.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Deployment: <strong className="text-slate-200">{activeCase.client}</strong>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                  {activeCase.title}
                </h3>
              </div>

              {activeCase.accolade && (
                <div className="px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2.5 shrink-0 max-w-sm">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="leading-snug">{activeCase.accolade}</span>
                </div>
              )}
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem Statement */}
              <div className="p-5 sm:p-6 rounded-2xl bg-rose-950/20 border border-rose-900/30 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  The Production Bottleneck (Before)
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeCase.problem}
                </p>
              </div>

              {/* Solution Statement */}
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  The AI Solution & Architecture (After)
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeCase.solution}
                </p>
              </div>
            </div>

            {/* EXACT BEFORE VS AFTER METRICS TABLE / CARDS */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Exact Quantified Impact (Before vs. After)
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  100% Production Measured
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeCase.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                        {metric.label}
                      </span>
                      <div className="inline-flex items-center gap-1 text-xs font-mono font-black text-emerald-400 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{metric.delta}</span>
                      </div>
                    </div>

                    {/* Metric Comparison Bar */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-slate-500 uppercase">Before</span>
                        <span className="text-xs font-semibold text-rose-400 font-mono line-through decoration-rose-500/50">
                          {metric.before}
                        </span>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />

                      <div className="flex flex-col text-right">
                        <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold">After AI</span>
                        <span className="text-sm font-black text-white font-mono">
                          {metric.after}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400 mr-2 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" /> Stack:
                </span>
                {activeCase.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <span>Consult On Similar System</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
