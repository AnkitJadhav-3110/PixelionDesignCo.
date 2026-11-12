import { useParams, Link, useNavigate } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, Cpu, Compass, BookOpen } from 'lucide-react';
import { caseStudiesList, CaseStudy, pixelionProjects } from '../data/pixelionData';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';

interface CaseStudyDetailPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function CaseStudyDetailPage({ setCursorState, onOpenContact }: CaseStudyDetailPageProps) {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();

  // Find in caseStudiesList or generate fallback view from pixelionProjects
  let cs = caseStudiesList.find((item) => item.id === caseId);

  // If not found in primary 4 case studies, look up in pixelionProjects and generate structured view
  if (!cs) {
    const proj = pixelionProjects.find((p) => p.id === caseId);
    if (proj) {
      cs = {
        id: proj.id,
        title: proj.title,
        category: proj.category,
        subtitle: proj.subtitle,
        summary: proj.summary,
        heroImage: proj.heroImage,
        sections: {
          overview: proj.description,
          challenge: proj.challenge,
          visualDirection: proj.solution,
          uiDesign: `High-resolution design implementation for ${proj.title}.`,
          learnings: 'Consistent visual rules and clear hierarchy ensure seamless communication.',
        },
        deliverables: proj.keyDeliverables,
        toolsUsed: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator'],
      };
    }
  }

  if (!cs) {
    return (
      <div className="pt-32 pb-24 text-center max-w-xl mx-auto px-6">
        <SEOHead
          title="Case Study Not Found | Pixelion Design Co."
          description="The requested case study could not be located."
        />
        <h2 className="font-display font-black text-3xl text-[#2C3D6C] mb-4">
          Case Study Not Found
        </h2>
        <p className="font-sans-body text-sm text-[#46516A] mb-8">
          The requested case study could not be located.
        </p>
        <Link
          to="/case-studies"
          className="bg-[#E31E24] text-white px-6 py-3 rounded-full font-sans-body text-xs font-bold tracking-widest hover:bg-[#C81920] transition-colors"
        >
          BACK TO ALL CASE STUDIES
        </Link>
      </div>
    );
  }

  const currentIndex = caseStudiesList.findIndex((item) => item.id === cs?.id);
  const nextCase = caseStudiesList[(currentIndex + 1) % caseStudiesList.length];

