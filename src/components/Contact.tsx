import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, Github, Youtube, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formspreeUrl = 'https://formspree.io/f/xknrpqkj';
    
    const bodyData = new FormData();
    bodyData.append('name', formData.name);
    bodyData.append('email', formData.email);
    bodyData.append('subject', formData.subject);
    bodyData.append('message', formData.message);

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        body: bodyData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact Form error:', error);
      setStatus('error');
    }
  };

  const socials = [
    { name: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/bala-venkatesh-67964247/', color: 'hover:bg-[#0077b5] text-[#0077b5] hover:text-white' },
    { name: 'GitHub', icon: Github, link: 'https://github.com/balavenkatesh3322', color: 'hover:bg-[#24292e] text-[#24292e] hover:text-white' },
    { name: 'Medium', icon: BookOpen, link: 'https://balavenkatesh.medium.com/', color: 'hover:bg-[#00ab6c] text-[#00ab6c] hover:text-white' },
    { name: 'YouTube', icon: Youtube, link: 'https://www.youtube.com/@balavenkatesh3322', color: 'hover:bg-[#ff0000] text-[#ff0000] hover:text-white' },
  ];

  return (
    <section id="contact" className="relative py-20 px-6 md:px-12 lg:px-24 bg-slate-950 overflow-hidden text-white border-b border-white/5">
      {/* Decorative Blur */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Text Info */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Contact
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100 leading-tight">
              Let's Build Something
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Remarkable
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have an challenging project in mind? Looking to integrate advanced AI pipelines, RAG frameworks, or agentic automation into your workflow? I'd love to chat.
          </p>

          {/* Details list */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex gap-4 items-center group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors duration-300">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest leading-none">Instant AI Solutions Hotline</div>
                <a href="https://wa.me/919003812808?text=Hi%20Bala%2C%20I%20am%20a%20CEO%2FFounder%20interested%20in%20discussing%20a%20freelance%20AI%20project%20with%20you!" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-bold text-emerald-300 hover:text-emerald-400 transition-colors mt-1 block">
                  +91 9003812808 (Instant Chat)
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-center group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none">Email</div>
                <a href="mailto:venkateshpnk22@gmail.com" className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors mt-1 block">
                  venkateshpnk22@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-center group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none">Phone</div>
                <a href="tel:+919003812808" className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors mt-1 block">
                  +91 9003812808
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-center group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none">Location</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                  India • Open to Remote
                </div>
              </div>
            </div>
          </div>

          {/* Socials buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Social Channels:</span>
            <div className="flex gap-2.5">
              {socials.map((soc) => {
                const SocIcon = soc.icon;
                return (
                  <a
                    key={soc.name}
                    href={soc.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 ${soc.color}`}
                    title={soc.name}
                  >
                    <SocIcon className="w-4.5 h-4.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl text-left"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={status === 'submitting'}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-sm transition-all focus:bg-slate-900 text-slate-200 disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    disabled={status === 'submitting'}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-sm transition-all focus:bg-slate-900 text-slate-200 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="AI Consulting Inquiry"
                  disabled={status === 'submitting'}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-sm transition-all focus:bg-slate-900 text-slate-200 disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Your Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  disabled={status === 'submitting'}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-sm transition-all focus:bg-slate-900 text-slate-200 resize-none disabled:opacity-50"
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs sm:text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message sent successfully! I will get back to you shortly.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs sm:text-sm font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Something went wrong. Please check your network and try again.</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-fit px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-lg hover:from-cyan-400 hover:to-indigo-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-slate-950" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
