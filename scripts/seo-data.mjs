/**
 * Single source of truth for SEO & sharing: the site, the person, every app, and the published
 * lessons (read straight from src/components/BalaLessons.tsx so new lessons are picked up).
 * Used by scripts/generate-seo.mjs (pages, sitemap, manifest) and scripts/generate-og.mjs (cards).
 */
import { readFileSync } from 'node:fs';

export const SITE = {
  url: 'https://balavenkatesh.is-a.dev',
  name: 'Bala Venkatesh',
  title: 'Bala Venkatesh | Lead AI Engineer & Enterprise Architect',
  description:
    'Lead AI Engineer at Standard Chartered Bank with 10+ years shipping production GenAI, RAG, multi-agent systems and on-device AI across banking, agritech and healthcare. Free 3D AI apps, lessons and reels.',
  themeColor: '#020617',
  locale: 'en_US',
  twitter: '@balavenkatesh22',
};

export const PERSON = {
  name: 'Bala Venkatesh',
  jobTitle: 'Lead AI Engineer',
  worksFor: 'Standard Chartered Bank',
  image: `${SITE.url}/images/Bala_profile_pic.jpg`,
  alumniOf: 'Teesside University',
  sameAs: [
    'https://www.linkedin.com/in/bala-venkatesh-67964247/',
    'https://github.com/balavenkatesh3322',
    'https://x.com/balavenkatesh22',
    'https://www.instagram.com/ai.with.bala/',
  ],
  knowsAbout: [
    'Generative AI', 'Retrieval-Augmented Generation', 'AI Agents', 'Multi-Agent Systems', 'LLMOps',
    'On-Device AI', 'TensorFlow Lite', 'Computer Vision', 'Natural Language Processing', 'Healthcare AI',
  ],
};

