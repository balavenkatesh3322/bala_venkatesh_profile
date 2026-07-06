import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  Cpu, 
  Layers, 
  Database, 
  Settings, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  Coins, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  HelpCircle,
  Bookmark
} from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'llm-right-tool',
    title: 'Stop Asking "How LLMs Work." Start Asking "When LLMs Are the Right Tool."',
    category: 'AI Architecture',
    readTime: '5 min read',
    date: 'July 6, 2026',
    excerpt: 'Every week a new flagship LLM drops, but model switching is usually the wrong debate. Shift your engineering mindset to system-level architecture.',
    author: 'Bala Venkatesh',
    tags: ['LLM Architecture', 'Decision Frameworks', 'Enterprise AI']
  }
];

export default function BalaLessons() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash === '#lessons') {
        setSelectedPost(null);
      } else if (hash.startsWith('#lessons/')) {
        const slug = hash.replace('#lessons/', '');
        setSelectedPost(slug || null);
      } else if (hash.startsWith('#lessons-')) {
        const slug = hash.replace('#lessons-', '');
        setSelectedPost(slug || null);
      }
    };

    handleHashCheck();

    window.addEventListener('hashchange', handleHashCheck);
    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
    };
  }, []);
  
  // Custom states for Interactive Simulator 1: Next-Token Prediction
  const [predictionPrompt, setPredictionPrompt] = useState<number>(0);
  const [isPlayingPrediction, setIsPlayingPrediction] = useState<boolean>(false);
  const [predictedTokens, setPredictedTokens] = useState<{word: string; prob: number; color: string}[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  const predictionPrompts = [
    {
      text: "To build a robust enterprise system, Bala recommends starting with the business...",
      steps: [
        { word: "problem", prob: 95, color: "text-cyan-400" },
        { word: "rather", prob: 88, color: "text-indigo-400" },
        { word: "than", prob: 99, color: "text-cyan-400" },
        { word: "the", prob: 92, color: "text-purple-400" },
        { word: "model.", prob: 97, color: "text-emerald-400" }
      ]
    },
    {
      text: "Unlike a static SQL database, an LLM generates answers by predicting...",
      steps: [
        { word: "the", prob: 98, color: "text-cyan-400" },
        { word: "next", prob: 99, color: "text-indigo-400" },
        { word: "logical", prob: 76, color: "text-purple-400" },
        { word: "word", prob: 84, color: "text-pink-400" },
        { word: "token.", prob: 94, color: "text-emerald-400" }
      ]
    }
  ];

  const startPredictionDemo = () => {
    setIsPlayingPrediction(true);
    setPredictedTokens([]);
    setCurrentStep(-1);
    
    const steps = predictionPrompts[predictionPrompt].steps;
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        const nextToken = steps[stepIndex];
        if (nextToken) {
          setPredictedTokens(prev => [...prev, nextToken]);
          setCurrentStep(stepIndex);
        }
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsPlayingPrediction(false);
      }
    }, 1000);
  };

  // Custom states for Interactive Simulator 2: FT vs RAG
  const [simMode, setSimMode] = useState<'ft' | 'rag'>('rag');
  const [ragStep, setRagStep] = useState<number>(0);
  
  // Custom states for Interactive Simulator 3: 3-Layer Stack
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  // Custom states for Interactive Simulator 4: LLM Decision Calculator
  const [frequency, setFrequency] = useState<'realtime' | 'weekly' | 'static'>('realtime');
  const [latency, setLatency] = useState<'ultra' | 'moderate' | 'flexible'>('moderate');
  const [privacy, setPrivacy] = useState<'onprem' | 'standard'>('standard');
  const [budget, setBudget] = useState<'low' | 'premium'>('premium');

  const getCalculatorRecommendation = () => {
    if (privacy === 'onprem') {
      return {
        title: "Self-Hosted Open Source Architecture (Gated Llama 3 / Mistral)",
        engine: "vLLM / Ollama with Local PostgreSQL Vector DB",
        rationale: "Because your enterprise data has strict privacy/security boundaries, cloud APIs are a risk. Host a quantized open-source model behind an internal secure network using Drizzle + PGVector for context injection.",
        cost: "Variable infrastructure hosting cost, high initial engineering effort.",
        difficulty: "High (requires custom GPU provisioning and system monitoring)"
      };
    }
    
    if (frequency === 'realtime') {
      if (latency === 'ultra') {
        return {
          title: "Hybrid Real-time Cached RAG Platform",
          engine: "Gemini 1.5 Flash + Redis Semantic Cache + Vector DB",
          rationale: "Real-time updates paired with ultra-low latency requires a semantic caching layer. Redis stores embeddings of previous queries, serving repeating questions instantly (<100ms) and hitting Gemini 1.5 Flash only when cache misses.",
          cost: "Highly optimized. Cost is low due to Gemini Flash pricing and high cache hit ratios.",
          difficulty: "Medium (requires cache-invalidation pipeline)"
        };
      }
      return {
        title: "Corrective RAG (CRAG) Pipeline with Search Fallback",
        engine: "Gemini 1.5 Pro + LangGraph + Tavily Search API",
        rationale: "Since your data changes in real-time, we retrieve documents from your Vector DB and grade them. If they are obsolete or insufficient, the supervisor node triggers a real-time Tavily search to fetch the fresh live facts.",
        cost: "Moderate. Higher token consumption due to multi-agent self-grading loops.",
        difficulty: "Medium-High (requires custom LangGraph orchestration)"
      };
    }

    if (budget === 'low') {
      return {
        title: "Standard Sparse-Dense Hybrid Retrieval with Gemini 1.5 Flash",
        engine: "Gemini 1.5 Flash + Supabase Vector + BM25",
        rationale: "For budget-constrained projects with semi-static data, hybrid keyword-vector search keeps context windows tiny. Gemini 1.5 Flash provides incredible processing speeds and cheap input token pricing.",
        cost: "Extremely Low ($20 - $50/month for average startup workloads)",
        difficulty: "Low (standard client-side integration)"
      };
    }

    return {
      title: "Advanced Cognitive RAG Stack",
      engine: "Gemini 1.5 Pro + Cross-Encoder Reranker + Pinecone Vector DB",
      rationale: "A premium enterprise build with high accuracy targets. We use dense embeddings for retrieval, rerank the top 25 chunks down to the best 5 using a Cohere/BGE Reranker to maximize signal-to-noise ratio, and feed them to the flagship Gemini model.",
      cost: "Premium usage costs, justified by bulletproof accuracy.",
      difficulty: "Medium"
    };
  };

  return (
    <section id="lessons" className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Introduction */}
        {!selectedPost ? (
          <div className="text-center flex flex-col items-center gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono text-cyan-400 uppercase tracking-widest"
            >
              Lessons Learned in the Field
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white"
            >
              Bala's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Lessons</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 max-w-2xl text-base sm:text-lg text-center"
            >
              Real-world engineering challenges, trade-offs, and battle-tested lessons from building systems in the field.
            </motion.p>
          </div>
        ) : (
          <div className="mb-8">
            <button
              onClick={() => {
                window.location.hash = '#lessons';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Lessons Index
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className={`${selectedPost ? 'lg:col-span-12' : 'lg:col-span-8 lg:col-start-3'} flex flex-col gap-12`}>
            
            <AnimatePresence mode="wait">
              {!selectedPost ? (
                // Index View
                <motion.div 
                  key="index"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="flex flex-col gap-6"
                >
                  {BLOG_POSTS.map((post) => (
                    <div 
                      key={post.slug}
                      onClick={() => {
                        window.location.hash = `#lessons/${post.slug}`;
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group rounded-3xl p-6 sm:p-8 glass-panel border border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.02] transition-all duration-300 text-left flex flex-col justify-between gap-6 relative overflow-hidden cursor-pointer shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-300" />
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">{post.category}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                          <span>{post.date}</span>
                        </div>
                        
                        <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-bold font-mono text-white text-[10px]">
                            BV
                          </div>
                          <span className="text-xs font-semibold text-slate-300">{post.author}</span>
                        </div>
                        
                        <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                          Read Lesson <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                // Article Detail View
                <motion.article 
                  key="article"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-3xl glass-panel p-6 sm:p-10 lg:p-12 border border-white/5 relative overflow-hidden"
                >
                  {/* Subtle decorative orb */}
                  <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
                  
                  {/* Category and Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase tracking-wide">
                      AI Architecture
                    </span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                    <span>July 6, 2026</span>
                    <span className="hidden sm:inline">Written by Bala Venkatesh</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-8 text-left">
                    Stop Asking "How LLMs Work." <br className="hidden sm:inline"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                      Start Asking "When LLMs Are the Right Tool."
                    </span>
                  </h1>

                  {/* Author Header */}
                  <div className="flex items-center gap-3 border-b border-white/5 pb-8 mb-8">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-bold font-mono text-white text-sm shadow-md">
                      BV
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-black text-white">Bala Venkatesh</div>
                      <div className="text-xs text-slate-400">Lead AI Engineer & Data Scientist</div>
                    </div>
                  </div>

                  {/* Blog Body Content */}
                  <div className="text-left text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed font-sans">
                    
                    <p className="text-base sm:text-lg text-slate-200 font-semibold italic border-l-2 border-cyan-400 pl-4 py-1.5 mb-6">
                      "I'm Bala Venkatesh. My goal here is not to give generic explanations of what LLMs are. Rather, I share real architectural trade-offs, decision-making matrices, and system-level insights from deploying high-scale AI products."
                    </p>

                    <p>
                      Every week, a new Large Language Model (LLM) is released with higher benchmark scores and larger context windows.
                    </p>
                    
                    <p>
                      Teams immediately react by asking: <span className="text-cyan-400 font-semibold font-mono">"Should we switch?"</span> That's usually the wrong question.
                    </p>

                    <p>
                      The better, more architectural question is: <strong className="text-white">"Does this model solve our business problem better than our current approach, or are we just throwing brute-force parameters at a system problem?"</strong>
                    </p>

                    <p>
                      Before comparing model features, we must understand how an LLM actually functions from an systems engineering perspective.
                    </p>

                    {/* Section 1 */}
                    <div className="pt-6">
                      <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                        <Cpu className="text-cyan-400 w-5 h-5" />
                        1. Think of an LLM as a Prediction Engine, Not a Knowledge Database
                      </h2>
                      <p className="mb-4">
                        An LLM doesn't query a central index database or search the web every time you submit a prompt.
                      </p>
                      <p className="mb-4">
                        Instead, it predicts the next word (or token) in a sequence based on massive statistical weights adjusted during training. It computes a probability distribution and outputs the highest probability next-token.
                      </p>
                      <p className="mb-6">
                        That means it is excellent at translation, summarization, formatting, and abstract reasoning, but it does <strong className="text-rose-400">not</strong> naturally know your internal company policies, live sales numbers, or private records.
                      </p>

                      {/* INTERACTIVE DEMO 1: NEXT-TOKEN GENERATOR */}
                      <div className="my-8 rounded-2xl bg-white/[0.02] border border-white/5 p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-500/10 border-b border-l border-cyan-400/20 rounded-bl-xl font-mono text-[10px] text-cyan-400">
                          INTERACTIVE VISUALIZER
                        </div>

                        <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                          Animated Token Prediction Simulator
                        </h4>
                        <p className="text-xs text-slate-400 mb-6">
                          Select a system state prompt below and trigger the generator to witness the model calculate the probability distributions step-by-step.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                          {predictionPrompts.map((p, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setPredictionPrompt(idx);
                                setPredictedTokens([]);
                                setCurrentStep(-1);
                              }}
                              disabled={isPlayingPrediction}
                              className={`flex-1 text-left p-3.5 rounded-xl text-xs font-mono transition-all border ${
                                predictionPrompt === idx 
                                  ? 'bg-cyan-500/5 border-cyan-500/30 text-cyan-400' 
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                              } cursor-pointer`}
                            >
                              Prompt {idx + 1}: "{p.text.substring(0, 45)}..."
                            </button>
                          ))}
                        </div>

                        {/* Interactive Stage */}
                        <div className="bg-slate-950 rounded-xl p-5 border border-white/5 flex flex-col gap-4 text-left">
                          <div className="text-xs font-mono text-slate-500 border-b border-white/5 pb-2">
                            INPUT PROMPT:
                          </div>
                          <p className="text-sm sm:text-base font-semibold text-slate-200 leading-relaxed italic">
                            "{predictionPrompts[predictionPrompt].text}"
                          </p>

                          <div className="text-xs font-mono text-slate-500 border-b border-white/5 pb-2 pt-2">
                            PREDICTION LOOP (TOKEN OUTPUTS):
                          </div>
                          
                          <div className="min-h-[60px] flex flex-wrap items-center gap-2 p-3 bg-white/[0.01] rounded-lg border border-white/5">
                            {predictedTokens.length === 0 && (
                              <span className="text-xs font-mono text-slate-500 italic">Click "Trigger Prediction Engine" to start token calculation...</span>
                            )}
                            {predictedTokens.map((t, idx) => (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                key={idx}
                                className={`px-2 py-1 rounded font-mono text-sm font-bold bg-white/5 ${t.color}`}
                              >
                                {t.word}
                              </motion.span>
                            ))}
                          </div>

                          {/* Live Math Stats */}
                          {currentStep >= 0 && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs font-mono bg-cyan-950/20 border border-cyan-500/10 p-3 rounded-lg text-cyan-400 flex flex-col gap-1"
                            >
                              <div className="flex justify-between">
                                <span>Token Selected: <strong className="text-white">"{predictionPrompts[predictionPrompt].steps[currentStep].word}"</strong></span>
                                <span>Probability Confidence: <strong className="text-white">{predictionPrompts[predictionPrompt].steps[currentStep].prob}%</strong></span>
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1.5">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${predictionPrompts[predictionPrompt].steps[currentStep].prob}%` }}
                                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500" 
                                />
                              </div>
                            </motion.div>
                          )}
                        </div>

                        <div className="mt-5 flex justify-end">
                          <button
                            onClick={startPredictionDemo}
                            disabled={isPlayingPrediction}
                            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-500 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 shadow-md shadow-cyan-500/10 cursor-pointer"
                          >
                            {isPlayingPrediction ? 'Predicting Next Words...' : 'Trigger Prediction Engine'}
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-slate-400 mt-2 italic text-left">
                        💡 <strong>Real Field Lesson:</strong> The expectation in enterprise software is often "The model knows everything." The reality is "The model only knows patterns it trained on unless you explicitly provide additional context."
                      </p>
                    </div>

                    {/* Section 2 */}
                    <div className="pt-6">
                      <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                        <Layers className="text-cyan-400 w-5 h-5" />
                        2. Why Companies Don't Stop With an LLM: Fine-Tuning vs. RAG
                      </h2>
                      <p className="mb-4">
                        Imagine building an AI assistant for your company's HR team. An employee asks: <span className="font-mono text-cyan-400 bg-white/5 px-1.5 py-0.5 rounded">"What is our current leave policy?"</span>
                      </p>
                      <p className="mb-4">
                        The base model has no concept of your internal files. You have two engineering pathways:
                      </p>

                      {/* INTERACTIVE DEMO 2: FT vs RAG */}
                      <div className="my-8 rounded-2xl bg-white/[0.02] border border-white/5 p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-500/10 border-b border-l border-cyan-400/20 rounded-bl-xl font-mono text-[10px] text-cyan-400">
                          PIPELINE COMPARATIVE SIMULATOR
                        </div>

                        <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">
                          Fine-Tuning vs. Retrieval-Augmented Generation (RAG)
                        </h4>

                        <div className="flex border-b border-white/10 gap-4 mb-6">
                          <button
                            onClick={() => { setSimMode('ft'); setRagStep(0); }}
                            className={`pb-3 text-xs font-mono font-black border-b-2 transition-all cursor-pointer ${
                              simMode === 'ft' ? 'border-cyan-400 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            Option A: Fine-Tuning
                          </button>
                          <button
                            onClick={() => { setSimMode('rag'); setRagStep(0); }}
                            className={`pb-3 text-xs font-mono font-black border-b-2 transition-all cursor-pointer ${
                              simMode === 'rag' ? 'border-cyan-400 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            Option B: RAG (Context Injection)
                          </button>
                        </div>

                        {/* FT View */}
                        {simMode === 'ft' ? (
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                            <div className="md:col-span-7 flex flex-col gap-4">
                              <h5 className="text-base font-bold text-white flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                Adapting Model Weights
                              </h5>
                              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Fine-tuning alters the model's actual internal weight matrix. It is excellent for adjusting the response tone, output format, domain terminology, and stylistic preferences. 
                              </p>
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className="p-3 rounded-lg bg-red-950/10 border border-red-500/10 text-red-400">
                                  <div className="text-[10px] font-mono uppercase font-black">Drawback</div>
                                  <div className="text-xs font-semibold">Expensive & Slow to update</div>
                                </div>
                                <div className="p-3 rounded-lg bg-emerald-950/10 border border-emerald-500/10 text-emerald-400">
                                  <div className="text-[10px] font-mono uppercase font-black">Best For</div>
                                  <div className="text-xs font-semibold">Voice & complex styling</div>
                                </div>
                              </div>
                            </div>
                            <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-white/5 flex flex-col gap-3">
                              <div className="text-[10px] font-mono text-slate-500">NEURAL NET WEIGHT UPDATE SIMULATOR:</div>
                              <div className="flex justify-around items-center py-6">
                                <div className="flex flex-col gap-3">
                                  <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700" />
                                  <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700" />
                                  <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700" />
                                </div>
                                <div className="flex flex-col gap-4 relative">
                                  {/* Weight lines */}
                                  <div className="w-4 h-3.5 rounded-full bg-cyan-400 animate-pulse border border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                  <div className="w-4 h-3.5 rounded-full bg-indigo-500 animate-pulse border border-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                  <div className="w-4 h-3.5 rounded-full bg-cyan-400 animate-pulse border border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                </div>
                                <div className="flex flex-col gap-3">
                                  <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700" />
                                  <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700" />
                                </div>
                              </div>
                              <div className="text-[10px] font-mono text-center text-cyan-400">Epoch: 3/3 - Loss: 0.124 [Weights Locked]</div>
                            </div>
                          </div>
                        ) : (
                          /* RAG View */
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                            <div className="md:col-span-6 flex flex-col gap-4">
                              <h5 className="text-base font-bold text-white flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                                Context Injection Pipeline
                              </h5>
                              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Instead of changing the model, RAG queries a vector database, retrieves the fresh text chunk, and dynamically injects it into the prompt.
                              </p>

                              {/* Interactive sequence controller */}
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => setRagStep(prev => (prev > 0 ? prev - 1 : 0))}
                                  disabled={ragStep === 0}
                                  className="p-1 px-2.5 bg-white/5 border border-white/10 hover:border-white/20 disabled:opacity-30 rounded-lg text-xs font-mono text-white cursor-pointer"
                                >
                                  Prev Step
                                </button>
                                <span className="text-[10px] font-mono text-slate-500">Step {ragStep + 1} of 4</span>
                                <button
                                  onClick={() => setRagStep(prev => (prev < 3 ? prev + 1 : 3))}
                                  disabled={ragStep === 3}
                                  className="p-1 px-2.5 bg-cyan-500 text-slate-950 disabled:bg-slate-800 disabled:text-slate-500 rounded-lg text-xs font-mono font-black hover:scale-[1.02] cursor-pointer"
                                >
                                  Next Step
                                </button>
                              </div>
                            </div>

                            {/* Animated steps */}
                            <div className="md:col-span-6 bg-slate-950 p-4 rounded-xl border border-white/5 min-h-[170px] flex flex-col justify-between">
                              <div className="text-[10px] font-mono text-slate-500 uppercase">Interactive execution sequence:</div>
                              
                              <div className="py-2 flex flex-col gap-2">
                                {ragStep === 0 && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-start text-xs font-mono text-cyan-400">
                                    <span className="p-1 bg-cyan-400/10 rounded">Q</span>
                                    <div>
                                      <strong>1. User Query:</strong> "What's our HR leave policy?"
                                      <div className="text-[10px] text-slate-500 mt-1">Prompt converted to float embedding vectors.</div>
                                    </div>
                                  </motion.div>
                                )}
                                {ragStep === 1 && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-start text-xs font-mono text-indigo-400">
                                    <span className="p-1 bg-indigo-400/10 rounded">DB</span>
                                    <div>
                                      <strong>2. Dense Vector Lookup:</strong>
                                      <div className="text-[10px] text-slate-400 mt-1 bg-white/5 p-1.5 rounded">
                                        {"Similarity: 0.94 -> policy_leave_handbook.pdf"}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                                {ragStep === 2 && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-start text-xs font-mono text-amber-400">
                                    <span className="p-1 bg-amber-400/10 rounded">CTX</span>
                                    <div>
                                      <strong>3. Context Injection:</strong>
                                      <div className="text-[10px] text-slate-400 mt-1">System appends the fetched handbook chunk directly in front of LLM prompt wrapper.</div>
                                    </div>
                                  </motion.div>
                                )}
                                {ragStep === 3 && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-start text-xs font-mono text-emerald-400">
                                    <span className="p-1 bg-emerald-400/10 rounded">OK</span>
                                    <div>
                                      <strong>4. Verifiable Generation:</strong>
                                      <div className="text-[10px] text-slate-400 mt-1">"Based on HR Leave policy Section 4, employees get..."</div>
                                      <div className="text-[9px] text-emerald-500 mt-1 font-bold">✓ 100% Factual Source Cited</div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>

                              <div className="text-[10px] font-mono text-slate-500 text-center">
                                RAG is highly dynamic, real-time, and cheap to maintain compared to fine-tuning.
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div className="pt-6">
                      <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                        <Settings className="text-cyan-400 w-5 h-5" />
                        3. The Architecture Matters More Than the Model
                      </h2>
                      <p className="mb-4">
                        One critical mistake I frequently notice is enterprise teams spending months debating which commercial LLM to select, while spending very little time designing the surrounding engineering stack.
                      </p>
                      <p className="mb-4">
                        In highly-scaled production environments, business success almost always depends on retrieval quality, semantic caching, routing orchestrators, prompt schemas, and monitoring.
                      </p>
                      <p className="mb-6">
                        A robust, highly designed architecture utilizing a fast, smaller model will consistently outperform a poorly built, direct-stuffed system utilizing the most expensive flagship model.
                      </p>
                    </div>

                    {/* Section 4 */}
                    <div className="pt-6">
                      <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                        <Layers className="text-cyan-400 w-5 h-5" />
                        4. A Simple Mental Model: The Three Layers
                      </h2>
                      <p className="mb-6">
                        When evaluating or engineering an AI application, shift your mindset to think of your system in terms of three decoupled layers:
                      </p>

                      {/* INTERACTIVE DEMO 3: 3-LAYER STACK DECK */}
                      <div className="my-8 rounded-2xl bg-white/[0.02] border border-white/5 p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-500/10 border-b border-l border-cyan-400/20 rounded-bl-xl font-mono text-[10px] text-cyan-400">
                          STACK SPECIFICATION EXPLORER
                        </div>

                        <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Interactive 3-Layer Stack Map
                        </h4>
                        <p className="text-xs text-slate-400 mb-6">
                          Hover or tap each architectural card to unfold Bala's deep engineering notes and associated tools for that layer.
                        </p>

                        <div className="flex flex-col gap-4">
                          
                          {/* Layer 3 */}
                          <div 
                            onMouseEnter={() => setHoveredLayer(3)}
                            onMouseLeave={() => setHoveredLayer(null)}
                            onClick={() => setHoveredLayer(hoveredLayer === 3 ? null : 3)}
                            className={`p-5 rounded-2xl border transition-all duration-300 text-left relative cursor-pointer ${
                              hoveredLayer === 3 
                                ? 'bg-cyan-950/20 border-cyan-500/30 shadow-[0_4px_20px_rgba(34,211,238,0.1)]' 
                                : 'bg-white/5 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono font-bold text-cyan-400">LAYER 3 — THE APPLICATION LAYER</span>
                              <span className="text-[10px] font-mono text-slate-500">Click to Expand</span>
                            </div>
                            <h5 className="text-base font-bold text-white mb-2">Orchestration, Guardrails, and User Interface</h5>
                            
                            <AnimatePresence>
                              {hoveredLayer === 3 && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden text-xs sm:text-sm text-slate-300 space-y-3 mt-4 pt-4 border-t border-white/10"
                                >
                                  <p>
                                    This is where your business logic, evaluation cycles, and routing take place. This layer ensures user safety, manages token caching, handles feedback loops, and routes prompt templates.
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">LangGraph / LangChain</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">Express.js API Router</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">Guardrails.ai</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">LlamaGuard</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Layer 2 */}
                          <div 
                            onMouseEnter={() => setHoveredLayer(2)}
                            onMouseLeave={() => setHoveredLayer(null)}
                            onClick={() => setHoveredLayer(hoveredLayer === 2 ? null : 2)}
                            className={`p-5 rounded-2xl border transition-all duration-300 text-left relative cursor-pointer ${
                              hoveredLayer === 2 
                                ? 'bg-indigo-950/20 border-indigo-500/30 shadow-[0_4px_20px_rgba(99,102,241,0.1)]' 
                                : 'bg-white/5 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono font-bold text-indigo-400">LAYER 2 — YOUR DATA LAYER</span>
                              <span className="text-[10px] font-mono text-slate-500">Click to Expand</span>
                            </div>
                            <h5 className="text-base font-bold text-white mb-2">Documents, DBs, and Enterprise Systems</h5>
                            
                            <AnimatePresence>
                              {hoveredLayer === 2 && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden text-xs sm:text-sm text-slate-300 space-y-3 mt-4 pt-4 border-t border-white/10"
                                >
                                  <p>
                                    This contains the database architectures and file repositories that hold your real, custom enterprise facts. It translates unstructured data into highly optimized vector embeddings to facilitate instant searching.
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">Cloud Firestore</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">PostgreSQL (PGVector)</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">Pinecone</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">Redis Caching</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Layer 1 */}
                          <div 
                            onMouseEnter={() => setHoveredLayer(1)}
                            onMouseLeave={() => setHoveredLayer(null)}
                            onClick={() => setHoveredLayer(hoveredLayer === 1 ? null : 1)}
                            className={`p-5 rounded-2xl border transition-all duration-300 text-left relative cursor-pointer ${
                              hoveredLayer === 1 
                                ? 'bg-cyan-950/20 border-cyan-500/30 shadow-[0_4px_20px_rgba(34,211,238,0.1)]' 
                                : 'bg-white/5 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono font-bold text-cyan-400">LAYER 1 — THE MODEL ENGINE LAYER</span>
                              <span className="text-[10px] font-mono text-slate-500">Click to Expand</span>
                            </div>
                            <h5 className="text-base font-bold text-white mb-2">Large Language Model Core</h5>
                            
                            <AnimatePresence>
                              {hoveredLayer === 1 && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden text-xs sm:text-sm text-slate-300 space-y-3 mt-4 pt-4 border-t border-white/10"
                                >
                                  <p>
                                    This is the foundation processing engine. It understands language patterns, generates formatting structures, and executes reasoning steps. Usually accessed via API or local hosting.
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">Gemini 1.5 Pro</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">Gemini 1.5 Flash</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] rounded">Llama 3 (Ollama/Local)</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                        </div>
                      </div>

                      <p className="mt-4">
                        Most modern engineering efforts should belong in <strong className="text-white">Layers 2 and 3</strong>—not in constantly swapping the core model inside Layer 1.
                      </p>
                    </div>

                    {/* Section 5 */}
                    <div className="pt-6">
                      <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                        <HelpCircle className="text-cyan-400 w-5 h-5" />
                        5. The Questions I Ask Before Selecting an LLM
                      </h2>
                      <p className="mb-4">
                        Instead of asking generic questions like: <span className="font-mono text-cyan-400 bg-white/5 px-1.5 py-0.5 rounded">"Which LLM has the highest score on MMLU benchmarks?"</span> I recommend reviewing this practical selection checklist with your engineering lead:
                      </p>

                      {/* INTERACTIVE DEMO 4: DECISION CALCULATOR */}
                      <div className="my-8 rounded-2xl bg-white/[0.02] border border-white/5 p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-500/10 border-b border-l border-cyan-400/20 rounded-bl-xl font-mono text-[10px] text-cyan-400">
                          AI ARCHITECT CALCULATOR
                        </div>

                        <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Bala's Interactive LLM Selector Calculator
                        </h4>
                        <p className="text-xs text-slate-400 mb-6">
                          Configure your business scenario constraints below to instantly formulate a robust custom technical blueprint.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                          
                          {/* Q1 */}
                          <div className="flex flex-col gap-2 text-left">
                            <label className="text-xs font-mono text-slate-400 font-bold uppercase">Data Freshness Requirements</label>
                            <select 
                              value={frequency}
                              onChange={(e) => setFrequency(e.target.value as any)}
                              className="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono focus:border-cyan-400 outline-none cursor-pointer"
                            >
                              <option value="realtime">Real-time / Instant changes (e.g. Stock, Orders)</option>
                              <option value="weekly">Weekly or Monthly changes (e.g. Handbooks)</option>
                              <option value="static">Completely Static facts (e.g. Legal Codes)</option>
                            </select>
                          </div>

                          {/* Q2 */}
                          <div className="flex flex-col gap-2 text-left">
                            <label className="text-xs font-mono text-slate-400 font-bold uppercase">Target Output Latency SLA</label>
                            <select 
                              value={latency}
                              onChange={(e) => setLatency(e.target.value as any)}
                              className="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono focus:border-cyan-400 outline-none cursor-pointer"
                            >
                              <option value="ultra">Ultra-fast (&lt; 1s responses critical)</option>
                              <option value="moderate">Moderate (2s - 4s is acceptable)</option>
                              <option value="flexible">No constraint (Batch operations acceptable)</option>
                            </select>
                          </div>

                          {/* Q3 */}
                          <div className="flex flex-col gap-2 text-left">
                            <label className="text-xs font-mono text-slate-400 font-bold uppercase">Enterprise Data Privacy Constraints</label>
                            <select 
                              value={privacy}
                              onChange={(e) => setPrivacy(e.target.value as any)}
                              className="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono focus:border-cyan-400 outline-none cursor-pointer"
                            >
                              <option value="standard">Standard Cloud APIs are approved</option>
                              <option value="onprem">Highly Sensitive (On-Prem / Private Cloud only)</option>
                            </select>
                          </div>

                          {/* Q4 */}
                          <div className="flex flex-col gap-2 text-left">
                            <label className="text-xs font-mono text-slate-400 font-bold uppercase">Operating Budget Bounds</label>
                            <select 
                              value={budget}
                              onChange={(e) => setBudget(e.target.value as any)}
                              className="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono focus:border-cyan-400 outline-none cursor-pointer"
                            >
                              <option value="premium">Flagship Accuracy prioritized (Higher budget)</option>
                              <option value="low">Budget-optimized (Low cost essential)</option>
                            </select>
                          </div>

                        </div>

                        {/* Recommendation Output */}
                        <motion.div 
                          layout
                          className="bg-slate-950 rounded-2xl border border-cyan-500/10 p-5 text-left flex flex-col gap-3 shadow-inner"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">BALA'S RECOMMENDED ARCHITECTURE</span>
                          </div>

                          <h5 className="text-base sm:text-lg font-black text-white">{getCalculatorRecommendation().title}</h5>
                          
                          <div className="text-xs font-mono bg-white/5 p-2 rounded inline-block text-slate-300 border border-white/5">
                            Core Tooling: <strong className="text-cyan-400">{getCalculatorRecommendation().engine}</strong>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2">
                            {getCalculatorRecommendation().rationale}
                          </p>

                          <div className="border-t border-white/5 pt-3 mt-2 flex flex-col sm:flex-row justify-between text-[11px] font-mono text-slate-500">
                            <span>Cost Profile: <strong className="text-slate-300">{getCalculatorRecommendation().cost}</strong></span>
                            <span className="mt-1 sm:mt-0">Implementation Difficulty: <strong className="text-slate-300">{getCalculatorRecommendation().difficulty}</strong></span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Summary Takeaway */}
                    <div className="pt-8 border-t border-white/5 mt-10 text-left">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Final Takeaway</h3>
                      <p className="mb-4">
                        If you are building an AI product, stop asking: <span className="font-semibold text-rose-400 font-mono">"Which LLM should I use?"</span>
                      </p>
                      <p className="mb-6 font-semibold text-white">
                        Instead, start asking: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 text-lg">"What system should I build around the LLM so it consistently solves my users' problems with deterministic safety?"</span>
                      </p>
                      <p>
                        That is the critical shift from thinking like a basic tool-implementer to thinking like an **Enterprise AI Architect**.
                      </p>
                    </div>

                    {/* Distinctions Footer */}
                    <div className="mt-10 p-5 rounded-2xl bg-cyan-950/10 border border-cyan-500/10 text-xs sm:text-sm text-slate-400 leading-relaxed italic text-left">
                      📚 <strong>Author's Note:</strong> This blog doesn't end with "Now you know how LLMs work." It ends with "Now you have a framework to decide whether an LLM is the right solution for your business." That distinction is what positions you as a strategic consultant that companies trust.
                    </div>

                  </div>
                </motion.article>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
