import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Search,
  Compass,
  PenTool,
  Code2,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Repeat,
  Eye,
  Layers,
  Smartphone,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';
import PreFooterBanner from '../components/PreFooterBanner';

interface ProcessPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function ProcessPage({ setCursorState, onOpenContact }: ProcessPageProps) {
  // 5 Stages of the Agency Workflow
  const processStages = [
    {
      num: '01',
      title: 'Discover',
      tagline: 'Understanding the Core',
      desc: "Understand the client's business, goals, audience, challenges, and expectations.",
      icon: Search,
      deliverables: ['Stakeholder Q&A', 'Audience Insights', 'Scope Definition'],
    },
    {
      num: '02',
      title: 'Strategise',
      tagline: 'Forming the Blueprint',
      desc: 'Define the project direction, creative approach, scope, priorities, and execution plan.',
      icon: Compass,
      deliverables: ['Moodboards & Direction', 'Visual Architecture', 'Milestone Roadmapping'],
    },
    {
      num: '03',
      title: 'Design',
      tagline: 'Crafting the System',
      desc: 'Develop concepts, layouts, visual systems, and creative directions aligned with the project objectives.',
      icon: PenTool,
      deliverables: ['Brand Collateral', 'High-Fidelity Layouts', 'Design System Foundations'],
    },
    {
      num: '04',
      title: 'Develop',
      tagline: 'Bringing It to Life',
      desc: 'Transform approved designs into responsive, functional, polished digital experiences.',
      icon: Code2,
      deliverables: ['Responsive Implementation', 'Interactive Details', 'Cross-Device Polish'],
    },
    {
      num: '05',
      title: 'Deliver & Refine',
      tagline: 'Launch & Handoff',
      desc: 'Review, test, refine, and prepare the final deliverables for handover or launch.',
      icon: CheckCircle2,
      deliverables: ['Asset Packages', 'Design Guidelines', 'Final Production Files'],
    },
  ];