/** Every app in the Bala App Store. `preview` is a screenshot in public/previews/. */
export const APPS = [
  {
    slug: 'bala-app-store',
    name: 'Bala App Store',
    url: 'https://balavenkatesh3322.github.io/bala-ai-studio/',
    kicker: 'Main hub',
    pitch: "All of Bala's live AI apps, agents and repositories in one place.",
    description:
      "The Bala App Store: one hub for Bala Venkatesh's production AI apps, agents, LLM pipelines and open-source repositories, each with a live demo.",
    category: 'DeveloperApplication',
    keywords: ['AI apps', 'AI portfolio', 'open source AI', 'LLM apps'],
    preview: 'bala-app-store.jpg',
    accent: '#22d3ee',
  },
  {
    slug: 'agent-lab-3d',
    name: '3D Agent Lab',
    url: 'https://agentlab3d.vercel.app/',
    kicker: 'New · play it',
    pitch: 'Build an AI agent team, give it a mission and watch it plan, delegate and recover.',
    description:
      'A hands-on 3D lab: build a team of AI agent robots, give them a mission and watch them plan, delegate, use tools, remember and recover from mistakes. RAG, MCP, skills and guardrails, free in your browser.',
    category: 'EducationalApplication',
    keywords: ['AI agents', 'multi-agent', 'MCP', 'RAG', 'agent simulator', '3D'],
    preview: 'agentlab.jpg',
    accent: '#67e8f9',
  },
  {
    slug: 'agentdecode-3d',
    name: 'AgentDecode 3D',
    url: 'https://agentdecode.vercel.app/',
    kicker: 'Learn agents in 3D',
    pitch: 'Watch prompts, tool calls and agent hand-offs light up in 3D, one step at a time.',
    description:
      'An interactive 3D course on generative AI and agents: tokens, embeddings, prompting, tool calling, 22 RAG types, agent loops, workflow patterns, skills, subagents and MCP. Free, no sign-up.',
    category: 'EducationalApplication',
    keywords: ['generative AI course', 'AI agents', 'RAG', 'tool calling', 'MCP', '3D'],
    preview: 'agentdecode.jpg',
    accent: '#fcd34d',
  },
  {
    slug: 'neuraldecode-3d',
    name: 'NeuralDecode 3D',
    url: 'https://neuraldecode.vercel.app/',
    kicker: 'See inside models',
    pitch: 'Watch tensors flow through GPT, BERT, CLIP and Diffusion, layer by layer.',
    description:
      'An interactive 3D engine for neural networks: explore 18 architectures (GPT-2, BERT, ViT, CLIP, Whisper, DeepSeek-V3, ResNet, U-Net, Mamba, Diffusion and more) or import your own ONNX model.',
    category: 'EducationalApplication',
    keywords: ['neural network visualizer', 'transformer', 'LLM architecture', 'ONNX', '3D'],
    preview: 'neuraldecode.jpg',
    accent: '#c4b5fd',
  },
  {
    slug: 'throne-chess-3d',
    name: 'Throne Chess 3D',
    url: 'https://throne3dchess.vercel.app/',
    kicker: 'BV Games',
    pitch: 'Chess where every capture is a cinematic battle between medieval armies.',
    description:
      'Throne Chess 3D: battle chess in your browser. Life-size medieval armies, 6 battlegrounds, 5 character styles, 3 AI levels, 2-player and mobile. Every capture is a cinematic fight. Free.',
    category: 'GameApplication',
    game: true,
    keywords: ['3D chess', 'battle chess', 'browser game', 'chess game', 'free game'],
    preview: 'throne3dchess.jpg',
    accent: '#fbbf24',
  },
  {
    slug: 'open-llm-registry',
    name: 'Open LLM Registry',
    url: 'https://balavenkatesh3322.github.io/open-llm-registry/',
    kicker: 'Registry',
    pitch: 'Find, compare and run open-weight LLMs, with a VRAM calculator.',
    description:
      'A directory of open-weight LLMs with benchmarks, licences, context limits, a VRAM calculator and local setup guides for Ollama, vLLM and Hugging Face.',
    category: 'DeveloperApplication',
    keywords: ['open source LLM', 'LLM directory', 'VRAM calculator', 'Ollama', 'vLLM'],
    preview: 'open-llm-registry.jpg',
    accent: '#34d399',
  },
  {
    slug: 'awesome-developer-portfolio',
    name: 'Awesome Developer Portfolios',
    url: 'https://balavenkatesh3322.github.io/awesome-developer-porfolio/',
    kicker: '2,000+ portfolios',
    pitch: '2,000+ curated developer portfolios. Get inspired, or add yours.',
    description:
      'A curated catalog of 2,000+ developer portfolio websites with live previews. Find inspiration for your own portfolio or submit yours to get discovered.',
    category: 'DeveloperApplication',
    keywords: ['developer portfolio', 'portfolio examples', 'portfolio inspiration'],
    preview: 'awesome-portfolios.jpg',
    accent: '#818cf8',
  },
];

/** Published lessons parsed from BalaLessons.tsx (coming-soon posts are skipped). */
export function readLessons() {
  const src = readFileSync(new URL('../src/components/BalaLessons.tsx', import.meta.url), 'utf8');
  const series = {};
  for (const m of src.matchAll(/\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'/g)) series[m[1]] = m[2];
  const lessons = [];
  const re = /\{\s*slug:\s*'([^']+)',\s*title:\s*'((?:[^'\\]|\\.)+)',\s*seriesId:\s*'([^']+)',\s*category:\s*'([^']+)',\s*readTime:\s*'([^']+)',\s*date:\s*'([^']+)',\s*excerpt:\s*'((?:[^'\\]|\\.)+)',[\s\S]*?tags:\s*\[([^\]]*)\],\s*comingSoon:\s*(true|false)/g;
  for (const m of src.matchAll(re)) {
    if (m[9] === 'true') continue;
    const un = (s) => s.replace(/\\'/g, "'");
    lessons.push({
      slug: m[1],
      title: un(m[2]),
      series: series[m[3]] || m[3],
      category: m[4],
      readTime: m[5],
      date: m[6],
      excerpt: un(m[7]),
      tags: [...m[8].matchAll(/'([^']+)'/g)].map((t) => t[1]),
    });
  }
  return lessons;
}
