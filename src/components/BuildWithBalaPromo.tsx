import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Sparkles, Brain, Cpu, Layers, Bookmark, Clock, ChevronRight } from 'lucide-react';
import WaterWaveEffect from './WaterWaveEffect';

interface FeaturedBlog {
  slug: string;
  title: string;
  category: string;
  series: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  emoji: string;
}

const FEATURED_BLOGS: FeaturedBlog[] = [
  {
    slug: 'thought-i-was-leading-assigning-tasks',
    title: 'I Thought I Was Leading. I Was Just Assigning Tasks.',
    category: 'Leadership',
    series: 'Leadership & Ownership',
    readTime: '6 min read',
    excerpt: 'A conversation with an engineer named Raju triggered a wake-up call about leadership vs task assignment. How shifting from execution steps to outcome ownership transforms teams.',
    tags: ['Leadership', 'Team Management', 'Ownership'],
    emoji: '👑'
  },
  {
    slug: 'building-something-people-trust',
    title: 'Building an App Is Easy Now. Building Something People Trust Is Hard.',
    category: 'Software Strategy',
    series: 'Engineering Mindset',
    readTime: '5 min read',
    excerpt: 'AI has dramatically reduced the cost of building, but not the cost of understanding. Discover why problem discovery, system design, and trust are the real value differentiators.',
    tags: ['AI Strategy', 'Product Engineering', 'System Design'],
    emoji: '🤝'
  },
  {
    slug: 'stopped-chasing-technologies',
    title: 'I Stopped Chasing Technologies. I Started Chasing Problems.',
    category: 'Career & Mindset',
    series: 'Engineering Mindset',
    readTime: '5 min read',
    excerpt: 'Every new framework felt like progress. But learning technology is not the same as creating value. Here is the realization that changed how I build.',
    tags: ['Career Growth', 'Problem Solving', 'Engineering'],
    emoji: '💡'
  }
];

export default function BuildWithBalaPromo() {
  const handleNavigateToLessons = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    window.location.hash = href;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="build-with-bala-promo" className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-950 text-white overflow-hidden border-b border-white/5 z-20">
      <WaterWaveEffect variant="dual" color="cyan" />

      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[-5%] w-[420px] h-[420px] bg-cyan-500/[0.04] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[420px] h-[420px] bg-indigo-500/[0.04] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-left flex flex-col gap-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Technical Blog & Mental Models
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Build with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400">Bala</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
              In-depth articles, evaluation structures, architectural playbooks, and mental models written by Bala Venkatesh to help engineering teams and founders navigate complex AI systems.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#lessons"
              onClick={(e) => handleNavigateToLessons(e, '#lessons')}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2.5 group cursor-pointer hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore All Blogs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* FEATURED BLOG CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {FEATURED_BLOGS.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={(e) => handleNavigateToLessons(e, `#lessons/post/${blog.slug}`)}
              className="group p-6 sm:p-7 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between gap-6 cursor-pointer border border-white/5 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Corner ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.03] rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-500 pointer-events-none" />

              <div className="flex flex-col gap-4 relative z-10">
                {/* Meta row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                    <span>{blog.emoji}</span>
                    <span>{blog.series}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {blog.readTime}
                  </span>
                </div>

                {/* Title & Excerpt */}
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Tags & Action CTA */}
              <div className="flex flex-col gap-4 pt-4 border-t border-white/5 relative z-10">
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-[9px] font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM PROMO BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-indigo-950/40 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm sm:text-base font-extrabold text-white">
                Want to level up your AI system architecture?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dive into the complete collection of articles, interactive code snippets, and mental frameworks inside Build with Bala.
              </p>
            </div>
          </div>

          <a
            href="#lessons"
            onClick={(e) => handleNavigateToLessons(e, '#lessons')}
            className="px-5 py-3 bg-white/10 hover:bg-cyan-500 hover:text-slate-950 border border-white/15 hover:border-cyan-400 rounded-xl text-xs font-bold text-white transition-all duration-300 shrink-0 flex items-center gap-2 cursor-pointer shadow-inner"
          >
            Check Out Blogs
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
