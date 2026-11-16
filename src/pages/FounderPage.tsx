import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Compass,
  Layers,
  Code2,
  CheckCircle2,
  Lightbulb,
  Target,
  Eye,
  ExternalLink,
  Linkedin,
  Instagram,
  Download,
} from 'lucide-react';
import { studioInfo } from '../data/pixelionData';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';
import PreFooterBanner from '../components/PreFooterBanner';
import WhatsAppIcon from '../components/WhatsAppIcon';

interface FounderPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function FounderPage({ setCursorState, onOpenContact }: FounderPageProps) {
  // Section 3: Four Creative Philosophies
  const creativePhilosophies = [
    {
      title: 'Clarity Before Complexity',
      desc: 'Good design makes information easier to understand. We strip away visual noise so the core message can communicate with effortless confidence.',
      icon: Lightbulb,
    },
    {
      title: 'Purpose Behind Every Detail',
      desc: 'Every visual decision—from typographic scale to negative space—should contribute meaningfully to the overarching user experience.',
      icon: Target,
    },
    {
      title: 'Creativity With Direction',
      desc: 'Visual exploration is vital, but creative ideas must always anchor back to the brand’s practical goals and communication objectives.',
      icon: Compass,
    },
    {
      title: 'Function Meets Aesthetics',
      desc: 'A digital experience must look beautiful and operate seamlessly. Aesthetics attract attention, but effortless utility builds enduring trust.',
      icon: Layers,
    },
  ];

  // Section 4: What Drives Pixelion (Creative Intent)
  const studioDrives = [
    {
      title: 'Curiosity and Exploration',
      desc: 'Exploring emerging digital patterns, materials, and typographic forms to craft work that feels contemporary yet timeless.',
    },
    {
      title: 'Continuous Improvement',
      desc: 'Iterating on design craft every single day, refining grid structures, typography hierarchy, and interaction fidelity.',
    },
    {
      title: 'Creative Experimentation',
      desc: 'Testing fresh visual directions and tactile contrasts to give every brand its own distinct identity.',
    },
    {
      title: 'User-Focused Thinking',
      desc: 'Keeping the real human experience at the heart of every interface, identity system, and printed piece.',
    },
  ];

