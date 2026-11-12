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
import { pixelionProjects } from '../data/pixelionData';
import { CursorState, Project } from '../types';
import CaseStudyModal from '../components/CaseStudyModal';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import TrustedByRibbon from '../components/TrustedByRibbon';
import PreFooterBanner from '../components/PreFooterBanner';
import TestimonialCarousel from '../components/TestimonialCarousel';

interface HomePageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function HomePage({ setCursorState, onOpenContact }: HomePageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Featured 4 projects for Homepage Recent Projects row
  const recentProjects = [
    {
      id: 'architectura',
      title: 'Brand Identity Design',
      category: 'Branding',
      image: '/assets/concepts/concept-brand-identity-01.webp',
      tag: 'Branding',
    },
    {
      id: 'luna-leaf',
      title: 'Premium Packaging',
      category: 'Packaging',
      image: '/assets/concepts/concept-packaging-01.webp',
      tag: 'Packaging',
    },
    {
      id: 'swiss-type',
      title: 'Corporate Brochure',
      category: 'Print Design',
      image: '/assets/concepts/concept-print-editorial-01.webp',
      tag: 'Print Design',
    },
    {
      id: 'easypay',
      title: 'Mobile App UI/UX',
      category: 'UI/UX Design',
      image: '/assets/concepts/concept-uiux-mobile-01.webp',
      tag: 'UI/UX',
    },
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? recentProjects
      : recentProjects.filter(
          (p) =>
            p.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
            p.tag.toLowerCase().includes(activeFilter.toLowerCase())
        );

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
    <div className="pt-24 sm:pt-28 pb-12">
      <SEOHead
        title="Pixelion Design Co. | Graphic Design, Branding & UI/UX Studio"
        description="Creative design studio in Bharuch, Gujarat offering branding, graphic design, UI/UX, social media, print, packaging, and digital invitations."
      />

      {/* 1. HERO SECTION (Matching 01-homepage-reference.jpeg) */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Bold Headline, Copy, 2 CTAs, Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                — WE DESIGN
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2C3D6C] tracking-tight leading-[1.08] break-words">
              Brands That <span className="text-[#E31E24]">Inspire Trust.</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#46516A] leading-relaxed max-w-xl">
              Creative design solutions that help your brand stand out, connect with your audience and grow your business.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/work"
                className="bg-[#E31E24] hover:bg-[#C81920] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-red-900/20 group"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'WORK' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/services"
                className="border border-[#2C3D6C]/30 hover:border-[#2C3D6C] bg-white text-[#2C3D6C] hover:text-[#E31E24] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'SERVICES' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <span>Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Social Proof Row: 3 Client Avatars + Text */}
            <div className="pt-6 border-t border-[#E2E6EE] flex items-center gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Client reviewer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Client reviewer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Client reviewer"
                />
              </div>
              <div>
                <div className="font-display font-bold text-xs sm:text-sm text-[#2C3D6C]">
                  120+ Happy Clients
                </div>
                <div className="font-sans-body text-[11px] text-[#46516A]">
                  Worldwide Trust Us
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Creative Visual Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg bg-white border border-[#E2E6EE] rounded-3xl p-3 sm:p-4 shadow-xl overflow-hidden group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE]/80">
                <LazyImage
                  src="/assets/concepts/concept-abstract-hero-01.webp"
                  alt="Pixelion Design Co. — Tactile Geometric Art Direction & Visual Concept"
                  priority={true}
                  placeholderTone="light"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />

                {/* Floating Creative Badge */}
                <div className="absolute bottom-3 inset-x-3 bg-[#2C3D6C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src="/logo.svg" alt="" className="w-5 h-5 object-contain" />
                    <div>
                      <span className="font-display font-extrabold text-xs block leading-tight">
                        STUDIO ART DIRECTION
                      </span>
                      <span className="font-mono text-[9px] text-[#FDFEFE]/80 uppercase">
                        TACTILE GEOMETRY • EST. 2023
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[#E31E24] bg-white px-2 py-0.5 rounded-md uppercase">
                    CONCEPT
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUSTED BY 250+ BRANDS WORLDWIDE RIBBON */}
      <TrustedByRibbon title="TRUSTED BY 250+ BRANDS WORLDWIDE" />

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

          {/* 4 Projects Row (4-col on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  const found = pixelionProjects.find((p) => p.id === proj.id);
                  if (found) setSelectedProject(found);
                }}
                className="bg-white border border-[#E2E6EE] hover:border-[#E31E24] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#2C3D6C]/5">
                  <LazyImage
                    src={proj.image}
                    alt={proj.title}
                    placeholderTone="light"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#E31E24] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 flex items-center justify-between border-t border-[#E2E6EE]/80">
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors">
                      {proj.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#46516A]/70 uppercase">
                      {proj.category}
                    </span>
                  </div>
                  <span className="text-[#E31E24] font-bold text-xs group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
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
          onOpenContact={onOpenContact}
          setCursorState={setCursorState}
        />
      )}
    </div>
  );
}
