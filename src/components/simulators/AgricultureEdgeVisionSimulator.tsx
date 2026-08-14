import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  WifiOff, 
  Cpu, 
  Sparkles, 
  Scan, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Layers, 
  RefreshCw, 
  Languages, 
  Zap,
  Leaf,
  Target
} from 'lucide-react';

interface CropSample {
  id: string;
  name: string;
  scientificName: string;
  disease: string;
  confidence: number;
  treatment: {
    en: string;
    ta: string;
    hi: string;
  };
  imageColor: string;
}

const CROP_SAMPLES: CropSample[] = [
  {
    id: 'potato',
    name: 'Potato (Solanum tuberosum)',
    scientificName: 'Phytophthora infestans',
    disease: 'Late Blight (உருளைக்கிழங்கு இலைக்கருகல்)',
    confidence: 94.8,
    treatment: {
      en: 'Spray Mancozeb (2.5g/L water) immediately. Ensure drainage.',
      ta: 'மேன்கோசெப் (2.5g/லிட்டர்) தெளிக்கவும். நீர் தேங்காமல் பார்த்துக் கொள்ளவும்.',
      hi: 'मैंकोजेब (2.5 ग्राम/लीटर) का तुरंत छिड़काव करें। जल निकासी सुनिश्चित करें।'
    },
    imageColor: 'from-amber-900/40 via-emerald-950/60 to-slate-950'
  },
  {
    id: 'tomato',
    name: 'Tomato (Solanum lycopersicum)',
    scientificName: 'Alternaria solani',
    disease: 'Early Blight (தக்காளி ஆரம்பக்கால கருகல்)',
    confidence: 96.2,
    treatment: {
      en: 'Apply Chlorothalonil fungicide. Prune lower infected foliage.',
      ta: 'குளோரோதலோனில் தெளிக்கவும். பாதிக்கப்பட்ட கீழ் இலைகளை நீக்கவும்.',
      hi: 'क्लोरोथैलोनिल कवकनाशी का छिड़काव करें। निचली संक्रमित पत्तियों को हटा दें।'
    },
    imageColor: 'from-rose-950/50 via-emerald-950/60 to-slate-950'
  },
  {
    id: 'rice',
    name: 'Paddy Rice (Oryza sativa)',
    scientificName: 'Magnaporthe oryzae',
    disease: 'Rice Blast (நெல் குலை நோய்)',
    confidence: 93.5,
    treatment: {
      en: 'Apply Tricyclazole 75% WP @ 0.6g/L at early tillering stage.',
      ta: 'டிரைசைக்ளசோல் 75% WP (0.6g/லிட்டர்) தெளிக்கவும்.',
      hi: 'ट्राइसाइक्लाजोल 75% डब्लूपी (0.6 ग्राम/लीटर) का छिड़काव करें।'
    },
    imageColor: 'from-emerald-900/40 via-yellow-950/40 to-slate-950'
  }
];

