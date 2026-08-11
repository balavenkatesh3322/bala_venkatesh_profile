import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import WaterWaveEffect from './WaterWaveEffect';
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
  Bookmark,
  Sun,
  Moon,
  Type,
  Sliders,
  ChevronDown,
  Check,
  Heart,
  Share2,
  Copy,
  Send,
  MessageSquare,
  ExternalLink,
  X,
  Download,
  Quote,
  Image as ImageIcon
} from 'lucide-react';

interface Series {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
}

interface BlogPost {
  slug: string;
  title: string;
  seriesId: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  comingSoon?: boolean;
}

const SERIES_LIST: Series[] = [
  {
    id: 'how-bala-thinks',
    title: 'How Bala Thinks',
    emoji: '🧠',
    description: 'Mental models, evaluation structures, and architectural trade-offs behind enterprise AI solutions.',
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/20 hover:border-cyan-500/45 text-cyan-400'
  },
  {
    id: 'production-ai',
    title: 'Production AI',
    emoji: '🏗️',
    description: 'Deep dives into engineering scalable, secure, and cost-optimized pipelines in production environments.',
    color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/20 hover:border-indigo-500/45 text-indigo-400'
  },
  {
    id: 'engineering-mindset',
    title: 'Engineering Mindset',
    emoji: '💡',
    description: 'Personal reflections, career milestones, and the mental shifts required to build software that creates real impact.',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/20 hover:border-amber-500/45 text-amber-400'
  },
  {
    id: 'leadership-ownership',
    title: 'Leadership & Ownership',
    emoji: '👑',
    description: 'Transitioning from task delegation to outcome ownership, building autonomous teams, and mentoring engineers to solve problems independently.',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/20 hover:border-emerald-500/45 text-emerald-400'
  }
];

const BLOG_POSTS: BlogPost[] = [
  // Series 1: How Bala Thinks
  {
    slug: 'llm-right-tool',
    title: 'How I Choose an LLM',
    seriesId: 'how-bala-thinks',
    category: 'AI Architecture',
    readTime: '5 min read',
    date: 'July 6, 2026',
    excerpt: 'Every week a new flagship LLM drops, but model switching is usually the wrong debate. Shift your engineering mindset to system-level architecture.',
    author: 'Bala Venkatesh',
    tags: ['LLM Architecture', 'Decision Frameworks', 'Enterprise AI'],
    comingSoon: false
  },
  {
    slug: 'why-prefer-rag',
    title: 'Why I Prefer RAG Here',
    seriesId: 'how-bala-thinks',
    category: 'Information Retrieval',
    readTime: '4 min read',
    date: 'Coming Soon',
    excerpt: 'Fine-tuning updates a model’s behavior, but RAG updates its memory. Explore why RAG is the default choice for dynamic facts.',
    author: 'Bala Venkatesh',
    tags: ['RAG', 'Vector Search', 'Fine-Tuning'],
    comingSoon: true
  },
  {
    slug: 'dont-use-agents',
    title: "When I Don't Use AI Agents",
    seriesId: 'how-bala-thinks',
    category: 'Orchestration',
    readTime: '6 min read',
    date: 'Coming Soon',
    excerpt: 'Agents add high latency and non-deterministic paths. A guide to when straight state machines are superior.',
    author: 'Bala Venkatesh',
    tags: ['AI Agents', 'State Machines', 'Orchestration'],
    comingSoon: true
  },
  {
    slug: 'system-design-process',
    title: 'My System Design Process',
    seriesId: 'how-bala-thinks',
    category: 'System Design',
    readTime: '5 min read',
    date: 'Coming Soon',
    excerpt: 'Step-by-step from client problem statement to robust multi-agent orchestration blueprints.',
    author: 'Bala Venkatesh',
    tags: ['System Design', 'Enterprise Integration'],
    comingSoon: true
  },
  {
    slug: 'production-lessons',
    title: 'Lessons from Production',
    seriesId: 'how-bala-thinks',
    category: 'Operations',
    readTime: '8 min read',
    date: 'Coming Soon',
    excerpt: 'The true costs of running models in production. Guardrails, scaling limitations, and real-world failure modes.',
    author: 'Bala Venkatesh',
    tags: ['Ops', 'Failure Modes', 'Scaling'],
    comingSoon: true
  },

  // Series 2: Production AI
  {
    slug: 'llm-fundamentals',
    title: 'LLM Fundamentals',
    seriesId: 'production-ai',
    category: 'Foundations',
    readTime: '6 min read',
    date: 'Coming Soon',
    excerpt: 'Under the hood of modern transformer architectures. Context windows, tokenization, and temperature settings.',
    author: 'Bala Venkatesh',
    tags: ['LLMs', 'Transformer', 'Tokenization'],
    comingSoon: true
  },
  {
    slug: 'rag-deep-dive',
    title: 'RAG',
    seriesId: 'production-ai',
    category: 'Retrieval',
    readTime: '7 min read',
    date: 'Coming Soon',
    excerpt: 'Advanced retrieval techniques: parent-child retrieval, query rewriting, and cross-encoder reranking.',
    author: 'Bala Venkatesh',
    tags: ['RAG', 'Embeddings', 'Reranking'],
    comingSoon: true
  },
  {
    slug: 'ai-agents-deep',
    title: 'AI Agents',
    seriesId: 'production-ai',
    category: 'Orchestration',
    readTime: '8 min read',
    date: 'Coming Soon',
    excerpt: 'Designing autonomous agents that can plan, reflect, use tools, and collaborate to achieve complex objectives.',
    author: 'Bala Venkatesh',
    tags: ['Agents', 'Tool Use', 'Planning'],
    comingSoon: true
  },
  {
    slug: 'memory-management',
    title: 'Memory',
    seriesId: 'production-ai',
    category: 'State Management',
    readTime: '5 min read',
    date: 'Coming Soon',
    excerpt: 'Session memory, persistent user history, and summaries. Keeping context high and token costs low.',
    author: 'Bala Venkatesh',
    tags: ['Memory', 'State', 'Context Window'],
    comingSoon: true
  },
  {
    slug: 'evaluation-frameworks',
    title: 'Evaluation',
    seriesId: 'production-ai',
    category: 'Quality Assurance',
    readTime: '6 min read',
    date: 'Coming Soon',
    excerpt: 'How to grade non-deterministic outputs. Ragas, LLM-as-a-Judge, and unit-testing prompt templates.',
    author: 'Bala Venkatesh',
    tags: ['Evaluation', 'Ragas', 'Quality'],
    comingSoon: true
  },
  {
    slug: 'guardrails-security',
    title: 'Guardrails',
    seriesId: 'production-ai',
    category: 'Security',
    readTime: '5 min read',
    date: 'Coming Soon',
    excerpt: 'Prompt injection mitigation, PII filtering, and output validation with Guardrails.ai and LlamaGuard.',
    author: 'Bala Venkatesh',
    tags: ['Security', 'Guardrails', 'Compliance'],
    comingSoon: true
  },
  {
    slug: 'monitoring-analytics',
    title: 'Monitoring',
    seriesId: 'production-ai',
    category: 'Operations',
    readTime: '5 min read',
    date: 'Coming Soon',
    excerpt: 'Tracing model calls, cost attribution, analytics monitoring, and drift detection in production pipelines.',
    author: 'Bala Venkatesh',
    tags: ['Monitoring', 'Tracing', 'LangSmith'],
    comingSoon: true
  },
  {
    slug: 'cost-optimization-prod',
    title: 'Cost Optimization',
    seriesId: 'production-ai',
    category: 'FinOps',
    readTime: '6 min read',
    date: 'Coming Soon',
    excerpt: 'Caching strategies, smaller specialized models, semantic routing, and prompt compression techniques.',
    author: 'Bala Venkatesh',
    tags: ['Cost', 'FinOps', 'Caching'],
    comingSoon: true
  },
  {
    slug: 'scaling-ai-systems',
    title: 'Scaling AI Systems',
    seriesId: 'production-ai',
    category: 'Architecture',
    readTime: '7 min read',
    date: 'Coming Soon',
    excerpt: 'Deploying high-throughput endpoints. GPU concurrency, load balancing, and offline batch prediction.',
    author: 'Bala Venkatesh',
    tags: ['Scaling', 'High Throughput', 'Infrastructure'],
    comingSoon: true
  },
  
  // Series 3: Engineering Mindset
  {
    slug: 'building-something-people-trust',
    title: 'Building an App Is Easy Now. Building Something People Trust Is Hard.',
    seriesId: 'engineering-mindset',
    category: 'Software Strategy',
    readTime: '5 min read',
    date: 'July 29, 2026',
    excerpt: 'AI has dramatically reduced the cost of building, but not the cost of understanding. Discover why problem discovery, system design, business judgment, and trust are the real value differentiators for engineers.',
    author: 'Bala Venkatesh',
    tags: ['AI Products', 'Product Engineering', 'System Design', 'Software Strategy'],
    comingSoon: false
  },
  {
    slug: 'stopped-chasing-technologies',
    title: 'I Stopped Chasing Technologies. I Started Chasing Problems.',
    seriesId: 'engineering-mindset',
    category: 'Career & Mindset',
    readTime: '5 min read',
    date: 'July 19, 2026',
    excerpt: 'When I started my career, I believed learning more technologies would make me a better engineer. I was wrong. Here is the realization that changed how I build products.',
    author: 'Bala Venkatesh',
    tags: ['Career Growth', 'Software Engineering', 'Problem Solving'],
    comingSoon: false
  },
  {
    slug: 'the-power-of-saying-no',
    title: 'The Power of Saying No to Tech Specs',
    seriesId: 'engineering-mindset',
    category: 'Architecture',
    readTime: '4 min read',
    date: 'Coming Soon',
    excerpt: 'Why saying "no" to early architectural details keeps your product development fast, nimble, and highly aligned to business needs.',
    author: 'Bala Venkatesh',
    tags: ['Productivity', 'Decision Making', 'Pragmatism'],
    comingSoon: true
  },
  {
    slug: 'building-what-matters',
    title: 'How to Avoid Building Products Nobody Wants',
    seriesId: 'engineering-mindset',
    category: 'Product Design',
    readTime: '6 min read',
    date: 'Coming Soon',
    excerpt: 'A guide to early validation, customer interviews, and creating real, measurable user outcomes.',
    author: 'Bala Venkatesh',
    tags: ['Validation', 'Product Management', 'Impact'],
    comingSoon: true
  },

  // Series 4: Leadership & Ownership
  {
    slug: 'thought-i-was-leading-assigning-tasks',
    title: 'I Thought I Was Leading. I Was Just Assigning Tasks.',
    seriesId: 'leadership-ownership',
    category: 'Leadership',
    readTime: '6 min read',
    date: 'August 11, 2026',
    excerpt: 'A conversation with an engineer named Raju triggered a wake-up call about leadership vs task assignment. How shifting from execution steps to outcome ownership transforms teams.',
    author: 'Bala Venkatesh',
    tags: ['Leadership', 'Team Management', 'Engineering Culture', 'Ownership'],
    comingSoon: false
  },
  {
    slug: 'building-autonomous-teams',
    title: 'How to Build Teams That Don\'t Need You',
    seriesId: 'leadership-ownership',
    category: 'Management',
    readTime: '5 min read',
    date: 'Coming Soon',
    excerpt: 'Creating self-healing, decision-making engineering units that thrive when leaders step back.',
    author: 'Bala Venkatesh',
    tags: ['Team Building', 'Autonomy', 'Culture'],
    comingSoon: true
  }
];

interface ShareMeta {
  slug: string;
  title: string;
  quote: string;
  linkedInText: string;
  twitterText: string;
  whatsappText: string;
  hashtags: string[];
}

const BASE_PROFILE_URL = 'https://balavenkatesh3322.github.io/bala_venkatesh_profile';

const getShareUrl = (slug?: string) => {
  if (!slug) return `${BASE_PROFILE_URL}/#lessons`;
  return `${BASE_PROFILE_URL}/?post=${encodeURIComponent(slug)}#lessons`;
};

const POST_SHARE_DATA: Record<string, ShareMeta> = {
  'thought-i-was-leading-assigning-tasks': {
    slug: 'thought-i-was-leading-assigning-tasks',
    title: 'I Thought I Was Leading. I Was Just Assigning Tasks.',
    quote: 'Task assignment creates dependencies. True leadership creates autonomy. The moment you shift from execution steps to context ownership, your team evolves from order-executors to problem-solvers.',
    linkedInText: `💡 "I thought I was leading. I was just assigning tasks."\n\nFor a long time, I measured my effectiveness by how fast my team executed MY specs. Then a wake-up call incident changed everything.\n\nHere is the 5-stage framework I use to build autonomous engineering teams:\n\n1️⃣ Context over Instructions\n2️⃣ Outcome over Execution\n3️⃣ Ownership over Oversight\n4️⃣ Autonomy over Approval\n5️⃣ Accountability over Compliance\n\nRead the full engineering leadership essay by Bala Venkatesh:\n`,
    twitterText: `I thought I was leading. I was just assigning tasks. Here is the 5-step framework that transformed my engineering leadership 👇`,
    whatsappText: `*I Thought I Was Leading. I Was Just Assigning Tasks.*\n\nHow shifting from execution steps to outcome ownership transforms engineering teams.\n\nRead essay by Bala Venkatesh:\n`,
    hashtags: ['EngineeringLeadership', 'TechLead', 'SoftwareEngineering', 'Management', 'Ownership']
  },
  'building-something-people-trust': {
    slug: 'building-something-people-trust',
    title: 'Building Something People Trust When Anyone Can Code',
    quote: 'AI has reduced the cost of building code to near zero. But it hasn\'t reduced the cost of understanding. Code is no longer the moat—trust, system resilience, and domain judgment are.',
    linkedInText: `🚀 In an era where anyone can generate code in seconds, where does true engineering value come from?\n\nCode is no longer the moat. Trust, system resilience, and deep domain understanding are.\n\nKey Takeaways:\n• System Architecture > Speed of Code Generation\n• Problem Discovery > Feature Volume\n• Customer Trust > Shipping Speed\n\nRead the full essay by Bala Venkatesh:\n`,
    twitterText: `AI made building cheap, but understanding is still rare. Here's why trust is the ultimate moat in software engineering 🧵👇`,
    whatsappText: `*Building Something People Trust When Anyone Can Code*\n\nWhy domain judgment & trust matter more than code generation speed in the AI era.\n\nRead essay by Bala Venkatesh:\n`,
    hashtags: ['AIProducts', 'SoftwareArchitecture', 'ProductEngineering', 'TechLeadership', 'Trust']
  },
  'stopped-chasing-technologies': {
    slug: 'stopped-chasing-technologies',
    title: 'I Stopped Chasing Technologies. I Started Chasing Problems.',
    quote: 'Technology is temporary. The ability to solve meaningful human & business problems is timeless. Users and companies don\'t buy tech stacks—they buy solved problems.',
    linkedInText: `🎯 I spent my early career trying to learn every new framework and library. Then I realized: technology is temporary, but problem solving is timeless.\n\nHere's how shifting focus from tool-mastery to problem-mastery transformed my tech career:\n\n• Tech Chaser: Knows all frameworks, builds things nobody needs.\n• Problem Solver: Uses core tools deeply, delivers millions in business value.\n\nRead full essay by Bala Venkatesh:\n`,
    twitterText: `I stopped chasing technologies. I started chasing problems. Here's how that single mindset shift changed my software career 🧵👇`,
    whatsappText: `*I Stopped Chasing Technologies. I Started Chasing Problems.*\n\nThe realization that transformed how I build software products.\n\nRead essay by Bala Venkatesh:\n`,
    hashtags: ['SoftwareEngineering', 'CareerGrowth', 'ProblemSolving', 'DeveloperMindset']
  },
  'how-i-choose-an-llm': {
    slug: 'how-i-choose-an-llm',
    title: 'How I Choose an LLM for Production Apps',
    quote: 'Stop asking "Which LLM should I use?" Start asking "What system architecture should I build around the LLM so it consistently delivers deterministic, enterprise-grade safety?"',
    linkedInText: `🤖 How do you evaluate and choose LLMs for production enterprise apps?\n\nStop relying on synthetic benchmarks that don't reflect real-world latency, cost, or privacy bounds.\n\nHere is my complete decision matrix & architectural strategy for enterprise LLMs:\n\n1️⃣ Deterministic task evaluation\n2️⃣ Latency & token cost profiling\n3️⃣ RAG & fallback architecture\n\nRead the full technical framework & use the interactive calculator by Bala Venkatesh:\n`,
    twitterText: `How do you choose the right LLM for production? Benchmarks lie. Here's the pragmatic decision matrix I use for enterprise AI apps 👇`,
    whatsappText: `*How I Choose an LLM for Production Apps*\n\nA pragmatic system engineering decision matrix for Accuracy, Cost, and Privacy.\n\nRead essay & try interactive calculator by Bala Venkatesh:\n`,
    hashtags: ['AI', 'LLM', 'GenerativeAI', 'SystemDesign', 'MachineLearning', 'EnterpriseAI']
  }
};

