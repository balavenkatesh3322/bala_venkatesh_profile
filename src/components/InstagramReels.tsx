import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

const PROFILE_URL = 'https://www.instagram.com/ai.with.bala/';

// Fallback list (newest first). The live list comes from public/reels.json, which the deploy
// workflow refreshes from the Instagram API every 6 hours (scripts/fetch-instagram-reels.mjs).
const FALLBACK_REELS = [
  'DfOW29ov1ar',
  'DfMw691PJjp',
  'DfMByx7P17K',
  'DfKGFIiPrdJ',
  'DfJ2dHJPqsK',
  'DfJROm0v_0L',
  'DfHRx0hPXdG',
  'DfGZKpVvwJc',
];

export default function InstagramReels() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [reels, setReels] = useState<string[]>(FALLBACK_REELS);

  useEffect(() => {
    let alive = true;
    const base = (import.meta as any).env?.BASE_URL ?? './';
    fetch(`${base}reels.json`, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const ids = Array.isArray(d?.reels) ? d.reels.filter((x: unknown) => typeof x === 'string' && /^[\w-]+$/.test(x)) : [];
        if (alive && ids.length) setReels(ids);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  const scrollBy = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: dir * Math.min(row.clientWidth * 0.9, 680), behavior: 'smooth' });
  };

  return (
    <section id="reels" className="relative py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5 z-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header: profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-[3px] rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600"
              aria-label="AI with Bala on Instagram"
            >
              <span className="flex w-16 h-16 rounded-full bg-slate-950 items-center justify-center font-black text-lg tracking-tight">
                BV
              </span>
            </a>
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
                AI in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400">
                  90 Seconds
                </span>
              </h2>
              <p className="mt-2 text-sm text-slate-400 font-mono">@ai.with.bala · daily AI reels</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous reels"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next reels"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 hover:brightness-110 transition"
            >
              <Instagram className="w-4 h-4" />
              Follow
            </a>
          </div>
        </motion.div>

        {/* Reels row: swipe on mobile, arrows on desktop. Each reel plays right here. */}
        <div
          ref={rowRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]"
        >
          {reels.map((id) => (
            <div
              key={id}
              className="group relative snap-start shrink-0 w-[260px] sm:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/*
                Instagram's embed shows the 9:16 reel inside a 4:5 box (starting 54px below its
                header), padding the sides with black. The video fills ~70.3% of the embed's width,
                so the iframe is made 1/0.703 = 143% of the card wide, centred, and shifted up past
                the header: the card then shows only the video, edge to edge.
              */}
              <iframe
                src={`https://www.instagram.com/reel/${id}/embed/`}
                title={`AI with Bala reel ${id}`}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                allowFullScreen
                scrolling="no"
                className="absolute border-0 max-w-none"
                style={{ width: '143%', left: '-21.5%', top: '-54px', height: 'calc(100% + 120px)' }}
              />
              <a
                href={`https://www.instagram.com/reel/${id}/`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open this reel on Instagram"
                className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center text-white opacity-80 hover:opacity-100 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
