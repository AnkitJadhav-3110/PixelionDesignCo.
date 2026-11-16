import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import { caseStudiesList } from '../data/pixelionData';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';
import PreFooterBanner from '../components/PreFooterBanner';

interface CaseStudiesIndexPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function CaseStudiesIndexPage({ setCursorState, onOpenContact }: CaseStudiesIndexPageProps) {
  return (
    <div className="pb-20">
      <SEOHead
        title="Design Case Studies | Pixelion Design Co."
        description="In-depth design case studies highlighting problem solving, user experience, visual identity, and design execution."
      />

      {/* Cinematic Hero */}
      <PageHero
        gradientTheme="midnight-burgundy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]}
        badge="DESIGN RESEARCH & EXECUTION"
        title="Selected Case Studies &"
        highlightWord="Design Research"
        subtitle="Behind every finished identity and product is an intentional process of problem framing and craft."
        description="Explore deep dives into user research, wireframing, brand architectures, interactive prototypes, and production design across fintech, SaaS, and retail."
        primaryCTA={{
          label: 'Start a Similar Project',
          onClick: onOpenContact,
          isPrimary: true,
        }}
        secondaryCTA={{
          label: 'Explore Disciplines',
          href: '/services',
        }}
        supportingLogosTitle="METHODOLOGIES & RESEARCH DISCIPLINES"
        supportingLogos={[
          { name: 'User Empathy Research', accent: '#E31E24' },
          { name: 'Information Architecture' },
          { name: 'Interactive Wireframing' },
          { name: 'Design Systems' },
          { name: 'Production Hand-off' },
        ]}
      />

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
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#F3F5F9] p-2">
              <LazyImage
                src={cs.heroImage}
                alt={cs.title}
                placeholderTone="light"
                objectFit="contain"
                className="group-hover:scale-[1.03] transition-transform duration-700"
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
