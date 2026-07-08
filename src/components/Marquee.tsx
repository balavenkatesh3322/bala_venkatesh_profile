import React from 'react';

const marqueeItems = [
  'Generative AI',
  'NLP Engineering',
  'RAG Systems',
  'Computer Vision',
  'LangChain & LangGraph',
  'Azure Cloud',
  'MLOps Pipelines',
  'PyTorch Deep Learning',
  'Vector Databases',
  'Prompt Engineering',
  'crewAI & Multi-Agents',
  'Enterprise Security AI'
];

export default function Marquee() {
  // Triple the items to ensure seamless infinite looping on ultra-wide screens
  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="relative w-full py-4 bg-slate-900 border-y border-white/5 overflow-hidden select-none z-20">
      {/* Gradients on the side */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

      {/* Infinite scrolling track */}
      <div className="flex w-max gap-8 md:gap-16 items-center animate-[marquee_30s_linear_infinite]">
        {repeatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-wider font-semibold text-slate-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Injecting inline animation style for marquee just in case Tailwind doesn't have it natively */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33333%); }
        }
      `}</style>
    </div>
  );
}
