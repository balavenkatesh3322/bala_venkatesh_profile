import React from 'react';
import { BookOpen, ShoppingBag, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function Book() {
  return (
    <section id="book" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blob */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-10 text-left">
        {/* Header */}
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Published Author
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100 mt-2">
            My Book
          </h2>
        </div>

        {/* Book layout card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          {/* Cover on the left */}
          <div className="md:col-span-4 flex justify-center">
            <motion.a
              href="https://www.amazon.com/dp/B08BPB2KKK"
              target="_blank"
              rel="noreferrer"
              whileHover={{ rotate: -3, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative block w-[150px] sm:w-[170px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10 group cursor-pointer"
            >
              {/* Inner overlay lighting */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 relative z-10 pointer-events-none"></div>

              <img
                src="https://balavenkatesh3322.github.io/bala_venkatesh_profile/images/book%20front.jpeg"
                alt="Data-Driven Business Cover"
                className="w-full h-full object-cover relative z-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/180x240/1a56ff/ffffff?text=Data-Driven+Business';
                }}
              />
            </motion.a>
          </div>

          {/* Details on the right */}
          <div className="md:col-span-8 flex flex-col gap-4">
            {/* Meta tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Co-Author
              </span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                Data Science
              </span>
              <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider">
                Amazon Best Seller
              </span>
            </div>

            {/* Book title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-tight">
              Data-Driven Business
            </h3>

            {/* Book description */}
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Co-authored alongside <span className="text-cyan-400 font-semibold">23 global data science experts</span>.
              Provides practical, actionable insights on how businesses can successfully leverage, monetize, and scale value from their raw data assets.
            </p>

            {/* Collaboration details */}
            <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 w-fit">
              <Award className="w-4 h-4 text-yellow-400 shrink-0" />
              <p className="text-[11px] sm:text-xs text-slate-400">
                Co-authored with industry leaders from <strong className="text-slate-200">IBM, Siemens, and Hilton Hotels</strong>.
              </p>
            </div>

            {/* View on Amazon button */}
            <div className="pt-2">
              <a
                href="https://www.amazon.com/dp/B08BPB2KKK"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 hover:from-yellow-400 hover:to-amber-400 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 text-xs hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" /> View on Amazon
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
