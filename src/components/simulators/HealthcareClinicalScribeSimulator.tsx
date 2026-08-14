import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  Mic, 
  Activity, 
  FileText, 
  CheckCircle2, 
  Clock, 
  HeartPulse, 
  RefreshCw, 
  Sparkles, 
  Database,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface DialogueLine {
  speaker: 'Doctor' | 'Patient';
  text: string;
  entities: Array<{ word: string; category: string; color: string }>;
}

const CONSULTATION_STREAM: DialogueLine[] = [
  {
    speaker: 'Doctor',
    text: 'How long have you experienced these acute unilateral headaches, and are they accompanied by nausea?',
    entities: [
      { word: 'unilateral headaches', category: 'SYMPTOM', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
      { word: 'nausea', category: 'SYMPTOM', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' }
    ]
  },
  {
    speaker: 'Patient',
    text: 'About 4 days now, throbbing on the left side with photophobia. Over-the-counter Ibuprofen 400mg barely touched it.',
    entities: [
      { word: 'photophobia', category: 'FINDING', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
      { word: 'Ibuprofen 400mg', category: 'DRUG_FAIL', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' }
    ]
  },
  {
    speaker: 'Doctor',
    text: 'Blood pressure is 126/82 mmHg. We will prescribe Sumatriptan 50mg PO at onset and schedule an MRI if pain persists.',
    entities: [
      { word: '126/82 mmHg', category: 'VITAL', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
      { word: 'Sumatriptan 50mg', category: 'PRESCRIPTION', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
      { word: 'MRI', category: 'PROCEDURE', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' }
    ]
  }
];

export default function HealthcareClinicalScribeSimulator() {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [soapStep, setSoapStep] = useState<'subjective' | 'objective' | 'assessment' | 'plan' | 'signed'>('assessment');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLineIndex((prev) => (prev + 1) % CONSULTATION_STREAM.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const handleReplay = () => {
    setIsSyncing(true);
    setActiveLineIndex(0);
    setTimeout(() => setIsSyncing(false), 500);
  };

  return (
    <div className="w-full h-full min-h-[460px] bg-slate-950/90 rounded-2.5xl p-4 sm:p-6 flex flex-col justify-between gap-4 border border-cyan-500/20 text-left font-sans relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#06b6d412,transparent_65%)] pointer-events-none" />

      {/* TOP STATUS: AMBIENT ACOUSTIC HUD */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white tracking-tight">
                Phraze Health Ambient Clinical Scribe
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-mono font-bold uppercase border border-cyan-500/30">
                12k Medical NER
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Acoustic Diarization Active • HIPAA Compliant</span>
            </p>
          </div>
        </div>

        {/* Clinical Efficiency Metric */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-white/10 px-3 py-1.5 rounded-xl">
          <div className="flex flex-col text-right">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Doctor Charting</span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-black text-cyan-400">
              <Clock className="w-3.5 h-3.5" />
              <span>1.8 min (was 15.5)</span>
            </div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <span className="text-[10px] font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
            +50% Capacity
          </span>
        </div>
      </div>

      {/* TWO PANEL SPLIT: AUDIO DIALOGUE (LEFT) + STRUCTURED SOAP NOTE (RIGHT) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
        
        {/* LEFT 6 COLS: LIVE CONVERSATION STREAM & ENTITY HIGHLIGHTS */}
        <div className="md:col-span-6 bg-slate-900/80 rounded-2xl p-3 sm:p-4 border border-white/10 flex flex-col justify-between gap-3 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Activity className="w-3.5 h-3.5" /> Live Acoustic Diarization
            </span>
            <span className="text-slate-500">Audio 16kHz Stream</span>
          </div>

          {/* Dialogue Lines */}
          <div className="flex flex-col gap-2.5">
            {CONSULTATION_STREAM.map((line, idx) => {
              const isCurrent = idx === activeLineIndex;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl text-xs transition-all duration-300 border ${
                    isCurrent
                      ? 'bg-cyan-500/10 border-cyan-400/30 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                      : 'bg-white/[0.02] border-white/5 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                    <span className={`font-bold uppercase ${line.speaker === 'Doctor' ? 'text-cyan-400' : 'text-indigo-400'}`}>
                      {line.speaker}
                    </span>
                    {isCurrent && (
                      <span className="text-[8px] bg-cyan-400 text-slate-950 px-1 rounded font-bold">
                        DIARIZED
                      </span>
                    )}
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    {line.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Extracted Entity Badges */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5">
            <span className="text-[9px] font-mono text-slate-400 mr-1">Entities:</span>
            <span className="px-2 py-0.5 rounded-md border text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border-cyan-500/40">
              #ICD10: G43.909
            </span>
            <span className="px-2 py-0.5 rounded-md border text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
              #RxNorm: 88519 (Sumatriptan)
            </span>
            <span className="px-2 py-0.5 rounded-md border text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border-amber-500/40">
              #BP: 126/82
            </span>
          </div>
        </div>

        {/* RIGHT 6 COLS: AUTO-GENERATED STRUCTURED SOAP NOTE */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl p-3 sm:p-4 border border-white/10 flex flex-col justify-between gap-2.5 font-mono text-[10px] shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>EHR Clinical Chart (SOAP)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[8px] font-bold border border-emerald-500/30">
              HL7/FHIR READY
            </span>
          </div>

          {/* SOAP Sections */}
          <div className="flex flex-col gap-2 text-slate-300 leading-relaxed">
            <div>
              <span className="text-cyan-400 font-bold">S (Subjective):</span> 4-day history of acute throbbing left-sided headache with photophobia & nausea. Unresponsive to Ibuprofen 400mg.
            </div>

            <div>
              <span className="text-amber-400 font-bold">O (Objective):</span> Vitals: BP 126/82 mmHg, HR 72 bpm regular. Cranial nerves II-XII intact. No focal neurological deficits.
            </div>

            <div>
              <span className="text-emerald-400 font-bold">A (Assessment):</span> Acute Migraine without aura, intractable (<span className="text-white underline">ICD-10: G43.909</span>).
            </div>

            <div>
              <span className="text-indigo-400 font-bold">P (Plan):</span> Rx Sumatriptan 50mg PO at onset (max 200mg/24h). Order non-contrast Brain MRI if refractory.
            </div>
          </div>

          {/* Clinician One-Click Signoff Stamp */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Signed by Physician • 1-Click HL7 Sync</span>
            </div>
            <span className="text-slate-500 text-[9px]">Dr. Bala (MD / AI)</span>
          </div>
        </div>

      </div>

      {/* FOOTER STATS & RE-SIMULATION */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
          <span className="text-cyan-400 font-bold">98.2% Medical NER Precision</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400">21 Patients / Day Capacity</span>
        </div>

        <button
          onClick={handleReplay}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>Replay Clinical Scribe</span>
        </button>
      </div>

    </div>
  );
}
