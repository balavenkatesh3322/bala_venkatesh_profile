import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Layers,
  Zap,
  Clock,
  Coins,
  Gauge,
  Sparkles,
  AlertCircle,
  Database,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
  Flame,
  ArrowUpRight,
  Target
} from 'lucide-react';

interface LLMFundamentalsTutorialProps {
  readerTheme: 'paper' | 'white' | 'dark';
  currentStyles: {
    bg: string;
    text: string;
    textMuted: string;
    textTitle: string;
    border: string;
    accent: string;
  };
  onOpenShareModal: (postSlug: string) => void;
  sharedCount: number;
  renderShareFooter?: () => React.ReactNode;
}

export default function LLMFundamentalsTutorial({
  readerTheme,
  currentStyles,
  onOpenShareModal,
  sharedCount,
  renderShareFooter
}: LLMFundamentalsTutorialProps) {
  // --- Interactive Simulator 1: Next-Token Probability & Temperature Sampler ---
  const [temperature, setTemperature] = useState<number>(0.2);
  const [topP, setTopP] = useState<number>(0.9);
  const [promptPrefix, setPromptPrefix] = useState<string>(
    'In production, LLM hallucination is solved by'
  );
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
  const [isSampling, setIsSampling] = useState<boolean>(false);

  // Candidate tokens with base unnormalized logits
  const CANDIDATES = [
    { token: 'architecture', baseLogit: 4.8, type: 'engineering' },
    { token: 'retrieval', baseLogit: 4.5, type: 'engineering' },
    { token: 'prompts', baseLogit: 2.1, type: 'hype' },
    { token: 'magic', baseLogit: 0.4, type: 'hype' },
    { token: 'grounding', baseLogit: 4.2, type: 'engineering' },
    { token: 'hoping', baseLogit: 0.8, type: 'unreliable' }
  ];

  // Compute softmax with temperature
  const computeProbabilities = (temp: number) => {
    const effectiveTemp = Math.max(0.05, temp);
    const exps = CANDIDATES.map(c => Math.exp(c.baseLogit / effectiveTemp));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    return CANDIDATES.map((c, i) => ({
      ...c,
      probability: Math.round((exps[i] / sumExps) * 1000) / 10 // percentage with 1 decimal
    })).sort((a, b) => b.probability - a.probability);
  };

  const currentDistribution = computeProbabilities(temperature);

  const handleSampleNextToken = () => {
    setIsSampling(true);
    setTimeout(() => {
      // Pick based on distribution or top if greedy
      let chosenToken = currentDistribution[0].token;
      if (temperature > 0.6) {
        const rand = Math.random() * 100;
        let cumulative = 0;
        for (const item of currentDistribution) {
          cumulative += item.probability;
          if (rand <= cumulative) {
            chosenToken = item.token;
            break;
          }
        }
      }
      setGeneratedTokens(prev => [...prev, chosenToken]);
      setIsSampling(false);
    }, 300);
  };

  const handleResetSampler = () => {
    setGeneratedTokens([]);
    setTemperature(0.2);
    setTopP(0.9);
  };

  // --- Interactive Simulator 2: Lost in the Middle Attention Visualizer ---
  const [factPosition, setFactPosition] = useState<number>(10); // 0% (Head) to 100% (Tail)

  const getAttentionScore = (pos: number) => {
    // U-shaped curve: high at 0-15%, low at 40-60%, high at 85-100%
    const normalized = pos / 100;
    // Parabolic U-curve centered at 0.5
    const uCurve = 4 * Math.pow(normalized - 0.5, 2); // 0 at center, 1 at ends
    const recall = Math.round(52 + uCurve * 44); // 52% in middle, ~96% at edges
    return Math.min(98, Math.max(48, recall));
  };

  const currentRecall = getAttentionScore(factPosition);

  // --- Interactive Simulator 3: TTFT vs TPS Latency Runner ---
  const [isRunningInference, setIsRunningInference] = useState<boolean>(false);
  const [inferencePhase, setInferencePhase] = useState<'idle' | 'prefill' | 'decode' | 'done'>('idle');
  const [simulatedTokens, setSimulatedTokens] = useState<number>(0);

  const runInferenceSimulation = () => {
    if (isRunningInference) return;
    setIsRunningInference(true);
    setInferencePhase('prefill');
    setSimulatedTokens(0);

    // Prefill takes 450ms
    setTimeout(() => {
      setInferencePhase('decode');
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setSimulatedTokens(count);
        if (count >= 12) {
          clearInterval(interval);
          setInferencePhase('done');
          setIsRunningInference(false);
        }
      }, 70); // ~14 tokens/sec simulated
    }, 450);
  };

  // --- Interactive Simulator 4: Context Window Cost & Token Budget Calculator ---
  const [inputTokenCount, setInputTokenCount] = useState<number>(32000);
  const [dailyRequests, setDailyRequests] = useState<number>(5000);

  // Economics: $2.50 per 1M input tokens on typical frontier/mid LLM
  const monthlyCostDump = Math.round((inputTokenCount * dailyRequests * 30 * 2.5) / 1000000);
  const ragTokenCount = 2500; // Average RAG context
  const monthlyCostRAG = Math.round((ragTokenCount * dailyRequests * 30 * 2.5) / 1000000);
  const savingsPct = Math.round(((monthlyCostDump - monthlyCostRAG) / (monthlyCostDump || 1)) * 100);

  // --- Interactive Simulator 5: Hallucination vs Grounding Architecture ---
  const [groundingMode, setGroundingMode] = useState<'ungrounded' | 'grounded'>('grounded');

  return (
    <div className="space-y-8">
      {/* Series Header & Badge */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          readerTheme !== 'dark'
            ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            : 'bg-indigo-950/20 border-indigo-500/30 text-indigo-300'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🏗️</span>
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            Production AI • Part 1: What an LLM Actually Is, Stripped of the Hype 🧵
          </span>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 font-semibold shrink-0">
          Core Foundations
        </span>
      </div>

      {/* Core Author Lead Quote */}
      <p
        className={`text-base sm:text-lg font-semibold italic border-l-4 pl-4 py-2 transition-all duration-300 ${
          readerTheme !== 'dark'
            ? 'text-slate-900 border-indigo-500 bg-indigo-50/30 rounded-r-xl pr-3'
            : 'text-slate-200 border-indigo-400 bg-white/5 rounded-r-xl pr-3'
        }`}
      >
        "Strip away the branding. An LLM is a function. You give it a sequence of tokens. It returns a probability distribution over what token should come next. Everything else—chat interfaces, agents, RAG, tool calling—is engineering built on top of that single primitive."
      </p>

      {/* Section 1: Why This Series Exists */}
      <div className="pt-2">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Why This Series Exists
        </h2>

        <p className="mb-4 leading-relaxed">
          Most LLM content on the internet falls into two camps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider mb-1">
              Camp One: The Hype
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              "AI will change everything." No substance. No architecture. No numbers. Unusable for engineering teams.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
              Camp Two: Academic Papers
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Research papers written for people who already understand research papers. Great theory, but doesn't explain how to handle a 504 gateway timeout.
            </p>
          </div>
        </div>

        <p className="mb-4 font-semibold leading-relaxed">
          Neither helps the engineer who has to ship something on Friday.
        </p>

        <p className="leading-relaxed">
          This series is different. <strong>Pure technical. Production focused.</strong> Written for engineers and architects who need to understand how LLMs actually work under the hood so they can build systems that do not fall over.
        </p>
      </div>

      {/* Section 2: What an LLM Actually Is */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <Cpu className="w-5 h-5 text-indigo-400" />
          What an LLM Actually Is
        </h2>

        <p className="mb-4 leading-relaxed">
          Strip away the branding. <strong>An LLM is a function.</strong>
        </p>

        {/* Mathematical Function Box */}
        <div
          className={`p-4 sm:p-5 rounded-xl border font-mono my-4 text-center ${
            readerTheme !== 'dark'
              ? 'bg-indigo-50 border-indigo-200 text-indigo-950'
              : 'bg-indigo-950/30 border-indigo-500/30 text-indigo-300'
          }`}
        >
          <div className="text-xs uppercase text-indigo-500 font-bold tracking-widest mb-1">
            The Fundamental Mathematical Primitive
          </div>
          <div className="text-base sm:text-xl font-bold py-1">
            f( [t₁, t₂, t₃, ... tₙ] ) → P( tₙ₊₁ | t₁...tₙ )
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Input: sequence of tokens • Output: probability distribution over the vocabulary
          </div>
        </div>

        <p className="mb-4 leading-relaxed">
          You give it a sequence of tokens. It returns a probability distribution over what token should come next.
        </p>

        <p className="mb-4 font-bold leading-relaxed">
          That is it. That is the entire model.
        </p>

        <p className="mb-4 leading-relaxed">
          Everything else—chat interfaces, conversational wrappers, agents, RAG, and tool calling—is software engineering built on top of that single primitive.
        </p>

        <div
          className={`p-4 rounded-xl border-l-4 font-mono text-sm font-bold my-3 transition-colors ${
            readerTheme !== 'dark'
              ? 'bg-amber-50 border-amber-500 text-amber-950'
              : 'bg-amber-950/20 border-amber-500/50 text-amber-300'
          }`}
        >
          "An LLM does not know things. It predicts tokens. The appearance of knowledge is a side effect of being trained on a large enough slice of human text."
        </div>
      </div>

      {/* Interactive Simulator 1: Live Tokenizer & Next-Token Sampler */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          readerTheme !== 'dark'
            ? 'bg-stone-50 border-stone-200'
            : 'bg-slate-900/70 border-indigo-500/30 shadow-xl'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-wide">Interactive Next-Token Probability Simulator</h3>
              <p className="text-[11px] text-slate-400">
                Observe how the temperature parameter mathematically reshapes the probability distribution.
              </p>
            </div>
          </div>
          <button
            onClick={handleResetSampler}
            className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Live Context Prompt Display */}
        <div className="mb-5">
          <label className="text-xs font-mono text-slate-400 block mb-1.5">Current Prompt Context:</label>
          <div className="p-3 rounded-xl bg-black/30 border border-white/10 font-mono text-xs sm:text-sm flex flex-wrap items-center gap-1.5">
            {promptPrefix.split(' ').map((word, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-200"
              >
                {word}
              </span>
            ))}
            {generatedTokens.map((tok, idx) => (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={idx}
                className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold"
              >
                {tok}
              </motion.span>
            ))}
            <span className="animate-pulse text-indigo-400 font-bold">▋</span>
          </div>
        </div>

        {/* Temperature & Top-P Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <span className="text-slate-300 font-semibold">Temperature: {temperature.toFixed(2)}</span>
              <span className="text-[11px] text-indigo-400">
                {temperature <= 0.2 ? 'Greedy / Deterministic' : temperature >= 0.9 ? 'Creative / High Entropy' : 'Balanced'}
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.5"
              step="0.05"
              value={temperature}
              onChange={e => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.0 (Argmax)</span>
              <span>0.7 (Default)</span>
              <span>1.5 (High Variance)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <span className="text-slate-300 font-semibold">Top-P (Nucleus): {topP.toFixed(2)}</span>
              <span className="text-[11px] text-slate-400">Cumulative mass filter</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={topP}
              onChange={e => setTopP(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.1 (Strict cutoff)</span>
              <span>0.9 (Standard)</span>
              <span>1.0 (Full vocab)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Probability Distribution Bars */}
        <div className="space-y-2 mb-5">
          <div className="text-xs font-mono text-slate-400 mb-1 flex justify-between">
            <span>Next-Token Vocabulary Candidates</span>
            <span>Softmax Probability</span>
          </div>
          {currentDistribution.map((cand, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="text-slate-500">#{idx + 1}</span>
                  <span className={cand.type === 'engineering' ? 'text-indigo-300' : 'text-slate-400'}>
                    "{cand.token}"
                  </span>
                </span>
                <span className="text-slate-300 font-mono">{cand.probability}%</span>
              </div>
              <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className={`h-full rounded-full ${
                    idx === 0
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                      : 'bg-white/20'
                  }`}
                  initial={false}
                  animate={{ width: `${cand.probability}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button to Sample Token */}
        <div className="flex justify-end">
          <button
            onClick={handleSampleNextToken}
            disabled={isSampling}
            className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isSampling ? 'Sampling...' : 'Sample Next Token (Autoregressive Step)'}
          </button>
        </div>
      </div>

      {/* Section 3: Tokens: The Unit of Everything */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <Layers className="w-5 h-5 text-indigo-400" />
          Tokens: The Unit of Everything
        </h2>

        <p className="mb-4 leading-relaxed">
          An LLM does not see words. It sees <strong>tokens</strong>.
        </p>

        <p className="mb-4 leading-relaxed">
          A token is a chunk of text, roughly 3 to 4 characters in English. <em>"Production"</em> might be one token. <em>"Unbelievable"</em> might be three.
        </p>

        <p className="font-semibold mb-4 leading-relaxed">
          This matters for three critical production reasons:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase mb-2">
              <Coins className="w-4 h-4" /> 1. Cost
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              You pay per token—both input prompt tokens and generated output tokens. Every redundant word costs real money.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase mb-2">
              <Clock className="w-4 h-4" /> 2. Latency
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              More tokens mean more FLOPs, higher memory bandwidth demand, and slower end-to-end response times for users.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 uppercase mb-2">
              <Gauge className="w-4 h-4" /> 3. Context Window
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every model has a hard limit on how many tokens it can process at once. Exceed it and your request crashes or truncates.
            </p>
          </div>
        </div>

        <p className="mb-4 leading-relaxed">
          When you estimate cost for a feature, you are estimating tokens. When you optimize a prompt, you are reducing tokens. When you design a RAG pipeline, you are budgeting tokens.
        </p>

        <div
          className={`p-4 rounded-xl border-l-4 font-mono text-sm font-bold my-3 transition-colors ${
            readerTheme !== 'dark'
              ? 'bg-indigo-50 border-indigo-500 text-indigo-950'
              : 'bg-indigo-950/20 border-indigo-500/50 text-indigo-300'
          }`}
        >
          "Tokens are the currency of production LLM systems."
        </div>
      </div>

      {/* Section 4: The Transformer, Explained Without the Math */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <Zap className="w-5 h-5 text-indigo-400" />
          The Transformer, Explained Without the Math
        </h2>

        <p className="mb-4 leading-relaxed">
          The architecture behind modern LLMs is the transformer. You do not need to derive the attention formula to build production systems. You need to understand what it does.
        </p>

        <p className="mb-4 leading-relaxed">
          The key idea is <strong>attention</strong>.
        </p>

        <p className="mb-4 leading-relaxed">
          When the model processes a token, it looks at every other token in the context and calculates how much each one matters. That is how it understands that <em>"it"</em> in a sentence refers to <em>"the contract"</em> and not <em>"the lawyer."</em>
        </p>

        <p className="mb-4 leading-relaxed">
          This is why context matters so much. <strong>The model does not have memory.</strong> It has attention over whatever you pass inside that single request.
        </p>

        <p className="font-semibold mb-4 leading-relaxed">
          Two production consequences follow directly:
        </p>

        <div className="space-y-3 my-4">
          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-amber-400 mb-1 uppercase">
              1. Order Matters ("Lost in the Middle")
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Information at the beginning and end of a long context gets attended to far more reliably than information buried in the middle. This is called "lost in the middle," and it is a real failure mode that breaks document summarizers and RAG retrieval.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-rose-400 mb-1 uppercase">
              2. Irrelevant Context Actively Hurts
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              If you stuff a prompt with noise, attention gets diluted across irrelevant tokens and extraction accuracy plummets. <strong>More context is not better context.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator 2: Lost in the Middle Attention Heatmap */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          readerTheme !== 'dark'
            ? 'bg-stone-50 border-stone-200'
            : 'bg-slate-900/70 border-amber-500/30 shadow-xl'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
          <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Gauge className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-wide">Interactive "Lost in the Middle" Attention Simulator</h3>
            <p className="text-[11px] text-slate-400">
              Drag the fact position across the context window to see how attention recall fluctuates.
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="text-slate-300">
              Fact Placement: <strong>{factPosition}% through context</strong>
            </span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-xs ${
                currentRecall >= 85
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : currentRecall >= 65
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              Estimated Retrieval Accuracy: {currentRecall}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={factPosition}
            onChange={e => setFactPosition(parseInt(e.target.value))}
            className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
            <span>0% (Primacy / Head)</span>
            <span>50% (Danger Zone / Middle)</span>
            <span>100% (Recency / Tail)</span>
          </div>
        </div>

        {/* Visual Attention Distribution Curve */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[11px] font-mono text-slate-400 mb-2">Transformer Attention Weight Density across Context</div>
          <div className="h-16 flex items-end gap-1 w-full">
            {Array.from({ length: 25 }).map((_, i) => {
              const posPct = (i / 24) * 100;
              const heightPct = getAttentionScore(posPct) - 35;
              const isClose = Math.abs(posPct - factPosition) < 5;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    style={{ height: `${heightPct * 1.6}px` }}
                    className={`w-full rounded-t transition-all ${
                      isClose
                        ? 'bg-amber-400 ring-2 ring-amber-300'
                        : posPct < 20 || posPct > 80
                        ? 'bg-indigo-500/40'
                        : 'bg-rose-500/30'
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-white/5">
            <span className="text-emerald-400">High Attention (Head)</span>
            <span className="text-rose-400 font-bold">Lost in the Middle Zone</span>
            <span className="text-emerald-400">High Attention (Tail)</span>
          </div>
        </div>
      </div>

      {/* Section 5: Training: How the Model Got Here */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <Database className="w-5 h-5 text-indigo-400" />
          Training: How the Model Got Here
        </h2>

        <p className="mb-4 leading-relaxed">
          An LLM is built in three distinct stages:
        </p>

        <div className="space-y-3 my-4">
          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-cyan-400 mb-1 uppercase">
              1. Pretraining (Millions of Dollars in Compute)
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The model reads an enormous corpus of internet text and learns to predict the next token. This is where it absorbs language syntax, reasoning heuristics, and world knowledge. It is also where 95%+ of the capital cost lives.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-indigo-400 mb-1 uppercase">
              2. Supervised Fine-Tuning (SFT)
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The raw base model is trained on curated question/answer and instruction pairs. This is where it transitions from a raw autocomplete engine into an assistant that follows commands.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-emerald-400 mb-1 uppercase">
              3. Preference Tuning (RLHF / DPO)
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Human preference feedback teaches the model which of two candidate completions is better, safer, and less toxic. This is where it learns alignment.
            </p>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border-l-4 font-mono text-sm font-bold my-3 transition-colors ${
            readerTheme !== 'dark' 
              ? 'bg-cyan-50 border-cyan-500 text-cyan-950' 
              : 'bg-cyan-950/20 border-cyan-500/50 text-cyan-300'
          }`}
        >
          "For production engineers, the takeaway is this: You almost never train from scratch. You either use an open weights model or an API. Your leverage is in fine-tuning, prompting, and architecture, not pretraining."
        </div>
      </div>

      {/* Section 6: Inference: What Happens When You Call the API */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <Clock className="w-5 h-5 text-indigo-400" />
          Inference: What Happens When You Call the API
        </h2>

        <p className="mb-4 leading-relaxed">
          This is the part that matters most for production operations.
        </p>

        <p className="mb-4 leading-relaxed">
          You send tokens. The model processes them through its layers. It produces a probability distribution over the next token. It samples one. <strong>Then it feeds that token back into the input sequence and repeats.</strong>
        </p>

        <p className="mb-4 leading-relaxed">
          This is why generation is strictly sequential. Each output token depends on all previous tokens. You cannot parallelize output generation the way you parallelize input prompt processing.
        </p>

        <p className="font-semibold mb-4 leading-relaxed">
          Two numbers you need to know:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-amber-400 mb-1 uppercase">
              1. Time to First Token (TTFT)
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              How long before the model starts streaming back the first byte. This is dominated by prompt prefill processing and is heavily affected by prompt length.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-cyan-400 mb-1 uppercase">
              2. Tokens Per Second (TPS)
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              How fast the model generates tokens after the first token arrives. This determines total latency for long outputs.
            </p>
          </div>
        </div>

        <p className="leading-relaxed">
          Optimizing these requires completely different architectural techniques. <strong>Prompt caching and prompt compression</strong> fix TTFT. <strong>Smaller model distillation and speculative decoding</strong> fix TPS.
        </p>
      </div>

      {/* Interactive Simulator 3: TTFT vs TPS Animated Simulation */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          readerTheme !== 'dark'
            ? 'bg-stone-50 border-stone-200'
            : 'bg-slate-900/70 border-cyan-500/30 shadow-xl'
        }`}
      >
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Clock className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-wide">Prefill (TTFT) vs. Autoregressive Decode (TPS) Runner</h3>
              <p className="text-[11px] text-slate-400">
                Witness the two distinct phases of transformer inference in live motion.
              </p>
            </div>
          </div>
          <button
            onClick={runInferenceSimulation}
            disabled={isRunningInference}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunningInference ? 'Running...' : 'Run Simulation'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phase 1: Prefill */}
          <div
            className={`p-4 rounded-xl border transition-colors ${
              inferencePhase === 'prefill'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-black/30 border-white/10 text-slate-400'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono font-bold mb-1">
              <span>Phase 1: Prefill (Prompt Ingestion)</span>
              <span>{inferencePhase === 'prefill' ? 'Computing KV Cache...' : 'Parallel Matrix Math'}</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Processes entire prompt tokens simultaneously. Dictates <strong>Time to First Token (TTFT)</strong>.
            </p>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-400"
                initial={false}
                animate={{ width: inferencePhase === 'idle' ? '0%' : '100%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Phase 2: Autoregressive Decode */}
          <div
            className={`p-4 rounded-xl border transition-colors ${
              inferencePhase === 'decode'
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-black/30 border-white/10 text-slate-400'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono font-bold mb-1">
              <span>Phase 2: Autoregressive Decode</span>
              <span>{simulatedTokens} tokens emitted</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Generates 1 token per loop iteration sequentially. Dictates <strong>Tokens Per Second (TPS)</strong>.
            </p>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400"
                style={{ width: `${(simulatedTokens / 12) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 7: Context Window: The Hard Constraint */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <Coins className="w-5 h-5 text-indigo-400" />
          Context Window: The Hard Constraint
        </h2>

        <p className="mb-4 leading-relaxed">
          Every model has a maximum number of tokens it can see at once. This is the context window.
        </p>

        <p className="mb-4 leading-relaxed">
          Modern frontier models range from 8K to over 1M+ tokens. Bigger sounds better. <strong>It is not that simple.</strong>
        </p>

        <p className="font-semibold mb-4 leading-relaxed">
          Three production realities:
        </p>

        <div className="space-y-2 mb-4">
          <div
            className={`p-3 rounded-lg border flex items-start gap-3 ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <span className="font-mono font-bold text-rose-500 text-xs">1</span>
            <p className="text-xs sm:text-sm">
              <strong>Cost scales linearly with context:</strong> A 100K token prompt costs roughly 100 times a 1K token prompt on every single API request.
            </p>
          </div>
          <div
            className={`p-3 rounded-lg border flex items-start gap-3 ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <span className="font-mono font-bold text-amber-500 text-xs">2</span>
            <p className="text-xs sm:text-sm">
              <strong>Latency scales with context:</strong> Longer input context directly increases the Time to First Token (TTFT).
            </p>
          </div>
          <div
            className={`p-3 rounded-lg border flex items-start gap-3 ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <span className="font-mono font-bold text-blue-500 text-xs">3</span>
            <p className="text-xs sm:text-sm">
              <strong>Accuracy degrades with context:</strong> Models attend less reliably to information in very long contexts, especially in the middle.
            </p>
          </div>
        </div>

        <p className="mb-4 leading-relaxed">
          This is why <strong>RAG exists</strong>. Instead of stuffing entire books into the context window, you retrieve only the exact relevant paragraphs. Smaller context, lower cost, faster response, higher accuracy.
        </p>

        <div
          className={`p-4 rounded-xl border-l-4 font-mono text-sm font-bold my-3 transition-colors ${
            readerTheme !== 'dark'
              ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
              : 'bg-emerald-950/20 border-emerald-500/50 text-emerald-300'
          }`}
        >
          "Bigger context windows did not kill RAG. They made retrieval quality even more important."
        </div>
      </div>

      {/* Interactive Simulator 4: Context Window Cost & Token Budget Calculator */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          readerTheme !== 'dark'
            ? 'bg-stone-50 border-stone-200'
            : 'bg-slate-900/70 border-emerald-500/30 shadow-xl'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Coins className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-wide">Context Window Economics: Full Dump vs. RAG Retrieval</h3>
            <p className="text-[11px] text-slate-400">
              Calculate the monthly financial cost and latency penalty of bloated context windows.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Prompt Context Size</span>
              <span className="text-emerald-400 font-bold">{inputTokenCount.toLocaleString()} tokens</span>
            </div>
            <input
              type="range"
              min="2000"
              max="128000"
              step="2000"
              value={inputTokenCount}
              onChange={e => setInputTokenCount(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Daily Production Queries</span>
              <span className="text-emerald-400 font-bold">{dailyRequests.toLocaleString()} req/day</span>
            </div>
            <input
              type="range"
              min="500"
              max="25000"
              step="500"
              value={dailyRequests}
              onChange={e => setDailyRequests(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>
        </div>

        {/* Cost Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
            <div className="text-xs font-mono text-rose-400 font-bold uppercase mb-1">
              Naive Approach: Full Context Dump
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mb-1">
              ${monthlyCostDump.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ month</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Passing {inputTokenCount.toLocaleString()} tokens on every request. High latency and diluted attention.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
              Engineered Approach: RAG Retrieval
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mb-1">
              ${monthlyCostRAG.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ month</span>
            </div>
            <p className="text-[11px] text-emerald-300 font-semibold">
              Saves ${Math.max(0, monthlyCostDump - monthlyCostRAG).toLocaleString()}/month ({savingsPct}% cost reduction) with &lt;300ms TTFT!
            </p>
          </div>
        </div>
      </div>

      {/* Section 8: Temperature and Sampling: Controlling Output */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <Sliders className="w-5 h-5 text-indigo-400" />
          Temperature and Sampling: Controlling Output
        </h2>

        <p className="mb-4 leading-relaxed">
          The model outputs raw probabilities. Something has to turn those mathematical probabilities into an actual token choice.
        </p>

        <p className="mb-4 leading-relaxed">
          <strong>Temperature controls how random that choice is.</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-cyan-400 mb-1 uppercase">
              Low Temperature (T ≤ 0.2)
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The model almost always picks the highest probability token. <strong>Deterministic.</strong> Required for JSON extraction, classification, schema compliance, and code generation.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-xs font-mono font-bold text-amber-400 mb-1 uppercase">
              High Temperature (T ≥ 0.7)
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The model samples more broadly across the probability curve. <strong>Creative.</strong> Useful for brainstorming, creative copywriting, and divergent reasoning.
            </p>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border-l-4 font-mono text-sm font-bold my-3 transition-colors ${
            readerTheme !== 'dark'
              ? 'bg-rose-50 border-rose-500 text-rose-950'
              : 'bg-rose-950/20 border-rose-500/50 text-rose-300'
          }`}
        >
          "For production, the rule is simple: If you need the same answer twice, use low temperature. If you want variety, raise it. Never leave it at default without thinking about it."
        </div>
      </div>

      {/* Section 9: Why LLMs Hallucinate */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <AlertTriangle className="w-5 h-5 text-indigo-400" />
          Why LLMs Hallucinate
        </h2>

        <p className="mb-4 leading-relaxed">
          This is the question every stakeholder and executive asks. Here is the honest technical answer:
        </p>

        <p className="mb-4 leading-relaxed">
          An LLM is a next-token predictor. <strong>It has no internal mechanism for distinguishing "I know this" from "this sounds plausible."</strong>
        </p>

        <p className="mb-4 leading-relaxed">
          When the model lacks information, it does not stop and raise an exception. It generates the most statistically likely continuation. That continuation can be confident, grammatically fluent, and completely wrong.
        </p>

        <div
          className={`p-4 rounded-xl border-l-4 font-mono text-sm font-bold my-3 transition-colors ${
            readerTheme !== 'dark'
              ? 'bg-amber-50 border-amber-500 text-amber-950'
              : 'bg-amber-950/20 border-amber-500/50 text-amber-300'
          }`}
        >
          "Hallucination is not a bug. It is the natural output of the architecture when the model is asked something outside its knowledge or given insufficient context."
        </div>

        <p className="mb-4 leading-relaxed">
          This is why <strong>grounding matters</strong>. RAG, strict citations, tool calls, and validation layers all exist to give the model something real to attend to instead of forcing it to guess.
        </p>

        <p className="font-bold text-indigo-400 leading-relaxed">
          You do not fix hallucination with a better prompt. You fix it with architecture.
        </p>
      </div>

      {/* Interactive Simulator 5: Hallucination vs Grounded Execution */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          readerTheme !== 'dark'
            ? 'bg-stone-50 border-stone-200'
            : 'bg-slate-900/70 border-purple-500/30 shadow-xl'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-wide">Interactive Architecture Switcher: Prompting vs. Grounding</h3>
              <p className="text-[11px] text-slate-400">
                Toggle the system architecture to see how hallucination is eliminated.
              </p>
            </div>
          </div>

          <div className="flex rounded-lg bg-black/40 p-1 border border-white/10 shrink-0">
            <button
              onClick={() => setGroundingMode('ungrounded')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                groundingMode === 'ungrounded'
                  ? 'bg-rose-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Prompt Alone (Ungrounded)
            </button>
            <button
              onClick={() => setGroundingMode('grounded')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                groundingMode === 'grounded'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Grounded Architecture
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/10">
          <div className="text-xs font-mono text-slate-400 mb-1.5">
            Query: <span className="text-white">"What is the maximum liability cap under clause 14.2 in the 2024 vendor agreement?"</span>
          </div>

          <AnimatePresence mode="wait">
            {groundingMode === 'ungrounded' ? (
              <motion.div
                key="ungrounded"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-2 text-xs font-mono"
              >
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-200">
                  <div className="text-rose-400 font-bold mb-1">❌ Ungrounded Model Output (Pure Hallucination):</div>
                  "Under clause 14.2, the maximum liability cap is strictly limited to $1,000,000 or the total fees paid over the preceding 12 months..."
                </div>
                <div className="text-[11px] text-slate-400">
                  ⚠️ <strong>Failure Mode:</strong> The model has never seen this internal agreement. It confidently generated plausible-sounding legal boilerplate with zero factual attribution.
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grounded"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-2 text-xs font-mono"
              >
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200">
                  <div className="text-emerald-400 font-bold mb-1">
                    ✓ Grounded Pipeline Output (Deterministic Citation & Verification):
                  </div>
                  "According to doc_id: legal_agr_2024.pdf [Chunk #42, Clause 14.2], the liability cap is capped at <strong>$2,500,000</strong>. Verified against SNOMED-legal schema with 100% citation confidence."
                </div>
                <div className="text-[11px] text-slate-400">
                  🛡️ <strong>System Architecture:</strong> Hybrid RAG retrieval + strict Pydantic JSON schema + exact document citation + null fallback if retrieval is empty.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Section 10: What This Means for Production */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <Target className="w-5 h-5 text-indigo-400" />
          What This Means for Production
        </h2>

        <p className="mb-4 leading-relaxed">
          Pull it together:
        </p>

        <div className="space-y-2.5 my-4">
          <div
            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 ${
              readerTheme !== 'dark' ? 'bg-indigo-50/50 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/30'
            }`}
          >
            <span className="font-mono text-indigo-400 font-bold">•</span>
            <p>An LLM is a token predictor with attention over a fixed context window.</p>
          </div>
          <div
            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 ${
              readerTheme !== 'dark' ? 'bg-indigo-50/50 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/30'
            }`}
          >
            <span className="font-mono text-indigo-400 font-bold">•</span>
            <p>Cost, latency, and accuracy all scale with tokens.</p>
          </div>
          <div
            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 ${
              readerTheme !== 'dark' ? 'bg-indigo-50/50 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/30'
            }`}
          >
            <span className="font-mono text-indigo-400 font-bold">•</span>
            <p>Hallucination is inherent, so grounding is mandatory.</p>
          </div>
          <div
            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 ${
              readerTheme !== 'dark' ? 'bg-indigo-50/50 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/30'
            }`}
          >
            <span className="font-mono text-indigo-400 font-bold">•</span>
            <p>Temperature is a product decision, not a default.</p>
          </div>
          <div
            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 ${
              readerTheme !== 'dark' ? 'bg-indigo-50/50 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/30'
            }`}
          >
            <span className="font-mono text-indigo-400 font-bold">•</span>
            <p>Training is out of your control. <strong>Architecture is where you win.</strong></p>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border-l-4 font-mono text-sm sm:text-base font-bold my-4 transition-colors ${
            readerTheme !== 'dark'
              ? 'bg-indigo-50 border-indigo-500 text-indigo-950'
              : 'bg-indigo-950/20 border-indigo-500/50 text-indigo-300'
          }`}
        >
          "Every production LLM system is an answer to one question: How do I get the right tokens into the context window, get the right tokens out, and do it fast enough and cheap enough to be worth it?"
        </div>

        <p className="leading-relaxed">
          If you can answer that, you can build.
        </p>
      </div>

      {/* Section 11: Coming Next in This Series */}
      <div className="pt-6 border-t border-white/10">
        <h2
          className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2.5 transition-colors duration-300 ${currentStyles.textTitle}`}
        >
          <ArrowRight className="w-5 h-5 text-indigo-400" />
          Coming Next in This Series
        </h2>

        <div
          className={`p-5 rounded-2xl border transition-colors ${
            readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
          }`}
        >
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
            Part 2 Preview
          </span>
          <h3 className="text-base sm:text-lg font-black text-white mt-1 mb-2">
            RAG Architecture from the Ground Up
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
            Chunking strategies, embedding models, vector search, hybrid retrieval, cross-encoder reranking, and the six failure modes that break production pipelines.
          </p>
          <div className="text-xs font-mono text-cyan-400 font-bold">
            Pure technical. No hype. Real numbers. Follow along if that is useful.
          </div>
        </div>

        {/* Author Profile CTA with LinkedIn */}
        <div
          className={`mt-8 p-6 rounded-2xl border transition-colors ${
            readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">Author & Architect</span>
              <h4 className="text-lg font-black text-white mt-0.5">Bala Venkatesh</h4>
              <span className="text-xs text-slate-400">
                Lead AI Engineer • Building scalable GenAI, RAG systems, and multi-agent platforms.
              </span>
            </div>
            <a
              href="https://www.linkedin.com/in/bala-venkatesh-67964247/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 shadow-md shadow-indigo-500/20"
            >
              <span>Follow on LinkedIn</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* End of Blog Social Share Card */}
        {renderShareFooter ? renderShareFooter() : null}
      </div>
    </div>
  );
}