export default function AgricultureEdgeVisionSimulator() {
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'ta' | 'hi'>('en');
  const [inferenceLatency, setInferenceLatency] = useState(68);

  const crop = CROP_SAMPLES[selectedCropIndex];

  const handleScanAgain = () => {
    setIsScanning(true);
    setInferenceLatency(0);
    setTimeout(() => {
      setInferenceLatency(68);
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="w-full h-full min-h-[460px] bg-slate-950/90 rounded-2.5xl p-4 sm:p-6 flex flex-col justify-between gap-4 border border-violet-500/20 text-left font-sans relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#8b5cf610,transparent_60%)] pointer-events-none" />

      {/* TOP STATUS: NO INTERNET / ZERO SIGNAL HUD */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white tracking-tight">
                Crop Doctor On-Device Neural Engine
              </span>
              <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[9px] font-mono font-bold uppercase border border-violet-500/30">
                TFLite INT8
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <WifiOff className="w-3 h-3 text-rose-400" />
              <span>0 Bars Offline • 0MB Network Data</span>
            </p>
          </div>
        </div>

        {/* Inference Latency Meter */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-white/10 px-3 py-1.5 rounded-xl">
          <div className="flex flex-col text-right">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Edge Speed</span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-black text-violet-400">
              <Zap className="w-3.5 h-3.5" />
              <span>68 ms (Local Edge)</span>
            </div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <span className="text-[10px] font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
            27x Faster
          </span>
        </div>
      </div>

      {/* CROP SAMPLE SELECTOR PILLS */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CROP_SAMPLES.map((sample, idx) => (
          <button
            key={sample.id}
            onClick={() => {
              setSelectedCropIndex(idx);
              handleScanAgain();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
              selectedCropIndex === idx
                ? 'bg-violet-500/20 border-violet-400 text-white shadow-[0_0_12px_rgba(139,92,246,0.25)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>{sample.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* VIEWFINDER CAMERA FRAME & NEURAL CLASSIFIER */}
      <div className={`relative z-10 rounded-2xl border border-white/15 bg-gradient-to-b ${crop.imageColor} p-4 sm:p-5 flex flex-col justify-between min-h-[200px] overflow-hidden`}>
        
        {/* Viewfinder Target Reticle Animation */}
        <div className="absolute inset-4 pointer-events-none flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-36 h-36 sm:w-48 sm:h-48 border-2 border-dashed border-violet-400/60 rounded-2xl relative flex items-center justify-center"
          >
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-violet-300" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-violet-300" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-violet-300" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-violet-300" />
            
            {/* Target Crosshair */}
            <Target className="w-6 h-6 text-violet-400/80 animate-spin" style={{ animationDuration: '10s' }} />

            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-violet-950/80 border border-violet-400/40 text-[8px] font-mono text-violet-200">
              NNAPI ACCEL
            </div>
          </motion.div>
        </div>

        {/* Top Info within Viewfinder */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 relative z-10">
          <span className="bg-slate-950/80 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Camera ISP: Live Frame RGB-565
          </span>
          <span className="bg-slate-950/80 px-2 py-1 rounded-md border border-white/10 text-violet-300">
            Model: 12.4 MB (INT8)
          </span>
        </div>

        {/* Bottom Pathology Diagnosis Overlay */}
        <div className="relative z-10 bg-slate-950/90 backdrop-blur-md rounded-xl p-3 border border-white/15 flex flex-col gap-2 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Detected Pathology</span>
              <h4 className="text-xs sm:text-sm font-black text-white">
                {crop.disease}
              </h4>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-mono text-slate-400">Confidence</span>
              <span className="text-sm font-mono font-black text-emerald-400">
                {crop.confidence}% Top-1
              </span>
            </div>
          </div>

          {/* Treatment Prescription in Selected Local Language */}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[9px] font-mono">
              <span className="text-slate-400 uppercase font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Prescribed Field Action:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedLang('en')}
                  className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${selectedLang === 'en' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setSelectedLang('ta')}
                  className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${selectedLang === 'ta' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                >
                  தமிழ்
                </button>
                <button
                  onClick={() => setSelectedLang('hi')}
                  className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${selectedLang === 'hi' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                >
                  हिंदी
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-200 font-medium leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5">
              {crop.treatment[selectedLang]}
            </p>
          </div>
        </div>

      </div>

      {/* FOOTER SCALE PROOF */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
          <span className="text-emerald-400 font-bold">2,000,000+ Farmers</span>
          <span className="text-slate-600">•</span>
          <span className="text-violet-300">30+ Plant Pathologies</span>
        </div>

        <button
          onClick={handleScanAgain}
          className="px-3 py-1.5 rounded-lg bg-violet-500/15 hover:bg-violet-500/25 border border-violet-500/30 text-violet-300 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
          <span>Re-Trigger Camera Scan</span>
        </button>
      </div>

    </div>
  );
}
