import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, Cpu, Compass, BookOpen } from 'lucide-react';
import { caseStudiesList, CaseStudy, pixelionProjects } from '../data/pixelionData';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';

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
  const matchingProj = pixelionProjects.find((p) => p.id === cs?.id);

  return (
    <div className="pb-20">
      <SEOHead
        title={`${cs.title} Case Study | Pixelion Design Co.`}
        description={cs.summary}
      />

      {/* Cinematic Hero */}
      <PageHero
        gradientTheme="midnight-steel"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: cs.title },
        ]}
        badge={cs.category.toUpperCase()}
        title={cs.title}
        subtitle={cs.subtitle}
        description={cs.summary}
        primaryCTA={{
          label: 'Start Similar Project',
          onClick: onOpenContact,
          isPrimary: true,
        }}
        secondaryCTA={{
          label: 'All Case Studies',
          href: '/case-studies',
        }}
        supportingLogosTitle="DESIGN TOOLS & TECHNOLOGIES"
        supportingLogos={cs.toolsUsed.map((tool, idx) => ({
          name: tool,
          accent: idx === 0 ? '#E31E24' : undefined,
        }))}
      />

      {/* Meta Bar */}
      <section className="bg-[#FDFEFE] py-6 sm:py-8 border-b border-[#E2E6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-sans-body text-xs">
          <div>
            <strong className="font-mono text-[10px] text-[#E31E24] uppercase block mb-1">
              PROJECT NATURE
            </strong>
            <span className="text-[#2C3D6C] font-bold">
              {matchingProj?.conceptLabel || 'Studio Case Study'}
            </span>
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
          {/* Flagship Showcase Visual */}
          <div className="space-y-4">
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-[#E2E6EE] shadow-md bg-[#F3F5F9] p-2">
              <LazyImage
                src={cs.heroImage}
                alt={cs.title}
                placeholderTone="light"
                objectFit="contain"
                className="w-full h-full"
              />
            </div>
            {(() => {
              const extraGallery = matchingProj?.galleryImages?.filter((img) => img !== cs?.heroImage) || [];
              if (extraGallery.length === 0) return null;
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {extraGallery.map((img, i) => (
                    <div
                      key={`${cs.id}-extra-${i}`}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E2E6EE] bg-[#F3F5F9] p-1.5 shadow-2xs"
                    >
                      <LazyImage
                        src={img}
                        alt={`${cs.title} view ${i + 2}`}
                        placeholderTone="light"
                        objectFit="contain"
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

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
