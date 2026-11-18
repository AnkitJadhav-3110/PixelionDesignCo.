import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Monitor,
  Smartphone,
  Share2,
  Printer,
  Mail,
  Package,
  Code,
  Briefcase,
  Users,
  Award,
  Layers,
  Smile,
  Rocket,
  Star,
  Quote,
} from 'lucide-react';
import { pixelionProjects, trustedBrands } from '../data/pixelionData';
import { CursorState, Project } from '../types';
import CaseStudyModal from '../components/CaseStudyModal';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import TrustedByRibbon from '../components/TrustedByRibbon';
import PreFooterBanner from '../components/PreFooterBanner';
import TestimonialCarousel from '../components/TestimonialCarousel';
import PageHero from '../components/PageHero';

interface HomePageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function HomePage({ setCursorState, onOpenContact }: HomePageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Featured real Pixelion projects for Homepage Recent Projects row
  const recentProjects: Array<{
    id: string;
    title: string;
    category: string;
    image: string;
    tag: string;
    objectFit: 'cover' | 'contain';
    orientation: 'portrait' | 'square' | 'landscape';
  }> = [
    {
      id: 'pixelion-brand-identity',
      title: 'Pixelion Brand Identity',
      category: 'Branding',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.23_PM_1a129a33.jpeg',
      tag: 'Branding',
      objectFit: 'cover',
      orientation: 'landscape',
    },
    {
      id: 'ab-perfumes',
      title: 'AB Perfumes Packaging',
      category: 'Packaging',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.37_PM__1__f7955d9d.jpeg',
      tag: 'Packaging',
      objectFit: 'contain',
      orientation: 'square',
    },
    {
      id: 'snack-wagon-menu',
      title: 'Snack Wagon Food Menu',
      category: 'Print Design',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.21_PM__1__a93080cc.jpeg',
      tag: 'Print Design',
      objectFit: 'cover',
      orientation: 'landscape',
    },
    {
      id: 'easypay',
      title: 'Easy Pay Mobile UI/UX',
      category: 'UI/UX Design',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.35_PM__1__c40d6da4.jpeg',
      tag: 'UI/UX',
      objectFit: 'contain',
      orientation: 'landscape',
    },
    {
      id: 'gemini-redesign',
      title: 'Google Gemini UI Redesign',
      category: 'Web Design & UI/UX',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.36_PM__1__5a3335bb.jpeg',
      tag: 'Web Design UI/UX',
      objectFit: 'contain',
      orientation: 'landscape',
    },
    {
      id: 'starbucks-poster',
      title: 'Starbucks Campaign Visual',
      category: 'Social Media',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.57.01_PM_7638da18.jpeg',
      tag: 'Social Media Print Design',
      objectFit: 'contain',
      orientation: 'portrait',
    },
    {
      id: 'freshsip-branding',
      title: 'FreshSip Brand & Bottle',
      category: 'Branding & Packaging',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.36_PM_6836c314.jpeg',
      tag: 'Branding Packaging',
      objectFit: 'contain',
      orientation: 'landscape',
    },
    {
      id: 'choice-chaat-masala',
      title: 'Choice+ Masala Carton',
      category: 'Packaging',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.21_PM__2__e7360007.jpeg',
      tag: 'Packaging Print Design',
      objectFit: 'contain',
      orientation: 'portrait',
    },
  ];

  const filteredProjects = (
    activeFilter === 'All'
      ? recentProjects.slice(0, 4)
      : recentProjects.filter(
          (p) =>
            p.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
            p.tag.toLowerCase().includes(activeFilter.toLowerCase())
        )
  ).slice(0, 4);

  const homeServices = [
    {
      id: 'branding',
      title: 'Branding',
      desc: 'Build a strong identity that represents your brand perfectly.',
      icon: Compass,
      link: '/services/branding',
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      desc: 'Eye-catching visuals that communicate your message effectively.',
      icon: Monitor,
      link: '/services/graphic-design',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      desc: 'User-centered designs for web and mobile experiences that convert.',
      icon: Smartphone,
      link: '/services/ui-ux',
    },
    {
      id: 'social-media',
      title: 'Social Media Design',
      desc: 'Engaging content that boosts your brand presence online.',
      icon: Share2,
      link: '/services/social-media',
    },
    {
      id: 'print-packaging',
      title: 'Print Design',
      desc: 'Professional print materials that leave a lasting impression.',
      icon: Printer,
      link: '/services/print-packaging',
    },
    {
      id: 'invitations',
      title: 'Digital Invitations',
      desc: 'Beautiful digital invites for weddings, events & more.',
      icon: Mail,
      link: '/services/invitations',
    },
    {
      id: 'packaging',
      title: 'Packaging Design',
      desc: 'Creative packaging that protects your product and elevates your brand.',
      icon: Package,
      link: '/services/print-packaging',
    },
    {
      id: 'web-design',
      title: 'Web Design',
      desc: 'Modern, responsive websites that drive results for your business.',
      icon: Code,
      link: '/services/ui-ux',
    },
  ];

  return (
    <div className="pb-12">
      <SEOHead
        title="Pixelion Design Co. | Graphic Design, Branding & UI/UX Studio"
        description="Creative design studio in Bharuch, Gujarat offering branding, graphic design, UI/UX, social media, print, packaging, and digital invitations."
      />

      {/* 1. CINEMATIC HERO SECTION */}
      <PageHero
        gradientTheme="charcoal-crimson"
        eyebrow="WE DESIGN"
        title="Brands That"
        highlightWord="Inspire Trust."
        description="Creative design solutions that help your brand stand out, connect with your audience and grow your business."
        primaryCTA={{
          label: 'Explore Our Work',
          href: '/work',
        }}
        secondaryCTA={{
          label: 'Our Services',
          href: '/services',
        }}
        supportingContent={
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-6 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-lg">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white/80 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Client reviewer"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white/80 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Client reviewer"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white/80 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Client reviewer"
              />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-display font-bold text-xs sm:text-sm text-white">
                120+ Happy Clients Worldwide
              </div>
              <div className="font-mono text-[10px] text-white/75">
                ★ ★ ★ ★ ★ 5.0 Average Studio Rating
              </div>
            </div>
          </div>
        }
        supportingLogosTitle="TRUSTED BY 50+ BRANDS WORLDWIDE"
        supportingLogos={trustedBrands}
        onHoverCursor={(text) => setCursorState({ variant: 'hover', text })}
        onLeaveCursor={() => setCursorState({ variant: 'default' })}
      />

      {/* 3. "WHAT WE DO / Our Creative Services" (8-Card 4x2 Grid) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-2">
            WHAT WE DO
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight">
            Our Creative Services
          </h2>
          <p className="font-sans-body text-xs sm:text-sm text-[#46516A] mt-2.5 leading-relaxed">
            End-to-end design solutions tailored to your brand goals.
          </p>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {homeServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={service.link}
                className="bg-white border border-[#E2E6EE] hover:border-[#E31E24] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group text-center"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="font-sans-body text-xs text-[#46516A] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Centered CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border border-[#2C3D6C]/30 hover:border-[#2C3D6C] bg-white text-[#2C3D6C] hover:text-[#E31E24] px-7 py-3 rounded-full font-cta text-xs font-bold tracking-wider transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. "FEATURED WORK / Our Recent Projects" */}
      <section className="py-16 sm:py-20 bg-[#FDFEFE] border-y border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-2">
              FEATURED WORK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight">
              Our Recent Projects
            </h2>
          </div>

          {/* Category Filter Pills from Reference Mockup */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            {['All', 'Branding', 'Print Design', 'UI/UX', 'Social Media', 'Packaging', 'Web Design'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full font-sans-body text-xs font-bold transition-all ${
                  activeFilter === cat
                    ? 'bg-[#E31E24] text-white shadow-sm'
                    : 'bg-white border border-[#E2E6EE] text-[#46516A] hover:border-[#2C3D6C] hover:text-[#2C3D6C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Recent Projects Grid: 1 col mobile (320-767px), 2 col tablet/laptop, 4 col wide desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProjects.map((proj) => {
              const aspectClass =
                proj.orientation === 'portrait'
                  ? 'aspect-[4/5] md:aspect-[4/3]'
                  : proj.orientation === 'square'
                  ? 'aspect-square md:aspect-[4/3]'
                  : 'aspect-[4/3]';

              return (
                <article
                  key={proj.id}
                  onClick={() => {
                    const found = pixelionProjects.find((p) => p.id === proj.id);
                    if (found) setSelectedProject(found);
                  }}
                  className="bg-white border border-[#E2E6EE] hover:border-[#E31E24] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
                >
                  <div
                    className={`relative w-full ${aspectClass} overflow-hidden flex items-center justify-center ${
                      proj.objectFit === 'contain' ? 'bg-[#F3F5F9] p-2.5' : 'bg-[#2C3D6C]/5'
                    }`}
                  >
                    <LazyImage
                      src={proj.image}
                      alt={proj.title}
                      placeholderTone="light"
                      objectFit={proj.objectFit}
                      className={
                        proj.objectFit === 'contain'
                          ? 'transition-transform duration-500 group-hover:scale-[1.03]'
                          : 'transition-transform duration-700 group-hover:scale-105'
                      }
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex items-center justify-between gap-2 border-t border-[#E2E6EE]/80 bg-white">
                    <div className="min-w-0">
                      <h3 className="font-display font-extrabold text-sm text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors truncate">
                        {proj.title}
                      </h3>
                      <span className="font-mono text-[10px] text-[#46516A] uppercase block truncate mt-0.5">
                        {proj.category}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className="w-8 h-8 rounded-full border border-[#E2E6EE] bg-[#F7F9FC] text-[#2C3D6C] group-hover:bg-[#E31E24] group-hover:text-white group-hover:border-[#E31E24] flex items-center justify-center transition-colors shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Centered Red Button */}
          <div className="text-center mt-10 sm:mt-12">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 bg-[#E31E24] hover:bg-[#C81920] text-white px-8 py-3.5 rounded-full font-cta text-xs font-bold tracking-wider transition-colors shadow-md"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. "WHY CHOOSE US" Section (2-Column with 6-Stat Grid) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Paragraph, 5 Checkpoints, CTA */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block">
              — WHY CHOOSE US
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight leading-tight">
              Designing Ideas. <br className="hidden sm:inline" />
              <span className="text-[#E31E24]">Delivering Results.</span>
            </h2>
            <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
              We combine creativity, strategy and technology to deliver designs that not only look beautiful but also deliver real business impact.
            </p>

            {/* 5 Red Checkpoints */}
            <div className="space-y-3 pt-2">
              {[
                'Creative & Unique Ideas',
                'On-Time Delivery',
                'Affordable Pricing',
                'Unlimited Revisions',
                'Dedicated Support',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E31E24] text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-display font-bold text-xs sm:text-sm text-[#2C3D6C]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-[#2C3D6C]/30 hover:border-[#2C3D6C] bg-white text-[#2C3D6C] hover:text-[#E31E24] px-7 py-3 rounded-full font-cta text-xs font-bold tracking-wider transition-colors"
              >
                <span>More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 6 Stat Cards in 2x3 Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              { num: '250+', label: 'Projects Completed', icon: Briefcase },
              { num: '120+', label: 'Happy Clients', icon: Users },
              { num: '5+', label: 'Years Experience', icon: Award },
              { num: '20+', label: 'Industries Served', icon: Layers },
              { num: '100%', label: 'Client Satisfaction', icon: Smile },
              { num: '50+', label: 'Design Specialists', icon: Rocket },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white border border-[#E2E6EE] rounded-2xl p-5 sm:p-6 text-center hover:border-[#E31E24] transition-colors shadow-2xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] group-hover:text-[#E31E24] group-hover:bg-[#E31E24]/10 transition-colors flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#2C3D6C] tracking-tight">
                    {stat.num}
                  </div>
                  <div className="font-sans-body text-[11px] text-[#46516A] mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. "OUR PROCESS / Simple Steps, Great Results" (Dark Navy Background #2C3D6C) */}
      <section className="py-14 sm:py-20 bg-[#2C3D6C] text-white relative overflow-hidden">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E31E24]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E31E24]" />
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                OUR PROCESS
              </span>
            </div>
            <h2
              className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight"
              style={{ color: '#FFFFFF' }}
            >
              Simple Steps, Great Results
            </h2>
            <p className="font-sans-body text-xs sm:text-sm text-white/80 mt-2 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              A transparent, collaborative workflow designed to turn your brand vision into production-ready assets.
            </p>
          </div>

          {/* 5 Numbered Steps with Connecting Timeline Track */}
          <div className="relative">
            {/* Desktop Connecting Line behind step badges */}
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-[2px] bg-white/20 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6 relative z-10">
              {[
                {
                  num: '01',
                  title: 'Discover',
                  desc: 'We understand your needs, goals, and audience.',
                },
                {
                  num: '02',
                  title: 'Strategy',
                  desc: 'We research and plan the creative strategy.',
                },
                {
                  num: '03',
                  title: 'Concept',
                  desc: 'We craft distinctive concepts that inspire.',
                },
                {
                  num: '04',
                  title: 'Refine',
                  desc: 'We polish and iterate based on your feedback.',
                },
                {
                  num: '05',
                  title: 'Deliver',
                  desc: 'We deliver final files ready for production.',
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="flex flex-col items-center text-center group bg-white/5 sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-white/10 sm:border-transparent transition-all"
                >
                  {/* Step circle badge */}
                  <div className="w-12 h-12 rounded-full bg-white text-[#2C3D6C] font-display font-black text-base flex items-center justify-center mb-3.5 shadow-md group-hover:bg-[#E31E24] group-hover:text-white transition-all duration-300 z-10 ring-4 ring-[#2C3D6C]">
                    {step.num}
                  </div>

                  <h3
                    className="font-display font-bold text-base sm:text-lg text-white mb-1.5 transition-colors"
                    style={{ color: '#FFFFFF' }}
                  >
                    {step.title}
                  </h3>
                  <p className="font-sans-body text-xs text-white/75 leading-relaxed max-w-[200px]" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Carousel - 3-Card Desktop with Peeks & Video Support */}
      <TestimonialCarousel
        eyebrow="CLIENTS LOVE US"
        title="Testimonials"
        subtitle="Real feedback from founders and organizations who collaborated with Pixelion Design Co."
        onOpenContact={onOpenContact}
      />

      {/* 8. PRE-FOOTER BANNER */}
      <PreFooterBanner
        title="Ready to bring your"
        highlightWord="ideas"
        titleEnd="to life?"
        subtitle="Let's create something amazing together."
        buttonText="Get a Free Quote"
        buttonLink="/get-a-quote"
      />

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(next) => setSelectedProject(next)}
          onOpenContact={onOpenContact}
          setCursorState={setCursorState}
        />
      )}
    </div>
  );
}
