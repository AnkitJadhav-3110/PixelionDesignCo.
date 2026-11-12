import { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Dribbble, Instagram, Copy, Check, ArrowUpRight } from 'lucide-react';
import { UserSettings, CursorState } from '../types';

interface ContactSectionProps {
  userSettings: UserSettings;
  setCursorState: (state: CursorState) => void;
  onOpenContactDrawer: () => void;
}

export default function ContactSection({
  userSettings,
  setCursorState,
  onOpenContactDrawer,
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userSettings.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact"
      className="relative min-h-screen bg-[#2C3D6C] text-[#FDFEFE] py-24 sm:py-32 px-6 sm:px-10 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Accent Grid / Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E31E24]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full my-auto z-10">
        {/* Section Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-[2px] bg-[#E31E24]" />
          <span className="font-sans-body text-xs font-bold tracking-widest text-[#E31E24] uppercase">
            03 / LET'S WORK TOGETHER
          </span>
        </motion.div>

        {/* Big Two-line Headline Split by a Portrait Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-4xl min-[480px]:text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-none mb-12 break-words"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>LET'S WORK</span>
            {/* Split Inline Portrait Image */}
            <span className="inline-block relative w-16 h-10 sm:w-36 sm:h-20 lg:w-48 lg:h-24 rounded-full overflow-hidden border-2 border-white/20 align-middle shrink-0 shadow-2xl hover:scale-105 transition-transform duration-500">
              <img
                src={userSettings.footerPortraitUrl}
                alt="Portrait detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </span>
          </div>
          <div className="text-white/90">TOGETHER.</div>
        </motion.div>

        {/* Email Address Primary CTA & Drawer Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16 pt-6 border-t border-white/10"
        >
          {/* Email Click-To-Copy Button */}
          <button
            onClick={handleCopyEmail}
            className="group relative flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#E31E24] hover:bg-white/10 px-6 sm:px-8 py-4 sm:py-5 rounded-full transition-all duration-300 focus:outline-hidden max-w-full"
            onMouseEnter={() => setCursorState({ variant: 'copy', text: copied ? 'COPIED' : 'COPY' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            <span className="font-display text-base min-[400px]:text-xl sm:text-3xl font-extrabold text-[#FDFEFE] tracking-tight break-all">
              {userSettings.email}
            </span>
            <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#E31E24] flex items-center justify-center text-white transition-colors shrink-0">
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </div>
          </button>

          {/* Slide-In Form Panel CTA */}
          <button
            onClick={onOpenContactDrawer}
            className="bg-[#E31E24] hover:bg-[#C81920] text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full font-cta text-xs font-bold tracking-widest transition-all duration-300 flex items-center gap-3 shadow-lg group focus:outline-hidden"
            onMouseEnter={() => setCursorState({ variant: 'hover', text: 'INQUIRE' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            <span>SEND AN INQUIRY</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Repeated Social Icon Row & Local Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-white/10 text-[#FDFEFE]/70 font-sans-body text-xs"
        >
          {/* Social icons */}
          <div className="flex items-center gap-6">
            {[
              { name: 'GitHub', icon: Github, url: userSettings.socials.github },
              { name: 'X', icon: Twitter, url: userSettings.socials.twitter },
              { name: 'LinkedIn', icon: Linkedin, url: userSettings.socials.linkedin },
              { name: 'Dribbble', icon: Dribbble, url: userSettings.socials.dribbble },
              { name: 'Instagram', icon: Instagram, url: userSettings.socials.instagram },
            ].map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="hover:text-[#E31E24] transition-colors p-1 focus:outline-hidden"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: soc.name })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <soc.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Time & Availability */}
          <div className="flex items-center gap-4">
            <span>LOCATION: {userSettings.location}</span>
            <span>•</span>
            <span className="text-[#FDFEFE] font-semibold">AVAILABLE Q3/Q4</span>
          </div>
        </motion.div>
      </div>

      {/* Copyright Footer Line */}
      <div className="max-w-7xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans-body text-[11px] text-[#FDFEFE]/50 tracking-wider uppercase">
        <p>© 2026 {userSettings.name}. ALL RIGHTS RESERVED.</p>
        <p>EDITORIAL DESIGN & INTERACTIVE MOTION ENGINE</p>
      </div>
    </footer>
  );
}
