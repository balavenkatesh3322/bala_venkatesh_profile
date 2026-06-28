import React from 'react';
import { Download, BookOpen, Landmark, HeartPulse, Leaf, ShoppingCart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const domains = [
    { label: 'Banking', icon: Landmark, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { label: 'Healthcare', icon: HeartPulse, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { label: 'Agriculture', icon: Leaf, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'E-commerce', icon: ShoppingCart, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { label: 'Cybersecurity', icon: ShieldCheck, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  ];

  return (
    <section id="about" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Image Stack */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[360px] aspect-square"
          >
            {/* Soft decorative shadow behind main image */}
            <div className="absolute inset-4 bg-indigo-500/10 rounded-3xl blur-2xl"></div>

            {/* Main Image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <img
                src="https://balavenkatesh3322.github.io/bala_venkatesh_profile/images/bv2.jpeg"
                alt="Bala Venkatesh at work"
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/480x480/0d1230/ffffff?text=Bala+Venkatesh';
                }}
              />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 p-5 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-2xl shadow-xl text-slate-950 text-center border border-cyan-300/20 max-w-[130px] font-sans"
            >
              <div className="text-3xl font-black tracking-tight text-white leading-none">10+</div>
              <div className="text-[10px] uppercase tracking-wider text-cyan-100 font-mono font-bold mt-1.5 leading-tight">
                Years of Experience
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Text & Details */}
        <div className="lg:col-span-7 flex flex-col gap-5 text-left">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100 leading-tight">
            From Code to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Business Impact
            </span>
          </h2>

          <blockquote className="border-l-2 border-cyan-400 pl-4 py-1 my-2 text-base sm:text-lg italic font-medium text-slate-200">
            "I translate complex AI capabilities into tangible business value."
          </blockquote>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Over <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs font-semibold">10 years</span>, I've built AI systems across <span className="text-slate-200 font-medium">banking</span>, <span className="text-slate-200 font-medium">healthcare</span>, <span className="text-slate-200 font-medium">agriculture</span>, and <span className="text-slate-200 font-medium">e-commerce</span>, always focused on what actually moves the needle.
            Currently at <strong className="text-slate-100 font-bold">Standard Chartered Bank</strong> as an AI Engineer, pioneering <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs font-semibold">RAG-based security automation</span>. Also a technical author and open-source contributor.
          </p>

          {/* Core Domains */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Target Domains:</span>
            <div className="flex flex-wrap gap-2.5">
              {domains.map((dom) => {
                const IconComponent = dom.icon;
                return (
                  <div
                    key={dom.label}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${dom.color} transition-all duration-300 hover:scale-105`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {dom.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="https://balavenkatesh3322.github.io/bala_venkatesh_profile/Bala%20Venkatesh%20Resume.pdf"
              download="Bala_Venkatesh_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-xs text-slate-200"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Download Resume
            </a>
            <a
              href="https://balavenkatesh.medium.com/"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-xs text-slate-200"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" /> Read My Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
