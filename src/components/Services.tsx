import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Brain, Code, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { servicesData } from '../data';
import WaterWaveEffect from './WaterWaveEffect';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Lightbulb,
  Brain,
  Code,
  Users,
};

// one colour per service; also used for the matching cube face
const COLORS = ['#22d3ee', '#818cf8', '#c084fc', '#fbbf24'];
const FACE_BG = [
  'linear-gradient(135deg,#0e7490,#164e63)',
  'linear-gradient(135deg,#4338ca,#1e1b4b)',
  'linear-gradient(135deg,#7e22ce,#3b0764)',
  'linear-gradient(135deg,#b45309,#451a03)',
];

/**
 * "What I do": a 3D cube turns to each service (one face per service) while the matching row
 * on the right lights up. Hover or tap a row to turn the cube to it. Stops for reduced motion.
 */
export default function Services() {
  const [active, setActive] = useState(0);
  const [spin, setSpin] = useState(0); // total quarter-turns, so the cube keeps turning one way
  const hoverRef = useRef(false);
  const ref = useRef<HTMLElement>(null);

  const goTo = (i: number) => {
    setActive(i);
    setSpin((s) => {
      const cur = ((s % 4) + 4) % 4;
      return s + ((i - cur + 4) % 4);
    });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting) {
        timer = window.setInterval(() => {
          if (hoverRef.current) return;
          setSpin((s) => s + 1);
          setActive((a) => (a + 1) % 4);
        }, 2600);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); window.clearInterval(timer); };
  }, []);

  const SIZE = 'var(--cube)';

  return (
    <section ref={ref} id="services" className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      <WaterWaveEffect variant="bottom-left" color="cyan" />
      <div className="absolute top-1/3 left-[15%] w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000" style={{ background: `${COLORS[active]}22` }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-14">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center flex flex-col items-center gap-4"
        >
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">What I do</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100 max-w-4xl leading-[1.1]">
            I turn hard problems into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-300">products people use</span>.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">Strategy, systems, models and the team behind them, from first idea to production.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* 3D cube */}
          <div className="relative flex items-center justify-center h-[300px] sm:h-[380px] [--cube:190px] sm:[--cube:240px]" style={{ perspective: '1000px' }}>
            {/* orbit rings */}
            <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px]" style={{ transform: 'rotateX(72deg)' }}>
              <div className="w-full h-full rounded-full border border-white/15 animate-[svc-orbit_18s_linear_infinite]">
                <span className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full transition-colors duration-700" style={{ background: COLORS[active], boxShadow: `0 0 14px ${COLORS[active]}` }} />
              </div>
            </div>
            <div className="absolute w-[230px] h-[230px] sm:w-[300px] sm:h-[300px] rounded-full border border-dashed border-white/10 animate-[svc-orbit_26s_linear_infinite_reverse]" />

            <div className="animate-[svc-float_6s_ease-in-out_infinite]" style={{ transformStyle: 'preserve-3d' }}>
              <div
                className="relative"
                style={{
                  width: SIZE,
                  height: SIZE,
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(-14deg) rotateY(${-spin * 90}deg)`,
                  transition: 'transform 1.1s cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              >
                {servicesData.map((srv, i) => {
                  const Icon = iconMap[srv.iconName] || Brain;
                  return (
                    <div
                      key={srv.id}
                      className="absolute inset-0 rounded-3xl border border-white/20 flex flex-col items-center justify-center gap-3 p-5 text-center"
                      style={{
                        background: FACE_BG[i],
                        transform: `rotateY(${i * 90}deg) translateZ(calc(${SIZE} / 2))`,
                        backfaceVisibility: 'hidden',
                        boxShadow: `inset 0 0 60px ${COLORS[i]}33`,
                        color: '#fff',
                      }}
                    >
                      <Icon className="w-12 h-12 sm:w-14 sm:h-14" style={{ color: COLORS[i], filter: `drop-shadow(0 0 12px ${COLORS[i]})` }} />
                      <span className="font-mono text-xs tracking-widest opacity-70" style={{ color: '#fff' }}>{srv.num}</span>
                      <span className="text-lg sm:text-xl font-black leading-tight" style={{ color: '#fff' }}>{srv.title}</span>
                    </div>
                  );
                })}
                {/* top and bottom caps */}
                <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg,#1e293b,#0f172a)', transform: `rotateX(90deg) translateZ(calc(${SIZE} / 2))` }} />
                <div className="absolute inset-0 rounded-3xl" style={{ background: '#020617', transform: `rotateX(-90deg) translateZ(calc(${SIZE} / 2))` }} />
              </div>
            </div>
            {/* floor glow */}
            <div className="absolute bottom-4 w-48 h-6 rounded-full blur-xl transition-colors duration-1000" style={{ background: `${COLORS[active]}55` }} />
          </div>

          {/* service rows */}
          <ol className="flex flex-col gap-3">
            {servicesData.map((srv, i) => {
              const Icon = iconMap[srv.iconName] || Brain;
              const on = active === i;
              return (
                <motion.li
                  key={srv.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => { hoverRef.current = true; goTo(i); }}
                    onMouseLeave={() => { hoverRef.current = false; }}
                    onClick={() => goTo(i)}
                    className={`w-full text-left flex items-start gap-4 p-5 rounded-2xl border transition-all duration-500 ${on ? 'bg-white/[0.06] translate-x-1' : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'}`}
                    style={{ borderColor: on ? `${COLORS[i]}88` : undefined, boxShadow: on ? `0 18px 40px -22px ${COLORS[i]}` : undefined }}
                  >
                    <span
                      className="w-11 h-11 shrink-0 rounded-xl border flex items-center justify-center transition-colors duration-500"
                      style={{ color: COLORS[i], borderColor: `${COLORS[i]}55`, background: on ? `${COLORS[i]}26` : `${COLORS[i]}0d` }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-lg font-bold text-slate-100 transition-colors duration-500" style={{ color: on ? COLORS[i] : undefined }}>{srv.title}</span>
                        <span className="text-xs font-mono text-slate-500 font-bold">{srv.num}</span>
                      </span>
                      <span className="block mt-1 text-sm text-slate-400 leading-relaxed">{srv.desc}</span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
            <li className="pt-3">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 glass-panel glass-panel-hover rounded-xl text-sm font-bold text-white">
                Start a conversation <ArrowRight className="w-4 h-4" />
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
