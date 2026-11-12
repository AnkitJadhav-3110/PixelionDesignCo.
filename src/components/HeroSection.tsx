import { motion } from 'motion/react';
import { Instagram, Linkedin, ExternalLink, MessageCircle, ArrowDown } from 'lucide-react';
import { UserSettings, CursorState } from '../types';
import { studioInfo } from '../data/pixelionData';

interface HeroSectionProps {
  userSettings: UserSettings;
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function HeroSection({
  userSettings,
  setCursorState,
  onOpenContact,
}: HeroSectionProps) {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col justify-between overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left / Main Column: Kicker, Oversized Typography & Subhead */}
        <div className="lg:col-span-8 z-10 relative">
          {/* Kicker label line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[2px] bg-[#E31E24]" />
            <span className="font-sans-body text-xs sm:text-sm font-bold tracking-widest text-[#E31E24] uppercase italic">
              {userSettings.kicker}
            </span>
          </motion.div>

          {/* Oversized Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl min-[480px]:text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-[#2C3D6C] tracking-tight leading-[1.02] mb-8 break-words"
          >
            {userSettings.roleLine1}
            <br />
            <span className="font-serif-expressive italic font-normal text-[#E31E24] inline-block hover:scale-[1.02] transition-transform duration-300">
              {userSettings.roleLine2Serif}
            </span>
            <span className="font-display font-bold text-[#2C3D6C] text-3xl min-[480px]:text-4xl sm:text-6xl lg:text-7xl xl:text-8xl ml-1 sm:ml-4">
              {userSettings.roleLine2Suffix}
            </span>
          </motion.h1>

          {/* One-line subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans-body text-base sm:text-lg lg:text-xl text-[#46516A] max-w-2xl leading-relaxed mb-10 font-normal"
          >
            {userSettings.subhead}
          </motion.p>

          {/* CTA & Scroll Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <button
              onClick={scrollToWork}
              className="bg-[#E31E24] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-widest hover:bg-[#C81920] transition-all duration-300 shadow-md flex items-center gap-3 group"
              onMouseEnter={() => setCursorState({ variant: 'hover', text: 'EXPLORE' })}
              onMouseLeave={() => setCursorState({ variant: 'default' })}
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={onOpenContact}
              className="bg-[#FDFEFE] border border-[#2C3D6C]/30 hover:border-[#2C3D6C] text-[#2C3D6C] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-widest transition-all duration-300 hover:bg-[#2C3D6C]/5"
              onMouseEnter={() => setCursorState({ variant: 'hover', text: 'CONTACT' })}
              onMouseLeave={() => setCursorState({ variant: 'default' })}
            >
              GET IN TOUCH
            </button>
          </motion.div>
        </div>

        {/* Right / Offset Overlapping Portrait Image */}
        <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group cursor-pointer"
            onMouseEnter={() => setCursorState({ variant: 'hover', text: 'PORTRAIT' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            {/* Overlapping offset background aura */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#E31E24]/20 to-[#2C3D6C]/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Circular Portrait with offset shadow */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <img
                src={userSettings.portraitUrl}
                alt={userSettings.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Floating Badge overlay */}
            <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-0 bg-white/95 backdrop-blur-md border border-[#E2E6EE] py-2.5 px-4 rounded-2xl shadow-xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24] animate-ping" />
              <div>
                <p className="font-sans-body text-[10px] font-bold tracking-widest text-[#46516A] uppercase">
                  STATUS
                </p>
                <p className="font-sans-body text-xs font-bold text-[#2C3D6C]">
                  AVAILABLE FOR Q3/Q4
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Row: Minimal Social Icon Row & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="pt-12 mt-8 border-t border-[#E2E6EE] flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        {/* Social Minimal Line Icon Row */}
        <div className="flex items-center gap-6">
          <span className="font-sans-body text-xs font-bold text-[#46516A]/60 tracking-widest uppercase">
            CONNECT /
          </span>
          {[
            { name: 'Instagram', icon: Instagram, url: studioInfo.instagram },
            { name: 'LinkedIn', icon: Linkedin, url: studioInfo.linkedin },
            { name: 'Behance', icon: ExternalLink, url: studioInfo.behance },
            { name: 'WhatsApp', icon: MessageCircle, url: studioInfo.whatsapp },
          ].map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={soc.name}
              className="text-[#46516A] hover:text-[#E31E24] transition-colors p-1 focus:outline-hidden"
              onMouseEnter={() => setCursorState({ variant: 'hover', text: soc.name })}
              onMouseLeave={() => setCursorState({ variant: 'default' })}
            >
              <soc.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Location & Time Indicator */}
        <div className="flex items-center gap-4 text-xs font-sans-body font-bold text-[#46516A]/70">
          <span>{userSettings.location}</span>
          <span>•</span>
          <span className="tracking-wider">{userSettings.timezone}</span>
        </div>
      </motion.div>
    </section>
  );
}