const exportQuoteCardAsPNG = (meta: ShareMeta, theme: 'midnight' | 'emerald' | 'amber' | 'minimal') => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const grad = ctx.createLinearGradient(0, 0, 1200, 630);
  if (theme === 'emerald') {
    grad.addColorStop(0, '#022c22');
    grad.addColorStop(1, '#064e3b');
  } else if (theme === 'amber') {
    grad.addColorStop(0, '#451a03');
    grad.addColorStop(1, '#78350f');
  } else if (theme === 'minimal') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, '#f1f5f9');
  } else {
    grad.addColorStop(0, '#090d16');
    grad.addColorStop(1, '#0e1726');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 630);

  ctx.strokeStyle = theme === 'minimal' ? '#cbd5e1' : 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, 1160, 590);

  ctx.fillStyle = theme === 'minimal' ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.08)';
  ctx.font = 'bold 220px Georgia, serif';
  ctx.fillText('“', 70, 220);

  const accentColor = theme === 'minimal' ? '#0284c7' : '#38bdf8';
  const textColor = theme === 'minimal' ? '#0f172a' : '#ffffff';
  const mutedColor = theme === 'minimal' ? '#475569' : '#94a3b8';

  ctx.font = 'bold 18px monospace';
  ctx.fillStyle = accentColor;
  ctx.fillText(`BALA VENKATESH • ESSAYS & LESSONS`, 110, 95);

  ctx.font = 'bold 30px Georgia, serif';
  ctx.fillStyle = textColor;
  const words = `"${meta.quote}"`.split(' ');
  let line = '';
  let y = 185;
  const maxWidth = 980;
  const lineHeight = 46;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, 110, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 110, y);

  y += 40;
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(110, y);
  ctx.lineTo(240, y);
  ctx.stroke();

  y += 45;
  ctx.font = 'bold 24px sans-serif';
  ctx.fillStyle = textColor;
  ctx.fillText('Bala Venkatesh', 110, y);

  ctx.font = '16px sans-serif';
  ctx.fillStyle = mutedColor;
  ctx.fillText(`Article: "${meta.title}"`, 110, y + 28);

  ctx.font = 'bold 18px monospace';
  ctx.fillStyle = accentColor;
  ctx.fillText('balavenkatesh3322.github.io/bala_venkatesh_profile', 110, 560);

  const link = document.createElement('a');
  link.download = `bala-venkatesh-quote-${meta.slug}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

function BlogShareFooter({
  postSlug,
  readerTheme,
  onOpenShareModal,
  sharedCount
}: {
  postSlug: string;
  readerTheme: 'paper' | 'white' | 'dark';
  onOpenShareModal: (tab?: 'platforms' | 'hooks' | 'card') => void;
  sharedCount: number;
}) {
  const meta = POST_SHARE_DATA[postSlug] || POST_SHARE_DATA['how-i-choose-an-llm'];
  const [copied, setCopied] = useState(false);
  const shareUrl = getShareUrl(postSlug);

  const handleQuickCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${meta.linkedInText}\n\n👉 Read full essay: ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`mt-12 p-6 sm:p-8 rounded-3xl border transition-all duration-300 text-left relative overflow-hidden ${
      readerTheme !== 'dark' 
        ? 'bg-gradient-to-br from-cyan-50/80 via-white to-stone-50 border-cyan-200/80 shadow-lg shadow-cyan-950/5' 
        : 'bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 border-cyan-500/20 shadow-xl'
    }`}>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-cyan-200/50 dark:border-white/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
              <span>Inspire Your Network</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-black ${readerTheme !== 'dark' ? 'text-slate-900' : 'text-white'}`}>
              Pass the Knowledge Forward 🚀
            </h3>
            <p className={`text-xs sm:text-sm font-medium ${readerTheme !== 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
              Great engineering culture is built by sharing perspective. Share this essay with your team, leads, or community!
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${
              readerTheme !== 'dark' ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/5 border-white/10 text-cyan-300'
            }`}>
              🔥 {sharedCount} Shares
            </span>
          </div>
        </div>

        <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm italic relative transition-colors ${
          readerTheme !== 'dark' 
            ? 'bg-white/80 border-cyan-200 text-slate-800 shadow-xs' 
            : 'bg-white/5 border-white/10 text-slate-200'
        }`}>
          <Quote className="w-5 h-5 text-cyan-500 opacity-40 absolute top-3 left-3 -scale-x-100" />
          <p className="pl-6 font-serif leading-relaxed">
            "{meta.quote}"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs bg-[#0077b5] hover:bg-[#005885] text-white shadow-md transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>Share on LinkedIn</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(meta.twitterText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs bg-black hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer border border-white/10"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Post on X</span>
          </a>

          <button
            onClick={handleQuickCopy}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-white border-emerald-500'
                : readerTheme !== 'dark'
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-xs'
                  : 'bg-white/10 hover:bg-white/15 border-white/10 text-white'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-cyan-500" />}
            <span>{copied ? 'Hook Copied!' : 'Copy Viral Post Hook'}</span>
          </button>

          <button
            onClick={() => onOpenShareModal('card')}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md transition-all cursor-pointer"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Generate Quote Card</span>
          </button>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={() => onOpenShareModal('platforms')}
            className={`text-xs font-mono font-bold inline-flex items-center gap-1.5 hover:underline cursor-pointer ${
              readerTheme !== 'dark' ? 'text-cyan-700' : 'text-cyan-400'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>More Sharing Options (WhatsApp, Telegram, Reddit, Copy Link) →</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BalaLessons() {
  const [currentSeries, setCurrentSeries] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [readerTheme, setReaderTheme] = useState<'paper' | 'white' | 'dark'>('paper');
  const [readerFont, setReaderFont] = useState<'serif' | 'sans'>('serif');
  const [readerSize, setReaderSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readerWidth, setReaderWidth] = useState<'narrow' | 'normal' | 'wide'>('normal');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [claps, setClaps] = useState<number>(48);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Social Share states
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareModalTab, setShareModalTab] = useState<'platforms' | 'hooks' | 'card'>('platforms');
  const [quoteCardTheme, setQuoteCardTheme] = useState<'midnight' | 'emerald' | 'amber' | 'minimal'>('midnight');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sharedCounts, setSharedCounts] = useState<Record<string, number>>({
    'thought-i-was-leading-assigning-tasks': 142,
    'building-something-people-trust': 98,
    'stopped-chasing-technologies': 115,
    'how-i-choose-an-llm': 210
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenShareModal = (tab: 'platforms' | 'hooks' | 'card' = 'platforms') => {
    setShareModalTab(tab);
    setIsShareModalOpen(true);
  };

  const incrementShareCount = (slug: string) => {
    setSharedCounts(prev => ({
      ...prev,
      [slug]: (prev[slug] || 100) + 1
    }));
  };

  const themeStyles = {
    paper: {
      articleBg: 'bg-[#FCF9F2] text-stone-800 border-stone-200/80 shadow-2xl shadow-stone-100/30',
      headerBorder: 'border-stone-200/60',
      textMuted: 'text-stone-500',
      textTitle: 'text-stone-900',
      textAccent: 'text-cyan-700',
      pillBg: 'bg-stone-100 border-stone-200 text-stone-700',
      badgeBg: 'bg-[#F2ECE1] text-[#705238] border-[#DFD3C3]',
      simBg: 'bg-stone-100/40 border-stone-200/60',
      inputBg: 'bg-white border-stone-300 text-stone-800',
      interactiveBg: 'bg-stone-100/30 border-stone-200/50',
      calcBg: 'bg-[#FAF6EC] border-stone-200 shadow-sm',
      metaDivider: 'border-[#EADECA]',
      codePill: 'text-cyan-800 bg-[#FAF6EC] px-1.5 py-0.5 rounded border border-stone-200 font-mono text-xs',
      highlightBorder: 'border-cyan-500 bg-[#FAF6EC]'
    },
    white: {
      articleBg: 'bg-white text-slate-800 border-slate-200 shadow-2xl shadow-slate-100/40',
      headerBorder: 'border-slate-200',
      textMuted: 'text-slate-500',
      textTitle: 'text-slate-950',
      textAccent: 'text-cyan-600',
      pillBg: 'bg-slate-50 border-slate-200 text-slate-700',
      badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-150',
      simBg: 'bg-slate-50 border-slate-200',
      inputBg: 'bg-white border-slate-300 text-slate-800',
      interactiveBg: 'bg-slate-50 border-slate-150',
      calcBg: 'bg-slate-50 border-slate-200 shadow-sm',
      metaDivider: 'border-slate-200',
      codePill: 'text-cyan-700 bg-cyan-50/40 px-1.5 py-0.5 rounded border border-cyan-100 font-mono text-xs',
      highlightBorder: 'border-cyan-500 bg-cyan-50/10'
    },
    dark: {
      articleBg: 'bg-[#0B0F19]/95 text-slate-300 border-white/5 shadow-2xl',
      headerBorder: 'border-white/5',
      textMuted: 'text-slate-400',
      textTitle: 'text-white',
      textAccent: 'text-cyan-400',
      pillBg: 'bg-white/5 border-white/10 text-slate-300',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      simBg: 'bg-white/[0.02] border-white/5',
      inputBg: 'bg-slate-950 border-white/10 text-slate-300',
      interactiveBg: 'bg-slate-950 border-white/5',
      calcBg: 'bg-slate-950 border-cyan-500/10 shadow-inner',
      metaDivider: 'border-white/5',
      codePill: 'text-cyan-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 font-mono text-xs',
      highlightBorder: 'border-cyan-400 bg-white/5'
    }
  };

  const currentStyles = themeStyles[readerTheme] || themeStyles.paper;

  // Derive settings classes
  const fontClass = readerFont === 'serif' ? 'font-serif' : 'font-sans';
  
  const sizeClass = {
    sm: 'text-sm space-y-4 sm:space-y-5',
    base: 'text-base space-y-5 sm:space-y-6',
    lg: 'text-lg space-y-6 sm:space-y-7',
    xl: 'text-xl space-y-7 sm:space-y-8'
  }[readerSize] || 'text-base space-y-5 sm:space-y-6';

  const widthClass = {
    narrow: 'max-w-xl mx-auto',
    normal: 'max-w-2xl mx-auto',
    wide: 'max-w-3xl mx-auto'
  }[readerWidth] || 'max-w-2xl mx-auto';

  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash === '#lessons' || !hash.startsWith('#lessons')) {
        setSelectedPost(null);
        setCurrentSeries(null);
      } else if (hash.startsWith('#lessons/series/')) {
        const seriesId = hash.replace('#lessons/series/', '');
        setCurrentSeries(seriesId || null);
        setSelectedPost(null);
      } else if (hash.startsWith('#lessons/post/')) {
        const slug = hash.replace('#lessons/post/', '');
        setSelectedPost(slug || null);
        const post = BLOG_POSTS.find(p => p.slug === slug);
        if (post) {
          setCurrentSeries(post.seriesId);
        }
      } else if (hash.startsWith('#lessons/')) {
        const slug = hash.replace('#lessons/', '');
        setSelectedPost(slug || null);
        const post = BLOG_POSTS.find(p => p.slug === slug);
        if (post) {
          setCurrentSeries(post.seriesId);
        }
      } else if (hash.startsWith('#lessons-')) {
        const slug = hash.replace('#lessons-', '');
        setSelectedPost(slug || null);
        const post = BLOG_POSTS.find(p => p.slug === slug);
        if (post) {
          setCurrentSeries(post.seriesId);
        }
      }
    };

    handleHashCheck();

    window.addEventListener('hashchange', handleHashCheck);
    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
    };
  }, []);

  useEffect(() => {
    if (!selectedPost) {
      setScrollProgress(0);
      return;
    }
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial run
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPost]);
  
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
    <section id="lessons" className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <WaterWaveEffect variant="dual" color="cyan" />
      <div className="max-w-7xl mx-auto">
        
        {/* Header Introduction */}
        {!selectedPost ? (
          <div className="text-center flex flex-col items-center gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono text-cyan-400 uppercase tracking-widest animate-pulse"
            >
              {currentSeries ? "Series Playbook" : "Build with Bala"}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white"
            >
              {currentSeries ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  {SERIES_LIST.find(s => s.id === currentSeries)?.emoji} {SERIES_LIST.find(s => s.id === currentSeries)?.title}
                </span>
              ) : (
                <span>Build with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Bala</span></span>
              )}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 max-w-2xl text-base sm:text-lg text-center"
            >
              {currentSeries 
                ? SERIES_LIST.find(s => s.id === currentSeries)?.description 
                : "Step inside my workspace. Select an engineering series to explore tactical AI frameworks, production architectural blueprints, and deep mental models."}
            </motion.p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className={`${selectedPost ? 'lg:col-span-12' : 'lg:col-span-8 lg:col-start-3'} flex flex-col gap-12`}>
            
            <AnimatePresence mode="wait">
              {!selectedPost ? (
                // Index / List View
                !currentSeries ? (
                  // View 1: Series Landing Page
                  <motion.div
                    key="series-landing"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
                  >
                    {SERIES_LIST.map((series) => (
                      <div
                        key={series.id}
                        onClick={() => {
                          window.location.hash = `#lessons/series/${series.id}`;
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="group rounded-3xl p-8 glass-panel border border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.02] transition-all duration-300 text-left flex flex-col justify-between gap-6 relative overflow-hidden cursor-pointer shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-300" />
                        
                        <div className="flex flex-col gap-4">
                          <div className="text-4xl">{series.emoji}</div>
                          <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight flex items-center gap-2">
                            {series.title}
                            <ArrowRight className="w-5 h-5 text-cyan-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300" />
                          </h3>
                          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                            {series.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                          <span className="text-xs font-mono font-bold text-slate-500">
                            {series.id === 'how-bala-thinks' 
                              ? '5 Chapters • 1 Live' 
                              : series.id === 'engineering-mindset' 
                                ? '4 Chapters • 2 Live' 
                                : series.id === 'leadership-ownership'
                                  ? '2 Chapters • 1 Live'
                                  : '9 Chapters • Coming Soon'}
                          </span>
                          <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1">
                            Explore Series <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  // View 2: Series Detail (Blog titles selection)
                  <motion.div
                    key="series-detail"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col gap-6 w-full text-left"
                  >
                    {/* Back Button */}
                    <div className="flex justify-start mb-4">
                      <button
                        onClick={() => {
                          window.location.hash = '#lessons';
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors group cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Series Selection
                      </button>
                    </div>

                    {/* Series Header Card */}
                    <div className="rounded-3xl p-6 sm:p-8 bg-white/[0.01] border border-white/5 text-left mb-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-500/5 blur-3xl" />
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{SERIES_LIST.find(s => s.id === currentSeries)?.emoji}</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {SERIES_LIST.find(s => s.id === currentSeries)?.title}
                        </h2>
                      </div>
                      <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                        {SERIES_LIST.find(s => s.id === currentSeries)?.description}
                      </p>
                    </div>

                    {/* Blog posts list */}
                    <div className="flex flex-col gap-4">
                      {BLOG_POSTS.filter(p => p.seriesId === currentSeries).map((post) => {
                        if (post.comingSoon) {
                          return (
                            <div
                              key={post.slug}
                              className="rounded-2xl p-5 border border-white/5 bg-white/[0.01] opacity-60 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden select-none"
                            >
                              <div className="flex flex-col gap-1.5 max-w-xl">
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                  <span>{post.category}</span>
                                  <span>•</span>
                                  <span>{post.readTime}</span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-400 flex items-center gap-2">
                                  {post.title}
                                </h4>
                                <p className="text-slate-500 text-xs sm:text-sm line-clamp-1">{post.excerpt}</p>
                              </div>
                              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-400 font-bold tracking-widest uppercase">
                                Coming Soon
                              </span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={post.slug}
                            onClick={() => {
                              window.location.hash = `#lessons/post/${post.slug}`;
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group rounded-2xl p-5 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-300 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-cyan-500/[0.01] blur-2xl group-hover:bg-cyan-500/[0.03] transition-colors duration-300" />
                            <div className="flex flex-col gap-1.5 max-w-xl relative z-10">
                              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                                <span className="text-cyan-400 font-semibold">{post.category}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                              </div>
                              <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                                {post.title}
                              </h4>
                              <p className="text-slate-400 text-xs sm:text-sm line-clamp-1">{post.excerpt}</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform self-end sm:self-auto relative z-10">
                              Read Lesson <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )
              ) : (
                // Article Detail View
                <motion.article 
                  key="article"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  layout="position"
                  className={`rounded-3xl p-6 sm:p-10 lg:p-12 border relative overflow-hidden transition-all duration-500 ${currentStyles.articleBg}`}
                >
                  {/* Sticky Reading Progress Bar (Kindle/Medium Style) */}
                  <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200/20 z-50 pointer-events-none">
                    <motion.div 
                       className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>

                  {/* Subtle decorative orb */}
                  <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
                    readerTheme === 'dark' ? 'bg-cyan-500/5 opacity-100' : 'bg-cyan-500/5 opacity-40'
                  }`} />
                  
                  {/* Premium Reading Theme Header & Controls */}
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 mb-8 transition-colors duration-300 ${currentStyles.headerBorder}`}>
                    {/* Back button */}
                    <button
                      onClick={() => {
                        window.location.hash = currentSeries ? `#lessons/series/${currentSeries}` : '#lessons';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`flex items-center gap-2 text-sm font-mono transition-colors group cursor-pointer ${
                        readerTheme !== 'dark' ? 'text-slate-500 hover:text-cyan-600' : 'text-slate-400 hover:text-cyan-400'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Back to Series Details
                    </button>
                  </div>

                  {/* Kindle/Medium Floating preferences and social reactions deck */}
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-dashed transition-all duration-300 ${currentStyles.metaDivider}`}>
                    <div className={`flex flex-wrap items-center gap-4 text-xs font-mono ${currentStyles.textMuted}`}>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide border transition-all duration-300 ${currentStyles.badgeBg}`}>
                        AI Architecture
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 5 min read
                        {scrollProgress > 5 && (
                          <span className="font-semibold text-cyan-600">
                            &nbsp;•&nbsp;{Math.max(1, Math.ceil(5 * (1 - scrollProgress / 100)))} min left
                          </span>
                        )}
                      </span>
                      <span>July 6, 2026</span>
                    </div>

                    {/* Kindle Preferences, Claps, and Bookmark Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Medium Claps Counter */}
                      <button 
                        onClick={() => setClaps(prev => prev + 1)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all hover:scale-105 cursor-pointer ${
                          readerTheme !== 'dark' 
                            ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100/50 animate-none' 
                            : 'bg-rose-950/20 border-rose-900/30 text-rose-400 hover:bg-rose-900/30 animate-none'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 fill-current text-rose-500 animate-pulse`} />
                        <span>{claps} claps</span>
                      </button>

                      {/* Bookmark Button */}
                      <button 
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-2 rounded-lg border transition-all cursor-pointer ${
                          isBookmarked 
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                            : readerTheme !== 'dark'
                              ? 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-700'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                        }`}
                        title="Save to reading list"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>

                      {/* Kindle Settings Trigger Toggle */}
                      <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                          showSettings 
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500 font-bold' 
                            : readerTheme !== 'dark'
                              ? 'bg-slate-100 border-slate-200 text-slate-600 hover:border-slate-300'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <Sliders className="w-3.5 h-3.5 text-cyan-500" />
                        <span>AA Kindle Settings</span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showSettings ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Social Share Trigger */}
                      <button 
                        onClick={() => handleOpenShareModal('platforms')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                          readerTheme !== 'dark' 
                            ? 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100' 
                            : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
                        }`}
                        title="Share this essay on social media"
                      >
                        <Share2 className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Kindle Customization Preference Panel */}
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`overflow-hidden mb-8 rounded-2xl border transition-all ${currentStyles.interactiveBg}`}
                      >
                        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                          {/* 1. Font Selector */}
                          <div className="flex flex-col gap-2">
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${currentStyles.textMuted} flex items-center gap-1`}>
                              <Type className="w-3 h-3 text-cyan-500" /> Font Face Style
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              <button 
                                onClick={() => setReaderFont('serif')}
                                className={`px-3 py-2 rounded-xl text-xs font-semibold font-serif text-center border transition-all cursor-pointer ${
                                  readerFont === 'serif' 
                                    ? 'border-cyan-500 bg-cyan-500/5 text-cyan-600 font-bold shadow-sm' 
                                    : readerTheme !== 'dark'
                                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                      : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-white/5'
                                }`}
                              >
                                Georgia Serif (Book)
                              </button>
                              <button 
                                onClick={() => setReaderFont('sans')}
                                className={`px-3 py-2 rounded-xl text-xs font-semibold font-sans text-center border transition-all cursor-pointer ${
                                  readerFont === 'sans' 
                                    ? 'border-cyan-500 bg-cyan-500/5 text-cyan-600 font-bold shadow-sm' 
                                    : readerTheme !== 'dark'
                                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                      : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-white/5'
                                }`}
                              >
                                Inter Sans (Tech)
                              </button>
                            </div>
                          </div>

                          {/* 2. Font Size scale */}
                          <div className="flex flex-col gap-2">
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${currentStyles.textMuted}`}>
                              AA Reading Text Size
                            </span>
                            <div className="flex items-center gap-1">
                              {['sm', 'base', 'lg', 'xl'].map((sz) => (
                                <button 
                                  key={sz}
                                  onClick={() => setReaderSize(sz as any)}
                                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all capitalize cursor-pointer ${
                                    readerSize === sz 
                                      ? 'border-cyan-500 bg-cyan-500/5 text-cyan-600 shadow-sm' 
                                      : readerTheme !== 'dark'
                                        ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                        : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-white/5'
                                  }`}
                                >
                                  {sz === 'sm' ? 'A-' : sz === 'base' ? 'A' : sz === 'lg' ? 'A+' : 'A++'}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 3. Margins width */}
                          <div className="flex flex-col gap-2">
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${currentStyles.textMuted}`}>
                              ↔️ Screen Page Margins
                            </span>
                            <div className="grid grid-cols-3 gap-1.5">
                              {['narrow', 'normal', 'wide'].map((w) => (
                                <button 
                                  key={w}
                                  onClick={() => setReaderWidth(w as any)}
                                  className={`py-2 rounded-xl text-xs font-semibold border transition-all capitalize cursor-pointer ${
                                    readerWidth === w 
                                      ? 'border-cyan-500 bg-cyan-500/5 text-cyan-600 font-bold shadow-sm' 
                                      : readerTheme !== 'dark'
                                        ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                        : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-white/5'
                                  }`}
                                >
                                  {w}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Title */}
                  <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-8 text-left transition-colors duration-300 ${currentStyles.textTitle}`}>
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-300 ${
                      readerTheme !== 'dark' ? 'from-cyan-600 to-indigo-600' : 'from-cyan-400 to-indigo-400'
                    }`}>
                      {BLOG_POSTS.find(p => p.slug === selectedPost)?.title || "How I Choose an LLM"}
                    </span>
                  </h1>



                  {/* Blog Body Content */}
                  <div className={`text-left transition-colors duration-300 ${fontClass} ${sizeClass} ${widthClass} ${
                    readerTheme !== 'dark' ? 'text-slate-800' : 'text-slate-300'
                  }`}>
                    {selectedPost === 'thought-i-was-leading-assigning-tasks' ? (
                      <div className="space-y-6">
                        <p className={`text-base sm:text-lg font-semibold italic border-l-4 pl-4 py-1.5 transition-all duration-300 ${
                          readerTheme !== 'dark' 
                            ? 'text-slate-900 border-emerald-500 bg-emerald-50/25 rounded-r-xl pr-3' 
                            : 'text-slate-200 border-emerald-400 bg-white/5 rounded-r-xl pr-3'
                        }`}>
                          "I thought I was leading. I was breaking down tasks, setting deadlines, and keeping the team moving. Then a conversation with an engineer named Raju made me realize a hard truth: I wasn't leading at all. I was just assigning tasks."
                        </p>

                        {/* Section: The Story */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-8 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          The Raju Conversation
                        </h2>

                        <p>
                          It started on a typical Tuesday afternoon. We were rushing to ship a critical system integration before the sprint review. A talented software engineer on my team, Raju, was handling one of the core modules.
                        </p>

                        <p>
                          I walked up to his desk, laid out the step-by-step implementation details, and gave him explicit directions:
                        </p>

                        <blockquote className={`p-4 rounded-xl border font-mono text-xs sm:text-sm font-bold my-4 transition-colors ${
                          readerTheme !== 'dark' ? 'bg-stone-100 border-stone-250 text-stone-800' : 'bg-white/5 border-white/10 text-slate-200'
                        }`}>
                          "Raju, finish this by Friday."
                        </blockquote>

                        <p>
                          Friday came. Raju worked hard, followed every instruction I gave him to the letter, and marked the ticket as complete. I felt like a successful manager—the task was delivered on time.
                        </p>

                        <p>
                          Then came Monday morning.
                        </p>

                        <p>
                          An unhandled edge case surfaced in production under high concurrency load. Raju immediately pinged me on Slack:
                        </p>

                        <blockquote className={`p-4 rounded-xl border font-mono text-xs sm:text-sm italic my-4 transition-colors ${
                          readerTheme !== 'dark' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                        }`}>
                          "Bala, the edge case broke. What should I do next?"
                        </blockquote>

                        <p>
                          That message hit me hard. Raju hadn't failed—he had done <em>exactly</em> what I instructed. The failure was mine.
                        </p>

                        <p className="font-bold text-lg">
                          By giving Raju a set of execution instructions instead of ownership of the outcome, I had turned a talented engineer into a task processor who needed my permission to solve problems.
                        </p>

                        {/* Section: The Realization */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-10 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          The Realization: Task Assignment vs. Leadership
                        </h2>

                        <p>
                          That incident forced me to analyze the fundamental difference between assigning tasks and leading people:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                          <div className={`p-5 rounded-2xl border transition-colors ${
                            readerTheme !== 'dark' ? 'bg-stone-50 border-stone-250' : 'bg-white/5 border-white/5'
                          }`}>
                            <div className={`text-xs font-mono font-bold uppercase mb-2 ${
                              readerTheme !== 'dark' ? 'text-rose-700' : 'text-rose-400'
                            }`}>Task Assignment</div>
                            <p className={`font-mono text-sm font-bold mb-3 ${
                              readerTheme !== 'dark' ? 'text-rose-900' : 'text-rose-300'
                            }`}>
                              "Raju, finish this by Friday."
                            </p>
                            <ul className={`space-y-2 text-xs sm:text-sm font-medium ${
                              readerTheme !== 'dark' ? 'text-slate-800' : 'text-slate-300'
                            }`}>
                              <li>• Dictates execution steps and exact specifications</li>
                              <li>• Creates dependency on the manager for edge cases</li>
                              <li>• Measures success by compliance and hours spent</li>
                              <li>• Result: Team stops thinking when the spec ends</li>
                            </ul>
                          </div>

                          <div className={`p-5 rounded-2xl border transition-colors ${
                            readerTheme !== 'dark' ? 'bg-emerald-50/60 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/20'
                          }`}>
                            <div className={`text-xs font-mono font-bold uppercase mb-2 ${
                              readerTheme !== 'dark' ? 'text-emerald-800' : 'text-emerald-400'
                            }`}>True Leadership</div>
                            <p className={`font-mono text-sm font-bold mb-3 ${
                              readerTheme !== 'dark' ? 'text-emerald-900' : 'text-emerald-300'
                            }`}>
                              "Raju, this is the outcome we need. How would you approach it?"
                            </p>
                            <ul className={`space-y-2 text-xs sm:text-sm font-medium ${
                              readerTheme !== 'dark' ? 'text-slate-800' : 'text-slate-300'
                            }`}>
                              <li>• Defines the problem context and business target</li>
                              <li>• Empowers the engineer to design the solution</li>
                              <li>• Measures success by value delivered and system resiliency</li>
                              <li>• Result: Team anticipates edge cases and grows autonomously</li>
                            </ul>
                          </div>
                        </div>

                        {/* Section: What Changed in My Thinking */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-10 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          What Changed in My Thinking
                        </h2>

                        <p>
                          I had to undergo a fundamental mindset shift in how I viewed my own role and effectiveness:
                        </p>

                        <div className={`p-6 rounded-2xl border transition-all my-6 ${
                          readerTheme !== 'dark' ? 'bg-cyan-50/60 border-cyan-200' : 'bg-cyan-950/20 border-cyan-500/20'
                        }`}>
                          <div className="space-y-4">
                            <div>
                              <span className={`text-xs font-mono font-bold uppercase tracking-wider block mb-1 ${
                                readerTheme !== 'dark' ? 'text-slate-600' : 'text-slate-400'
                              }`}>Earlier Mindset</span>
                              <p className={`text-sm sm:text-base font-semibold ${
                                readerTheme !== 'dark' ? 'text-slate-800' : 'text-slate-300'
                              }`}>
                                Earlier, I measured my effectiveness by how much work I could personally get done, organize, or directly control.
                              </p>
                            </div>
                            <div className={`pt-4 border-t ${
                              readerTheme !== 'dark' ? 'border-cyan-200' : 'border-cyan-500/20'
                            }`}>
                              <span className={`text-xs font-mono font-bold uppercase tracking-wider block mb-1 ${
                                readerTheme !== 'dark' ? 'text-cyan-800' : 'text-cyan-400'
                              }`}>New Mindset</span>
                              <p className={`text-sm sm:text-base font-bold ${
                                readerTheme !== 'dark' ? 'text-cyan-950' : 'text-cyan-200'
                              }`}>
                                Now, I am learning to measure my effectiveness by how effectively I can help others take ownership and make decisions independently.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Section: Leadership Framework */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-10 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          My Leadership Framework
                        </h2>

                        <p className="mb-4">
                          To operationalize this shift, I built a simple 5-stage framework that I use whenever delegating initiatives:
                        </p>

                        <div className={`p-4 sm:p-5 rounded-2xl border font-mono text-center text-xs sm:text-sm font-bold my-6 tracking-wide ${
                          readerTheme !== 'dark' 
                            ? 'bg-gradient-to-r from-emerald-100/90 via-teal-100/90 to-cyan-100/90 border-teal-300 text-teal-950 shadow-xs' 
                            : 'bg-white/5 border-white/10 text-cyan-300'
                        }`}>
                          Context → Outcome → Ownership → Autonomy → Accountability
                        </div>

                        <div className="space-y-4 my-6">
                          {[
                            {
                              step: '1. Context',
                              desc: 'Provide the full background on why the problem exists, who the customer is, and what business impact is at stake—not just technical specs.',
                              example: 'Example: "Our transaction processing latency spikes during peak hours, causing 12% of cart abandonments."'
                            },
                            {
                              step: '2. Outcome',
                              desc: 'Define what clear success looks like without prescribing the exact implementation or code structure.',
                              example: 'Example: "We need transaction processing under 200ms with 99.9% reliability during high concurrency."'
                            },
                            {
                              step: '3. Ownership',
                              desc: 'Explicitly transfer the responsibility of solving the problem to the engineer, making them the primary decision-maker.',
                              example: 'Example: "Raju, you own this pipeline end-to-end. You decide how we get there."'
                            },
                            {
                              step: '4. Autonomy',
                              desc: 'Give the engineer freedom to explore architectural trade-offs, test ideas, and make decisions without needing approval for every detail.',
                              example: 'Example: Allowing Raju to evaluate between Redis caching vs connection pooling without micromanagement.'
                            },
                            {
                              step: '5. Accountability',
                              desc: 'Review the actual results together against the original outcome, celebrating impact and using failures as learning loops.',
                              example: 'Example: Measuring post-launch latency metrics together and discussing what edge cases were uncovered.'
                            }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-4 sm:p-5 rounded-xl border text-left transition-colors ${
                              readerTheme !== 'dark' ? 'bg-[#FCF9F2] border-stone-300 shadow-xs' : 'bg-white/[0.02] border-white/5'
                            }`}>
                              <h4 className={`text-base font-black mb-1.5 transition-colors ${currentStyles.textTitle}`}>
                                {item.step}
                              </h4>
                              <p className={`text-xs sm:text-sm mb-2 font-medium leading-relaxed ${
                                readerTheme !== 'dark' ? 'text-slate-800' : 'text-slate-300'
                              }`}>
                                {item.desc}
                              </p>
                              <p className={`text-xs font-mono italic font-semibold ${
                                readerTheme !== 'dark' ? 'text-cyan-800' : 'text-cyan-400'
                              }`}>
                                {item.example}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Section: The Deeper Lesson */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-10 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          The Deeper Lesson
                        </h2>

                        <p>
                          Connecting this back to my own career journey:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                          <div className={`p-4 rounded-xl border text-left ${
                            readerTheme !== 'dark' ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-amber-950/20 border-amber-500/20 text-amber-300'
                          }`}>
                            <span className={`text-xs font-mono font-bold uppercase block mb-1 ${
                              readerTheme !== 'dark' ? 'text-amber-800' : 'text-amber-400'
                            }`}>As an Individual Engineer</span>
                            <p className="text-sm font-semibold">
                              I was rewarded for solving complex problems myself through code and technical execution.
                            </p>
                          </div>

                          <div className={`p-4 rounded-xl border text-left ${
                            readerTheme !== 'dark' ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                          }`}>
                            <span className={`text-xs font-mono font-bold uppercase block mb-1 ${
                              readerTheme !== 'dark' ? 'text-emerald-800' : 'text-emerald-400'
                            }`}>As a Leader</span>
                            <p className="text-sm font-semibold">
                              I need to create people who can solve problems without depending on me.
                            </p>
                          </div>
                        </div>

                        <p>
                          This transition is powerful because it demonstrates real operational experience rather than claiming theoretical leadership expertise. True leadership isn't a title you claim—it's the capability and confidence you build in others.
                        </p>

                        {/* Reflection Ending */}
                        <div className={`mt-10 p-6 rounded-2xl border transition-colors ${
                          readerTheme !== 'dark' ? 'bg-stone-50 border-stone-250 text-stone-900' : 'bg-white/5 border-white/10 text-slate-200'
                        }`}>
                          <h3 className={`text-lg font-black mb-3 transition-colors ${currentStyles.textTitle}`}>
                            Honest Reflection
                          </h3>

                          <p className="text-sm sm:text-base leading-relaxed mb-4">
                            I'm still learning this.
                          </p>

                          <p className="text-sm sm:text-base font-semibold leading-relaxed mb-4">
                            Maybe leadership isn't about becoming the person everyone comes to for answers.
                          </p>

                          <p className={`text-sm sm:text-base font-bold mb-6 ${
                            readerTheme !== 'dark' ? 'text-emerald-800' : 'text-emerald-400'
                          }`}>
                            Maybe it's about becoming the person who helps others find their own answers.
                          </p>

                          <div className={`pt-4 border-t ${
                            readerTheme !== 'dark' ? 'border-stone-300' : 'border-white/10'
                          }`}>
                            <p className={`text-sm font-black ${
                              readerTheme !== 'dark' ? 'text-slate-950' : 'text-white'
                            }`}>
                              What changed the way you think about leadership?
                            </p>
                          </div>
                        </div>

                        {/* Author's Note */}
                        <div className={`mt-8 p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed italic text-left transition-colors duration-300 ${
                          readerTheme !== 'dark' 
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 font-semibold' 
                            : 'bg-emerald-950/10 border-emerald-500/10 text-slate-300'
                        }`}>
                          💡 <strong>Author's Note:</strong> This post is part of the "Leadership & Ownership" series by Bala Venkatesh. I write about transitioning from individual contributor to empowering leader, building autonomous teams, and mastering engineering culture.
                        </div>

                        {/* End of Blog Social Share Card */}
                        <BlogShareFooter 
                          postSlug="thought-i-was-leading-assigning-tasks" 
                          readerTheme={readerTheme} 
                          onOpenShareModal={handleOpenShareModal} 
                          sharedCount={sharedCounts['thought-i-was-leading-assigning-tasks'] || 142} 
                        />
                      </div>
                    ) : selectedPost === 'building-something-people-trust' ? (
                      <div className="space-y-6">
                        <p className={`text-base sm:text-lg font-semibold italic border-l-4 pl-4 py-1.5 transition-all duration-300 ${
                          readerTheme !== 'dark' 
                            ? 'text-slate-900 border-cyan-500 bg-cyan-50/25 rounded-r-xl pr-3' 
                            : 'text-slate-200 border-cyan-400 bg-white/5 rounded-r-xl pr-3'
                        }`}>
                          "A few years ago, building software was the biggest challenge. Today, it isn't. With AI, technology has dramatically reduced the cost of building — but it hasn't reduced the cost of understanding. That's where the real opportunity is."
                        </p>

                        <p>
                          A few years ago, building software was the biggest challenge.
                        </p>

                        <p>
                          Today, it isn't.
                        </p>

                        <p>
                          With AI, you can describe an idea in plain English and generate a working application in minutes. You can create a website, a chatbot, an API, or even an MVP without writing every line of code yourself.
                        </p>

                        <p>
                          Technology has dramatically reduced the cost of building.
                        </p>

                        <p className="font-bold">
                          But it hasn't reduced the cost of understanding.
                        </p>

                        <p className={`text-lg font-black ${currentStyles.textAccent}`}>
                          That's where the real opportunity is.
                        </p>

                        <div className={`my-8 p-6 border-l-4 transition-all duration-300 rounded-r-2xl ${
                          readerTheme !== 'dark' 
                            ? 'bg-cyan-50/45 border-cyan-500 text-stone-900 font-serif text-lg italic' 
                            : 'bg-white/5 border-cyan-400 text-slate-100 font-serif text-lg italic'
                        }`}>
                          "Most products don't fail because the code is bad. They fail because they solve the wrong problem."
                        </div>

                        {/* Section 1 */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-8 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          If everyone can build, what becomes valuable?
                        </h2>

                        <p>
                          The bottleneck is no longer coding.
                        </p>

                        <p className="font-semibold text-lg">
                          The bottleneck is making good decisions.
                        </p>

                        <p>
                          Questions like these matter far more than choosing the latest framework:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
                          {[
                            'Should we build this product at all?',
                            'Who is the customer?',
                            'What problem are we solving?',
                            'Will anyone pay for it?',
                            'Can it scale?',
                            'How do we measure success?'
                          ].map((q, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border transition-colors flex items-center gap-3 ${
                              readerTheme !== 'dark' ? 'bg-[#FCF9F2] border-stone-200/60' : 'bg-white/[0.02] border-white/5'
                            }`}>
                              <span className="text-cyan-500 font-mono font-bold text-sm">0{idx + 1}.</span>
                              <span className="text-sm font-semibold">{q}</span>
                            </div>
                          ))}
                        </div>

                        <p>
                          Most products don't fail because the code is bad.
                        </p>

                        <p className={`font-black text-lg ${
                          readerTheme !== 'dark' ? 'text-rose-700' : 'text-rose-400'
                        }`}>
                          They fail because they solve the wrong problem.
                        </p>

                        {/* Section 2 */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-10 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          The hardest part isn't development.
                        </h2>

                        <p className="font-bold text-lg">
                          It's discovery.
                        </p>

                        <div className={`p-6 rounded-2xl border transition-colors my-6 ${
                          readerTheme !== 'dark' ? 'bg-amber-50/40 border-amber-200' : 'bg-amber-500/5 border-amber-500/20'
                        }`}>
                          <div className="text-xs font-mono font-bold uppercase text-amber-600 mb-3">Core Elements of Discovery</div>
                          <ul className="space-y-2.5 text-sm font-medium">
                            <li className="flex items-center gap-2.5">
                              <span className="text-amber-500">🔍</span> <span>Understanding customers</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <span className="text-amber-500">⚙️</span> <span>Understanding workflows</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <span className="text-amber-500">🎯</span> <span>Understanding pain points</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <span className="text-amber-500">🧠</span> <span>Understanding why people behave the way they do</span>
                            </li>
                          </ul>
                        </div>

                        <p className="italic font-semibold text-base">
                          A perfect solution to the wrong problem is still a failed product.
                        </p>

                        {/* Section 3 */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-10 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          What should engineers focus on now?
                        </h2>

                        {/* Sub 1 */}
                        <div className="space-y-4 pt-2">
                          <h3 className={`text-lg font-bold transition-colors ${currentStyles.textTitle}`}>
                            1. Learn to identify problems.
                          </h3>
                          <p>Instead of asking,</p>
                          <blockquote className={`p-4 rounded-xl border font-mono text-xs sm:text-sm transition-colors ${
                            readerTheme !== 'dark' ? 'bg-stone-100 border-stone-250 text-stone-700' : 'bg-white/5 border-white/10 text-slate-400'
                          }`}>
                            "What can I build?"
                          </blockquote>
                          <p>Ask,</p>
                          <blockquote className={`p-4 rounded-xl border font-mono text-xs sm:text-sm font-bold transition-colors ${
                            readerTheme !== 'dark' ? 'bg-cyan-50 border-cyan-200 text-cyan-800' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                          }`}>
                            "What is frustrating enough that someone would pay to solve it?"
                          </blockquote>
                          <p className="font-medium">
                            The second question leads to better products.
                          </p>
                        </div>

                        {/* Sub 2 */}
                        <div className="space-y-4 pt-6">
                          <h3 className={`text-lg font-bold transition-colors ${currentStyles.textTitle}`}>
                            2. Learn business before technology.
                          </h3>
                          <p>
                            Technology is only one part of a successful product. You also need to understand:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                            {[
                              'Who will use it?',
                              'How will they discover it?',
                              'Why will they trust it?',
                              'How will it make or save money?',
                              'How will you support it after launch?'
                            ].map((q, idx) => (
                              <div key={idx} className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium ${
                                readerTheme !== 'dark' ? 'bg-white border-stone-200' : 'bg-slate-900 border-white/5'
                              }`}>
                                • {q}
                              </div>
                            ))}
                          </div>
                          <p className="font-semibold">
                            The best engineers think like product builders. The best product builders think like business owners.
                          </p>
                        </div>

                        {/* Sub 3 */}
                        <div className="space-y-4 pt-6">
                          <h3 className={`text-lg font-bold transition-colors ${currentStyles.textTitle}`}>
                            3. Learn system design.
                          </h3>
                          <p>
                            Building a demo is easy. Building a system that serves thousands of users reliably is much harder.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                            {[
                              'Can it handle failures?',
                              'Can it scale?',
                              'Is it secure?',
                              'Can another engineer maintain it six months from now?'
                            ].map((q, idx) => (
                              <div key={idx} className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium ${
                                readerTheme !== 'dark' ? 'bg-[#FCF9F2] border-stone-200' : 'bg-white/[0.02] border-white/5'
                              }`}>
                                ⚡ {q}
                              </div>
                            ))}
                          </div>
                          <p className="text-sm italic font-semibold">
                            These questions separate prototypes from production systems.
                          </p>
                        </div>

                        {/* Sub 4 */}
                        <div className="space-y-4 pt-6">
                          <h3 className={`text-lg font-bold transition-colors ${currentStyles.textTitle}`}>
                            4. Learn communication.
                          </h3>
                          <p>
                            A brilliant solution has little impact if nobody understands it.
                          </p>
                          <ul className="space-y-2 text-sm font-medium pl-2">
                            <li>• Can you explain a complex architecture to a CTO?</li>
                            <li>• Can you explain the same idea to a non-technical founder?</li>
                            <li>• Can you help stakeholders make better decisions?</li>
                          </ul>
                          <p className={`font-extrabold text-base ${currentStyles.textAccent}`}>
                            Communication is becoming a competitive advantage.
                          </p>
                        </div>

                        {/* Sub 5 */}
                        <div className="space-y-4 pt-6">
                          <h3 className={`text-lg font-bold transition-colors ${currentStyles.textTitle}`}>
                            5. Learn judgment.
                          </h3>
                          <p>
                            AI can generate code. It cannot fully replace experience. It doesn't know your business priorities. It doesn't know your constraints. It doesn't know your customers.
                          </p>
                          <div className={`p-5 rounded-2xl border transition-colors ${
                            readerTheme !== 'dark' ? 'bg-cyan-50/60 border-cyan-200' : 'bg-cyan-950/20 border-cyan-500/20'
                          }`}>
                            <p className={`font-bold text-sm sm:text-base mb-0 ${
                              readerTheme !== 'dark' ? 'text-cyan-950' : 'text-cyan-300'
                            }`}>
                              Your value comes from choosing the right solution, not generating the fastest one.
                            </p>
                          </div>
                        </div>

                        {/* Section 4 */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-10 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          The engineers who will thrive
                        </h2>
                        <p>
                          I believe the next generation of successful engineers won't be known for writing the most code.
                        </p>
                        <p className="font-bold text-lg">
                          They'll be known for asking the best questions.
                        </p>
                        <p>
                          They'll understand technology, business, users, and trade-offs. They'll know when AI is the right answer. More importantly, they'll know when it isn't.
                        </p>

                        {/* Section 5 */}
                        <h2 className={`text-xl sm:text-2xl font-black mt-10 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          My focus has changed
                        </h2>
                        <p>
                          Earlier in my career, I measured progress by the technologies I learned. Today, I measure progress differently:
                        </p>
                        <div className="space-y-2.5 my-4">
                          {[
                            'Did I solve a meaningful problem?',
                            'Did I help a business make a better decision?',
                            'Did I save someone\'s time?',
                            'Did I create something people actually use?'
                          ].map((check, idx) => (
                            <div key={idx} className={`p-3.5 rounded-xl border flex items-center gap-3 text-sm font-medium ${
                              readerTheme !== 'dark' ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                            }`}>
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span>{check}</span>
                            </div>
                          ))}
                        </div>
                        <p className="font-semibold">
                          Those questions matter far more than the number of frameworks on my résumé.
                        </p>

                        {/* Final Thoughts */}
                        <div className={`mt-10 p-6 rounded-2xl border transition-colors ${
                          readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
                        }`}>
                          <h3 className={`text-lg font-black mb-3 transition-colors ${currentStyles.textTitle}`}>
                            Final Thoughts
                          </h3>
                          <p className="text-sm sm:text-base leading-relaxed mb-4">
                            AI has changed the economics of software development. <strong>Building is becoming a commodity. Thinking is not.</strong>
                          </p>
                          <p className="text-sm sm:text-base leading-relaxed mb-4">
                            In the years ahead, I don't think the most valuable engineers will be those who can build an app the fastest. They'll be the ones who can identify the right problem, design the right solution, and deliver measurable business value.
                          </p>
                          <p className={`text-sm sm:text-base font-bold ${
                            readerTheme !== 'dark' ? 'text-cyan-700' : 'text-cyan-400'
                          }`}>
                            That's where I'm choosing to focus.
                          </p>
                        </div>

                        {/* Author's Note */}
                        <div className={`mt-8 p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed italic text-left transition-colors duration-300 ${
                          readerTheme !== 'dark' 
                            ? 'bg-cyan-50/50 border-cyan-100 text-cyan-900 font-semibold' 
                            : 'bg-cyan-950/10 border-cyan-500/10 text-slate-400'
                        }`}>
                          💡 <strong>Author's Note:</strong> This article is part of the "Engineering Mindset" series by Bala Venkatesh. I write about product discovery, technical decision frameworks, and building resilient AI systems.
                        </div>

                        {/* End of Blog Social Share Card */}
                        <BlogShareFooter 
                          postSlug="building-something-people-trust" 
                          readerTheme={readerTheme} 
                          onOpenShareModal={handleOpenShareModal} 
                          sharedCount={sharedCounts['building-something-people-trust'] || 98} 
                        />
                      </div>
                    ) : selectedPost === 'stopped-chasing-technologies' ? (
                      <div className="space-y-6">
                        <p className={`text-base sm:text-lg font-semibold italic border-l-4 pl-4 py-1.5 transition-all duration-300 ${
                          readerTheme !== 'dark' 
                            ? 'text-slate-900 border-cyan-500 bg-cyan-50/25 rounded-r-xl pr-3' 
                            : 'text-slate-200 border-cyan-400 bg-white/5 rounded-r-xl pr-3'
                        }`}>
                          "I'm Bala Venkatesh. When I started my career, I believed learning more technologies would automatically make me more valuable. Here is the realization that completely changed how I think about engineering, architecture, and value creation."
                        </p>

                        <p>
                          When I started my career, I believed the more technologies I learned, the better engineer I would become.
                        </p>

                        <p>
                          So I learned Java.
                        </p>

                        <p>
                          Then the industry shifted.
                        </p>

                        <p>
                          AI started changing everything.
                        </p>

                        <p>
                          I moved to Python because I wanted to build intelligent systems, not just applications. That decision led me into Machine Learning, Deep Learning, algorithms, and the world of AI. I spent countless hours reading books, watching lectures, experimenting with projects, and learning every new framework I could find.
                        </p>

                        <p>
                          Later, I moved to the UK to continue my studies, believing that learning more would automatically make me more valuable.
                        </p>

                        <p>
                          Along the way, I had the opportunity to work on products in agriculture and healthcare. For the first time, I saw how software could directly improve people's lives. It wasn't just about writing clean code anymore. It was about solving problems that mattered.
                        </p>

                        <p>
                          One experience that stayed with me happened while working at Standard Chartered Bank.
                        </p>

                        <p>
                          I worked on improving security automation within the CI/CD pipeline. It wasn't the flashiest project, and it wasn't built on the latest trending technology. But it solved a real engineering problem that improved security and developer workflows.
                        </p>

                        <p>
                          That work was recognized with an award.
                        </p>

                        <p>
                          The award was meaningful, but the biggest lesson wasn't about recognition.
                        </p>

                        <p>
                          It reminded me that people rarely celebrate the technology you used. They remember the impact your solution created.
                        </p>

                        <div className={`my-8 p-6 border-l-4 transition-all duration-300 rounded-r-2xl ${
                          readerTheme !== 'dark' 
                            ? 'bg-amber-50/40 border-amber-500 text-stone-900 font-serif text-lg italic' 
                            : 'bg-white/5 border-amber-400 text-slate-100 font-serif text-lg italic'
                        }`}>
                          "If I removed all the technologies from my résumé, what problems have I actually solved?"
                        </div>

                        <p>
                          The answer made me uncomfortable.
                        </p>

                        <p>
                          For years, I had measured my progress by the technologies I knew.
                        </p>

                        <div className="flex flex-wrap gap-2.5 my-4">
                          {['Java', 'Python', 'Machine Learning', 'Deep Learning'].map((tech) => (
                            <span key={tech} className={`px-3 py-1 border font-mono text-xs rounded-full transition-colors ${
                              readerTheme !== 'dark' 
                                ? 'bg-stone-100 border-stone-250 text-stone-700' 
                                : 'bg-white/5 border-white/10 text-slate-300'
                            }`}>
                              {tech}
                            </span>
                          ))}
                        </div>

                        <p>
                          Every new framework felt like progress. Every course felt like growth. But learning technology is not the same as creating value.
                        </p>

                        <p>
                          That realization completely changed how I learn. Today, before I invest time in a new technology, I ask myself one simple question.
                        </p>

                        <div className={`my-8 p-6 border-l-4 transition-all duration-300 rounded-r-2xl ${
                          readerTheme !== 'dark' 
                            ? 'bg-cyan-50/45 border-cyan-500 text-stone-900 font-serif text-lg italic' 
                            : 'bg-white/5 border-cyan-400 text-slate-100 font-serif text-lg italic'
                        }`}>
                          "What real problem will this help me solve?"
                        </div>

                        <p>
                          Because technology will always change. Business problems remain.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                          {[
                            { emoji: '🩺', text: 'Helping a doctor make faster decisions.' },
                            { emoji: '🌾', text: 'Helping a farmer make better choices.' },
                            { emoji: '📉', text: 'Helping a company reduce operating costs.' },
                            { emoji: '🛡️', text: 'Helping engineers build secure software.' },
                            { emoji: '⏰', text: 'Helping employees save valuable time.' },
                            { emoji: '💬', text: 'Helping customers get answers instantly.' },
                          ].map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border transition-colors flex items-center gap-3 ${
                              readerTheme !== 'dark' ? 'bg-[#FCF9F2] border-stone-200/60' : 'bg-white/[0.02] border-white/5'
                            }`}>
                              <span className="text-2xl">{item.emoji}</span>
                              <span className="text-sm font-semibold">{item.text}</span>
                            </div>
                          ))}
                        </div>

                        <p>
                          Those are the problems worth solving.
                        </p>

                        <h3 className={`text-lg sm:text-xl font-black mt-8 mb-4 transition-colors ${currentStyles.textTitle}`}>
                          A Tale of Two Engineers
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                          <div className={`p-5 rounded-2xl border transition-colors text-left ${
                            readerTheme !== 'dark' ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/5'
                          }`}>
                            <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-2">Engineer A (The Tech Chaser)</div>
                            <p className="text-sm font-medium leading-relaxed mb-0">
                              Knows every single trending technology, library, and framework but spends years building products that nobody actually needs or uses.
                            </p>
                          </div>
                          <div className={`p-5 rounded-2xl border transition-colors text-left ${
                            readerTheme !== 'dark' ? 'bg-cyan-50/35 border-cyan-200 shadow-sm' : 'bg-cyan-500/5 border-cyan-500/25'
                          }`}>
                            <div className="text-xs font-mono font-bold uppercase text-cyan-600 mb-2">Engineer B (The Problem Solver)</div>
                            <p className="text-sm font-medium leading-relaxed mb-0">
                              Knows only a few core technologies deeply but builds a targeted solution that saves a business millions of dollars or makes a human life easier every day.
                            </p>
                          </div>
                        </div>

                        <p className="font-semibold text-lg">
                          Who creates more value? For me, the answer is obvious.
                        </p>

                        <p>
                          Today, I still enjoy learning new technologies. I always will. But I don't learn them because they're popular. I learn them because they help me build better products, design better systems, and solve more meaningful problems.
                        </p>

                        <p>
                          That shift has changed the way I approach engineering, architecture, and even my career.
                        </p>

                        <p className="font-bold">
                          Technology is temporary. The ability to solve meaningful problems is timeless.
                        </p>

                        <p className={`text-lg ${
                          readerTheme !== 'dark' 
                            ? 'text-cyan-700 font-black' 
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-black'
                        }`}>
                          That is the engineer I'm striving to become every day.
                        </p>

                        {/* Distinctions Footer */}
                        <div className={`mt-10 p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed italic text-left transition-colors duration-300 ${
                          readerTheme !== 'dark' 
                            ? 'bg-cyan-50/50 border-cyan-100 text-cyan-900 font-semibold' 
                            : 'bg-cyan-950/10 border-cyan-500/10 text-slate-400'
                        }`}>
                          💡 <strong>Author's Note:</strong> This post marks the start of the "Engineering Mindset" series. My hope is to spark deeper conversations about pragmatism, technical trade-offs, and product-focused engineering. Thanks for reading!
                        </div>

                        {/* End of Blog Social Share Card */}
                        <BlogShareFooter 
                          postSlug="stopped-chasing-technologies" 
                          readerTheme={readerTheme} 
                          onOpenShareModal={handleOpenShareModal} 
                          sharedCount={sharedCounts['stopped-chasing-technologies'] || 115} 
                        />
                      </div>
                    ) : (
                      <>
                        <p className={`text-base sm:text-lg font-semibold italic border-l-4 pl-4 py-1.5 mb-6 transition-all duration-300 ${
                      readerTheme !== 'dark' 
                        ? 'text-slate-900 border-cyan-500 bg-cyan-50/25 rounded-r-xl pr-3' 
                        : 'text-slate-200 border-cyan-400 bg-white/5 rounded-r-xl pr-3'
                    }`}>
                      "I'm Bala Venkatesh. My goal here is not to give generic explanations of what LLMs are. Rather, I share real architectural trade-offs, decision-making matrices, and system-level insights from deploying high-scale AI products."
                    </p>

                    <p>
                      Every week, a new Large Language Model (LLM) is released with higher benchmark scores and larger context windows.
                    </p>
                    
                    <p>
                      Teams immediately react by asking: <span className={currentStyles.codePill}>"Should we switch?"</span> That's usually the wrong question.
                    </p>

                    <p>
                      The better, more architectural question is: <strong className={`transition-colors duration-300 ${
                        readerTheme !== 'dark' ? 'text-slate-950 font-black' : 'text-white'
                      }`}>"Does this model solve our business problem better than our current approach, or are we just throwing brute-force parameters at a system problem?"</strong>
                    </p>

                    <p>
                      Before comparing model features, we must understand how an LLM actually functions from an systems engineering perspective.
                    </p>

                    {/* Section 1 */}
                    <div className="pt-6">
                      <h2 className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2 transition-colors duration-300 ${currentStyles.textTitle}`}>
                        <Cpu className={`w-5 h-5 transition-colors ${currentStyles.textAccent}`} />
                        1. Think of an LLM as a Prediction Engine, Not a Knowledge Database
                      </h2>
                      <p className="mb-4">
                        An LLM doesn't query a central index database or search the web every time you submit a prompt.
                      </p>
                      <p className="mb-4">
                        Instead, it predicts the next word (or token) in a sequence based on massive statistical weights adjusted during training. It computes a probability distribution and outputs the highest probability next-token.
                      </p>
                      <p className="mb-6">
                        That means it is excellent at translation, summarization, formatting, and abstract reasoning, but it does <strong className="text-rose-500 font-bold">not</strong> naturally know your internal company policies, live sales numbers, or private records.
                      </p>

                      {/* INTERACTIVE DEMO 1: NEXT-TOKEN GENERATOR */}
                      <div className={`my-8 rounded-2xl p-6 sm:p-8 relative overflow-hidden border transition-all duration-300 ${currentStyles.simBg}`}>
                        <div className={`absolute top-0 right-0 px-3 py-1 border-b border-l rounded-bl-xl font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
                          readerTheme !== 'dark' 
                            ? 'bg-cyan-50 border-slate-250 text-cyan-800' 
                            : 'bg-cyan-500/10 border-cyan-400/20 text-cyan-400'
                        }`}>
                          INTERACTIVE VISUALIZER
                        </div>

                        <h4 className={`text-sm font-mono font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 transition-colors ${
                          readerTheme !== 'dark' ? 'text-slate-700' : 'text-slate-400'
                        }`}>
                          <Sparkles className={`w-4 h-4 animate-spin-slow transition-colors ${currentStyles.textAccent}`} />
                          Animated Token Prediction Simulator
                        </h4>
                        <p className={`text-xs mb-6 transition-colors ${currentStyles.textMuted}`}>
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
                                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-700 font-bold' 
                                  : readerTheme === 'paper'
                                    ? 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                              } cursor-pointer`}
                            >
                              Prompt {idx + 1}: "{p.text.substring(0, 45)}..."
                            </button>
                          ))}
                        </div>

                        {/* Interactive Stage */}
                        <div className={`rounded-xl p-5 border flex flex-col gap-4 text-left transition-colors ${
                          readerTheme === 'paper' ? 'bg-[#FAF9F5] border-slate-200' : 'bg-slate-950 border-white/5'
                        }`}>
                          <div className={`text-xs font-mono border-b pb-2 transition-colors ${
                            readerTheme === 'paper' ? 'text-slate-500 border-slate-200' : 'text-slate-500 border-white/5'
                          }`}>
                            INPUT PROMPT:
                          </div>
                          <p className={`text-sm sm:text-base font-semibold leading-relaxed italic transition-colors ${
                            readerTheme === 'paper' ? 'text-slate-800' : 'text-slate-200'
                          }`}>
                            "{predictionPrompts[predictionPrompt].text}"
                          </p>

                          <div className={`text-xs font-mono border-b pb-2 pt-2 transition-colors ${
                            readerTheme === 'paper' ? 'text-slate-500 border-slate-200' : 'text-slate-500 border-white/5'
                          }`}>
                            PREDICTION LOOP (TOKEN OUTPUTS):
                          </div>
                          
                          <div className={`min-h-[60px] flex flex-wrap items-center gap-2 p-3 rounded-lg border transition-colors ${
                            readerTheme === 'paper' ? 'bg-white border-slate-200' : 'bg-white/[0.01] border-white/5'
                          }`}>
                            {predictedTokens.length === 0 && (
                              <span className="text-xs font-mono text-slate-500 italic">Click "Trigger Prediction Engine" to start token calculation...</span>
                            )}
                            {predictedTokens.map((t, idx) => {
                              const getPredictColor = (color: string) => {
                                if (readerTheme !== 'paper') return color;
                                if (color === 'text-cyan-400') return 'text-cyan-700 bg-cyan-100/60 border border-cyan-200 px-2 py-0.5 rounded';
                                if (color === 'text-indigo-400') return 'text-indigo-700 bg-indigo-100/60 border border-indigo-200 px-2 py-0.5 rounded';
                                if (color === 'text-purple-400') return 'text-purple-700 bg-purple-100/60 border border-purple-200 px-2 py-0.5 rounded';
                                if (color === 'text-pink-400') return 'text-pink-700 bg-pink-100/60 border border-pink-200 px-2 py-0.5 rounded';
                                if (color === 'text-emerald-400') return 'text-emerald-700 bg-emerald-100/60 border border-emerald-200 px-2 py-0.5 rounded';
                                return color;
                              };
                              return (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  key={idx}
                                  className={`px-2 py-1 rounded font-mono text-sm font-bold ${
                                    readerTheme === 'paper' ? getPredictColor(t.color) : `bg-white/5 ${t.color}`
                                  }`}
                                >
                                  {t.word}
                                </motion.span>
                              );
                            })}
                          </div>

                          {/* Live Math Stats */}
                          {currentStep >= 0 && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className={`text-xs font-mono p-3 rounded-lg flex flex-col gap-1 border transition-colors ${
                                readerTheme === 'paper' 
                                  ? 'bg-cyan-50 border-cyan-100 text-cyan-800 shadow-sm' 
                                  : 'bg-cyan-950/20 border-cyan-500/10 text-cyan-400'
                              }`}
                            >
                              <div className="flex justify-between">
                                <span>Token Selected: <strong className={readerTheme === 'paper' ? 'text-slate-900 font-extrabold' : 'text-white'}>"{predictionPrompts[predictionPrompt].steps[currentStep].word}"</strong></span>
                                <span>Probability Confidence: <strong className={readerTheme === 'paper' ? 'text-slate-900 font-extrabold' : 'text-white'}>{predictionPrompts[predictionPrompt].steps[currentStep].prob}%</strong></span>
                              </div>
                              <div className={`w-full h-1.5 rounded-full overflow-hidden mt-1.5 ${
                                readerTheme === 'paper' ? 'bg-slate-200/80' : 'bg-slate-900'
                              }`}>
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${predictionPrompts[predictionPrompt].steps[currentStep].prob}%` }}
                                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500" 
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

                      <p className={`text-sm mt-2 italic text-left transition-colors duration-300 ${currentStyles.textMuted}`}>
                        💡 <strong>Real Field Lesson:</strong> The expectation in enterprise software is often "The model knows everything." The reality is "The model only knows patterns it trained on unless you explicitly provide additional context."
                      </p>
                    </div>

                    {/* Section 2 */}
                    <div className="pt-6">
                      <h2 className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2 transition-colors duration-300 ${currentStyles.textTitle}`}>
                        <Layers className={`w-5 h-5 transition-colors ${currentStyles.textAccent}`} />
                        2. Why Companies Don't Stop With an LLM: Fine-Tuning vs. RAG
                      </h2>
                      <p className="mb-4">
                        Imagine building an AI assistant for your company's HR team. An employee asks: <span className={currentStyles.codePill}>"What is our current leave policy?"</span>
                      </p>
                      <p className="mb-4">
                        The base model has no concept of your internal files. You have two engineering pathways:
                      </p>

                      {/* INTERACTIVE DEMO 2: FT vs RAG */}
                      <div className={`my-8 rounded-2xl p-6 sm:p-8 relative overflow-hidden border transition-all duration-300 ${currentStyles.simBg}`}>
                        <div className={`absolute top-0 right-0 px-3 py-1 border-b border-l rounded-bl-xl font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
                          readerTheme !== 'dark' 
                            ? 'bg-cyan-50 border-slate-250 text-cyan-800' 
                            : 'bg-cyan-500/10 border-cyan-400/20 text-cyan-400'
                        }`}>
                          PIPELINE COMPARATIVE SIMULATOR
                        </div>

                        <h4 className={`text-sm font-mono font-bold uppercase tracking-widest mb-6 transition-colors ${
                          readerTheme !== 'dark' ? 'text-slate-700' : 'text-slate-400'
                        }`}>
                          Fine-Tuning vs. Retrieval-Augmented Generation (RAG)
                        </h4>

                        <div className={`flex gap-4 mb-6 border-b transition-colors duration-300 ${currentStyles.headerBorder}`}>
                          <button
                            onClick={() => { setSimMode('ft'); setRagStep(0); }}
                            className={`pb-3 text-xs font-mono font-black border-b-2 transition-all cursor-pointer ${
                              simMode === 'ft' 
                                ? 'border-cyan-500 font-bold ' + currentStyles.textAccent
                                : 'border-transparent ' + (readerTheme !== 'dark' ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-300')
                            }`}
                          >
                            Option A: Fine-Tuning
                          </button>
                          <button
                            onClick={() => { setSimMode('rag'); setRagStep(0); }}
                            className={`pb-3 text-xs font-mono font-black border-b-2 transition-all cursor-pointer ${
                              simMode === 'rag' 
                                ? 'border-cyan-500 font-bold ' + currentStyles.textAccent
                                : 'border-transparent ' + (readerTheme !== 'dark' ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-300')
                            }`}
                          >
                            Option B: RAG (Context Injection)
                          </button>
                        </div>

                        {/* FT View */}
                        {simMode === 'ft' ? (
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                            <div className="md:col-span-7 flex flex-col gap-4">
                              <h5 className={`text-base font-bold flex items-center gap-1.5 transition-colors ${
                                readerTheme === 'paper' ? 'text-slate-900' : 'text-white'
                              }`}>
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                Adapting Model Weights
                              </h5>
                              <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                                readerTheme !== 'dark' ? 'text-slate-700' : 'text-slate-300'
                              }`}>
                                Fine-tuning alters the model's actual internal weight matrix. It is excellent for adjusting the response tone, output format, domain terminology, and stylistic preferences. 
                              </p>
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className={`p-3 rounded-lg border transition-colors ${
                                  readerTheme !== 'dark' ? 'bg-red-50 border-red-100 text-red-700 font-medium' : 'bg-red-950/10 border-red-500/10 text-red-400'
                                }`}>
                                  <div className="text-[10px] font-mono uppercase font-black">Drawback</div>
                                  <div className="text-xs font-semibold">Expensive & Slow to update</div>
                                </div>
                                <div className={`p-3 rounded-lg border transition-colors ${
                                  readerTheme !== 'dark' ? 'bg-emerald-50 border-emerald-100 text-emerald-700 font-medium' : 'bg-emerald-950/10 border-emerald-500/10 text-emerald-400'
                                }`}>
                                  <div className="text-[10px] font-mono uppercase font-black">Best For</div>
                                  <div className="text-xs font-semibold">Voice & complex styling</div>
                                </div>
                              </div>
                            </div>
                            <div className={`md:col-span-5 p-4 rounded-xl border flex flex-col gap-3 transition-colors ${
                              readerTheme !== 'dark' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-950 border-white/5'
                            }`}>
                              <div className="text-[10px] font-mono text-slate-500">NEURAL NET WEIGHT UPDATE SIMULATOR:</div>
                              <div className="flex justify-around items-center py-6">
                                <div className="flex flex-col gap-3">
                                  <div className={`w-3.5 h-3.5 rounded-full border transition-colors ${readerTheme !== 'dark' ? 'bg-slate-200 border-slate-300' : 'bg-slate-800 border-slate-700'}`} />
                                  <div className={`w-3.5 h-3.5 rounded-full border transition-colors ${readerTheme !== 'dark' ? 'bg-slate-200 border-slate-300' : 'bg-slate-800 border-slate-700'}`} />
                                  <div className={`w-3.5 h-3.5 rounded-full border transition-colors ${readerTheme !== 'dark' ? 'bg-slate-200 border-slate-300' : 'bg-slate-800 border-slate-700'}`} />
                                </div>
                                <div className="flex flex-col gap-4 relative">
                                  {/* Weight lines */}
                                  <div className="w-4 h-3.5 rounded-full bg-cyan-400 animate-pulse border border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                  <div className="w-4 h-3.5 rounded-full bg-indigo-500 animate-pulse border border-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                  <div className="w-4 h-3.5 rounded-full bg-cyan-400 animate-pulse border border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                </div>
                                <div className="flex flex-col gap-3">
                                  <div className={`w-3.5 h-3.5 rounded-full border transition-colors ${readerTheme !== 'dark' ? 'bg-slate-200 border-slate-300' : 'bg-slate-800 border-slate-700'}`} />
                                  <div className={`w-3.5 h-3.5 rounded-full border transition-colors ${readerTheme !== 'dark' ? 'bg-slate-200 border-slate-300' : 'bg-slate-800 border-slate-700'}`} />
                                </div>
                              </div>
                              <div className="text-[10px] font-mono text-center text-cyan-600 font-bold">Epoch: 3/3 - Loss: 0.124 [Weights Locked]</div>
                            </div>
                          </div>
                        ) : (
                          /* RAG View */
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                            <div className="md:col-span-6 flex flex-col gap-4">
                              <h5 className={`text-base font-bold flex items-center gap-1.5 transition-colors ${currentStyles.textTitle}`}>
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                                Context Injection Pipeline
                              </h5>
                              <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                                readerTheme !== 'dark' ? 'text-slate-700' : 'text-slate-300'
                              }`}>
                                Instead of changing the model, RAG queries a vector database, retrieves the fresh text chunk, and dynamically injects it into the prompt.
                              </p>

                              {/* Interactive sequence controller */}
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => setRagStep(prev => (prev > 0 ? prev - 1 : 0))}
                                  disabled={ragStep === 0}
                                  className={`p-1 px-2.5 border rounded-lg text-xs font-mono cursor-pointer transition-colors ${
                                    readerTheme !== 'dark' 
                                      ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-30' 
                                      : 'bg-white/5 border-white/10 text-white disabled:opacity-30'
                                  }`}
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
                            <div className={`md:col-span-6 p-4 rounded-xl border min-h-[170px] flex flex-col justify-between transition-colors ${
                              readerTheme !== 'dark' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-950 border-white/5'
                            }`}>
                              <div className="text-[10px] font-mono text-slate-500 uppercase">Interactive execution sequence:</div>
                              
                              <div className="py-2 flex flex-col gap-2">
                                {ragStep === 0 && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex gap-2 items-start text-xs font-mono ${
                                    readerTheme !== 'dark' ? 'text-cyan-700' : 'text-cyan-400'
                                  }`}>
                                    <span className={`p-1 rounded font-bold ${readerTheme !== 'dark' ? 'bg-cyan-100' : 'bg-cyan-400/10'}`}>Q</span>
                                    <div>
                                      <strong>1. User Query:</strong> "What's our HR leave policy?"
                                      <div className={`text-[10px] mt-1 transition-colors ${readerTheme !== 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>Prompt converted to float embedding vectors.</div>
                                    </div>
                                  </motion.div>
                                )}
                                {ragStep === 1 && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex gap-2 items-start text-xs font-mono ${
                                    readerTheme !== 'dark' ? 'text-indigo-700' : 'text-indigo-400'
                                  }`}>
                                    <span className={`p-1 rounded font-bold ${readerTheme !== 'dark' ? 'bg-indigo-100' : 'bg-indigo-400/10'}`}>DB</span>
                                    <div>
                                      <strong>2. Dense Vector Lookup:</strong>
                                      <div className={`text-[10px] mt-1 p-1.5 rounded border transition-colors ${
                                        readerTheme !== 'dark' ? 'bg-slate-50 border-slate-200 text-slate-700 shadow-xs' : 'bg-white/5 border-transparent text-slate-400'
                                      }`}>
                                        {"Similarity: 0.94 -> policy_leave_handbook.pdf"}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                                {ragStep === 2 && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex gap-2 items-start text-xs font-mono ${
                                    readerTheme !== 'dark' ? 'text-amber-800 font-bold' : 'text-amber-400'
                                  }`}>
                                    <span className={`p-1 rounded font-bold ${readerTheme !== 'dark' ? 'bg-amber-100' : 'bg-amber-400/10'}`}>CTX</span>
                                    <div>
                                      <strong>3. Context Injection:</strong>
                                      <div className={`text-[10px] mt-1 transition-colors ${readerTheme !== 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>System appends the fetched handbook chunk directly in front of LLM prompt wrapper.</div>
                                    </div>
                                  </motion.div>
                                )}
                                {ragStep === 3 && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex gap-2 items-start text-xs font-mono ${
                                    readerTheme !== 'dark' ? 'text-emerald-700' : 'text-emerald-400'
                                  }`}>
                                    <span className={`p-1 rounded font-bold ${readerTheme !== 'dark' ? 'bg-emerald-100' : 'bg-emerald-400/10'}`}>OK</span>
                                    <div>
                                      <strong>4. Verifiable Generation:</strong>
                                      <div className={`text-[10px] mt-1 transition-colors ${readerTheme !== 'dark' ? 'text-slate-700' : 'text-slate-400'}`}>"Based on HR Leave policy Section 4, employees get..."</div>
                                      <div className="text-[9px] text-emerald-600 mt-1 font-extrabold">✓ 100% Factual Source Cited</div>
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
                      <h2 className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2 transition-colors duration-300 ${currentStyles.textTitle}`}>
                        <Settings className={`w-5 h-5 transition-colors ${currentStyles.textAccent}`} />
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
                      <h2 className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2 transition-colors duration-300 ${currentStyles.textTitle}`}>
                        <Layers className={`w-5 h-5 transition-colors ${currentStyles.textAccent}`} />
                        4. A Simple Mental Model: The Three Layers
                      </h2>
                      <p className="mb-6">
                        When evaluating or engineering an AI application, shift your mindset to think of your system in terms of three decoupled layers:
                      </p>

                      {/* INTERACTIVE DEMO 3: 3-LAYER STACK DECK */}
                      <div className={`my-8 rounded-2xl p-6 sm:p-8 relative overflow-hidden border transition-all duration-300 ${currentStyles.simBg}`}>
                        <div className={`absolute top-0 right-0 px-3 py-1 border-b border-l rounded-bl-xl font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
                          readerTheme !== 'dark' 
                            ? 'bg-cyan-50 border-slate-250 text-cyan-800' 
                            : 'bg-cyan-500/10 border-cyan-400/20 text-cyan-400'
                        }`}>
                          STACK SPECIFICATION EXPLORER
                        </div>

                        <h4 className={`text-sm font-mono font-bold uppercase tracking-widest mb-2 transition-colors ${
                          readerTheme !== 'dark' ? 'text-slate-700' : 'text-slate-400'
                        }`}>
                          Interactive 3-Layer Stack Map
                        </h4>
                        <p className={`text-xs mb-6 transition-colors ${currentStyles.textMuted}`}>
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
                                ? readerTheme !== 'dark'
                                  ? 'bg-cyan-50/50 border-cyan-350 shadow-xs'
                                  : 'bg-cyan-950/20 border-cyan-500/30 shadow-[0_4px_20px_rgba(34,211,238,0.1)]' 
                                : readerTheme !== 'dark'
                                  ? 'bg-white border-slate-250 hover:border-slate-350 shadow-xs'
                                  : 'bg-white/5 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-xs font-mono font-bold ${
                                readerTheme !== 'dark' ? 'text-cyan-700' : 'text-cyan-400'
                              }`}>LAYER 3 — THE APPLICATION LAYER</span>
                              <span className="text-[10px] font-mono text-slate-500">Click to Expand</span>
                            </div>
                            <h5 className={`text-base font-bold mb-2 transition-colors ${currentStyles.textTitle}`}>Orchestration, Guardrails, and User Interface</h5>
                            
                            <AnimatePresence>
                              {hoveredLayer === 3 && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className={`overflow-hidden text-xs sm:text-sm space-y-3 mt-4 pt-4 border-t transition-colors ${
                                    readerTheme !== 'dark' ? 'text-slate-700 border-slate-200' : 'text-slate-300 border-white/10'
                                  }`}
                                >
                                  <p>
                                    This is where your business logic, evaluation cycles, and routing take place. This layer ensures user safety, manages token caching, handles feedback loops, and routes prompt templates.
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    {['LangGraph / LangChain', 'Express.js API Router', 'Guardrails.ai', 'LlamaGuard'].map((tech) => (
                                      <span key={tech} className={`px-2 py-1 border font-mono text-[10px] rounded ${
                                        readerTheme !== 'dark' 
                                          ? 'bg-cyan-50 border-cyan-200 text-cyan-800 font-bold' 
                                          : 'bg-white/5 border-white/10 text-white'
                                      }`}>
                                        {tech}
                                      </span>
                                    ))}
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
                                ? readerTheme !== 'dark'
                                  ? 'bg-indigo-50/50 border-indigo-350 shadow-xs'
                                  : 'bg-indigo-950/20 border-indigo-500/30 shadow-[0_4px_20px_rgba(99,102,241,0.1)]' 
                                : readerTheme !== 'dark'
                                  ? 'bg-white border-slate-250 hover:border-slate-350 shadow-xs'
                                  : 'bg-white/5 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-xs font-mono font-bold ${
                                readerTheme !== 'dark' ? 'text-indigo-700' : 'text-indigo-400'
                              }`}>LAYER 2 — YOUR DATA LAYER</span>
                              <span className="text-[10px] font-mono text-slate-500">Click to Expand</span>
                            </div>
                            <h5 className={`text-base font-bold mb-2 transition-colors ${currentStyles.textTitle}`}>Documents, DBs, and Enterprise Systems</h5>
                            
                            <AnimatePresence>
                              {hoveredLayer === 2 && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className={`overflow-hidden text-xs sm:text-sm space-y-3 mt-4 pt-4 border-t transition-colors ${
                                    readerTheme !== 'dark' ? 'text-slate-700 border-slate-200' : 'text-slate-300 border-white/10'
                                  }`}
                                >
                                  <p>
                                    This contains the database architectures and file repositories that hold your real, custom enterprise facts. It translates unstructured data into highly optimized vector embeddings to facilitate instant searching.
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    {['Cloud Firestore', 'PostgreSQL (PGVector)', 'Pinecone', 'Redis Caching'].map((tech) => (
                                      <span key={tech} className={`px-2 py-1 border font-mono text-[10px] rounded ${
                                        readerTheme !== 'dark' 
                                          ? 'bg-indigo-50 border-indigo-200 text-indigo-800 font-bold' 
                                          : 'bg-white/5 border-white/10 text-white'
                                      }`}>
                                        {tech}
                                      </span>
                                    ))}
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
                                ? readerTheme !== 'dark'
                                  ? 'bg-cyan-50/50 border-cyan-350 shadow-xs'
                                  : 'bg-cyan-950/20 border-cyan-500/30 shadow-[0_4px_20px_rgba(34,211,238,0.1)]' 
                                : readerTheme !== 'dark'
                                  ? 'bg-white border-slate-250 hover:border-slate-350 shadow-xs'
                                  : 'bg-white/5 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-xs font-mono font-bold ${
                                readerTheme !== 'dark' ? 'text-cyan-700' : 'text-cyan-400'
                              }`}>LAYER 1 — THE MODEL ENGINE LAYER</span>
                              <span className="text-[10px] font-mono text-slate-500">Click to Expand</span>
                            </div>
                            <h5 className={`text-base font-bold mb-2 transition-colors ${currentStyles.textTitle}`}>Large Language Model Core</h5>
                            
                            <AnimatePresence>
                              {hoveredLayer === 1 && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className={`overflow-hidden text-xs sm:text-sm space-y-3 mt-4 pt-4 border-t transition-colors ${
                                    readerTheme !== 'dark' ? 'text-slate-700 border-slate-200' : 'text-slate-300 border-white/10'
                                  }`}
                                >
                                  <p>
                                    This is the foundation processing engine. It understands language patterns, generates formatting structures, and executes reasoning steps. Usually accessed via API or local hosting.
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    {['Gemini 1.5 Pro', 'Gemini 1.5 Flash', 'Llama 3 (Ollama/Local)'].map((tech) => (
                                      <span key={tech} className={`px-2 py-1 border font-mono text-[10px] rounded ${
                                        readerTheme !== 'dark' 
                                          ? 'bg-cyan-50 border-cyan-200 text-cyan-800 font-bold' 
                                          : 'bg-white/5 border-white/10 text-white'
                                      }`}>
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                        </div>
                      </div>

                      <p className="mt-4">
                        Most modern engineering efforts should belong in <strong className={readerTheme !== 'dark' ? 'text-slate-900 font-black border-b-2 border-cyan-500/20' : 'text-white'}>Layers 2 and 3</strong>—not in constantly swapping the core model inside Layer 1.
                      </p>
                    </div>

                    {/* Section 5 */}
                    <div className="pt-6">
                      <h2 className={`text-xl sm:text-2xl font-black mb-4 flex items-center gap-2 transition-colors duration-300 ${currentStyles.textTitle}`}>
                        <HelpCircle className={`w-5 h-5 transition-colors ${currentStyles.textAccent}`} />
                        5. The Questions I Ask Before Selecting an LLM
                      </h2>
                      <p className="mb-4">
                        Instead of asking generic questions like: <span className={currentStyles.codePill}>"Which LLM has the highest score on MMLU benchmarks?"</span> I recommend reviewing this practical selection checklist with your engineering lead:
                      </p>

                      {/* INTERACTIVE DEMO 4: DECISION CALCULATOR */}
                      <div className={`my-8 rounded-2xl p-6 sm:p-8 relative overflow-hidden border transition-all duration-300 ${currentStyles.simBg}`}>
                        <div className={`absolute top-0 right-0 px-3 py-1 border-b border-l rounded-bl-xl font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
                          readerTheme !== 'dark' 
                            ? 'bg-cyan-50 border-slate-250 text-cyan-800' 
                            : 'bg-cyan-500/10 border-cyan-400/20 text-cyan-400'
                        }`}>
                          AI ARCHITECT CALCULATOR
                        </div>

                        <h4 className={`text-sm font-mono font-bold uppercase tracking-widest mb-2 transition-colors ${
                          readerTheme !== 'dark' ? 'text-slate-700' : 'text-slate-400'
                        }`}>
                          Bala's Interactive LLM Selector Calculator
                        </h4>
                        <p className={`text-xs mb-6 transition-colors ${currentStyles.textMuted}`}>
                          Configure your business scenario constraints below to instantly formulate a robust custom technical blueprint.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                          
                          {/* Q1 */}
                          <div className="flex flex-col gap-2 text-left">
                            <label className={`text-[10px] font-mono font-bold uppercase transition-colors ${
                              readerTheme !== 'dark' ? 'text-slate-500 font-bold' : 'text-slate-400'
                            }`}>Data Freshness Requirements</label>
                            <select 
                              value={frequency}
                              onChange={(e) => setFrequency(e.target.value as any)}
                              className={`rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none cursor-pointer transition-all border ${
                                readerTheme !== 'dark' 
                                  ? 'bg-white border-slate-300 text-slate-800 focus:border-cyan-500' 
                                  : 'bg-slate-950 border-white/10 text-slate-300 focus:border-cyan-400'
                              }`}
                            >
                              <option value="realtime">Real-time / Instant changes (e.g. Stock, Orders)</option>
                              <option value="weekly">Weekly or Monthly changes (e.g. Handbooks)</option>
                              <option value="static">Completely Static facts (e.g. Legal Codes)</option>
                            </select>
                          </div>

                          {/* Q2 */}
                          <div className="flex flex-col gap-2 text-left">
                            <label className={`text-[10px] font-mono font-bold uppercase transition-colors ${
                              readerTheme !== 'dark' ? 'text-slate-500 font-bold' : 'text-slate-400'
                            }`}>Target Output Latency SLA</label>
                            <select 
                              value={latency}
                              onChange={(e) => setLatency(e.target.value as any)}
                              className={`rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none cursor-pointer transition-all border ${
                                readerTheme !== 'dark' 
                                  ? 'bg-white border-slate-300 text-slate-800 focus:border-cyan-500' 
                                  : 'bg-slate-950 border-white/10 text-slate-300 focus:border-cyan-400'
                              }`}
                            >
                              <option value="ultra">Ultra-fast (&lt; 1s responses critical)</option>
                              <option value="moderate">Moderate (2s - 4s is acceptable)</option>
                              <option value="flexible">No constraint (Batch operations acceptable)</option>
                            </select>
                          </div>

                          {/* Q3 */}
                          <div className="flex flex-col gap-2 text-left">
                            <label className={`text-[10px] font-mono font-bold uppercase transition-colors ${
                              readerTheme !== 'dark' ? 'text-slate-500 font-bold' : 'text-slate-400'
                            }`}>Enterprise Data Privacy Constraints</label>
                            <select 
                              value={privacy}
                              onChange={(e) => setPrivacy(e.target.value as any)}
                              className={`rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none cursor-pointer transition-all border ${
                                readerTheme !== 'dark' 
                                  ? 'bg-white border-slate-300 text-slate-800 focus:border-cyan-500' 
                                  : 'bg-slate-950 border-white/10 text-slate-300 focus:border-cyan-400'
                              }`}
                            >
                              <option value="standard">Standard Cloud APIs are approved</option>
                              <option value="onprem">Highly Sensitive (On-Prem / Private Cloud only)</option>
                            </select>
                          </div>

                          {/* Q4 */}
                          <div className="flex flex-col gap-2 text-left">
                            <label className={`text-[10px] font-mono font-bold uppercase transition-colors ${
                              readerTheme !== 'dark' ? 'text-slate-500 font-bold' : 'text-slate-400'
                            }`}>Operating Budget Bounds</label>
                            <select 
                              value={budget}
                              onChange={(e) => setBudget(e.target.value as any)}
                              className={`rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none cursor-pointer transition-all border ${
                                readerTheme !== 'dark' 
                                  ? 'bg-white border-slate-300 text-slate-800 focus:border-cyan-500' 
                                  : 'bg-slate-950 border-white/10 text-slate-300 focus:border-cyan-400'
                              }`}
                            >
                              <option value="premium">Flagship Accuracy prioritized (Higher budget)</option>
                              <option value="low">Budget-optimized (Low cost essential)</option>
                            </select>
                          </div>

                        </div>

                        {/* Recommendation Output */}
                        <motion.div 
                          layout
                          className={`rounded-2xl p-5 text-left flex flex-col gap-3 border transition-colors duration-300 ${
                            readerTheme !== 'dark' 
                              ? 'bg-white border-slate-200 shadow-sm' 
                              : 'bg-slate-950 border-cyan-500/10 shadow-inner'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
                            <span className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-widest">BALA'S RECOMMENDED ARCHITECTURE</span>
                          </div>

                          <h5 className={`text-base sm:text-lg font-black transition-colors ${
                            readerTheme !== 'dark' ? 'text-slate-900' : 'text-white'
                          }`}>{getCalculatorRecommendation().title}</h5>
                          
                          <div className={`text-xs font-mono px-2 py-1 rounded inline-block border transition-colors ${
                            readerTheme !== 'dark' 
                              ? 'bg-cyan-50 border-cyan-100 text-cyan-800 font-bold' 
                              : 'bg-white/5 border-white/5 text-slate-300'
                          }`}>
                            Core Tooling: <strong className={readerTheme !== 'dark' ? 'text-cyan-700 font-black' : 'text-cyan-400'}>{getCalculatorRecommendation().engine}</strong>
                          </div>

                          <p className={`text-xs sm:text-sm leading-relaxed pt-2 transition-colors ${
                            readerTheme !== 'dark' ? 'text-slate-700 font-semibold' : 'text-slate-400'
                          }`}>
                            {getCalculatorRecommendation().rationale}
                          </p>

                          <div className={`border-t pt-3 mt-2 flex flex-col sm:flex-row justify-between text-[11px] font-mono transition-colors ${
                            readerTheme !== 'dark' ? 'border-slate-200 text-slate-500' : 'border-white/5 text-slate-500'
                          }`}>
                            <span>Cost Profile: <strong className={readerTheme !== 'dark' ? 'text-slate-800 font-bold' : 'text-slate-300'}>{getCalculatorRecommendation().cost}</strong></span>
                            <span className="mt-1 sm:mt-0">Implementation Difficulty: <strong className={readerTheme !== 'dark' ? 'text-slate-800 font-bold' : 'text-slate-300'}>{getCalculatorRecommendation().difficulty}</strong></span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Summary Takeaway */}
                    <div className={`pt-8 border-t mt-10 text-left transition-colors ${
                      readerTheme !== 'dark' ? 'border-slate-200' : 'border-white/5'
                    }`}>
                      <h3 className={`text-lg sm:text-xl font-black mb-3 transition-colors ${
                        readerTheme !== 'dark' ? 'text-slate-950' : 'text-white'
                      }`}>Final Takeaway</h3>
                      <p className="mb-4">
                        If you are building an AI product, stop asking: <span className="font-semibold text-rose-500 font-mono">"Which LLM should I use?"</span>
                      </p>
                      <p className={`mb-6 font-bold transition-colors ${
                        readerTheme !== 'dark' ? 'text-slate-900' : 'text-white'
                      }`}>
                        Instead, start asking: <span className={`text-lg ${
                          readerTheme !== 'dark' 
                            ? 'text-cyan-700 font-black' 
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-black'
                        }`}>"What system should I build around the LLM so it consistently solves my users' problems with deterministic safety?"</span>
                      </p>
                      <p>
                        That is the critical shift from thinking like a basic tool-implementer to thinking like an **Enterprise AI Architect**.
                      </p>
                    </div>

                    {/* Distinctions Footer */}
                    <div className={`mt-10 p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed italic text-left transition-colors duration-300 ${
                      readerTheme !== 'dark' 
                        ? 'bg-cyan-50/50 border-cyan-100 text-cyan-900 font-semibold' 
                        : 'bg-cyan-950/10 border-cyan-500/10 text-slate-400'
                    }`}>
                      📚 <strong>Author's Note:</strong> This blog doesn't end with "Now you know how LLMs work." It ends with "Now you have a framework to decide whether an LLM is the right solution for your business." That distinction is what positions you as a strategic consultant that companies trust.
                    </div>

                    {/* End of Blog Social Share Card */}
                    <BlogShareFooter 
                      postSlug="how-i-choose-an-llm" 
                      readerTheme={readerTheme} 
                      onOpenShareModal={handleOpenShareModal} 
                      sharedCount={sharedCounts['how-i-choose-an-llm'] || 210} 
                    />
                      </>
                    )}

                  </div>
                </motion.article>
              )}
            </AnimatePresence>

            {/* Floating Social Share Action Button */}
            {selectedPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2"
              >
                <button
                  onClick={() => handleOpenShareModal('platforms')}
                  className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-700 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-cyan-950/40 hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95 border border-cyan-400/30 cursor-pointer"
                  title="Share this article on social media"
                >
                  <Share2 className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden sm:inline">Share Article</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-mono text-cyan-100">
                    🔥 {sharedCounts[selectedPost] || 120}
                  </span>
                </button>
              </motion.div>
            )}

            {/* Social Share Modal */}
            <AnimatePresence>
              {isShareModalOpen && selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-left my-8"
                  >
                    {/* Modal Header */}
                    <div className="p-6 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-slate-800 flex items-start justify-between">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
                          <Share2 className="w-3 h-3" />
                          <span>Share Knowledge & Growth</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          Share Essay with Your Network
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                          "{POST_SHARE_DATA[selectedPost]?.title || 'Blog Essay'}"
                        </p>
                      </div>

                      <button
                        onClick={() => setIsShareModalOpen(false)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Modal Navigation Tabs */}
                    <div className="flex border-b border-slate-800 bg-slate-950/50 p-2 gap-2 text-xs font-bold">
                      <button
                        onClick={() => setShareModalTab('platforms')}
                        className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          shareModalTab === 'platforms'
                            ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>1-Tap Platforms</span>
                      </button>

                      <button
                        onClick={() => setShareModalTab('hooks')}
                        className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          shareModalTab === 'hooks'
                            ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Quote className="w-3.5 h-3.5" />
                        <span>Viral Post Hooks</span>
                      </button>

                      <button
                        onClick={() => setShareModalTab('card')}
                        className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          shareModalTab === 'card'
                            ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Visual Quote Card</span>
                      </button>
                    </div>

                    {/* Tab 1: Platforms */}
                    {shareModalTab === 'platforms' && (
                      <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {/* LinkedIn */}
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl(selectedPost))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => incrementShareCount(selectedPost)}
                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0077b5]/15 hover:bg-[#0077b5]/30 border border-[#0077b5]/30 text-white font-bold text-xs transition-all cursor-pointer group"
                          >
                            <div className="p-2 rounded-xl bg-[#0077b5] text-white group-hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-extrabold text-white">LinkedIn</div>
                              <div className="text-[10px] text-cyan-300">Professional Post</div>
                            </div>
                          </a>

                          {/* Twitter / X */}
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(POST_SHARE_DATA[selectedPost]?.twitterText || '')}&url=${encodeURIComponent(getShareUrl(selectedPost))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => incrementShareCount(selectedPost)}
                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs transition-all cursor-pointer group"
                          >
                            <div className="p-2 rounded-xl bg-black border border-white/20 text-white group-hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                              </svg>
                            </div>
                            <div>
                              <div className="font-extrabold text-white">X / Twitter</div>
                              <div className="text-[10px] text-slate-400">Tweet Thread</div>
                            </div>
                          </a>

                          {/* WhatsApp */}
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent((POST_SHARE_DATA[selectedPost]?.whatsappText || '') + ' ' + getShareUrl(selectedPost))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => incrementShareCount(selectedPost)}
                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-white font-bold text-xs transition-all cursor-pointer group"
                          >
                            <div className="p-2 rounded-xl bg-emerald-600 text-white group-hover:scale-110 transition-transform">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-extrabold text-white">WhatsApp</div>
                              <div className="text-[10px] text-emerald-400">Team Chat</div>
                            </div>
                          </a>

                          {/* Telegram */}
                          <a
                            href={`https://t.me/share/url?url=${encodeURIComponent(getShareUrl(selectedPost))}&text=${encodeURIComponent(POST_SHARE_DATA[selectedPost]?.title || '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => incrementShareCount(selectedPost)}
                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-white font-bold text-xs transition-all cursor-pointer group"
                          >
                            <div className="p-2 rounded-xl bg-sky-500 text-white group-hover:scale-110 transition-transform">
                              <Send className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-extrabold text-white">Telegram</div>
                              <div className="text-[10px] text-sky-400">Group Channel</div>
                            </div>
                          </a>

                          {/* Reddit */}
                          <a
                            href={`https://www.reddit.com/submit?url=${encodeURIComponent(getShareUrl(selectedPost))}&title=${encodeURIComponent(POST_SHARE_DATA[selectedPost]?.title || '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => incrementShareCount(selectedPost)}
                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-white font-bold text-xs transition-all cursor-pointer group"
                          >
                            <div className="p-2 rounded-xl bg-orange-600 text-white group-hover:scale-110 transition-transform">
                              <ExternalLink className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-extrabold text-white">Reddit</div>
                              <div className="text-[10px] text-orange-400">r/programming</div>
                            </div>
                          </a>

                          {/* Web Share Native */}
                          {typeof navigator !== 'undefined' && 'share' in navigator && (
                            <button
                              onClick={() => {
                                navigator.share({
                                  title: POST_SHARE_DATA[selectedPost]?.title,
                                  text: POST_SHARE_DATA[selectedPost]?.quote,
                                  url: getShareUrl(selectedPost)
                                });
                                incrementShareCount(selectedPost);
                              }}
                              className="flex items-center gap-3 p-3.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-white font-bold text-xs transition-all cursor-pointer group"
                            >
                              <div className="p-2 rounded-xl bg-indigo-600 text-white group-hover:scale-110 transition-transform">
                                <Share2 className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-extrabold text-white">Native Share</div>
                                <div className="text-[10px] text-indigo-300">Device Sheet</div>
                              </div>
                            </button>
                          )}
                        </div>

                        {/* Direct Copy Link Bar */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                          <div className="truncate text-xs font-mono text-slate-400">
                            {getShareUrl(selectedPost)}
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(getShareUrl(selectedPost));
                              triggerToast('Article direct link copied to clipboard!');
                              incrementShareCount(selectedPost);
                            }}
                            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Viral Post Hooks */}
                    {shareModalTab === 'hooks' && (
                      <div className="p-6 space-y-5">
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Copy this pre-formatted social post hook directly to LinkedIn or X to maximize reader engagement:
                        </p>

                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto relative">
                          {POST_SHARE_DATA[selectedPost]?.linkedInText}
                          {'\n\n👉 Read full essay: ' + getShareUrl(selectedPost)}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              const fullText = (POST_SHARE_DATA[selectedPost]?.linkedInText || '') + '\n\n👉 Read full essay: ' + getShareUrl(selectedPost);
                              navigator.clipboard.writeText(fullText);
                              triggerToast('Viral post hook copied to clipboard!');
                              incrementShareCount(selectedPost);
                            }}
                            className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                            <span>Copy LinkedIn Hook Text</span>
                          </button>

                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl(selectedPost))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => incrementShareCount(selectedPost)}
                            className="py-3 px-4 rounded-xl bg-[#0077b5] hover:bg-[#005885] text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Open LinkedIn</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Visual Quote Card */}
                    {shareModalTab === 'card' && (
                      <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                            Select Card Style Theme:
                          </span>
                          <div className="flex gap-2">
                            {[
                              { id: 'midnight', name: 'Midnight', bg: 'bg-slate-900 border-cyan-500' },
                              { id: 'emerald', name: 'Emerald', bg: 'bg-emerald-950 border-emerald-500' },
                              { id: 'amber', name: 'Amber', bg: 'bg-amber-950 border-amber-500' },
                              { id: 'minimal', name: 'Ivory', bg: 'bg-slate-100 border-slate-400 text-slate-900' },
                            ].map(t => (
                              <button
                                key={t.id}
                                onClick={() => setQuoteCardTheme(t.id as any)}
                                className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                                  quoteCardTheme === t.id
                                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                                    : 'border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                {t.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Live Visual Card Preview */}
                        <div className={`p-6 sm:p-8 rounded-2xl border relative text-left overflow-hidden shadow-2xl transition-all duration-300 ${
                          quoteCardTheme === 'emerald'
                            ? 'bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900 border-emerald-500/30 text-emerald-100'
                            : quoteCardTheme === 'amber'
                              ? 'bg-gradient-to-br from-amber-950 via-slate-950 to-amber-900 border-amber-500/30 text-amber-100'
                              : quoteCardTheme === 'minimal'
                                ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border-slate-300 text-slate-900 shadow-xl'
                                : 'bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/60 border-cyan-500/30 text-white'
                        }`}>
                          <Quote className="w-10 h-10 text-cyan-500/20 absolute top-4 right-4" />
                          <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-500 mb-3">
                            BALA VENKATESH • ESSAYS & LESSONS
                          </div>
                          <p className="font-serif text-sm sm:text-base italic leading-relaxed mb-6 font-semibold">
                            "{POST_SHARE_DATA[selectedPost]?.quote}"
                          </p>
                          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                            <div>
                              <div className="font-extrabold">Bala Venkatesh</div>
                              <div className={`text-[10px] ${quoteCardTheme === 'minimal' ? 'text-slate-500' : 'text-slate-400'}`}>
                                Author of "{POST_SHARE_DATA[selectedPost]?.title}"
                              </div>
                            </div>
                            <div className="font-mono text-[10px] text-cyan-500 font-bold">
                              balavenkatesh3322.github.io/bala_venkatesh_profile
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => {
                              if (selectedPost && POST_SHARE_DATA[selectedPost]) {
                                exportQuoteCardAsPNG(POST_SHARE_DATA[selectedPost], quoteCardTheme);
                                triggerToast('Quote Card PNG downloaded!');
                                incrementShareCount(selectedPost);
                              }
                            }}
                            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Quote Card PNG</span>
                          </button>

                          <button
                            onClick={() => {
                              const quoteText = `"${POST_SHARE_DATA[selectedPost]?.quote}"\n\n— Bala Venkatesh, "${POST_SHARE_DATA[selectedPost]?.title}"\n${getShareUrl(selectedPost)}`;
                              navigator.clipboard.writeText(quoteText);
                              triggerToast('Quote text copied to clipboard!');
                              incrementShareCount(selectedPost);
                            }}
                            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4 text-cyan-400" />
                            <span>Copy Quote Text</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Toast Banner */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs shadow-2xl flex items-center gap-2 border border-cyan-300"
                >
                  <Check className="w-4 h-4" />
                  <span>{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
