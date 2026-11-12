import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { UserSettings, CursorState } from '../types';
import { capabilitiesList, clientLogos, experienceTimeline } from '../data/portfolioData';
import SkillCloud from './SkillCloud';
import CareerTimeline from './CareerTimeline';
import ResumeDownloadButton from './ResumeDownloadButton';

interface AboutSectionProps {
  userSettings: UserSettings;
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function AboutSection({
  userSettings,
  setCursorState,
  onOpenContact,
}: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 border-b border-[#E2E6EE] pb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-[2px] bg-[#E31E24]" />
          <span className="font-sans-body text-xs font-bold tracking-widest text-[#E31E24] uppercase">
            02 / ABOUT & PROFILE
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#2C3D6C] tracking-tight break-words">
          Dhruvrajsinh Rana
        </h2>
        <p className="font-sans-body text-sm sm:text-base text-[#46516A] mt-2 font-mono">
          Founder & Lead Designer at Pixelion Design Co. • Bharuch, Gujarat, India
        </p>
      </motion.div>

      {/* Main Philosophy & Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
        {/* Philosophy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <blockquote className="font-serif-expressive italic text-2xl sm:text-4xl lg:text-5xl text-[#2C3D6C] leading-tight mb-8 break-words">
            "{userSettings.philosophy}"
          </blockquote>

          <p className="font-sans-body text-base sm:text-lg text-[#46516A] leading-relaxed font-normal mb-8">
            {userSettings.bio}
          </p>

          <button
            onClick={onOpenContact}
            className="bg-[#E31E24] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-widest hover:bg-[#C81920] transition-all duration-300 shadow-sm flex items-center gap-3 group"
            onMouseEnter={() => setCursorState({ variant: 'hover', text: 'LETS TALK' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            <span>DISCUSS A PROJECT WITH DHRUVRAJSINH</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Experience Overview Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 bg-white border border-[#E2E6EE] p-8 rounded-3xl shadow-xs"
        >
          <h3 className="font-sans-body text-xs font-bold tracking-widest text-[#46516A] uppercase mb-6">
            AT A GLANCE • DHRUVRAJSINH RANA
          </h3>

          <div className="space-y-5">
            <div className="pb-4 border-b border-[#E2E6EE]">
              <span className="font-sans-body text-[11px] font-bold text-[#E31E24] tracking-wider block">
                FOUNDER & CREATIVE DIRECTOR
              </span>
              <h4 className="font-display font-bold text-lg text-[#2C3D6C] mt-0.5">
                Pixelion Design Co.
              </h4>
              <p className="font-sans-body text-xs text-[#46516A] mt-0.5">
                Gujarat, India • Full Brand & UI/UX Agency
              </p>
            </div>

            <div className="pb-4 border-b border-[#E2E6EE]">
              <span className="font-sans-body text-[11px] font-bold text-[#E31E24] tracking-wider block">
                CERTIFIED CREDENTIALS
              </span>
              <h4 className="font-display font-bold text-base text-[#2C3D6C] mt-0.5">
                Teachnook UI/UX • CED Gujarat Entrepreneurship
              </h4>
              <p className="font-sans-body text-xs text-[#46516A] mt-0.5">
                Issued 2022 — 2023 • Credential TNINTC22-2961
              </p>
            </div>

            <div>
              <span className="font-sans-body text-[11px] font-bold text-[#E31E24] tracking-wider block">
                CORE SUITE
              </span>
              <p className="font-mono text-xs text-[#46516A] mt-1">
                Figma • Photoshop • Illustrator • CorelDRAW • InDesign • After Effects
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Framer Motion Skill Cloud */}
      <SkillCloud setCursorState={setCursorState} />

      {/* Professional Career Timeline */}
      <CareerTimeline setCursorState={setCursorState} />

      {/* Geometric Balance Resume Download Button */}
      <ResumeDownloadButton userSettings={userSettings} setCursorState={setCursorState} />

      {/* Capabilities / Services Grid */}
      <div className="mb-24">
        <h3 className="font-sans-body text-xs font-bold tracking-widest text-[#46516A] uppercase mb-8">
          PIXELION DESIGN CO. • CAPABILITIES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilitiesList.map((cap) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-[#E2E6EE] p-8 rounded-2xl hover:border-[#E31E24]/60 hover:shadow-lg transition-all duration-300"
            >
              <span className="font-display text-sm font-extrabold text-[#E31E24] block mb-4">
                {cap.num}
              </span>
              <h4 className="font-display font-bold text-xl text-[#2C3D6C] mb-3">
                {cap.title}
              </h4>
              <p className="font-sans-body text-xs text-[#46516A] leading-relaxed font-normal">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Clients & Partners Grid */}
      <div>
        <h3 className="font-sans-body text-xs font-bold tracking-widest text-[#46516A] uppercase mb-8">
          DESIGN DISCIPLINES & BRAND SOLUTIONS
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {clientLogos.map((client, i) => (
            <div
              key={i}
              className="border border-[#E2E6EE] py-6 px-4 rounded-xl text-center bg-white hover:border-[#E31E24] transition-colors"
            >
              <span className="font-display font-extrabold text-xs sm:text-sm tracking-wider text-[#2C3D6C]">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