  return (
    <div className="pb-12">
      <SEOHead
        title="Founder — Dhruvrajsinh Rana | Pixelion Design Co."
        description="Meet Dhruvrajsinh Rana, founder of Pixelion Design Co. Learn about his creative philosophy, vision for thoughtful design, and studio approach."
        canonicalPath="/founder"
      />

      {/* Editorial Light Hero */}
      <PageHero
        gradientTheme="ice-white"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: 'Founder' },
        ]}
        badge="STUDIO LEADERSHIP & DIRECTION"
        title="Dhruvrajsinh"
        highlightWord="Rana"
        subtitle="Founder & Creative Designer — Pixelion Design Co."
        description="Leading with graphic discipline, strategic empathy, and thoughtful digital craft. Helping ambitious brands communicate with clarity, authenticity, and enduring visual intent."
        primaryCTA={{
          label: 'Connect Directly',
          href: '/contact',
          isPrimary: true,
        }}
        secondaryCTA={{
          label: 'WhatsApp Chat',
          href: studioInfo.whatsapp,
          icon: <WhatsAppIcon className="w-4 h-4" />,
        }}
        supportingLogosTitle="ACCREDITATIONS & RECOGNITION"
        supportingLogos={[
          { name: 'CED Gujarat Certified', accent: '#E31E24' },
          { name: 'Red & White Multimedia' },
          { name: 'Canva Design Certified' },
          { name: '120+ Brands Launched' },
        ]}
      />

      {/* SECTION 2: FOUNDER INTRODUCTION (The Vision Behind Pixelion) */}
      <section className="py-16 sm:py-24 bg-[#FDFEFE] border-y border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Visual Brand Craftsmanship */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E2E6EE] shadow-xl group bg-white p-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE]/80">
                  <LazyImage
                    src="/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.22_PM_673b0254.jpeg"
                    alt="Pixelion Design Co. Stationery, Notebook & Brand Identity Craftsmanship"
                    placeholderTone="light"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 inset-x-3 bg-[#2C3D6C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                    <span className="font-display font-extrabold text-xs">
                      STUDIO FOUNDATION
                    </span>
                    <span className="font-mono text-[9px] text-[#E31E24] bg-white px-2 py-0.5 rounded-md font-bold uppercase">
                      VISION
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Founder Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                  — FOUNDER PERSPECTIVE
                </span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight leading-[1.1]">
                The Vision Behind Pixelion
              </h2>

              <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
                I founded Pixelion Design Co. from a conviction that great visual communication should never be complicated or purely decorative. It should be thoughtful, clear, and deeply aligned with the real-world goals of the business it represents.
              </p>

              <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
                Whether creating a brand identity system, designing a digital interface, or producing tangible print collateral, my focus is on harmonizing design and functionality. When those two elements work seamlessly together, the result is an experience that users remember and trust.
              </p>

              {/* Founder Social Links */}
              <div className="pt-4 flex items-center gap-3">
                <a
                  href={studioInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2C3D6C]/5 hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-xs font-bold text-[#2C3D6C]"
                  title="LinkedIn"
                >
                  in
                </a>
                <a
                  href={studioInfo.behance}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2C3D6C]/5 hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-xs font-bold text-[#2C3D6C]"
                  title="Behance"
                >
                  Bē
                </a>
                <a
                  href={studioInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2C3D6C]/5 hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-[#2C3D6C]"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={studioInfo.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2C3D6C]/5 hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-[#2C3D6C]"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CREATIVE PHILOSOPHY (4 Philosophy Cards) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-2">
            DESIGN THINKING
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight mb-4">
            How I Think About Design
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
            Four guiding principles that shape my creative process and inform every visual decision at Pixelion Design Co.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {creativePhilosophies.map((phil) => {
            const Icon = phil.icon;
            return (
              <div
                key={phil.title}
                className="bg-white border border-[#E2E6EE] rounded-2xl p-7 sm:p-8 hover:border-[#E31E24] transition-all duration-300 shadow-2xs group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] group-hover:bg-[#E31E24]/10 group-hover:text-[#E31E24] transition-colors flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-[#2C3D6C] mb-3">
                    {phil.title}
                  </h3>
                  <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
                    {phil.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E6EE]/60 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E31E24]" />
                  <span className="font-mono text-[10px] font-bold text-[#2C3D6C] uppercase">
                    CORE PRINCIPLE
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: WHAT DRIVES PIXELION (Editorial Text + AI-Generated Creative Imagery) */}
      <section className="py-16 sm:py-24 bg-[#FDFEFE] border-y border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Drives Text Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                  — CREATIVE PURPOSE
                </span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight leading-[1.1]">
                A Studio Built on Creative Intent
              </h2>

              <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
                Pixelion operates not as a high-volume factory, but as a deliberate creative partner. Every collaboration is fueled by curiosity, a commitment to craft, and genuine care for the end user.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {studioDrives.map((drive) => (
                  <div
                    key={drive.title}
                    className="bg-white border border-[#E2E6EE] rounded-2xl p-5 hover:border-[#E31E24] transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#E31E24] shrink-0" />
                      <h3 className="font-display font-bold text-sm text-[#2C3D6C]">
                        {drive.title}
                      </h3>
                    </div>
                    <p className="font-sans-body text-xs text-[#46516A] leading-relaxed">
                      {drive.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: AI-Generated Founder Creative Intent Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E2E6EE] shadow-xl group bg-white p-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE]/80">
                  <LazyImage
                    src="/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.37_PM_90866565.jpeg"
                    alt="Accessibility in UX Design — Research by Dhruvrajsinh Rana"
                    placeholderTone="light"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 inset-x-3 bg-[#2C3D6C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                    <span className="font-display font-extrabold text-xs">
                      CREATIVE EXPLORATION
                    </span>
                    <span className="font-mono text-[9px] text-[#E31E24] bg-white px-2 py-0.5 rounded-md font-bold uppercase">
                      INTENT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PERSONAL NOTE / CLOSING (Brand Statement) */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white border border-[#E2E6EE] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E31E24]/5 rounded-bl-full pointer-events-none" />

          <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-4">
            A PERSONAL NOTE
          </span>

          <blockquote className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#2C3D6C] tracking-tight leading-snug mb-6 max-w-2xl mx-auto">
            "Every meaningful project begins with an idea. My goal with Pixelion is to help transform those ideas into thoughtful, purposeful, and memorable digital experiences."
          </blockquote>

          <div className="inline-flex flex-col items-center">
            <span className="font-display font-bold text-base text-[#2C3D6C]">
              Dhruvrajsinh Rana
            </span>
            <span className="font-mono text-xs text-[#E31E24] font-medium">
              Founder, Pixelion Design Co.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <PreFooterBanner
        title="Let's Create Something"
        highlightWord="Meaningful."
        titleEnd=""
        subtitle="I invite you to reach out directly. Let's discuss your ideas, explore design solutions, and build something enduring together."
        buttonText="Start a Conversation"
        buttonLink="/contact"
      />
    </div>
  );
}