  // 4 Principles for Quality & Attention to Detail
  const qualityPrinciples = [
    {
      title: 'Purposeful Design',
      desc: 'Every element serves a clear communication purpose. We avoid decorative clutter that distracts from your core message.',
      icon: Target,
    },
    {
      title: 'Responsive Experiences',
      desc: 'Designs must perform seamlessly across screens—from compact mobile devices to high-resolution desktop displays.',
      icon: Smartphone,
    },
    {
      title: 'Consistent Quality',
      desc: 'Disciplined grid alignments, harmonious color tokens, and typographic scale ensure a cohesive brand presence.',
      icon: Layers,
    },
    {
      title: 'Attention to Detail',
      desc: 'Micro-interactions, spacing precision, asset optimization, and rigorous review create enduring polish.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="pb-12">
      <SEOHead
        title="Our Process | Pixelion Design Co."
        description="Discover Pixelion Design Co.'s 5-stage agency design process: Discover, Strategise, Design, Develop, and Deliver & Refine."
        canonicalPath="/process"
      />

      {/* Cinematic Hero */}
      <PageHero
        gradientTheme="midnight-burgundy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Process' }]}
        badge="5-STAGE METHODOLOGY"
        title="A Clear Process."
        highlightWord="Creative Excellence"
        subtitle="Structured, thoughtful methodology that turns raw ideas into enduring design systems."
        description="We believe great design is not accidental. Discover our five-stage iterative framework engineered for transparency, collaboration, and high creative standards at every milestone."
        primaryCTA={{
          label: 'Start a Project',
          href: '/get-a-quote',
          isPrimary: true,
        }}
        secondaryCTA={{
          label: 'Explore Services',
          href: '/services',
        }}
        supportingLogosTitle="OUR 5-STAGE WORKFLOW MILESTONES"
        supportingLogos={[
          { name: '01 Discover', accent: '#E31E24' },
          { name: '02 Strategise' },
          { name: '03 Design' },
          { name: '04 Develop' },
          { name: '05 Deliver & Refine' },
        ]}
      />

      {/* SECTION 2: PROCESS OVERVIEW (Connected Visual Timeline / Step Grid) */}
      <section className="py-16 sm:py-24 bg-[#FDFEFE] border-y border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
            <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-2">
              HOW WE WORK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight mb-4">
              From First Conversation to Final Delivery
            </h2>
            <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
              Every project follows a structured workflow designed to maintain clarity, collaboration, and high creative standards at each milestone.
            </p>
          </div>

          {/* Process Timeline: Horizontal on Desktop, Vertical Sequence on Mobile */}
          <div className="relative">
            {/* Desktop Horizontal Connecting Line */}
            <div className="hidden lg:block absolute top-12 left-12 right-12 h-[2px] bg-gradient-to-r from-[#2C3D6C]/20 via-[#E31E24]/40 to-[#2C3D6C]/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
              {processStages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.num}
                    className="bg-white border border-[#E2E6EE] rounded-2xl p-6 sm:p-7 hover:border-[#E31E24] transition-all duration-300 shadow-2xs group flex flex-col justify-between"
                  >
                    <div>
                      {/* Stage Header with Number Badge and Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-xs font-black text-white bg-[#2C3D6C] px-3 py-1 rounded-full group-hover:bg-[#E31E24] transition-colors">
                          {stage.num}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] group-hover:text-[#E31E24] group-hover:bg-[#E31E24]/10 transition-colors flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Stage Title & Tagline */}
                      <h3 className="font-display font-extrabold text-xl text-[#2C3D6C] mb-1">
                        {stage.title}
                      </h3>
                      <div className="font-mono text-[10px] font-bold text-[#E31E24] uppercase tracking-wider mb-3">
                        {stage.tagline}
                      </div>

                      {/* Stage Description */}
                      <p className="font-sans-body text-xs text-[#46516A] leading-relaxed mb-5">
                        {stage.desc}
                      </p>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="pt-4 border-t border-[#E2E6EE] space-y-1.5">
                      {stage.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-[11px] font-sans-body text-[#46516A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COLLABORATION (2-Column Layout) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: AI-Generated Collaboration Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-[#E2E6EE] shadow-xl group bg-white p-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE]/80">
                <LazyImage
                  src="/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.35_PM_6b406127.jpeg"
                  alt="Expert Connect 5-Stage UX Process — Empathise, Define, Ideate, Design, Prototyping"
                  placeholderTone="light"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute bottom-3 inset-x-3 bg-[#2C3D6C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="font-display font-extrabold text-xs">
                    PARTNERSHIP IN PRACTICE
                  </span>
                  <span className="font-mono text-[9px] text-[#E31E24] bg-white px-2 py-0.5 rounded-md font-bold uppercase">
                    ALIGNMENT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Collaboration Principles */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                — HOW WE WORK TOGETHER
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight leading-[1.1]">
              Built Around Collaboration
            </h2>

            <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
              Design is strongest when it is treated as an open dialogue. Clear communication, thoughtful feedback, and shared decision-making ensure everyone stays aligned from initial brief to completion.
            </p>

            <div className="space-y-4 pt-2">
              {/* Block 1: Clear Communication */}
              <div className="bg-white border border-[#E2E6EE] rounded-2xl p-5 sm:p-6 hover:border-[#E31E24] transition-colors shadow-2xs">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#2C3D6C] mb-1">
                      Clear Communication
                    </h3>
                    <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
                      We share updates at every key phase so expectations remain transparent, discussions are timely, and goals stay aligned.
                    </p>
                  </div>
                </div>
              </div>

              {/* Block 2: Thoughtful Feedback */}
              <div className="bg-white border border-[#E2E6EE] rounded-2xl p-5 sm:p-6 hover:border-[#E31E24] transition-colors shadow-2xs">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center shrink-0 mt-0.5">
                    <Repeat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#2C3D6C] mb-1">
                      Thoughtful Feedback
                    </h3>
                    <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
                      Iterations are focused and constructive. Each revision sharpens the visual balance, tone, and practical impact of the work.
                    </p>
                  </div>
                </div>
              </div>

              {/* Block 3: Transparent Progress */}
              <div className="bg-white border border-[#E2E6EE] rounded-2xl p-5 sm:p-6 hover:border-[#E31E24] transition-colors shadow-2xs">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#2C3D6C] mb-1">
                      Transparent Progress
                    </h3>
                    <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
                      Milestones are defined upfront so you always understand where the project stands, what is next, and when deliverables will arrive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: QUALITY AND ATTENTION TO DETAIL */}
      <section className="py-16 sm:py-24 bg-[#FDFEFE] border-y border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
            <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-2">
              OUR STANDARDS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight mb-4">
              Every Detail Has a Purpose
            </h2>
            <p className="font-sans-body text-sm sm:text-base text-[#46516A] leading-relaxed">
              From initial layout concepts to final cross-screen review, we focus on usability, consistency, visual quality, and craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-[#E2E6EE] rounded-2xl p-6 sm:p-7 hover:border-[#E31E24] transition-colors shadow-2xs flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] group-hover:bg-[#E31E24]/10 group-hover:text-[#E31E24] transition-colors flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#2C3D6C] mb-2.5">
                      {item.title}
                    </h3>
                    <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2E6EE]/60 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24]" />
                    <span className="font-mono text-[10px] font-bold text-[#2C3D6C] uppercase">
                      STUDIO PRINCIPLE
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <PreFooterBanner
        title="Have an Idea?"
        highlightWord="Let's Make It"
        titleEnd="Happen."
        subtitle="We invite you to discuss your next project, explore creative directions, and discover how our structured workflow delivers results."
        buttonText="Let's Talk About Your Project"
        buttonLink="/contact"
      />
    </div>
  );
}
