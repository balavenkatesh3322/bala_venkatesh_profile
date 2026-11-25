import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Compass, PenTool, Code2, Rocket, Users } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * "I'm strongest at building products end to end": the quote is the headline, and its five
 * phrases become a pipeline. While on screen, the stages light up in turn and the matching
 * phrase in the quote lights up with them.
 */
const STAGES = [
  {
    phrase: 'figuring out what to build',
    title: 'Decide what to build',
    proof: 'Find the AI win worth building, and the roadmap to ship it.',
    icon: Compass,
    color: '#22d3ee',
  },
  {
    phrase: 'designing it',
    title: 'Design it',
    proof: 'Architecture and product flow shaped around the real user.',
    icon: PenTool,
    color: '#818cf8',
  },
  {
    phrase: 'engineering it',
    title: 'Engineer it',
    proof: 'GenAI, RAG pipelines, agents and on-device ML.',
    icon: Code2,
    color: '#c084fc',
  },
  {
    phrase: 'deploying it',
    title: 'Deploy it',
    proof: 'Live in a Tier-1 bank, a clinic, and with 2M+ farmers.',
    icon: Rocket,
    color: '#f472b6',
  },
  {
    phrase: 'leading the team around it',
    title: 'Lead the team',
    proof: 'From first model to business outcome, with the team around it.',
    icon: Users,
    color: '#fbbf24',
  },
];

export default function EndToEnd() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // cycle the highlighted stage only while the section is visible
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(() => setActive((a) => (a + 1) % STAGES.length), 1700);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); window.clearInterval(timer); };
  }, []);

  const phrase = (i: number) => (
    <span
      className="transition-colors duration-500"
      style={{ color: active === i ? STAGES[i].color : undefined, textShadow: active === i ? `0 0 24px ${STAGES[i].color}66` : undefined }}
    >
      {STAGES[i].phrase}
    </span>
  );

  return (
    <section
      ref={ref}
      id="end-to-end"
      data-keep-dark
      className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden text-white border-b border-white/5 z-20 bg-[#05060d]"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(900px 420px at 50% 0%, rgba(99,102,241,0.18), transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-14">
        {/* the quote */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6 text-center"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-cyan-400">How Bala builds</span>
          <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] max-w-5xl mx-auto">
            I’m strongest at building products{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-400 to-amber-300">end to end</span>
            <span className="text-slate-300 font-semibold">
              : {phrase(0)}, {phrase(1)}, {phrase(2)}, {phrase(3)}, and {phrase(4)}.
            </span>
          </blockquote>
        </motion.figure>

        {/* the pipeline */}
        <div className="relative">
          {/* connecting line with a travelling glow (desktop) */}
          <div className="hidden lg:block absolute left-[10%] right-[10%] top-9 h-px bg-white/10 overflow-hidden">
            <div className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-[e2e-travel_3.4s_linear_infinite]" />
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              const on = active === i;
              return (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onMouseEnter={() => setActive(i)}
                  className={`relative flex flex-col items-center text-center gap-3 rounded-2xl p-5 border transition-all duration-500 ${
                    on ? 'bg-[#111322] -translate-y-1' : 'bg-[#0a0b14] border-white/10'
                  } ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                  style={{ borderColor: on ? `${s.color}88` : undefined, boxShadow: on ? `0 20px 50px -20px ${s.color}99` : undefined }}
                >
                  <span
                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500"
                    style={{ color: s.color, borderColor: `${s.color}66`, background: on ? `${s.color}26` : `${s.color}10` }}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#05060d] border border-white/15 text-[10px] font-mono font-bold flex items-center justify-center text-slate-300">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="text-base font-black" style={{ color: on ? s.color : '#fff' }}>{s.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-snug">{s.proof}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* close */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-slate-300">
            One person across the whole lifecycle, so <b className="text-white">nothing gets lost in the handoffs</b>.
          </p>
          <a
            href="https://wa.me/919003812808?text=Hi%20Bala%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20build%20a%20product%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-300 text-slate-950 font-bold text-sm hover:scale-[1.03] transition-transform"
          >
            Build your product with Bala <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