  return (
    <div className="pt-28 pb-20">
      <SEOHead
        title={`${cs.title} Case Study | Pixelion Design Co.`}
        description={cs.summary}
      />
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-6 sm:mb-8">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 font-sans-body text-xs font-bold text-[#46516A] hover:text-[#E31E24] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO CASE STUDIES
        </Link>
      </div>

      {/* 2-Column Responsive Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto pb-10 sm:pb-14 border-b border-[#E2E6EE]">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-1/4 right-6 w-80 h-80 bg-[#E31E24]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-6 sm:w-8 h-[2px] bg-[#E31E24]" />
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                {cs.category}
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#2C3D6C] tracking-tight leading-[1.08] break-words">
              {cs.title}
            </h1>

            <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-[#46516A]">
              "{cs.subtitle}"
            </p>

            <p className="font-sans-body text-base sm:text-lg text-[#46516A] leading-relaxed max-w-2xl">
              {cs.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOpenContact}
                className="bg-[#E31E24] text-white px-6 sm:px-7 py-3.5 rounded-full font-cta text-xs font-bold tracking-widest hover:bg-[#C81920] transition-colors shadow-md inline-flex items-center gap-2"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'START' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <span>START SIMILAR PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/case-studies"
                className="border border-[#2C3D6C]/20 bg-white text-[#2C3D6C] px-6 py-3.5 rounded-full font-cta text-xs font-bold tracking-widest hover:border-[#2C3D6C] hover:text-[#E31E24] transition-colors inline-flex items-center gap-2"
              >
                <span>ALL CASE STUDIES</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#E2E6EE] flex flex-wrap items-center gap-3 font-mono text-[11px] sm:text-xs text-[#46516A]">
              <span className="text-[#2C3D6C] font-bold">Tools:</span>
              <span>{cs.toolsUsed.join(' • ')}</span>
            </div>
          </div>

          {/* Right Column: Genuine Case Study Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-white border border-[#E2E6EE] rounded-3xl p-3 sm:p-4 shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E31E24]/10 rounded-bl-3xl pointer-events-none" />

              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE]/80">
                <LazyImage
                  src={cs.heroImage}
                  alt={cs.title}
                  placeholderTone="light"
                  priority={true}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />

                {/* Floating Creative Overlay Tag */}
                <div className="absolute bottom-3 inset-x-3 bg-[#2C3D6C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src="/logo.svg" alt="" className="w-5 h-5 object-contain" />
                    <div>
                      <span className="font-display font-extrabold text-xs block leading-tight">
                        {cs.title}
                      </span>
                      <span className="font-mono text-[9px] text-[#FDFEFE]/80 uppercase">
                        CASE STUDY SPECIFICATION
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[#E31E24] bg-white px-2 py-0.5 rounded-md uppercase">
                    CONCEPT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Bar */}
      <section className="bg-[#FDFEFE] py-6 sm:py-8 border-b border-[#E2E6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-sans-body text-xs">
          <div>
            <strong className="font-mono text-[10px] text-[#E31E24] uppercase block mb-1">
              PROJECT NATURE
            </strong>
            <span className="text-[#2C3D6C] font-bold">Concept Design Exploration</span>
          </div>
          <div>
            <strong className="font-mono text-[10px] text-[#E31E24] uppercase block mb-1">
              DESIGN STUDIO
            </strong>
            <span className="text-[#2C3D6C] font-bold">Pixelion Design Co.</span>
          </div>
          <div>
            <strong className="font-mono text-[10px] text-[#E31E24] uppercase block mb-1">
              TOOLS UTILIZED
            </strong>
            <span className="text-[#2C3D6C] font-bold">{cs.toolsUsed.join(', ')}</span>
          </div>
          <div>
            <strong className="font-mono text-[10px] text-[#E31E24] uppercase block mb-1">
              LOCATION
            </strong>
            <span className="text-[#2C3D6C] font-bold">Bharuch, Gujarat</span>
          </div>
        </div>
      </section>

      {/* Case Study Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Sections */}
        <div className="lg:col-span-8 space-y-12">
          {/* Overview */}
          <div className="space-y-3">
            <h3 className="font-display font-extrabold text-2xl text-[#2C3D6C] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" /> Overview
            </h3>
            <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
              {cs.sections.overview}
            </p>
          </div>

          {/* Challenge */}
          <div className="space-y-3 pt-6 border-t border-[#E2E6EE]">
            <h3 className="font-display font-extrabold text-2xl text-[#2C3D6C] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" /> The Challenge
            </h3>
            <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
              {cs.sections.challenge}
            </p>
          </div>

          {/* Research / Discovery */}
          {cs.sections.research && (
            <div className="space-y-3 pt-6 border-t border-[#E2E6EE]">
              <h3 className="font-display font-extrabold text-2xl text-[#2C3D6C]">
                Research & Discovery
              </h3>
              <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
                {cs.sections.research}
              </p>
            </div>
          )}

          {/* User Flow & Wireframes */}
          {cs.sections.userFlow && (
            <div className="space-y-3 pt-6 border-t border-[#E2E6EE]">
              <h3 className="font-display font-extrabold text-2xl text-[#2C3D6C]">
                User Flow & Information Architecture
              </h3>
              <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
                {cs.sections.userFlow}
              </p>
            </div>
          )}

          {/* Visual Direction */}
          <div className="space-y-3 pt-6 border-t border-[#E2E6EE]">
            <h3 className="font-display font-extrabold text-2xl text-[#2C3D6C]">
              Visual Direction & Design Language
            </h3>
            <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
              {cs.sections.visualDirection}
            </p>
          </div>

          {/* UI Design / Implementation */}
          <div className="space-y-3 pt-6 border-t border-[#E2E6EE]">
            <h3 className="font-display font-extrabold text-2xl text-[#2C3D6C]">
              UI & Interface Design
            </h3>
            <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
              {cs.sections.uiDesign}
            </p>
          </div>

          {/* Learnings */}
          <div className="bg-white border border-[#E2E6EE] rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
            <h3 className="font-display font-extrabold text-xl text-[#E31E24]">
              Key Learnings & Retrospective
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
              {cs.sections.learnings}
            </p>
          </div>
        </div>

        {/* Sidebar Deliverables */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-[#E2E6EE] rounded-3xl p-8 space-y-6 shadow-2xs sticky top-28">
            <span className="font-mono text-xs font-bold text-[#E31E24] uppercase block border-b border-[#E2E6EE] pb-3">
              DELIVERABLES
            </span>

            <div className="space-y-3">
              {cs.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-sans-body font-bold text-[#2C3D6C]">
                  <CheckCircle2 className="w-4 h-4 text-[#E31E24]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E2E6EE] space-y-3">
              <button
                onClick={onOpenContact}
                className="w-full bg-[#E31E24] text-white py-3 rounded-full font-cta text-xs font-bold tracking-widest hover:bg-[#C81920] transition-colors"
              >
                REQUEST SIMILAR PROJECT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Next Case Study Navigation */}
      {nextCase && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 border-t border-[#E2E6EE]">
          <Link
            to={`/case-studies/${nextCase.id}`}
            className="group block bg-[#2C3D6C] text-[#FDFEFE] rounded-3xl p-6 sm:p-10 lg:p-12 hover:border-[#E31E24] border border-transparent transition-all"
          >
            <span className="font-mono text-xs text-white/70 uppercase block mb-2">
              NEXT CASE STUDY →
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white group-hover:translate-x-2 transition-transform break-words">
              {nextCase.title}
            </h3>
            <p className="font-serif italic text-sm text-white/80 mt-1">
              "{nextCase.subtitle}"
            </p>
          </Link>
        </section>
      )}
    </div>
  );
}
