import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import { caseStudiesList } from '../data/pixelionData';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PreFooterBanner from '../components/PreFooterBanner';

interface CaseStudiesIndexPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function CaseStudiesIndexPage({ setCursorState, onOpenContact }: CaseStudiesIndexPageProps) {
  return (
    <div className="pt-28 pb-20">
      <SEOHead
        title="Design Case Studies | Pixelion Design Co."
        description="In-depth design case studies highlighting problem solving, user experience, visual identity, and design execution."
      />
      {/* 2-Column Responsive Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-10 sm:py-14 border-b border-[#E2E6EE]">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-1/3 right-6 w-80 h-80 bg-[#E31E24]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-6 sm:w-8 h-[2px] bg-[#E31E24]" />
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                PIXELION DESIGN CO. • CASE STUDIES
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#2C3D6C] tracking-tight leading-[1.1] break-words">
              Selected Case Studies & <span className="italic font-serif text-[#E31E24]">Design Research.</span>
            </h1>

            <p className="font-sans-body text-base sm:text-lg lg:text-xl text-[#46516A] leading-relaxed max-w-2xl">
              Behind every finished design is a process of understanding, exploration, and refinement. Discover detailed case studies across UI/UX digital products, brand identity systems, and visual communication.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOpenContact}
                className="bg-[#E31E24] text-white px-6 sm:px-7 py-3.5 rounded-full font-cta text-xs font-bold tracking-widest hover:bg-[#C81920] transition-colors shadow-md inline-flex items-center gap-2"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'START' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <span>START A SIMILAR PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/services"
                className="border border-[#2C3D6C]/20 bg-white text-[#2C3D6C] px-6 py-3.5 rounded-full font-cta text-xs font-bold tracking-widest hover:border-[#2C3D6C] hover:text-[#E31E24] transition-colors inline-flex items-center gap-2"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'SERVICES' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <span>VIEW DISCIPLINES</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="pt-4 border-t border-[#E2E6EE] flex flex-wrap items-center gap-3 font-mono text-[11px] sm:text-xs text-[#46516A]">
              <span className="text-[#2C3D6C] font-bold">In-Depth Process</span>
              <span>•</span>
              <span>Research • Wireframing • UI Systems</span>
              <span>•</span>
              <span className="text-[#E31E24] font-bold">Speculative Concepts & Visual Studies</span>
            </div>
          </motion.div>

          {/* Right Column: Genuine Case Study Flagship Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md bg-white border border-[#E2E6EE] rounded-3xl p-3 sm:p-4 shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E31E24]/10 rounded-bl-3xl pointer-events-none" />

              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE]/80">
                <LazyImage
                  src={caseStudiesList[0]?.heroImage || '/assets/concepts/ui-ux/uiux_mobile_concept.jpg'}
                  alt="Pixelion Design Co. — Flagship Concept Case Study"
                  priority={true}
                  placeholderTone="light"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />

                {/* Floating Creative Overlay Tag */}
                <div className="absolute bottom-3 inset-x-3 bg-[#2C3D6C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src="/logo.svg" alt="" className="w-5 h-5 object-contain" />
                    <div>
                      <span className="font-display font-extrabold text-xs block leading-tight">
                        {caseStudiesList[0]?.title || 'FLAGSHIP STUDY'}
                      </span>
                      <span className="font-mono text-[9px] text-[#FDFEFE]/80 uppercase">
                        UX CASE STUDY & DIGITAL WALLET
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[#E31E24] bg-white px-2 py-0.5 rounded-md uppercase">
                    FEATURED
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 space-y-12 sm:space-y-16">
        {caseStudiesList.map((cs, idx) => (
          <motion.div
            key={cs.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#E2E6EE] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 hover:border-[#E31E24] transition-all duration-300 shadow-xs group"
          >
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#2C3D6C]/5">
              <LazyImage
                src={cs.heroImage}
                alt={cs.title}
                placeholderTone="light"
                className="group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#2C3D6C] text-[#FDFEFE] px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider z-20">
                CASE STUDY 0{idx + 1}
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#E31E24] tracking-wider block mb-2">
                  {cs.category}
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#2C3D6C] mb-3 group-hover:text-[#E31E24] transition-colors break-words">
                  {cs.title}
                </h2>
                <p className="font-serif italic text-base text-[#46516A] mb-4">
                  "{cs.subtitle}"
                </p>
                <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed mb-6">
                  {cs.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-[#E2E6EE] flex items-center justify-between">
                <Link
                  to={`/case-studies/${cs.id}`}
                  className="bg-[#E31E24] text-white px-6 py-3 rounded-full font-cta text-xs font-bold tracking-widest hover:bg-[#C81920] transition-all inline-flex items-center gap-2"
                  onMouseEnter={() => setCursorState({ variant: 'hover', text: 'READ' })}
                  onMouseLeave={() => setCursorState({ variant: 'default' })}
                >
                  <span>READ FULL CASE STUDY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#46516A]">
                  <BookOpen className="w-3.5 h-3.5 text-[#E31E24]" />
                  <span>DEDICATED ARTICLE</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Case Studies Pre-Footer Banner */}
      <PreFooterBanner
        title="Inspired by Our"
        highlightWord="Case Studies?"
        titleEnd=""
        subtitle="Let's build a measured, user-validated solution for your product or brand."
        buttonText="Get a Free Quote"
        buttonLink="/get-a-quote"
      />
    </div>
  );
}
