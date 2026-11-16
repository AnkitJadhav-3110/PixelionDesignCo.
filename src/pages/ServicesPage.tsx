import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Monitor,
  Smartphone,
  Share2,
  Printer,
  Mail,
  Package,
  Code,
  Layout,
  FileText,
  CheckCircle2,
  Search,
  ClipboardList,
  PenTool,
  MessageSquare,
  Send,
  Sparkles,
  Clock,
  RotateCcw,
  DollarSign,
  Headphones,
} from 'lucide-react';
import { servicesData, pixelionProjects } from '../data/pixelionData';
import { CursorState, Project } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';
import PreFooterBanner from '../components/PreFooterBanner';
import CaseStudyModal from '../components/CaseStudyModal';

interface ServicesPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

const SERVICE_SHOWCASE_IDS: Record<string, string[]> = {
  branding: ['pixelion-brand-identity', 'ab-perfumes', 'freshsip-branding', 'shree-rang-creation'],
  'graphic-design': ['modique-poster', 'institutional-certificates', 'science-exhibition-banner', 'starbucks-poster'],
  'ui-ux': ['easypay', 'gemini-redesign', 'expert-connect', 'accessibility-ux'],
  'social-media': ['starbucks-poster', 'modique-poster', 'shree-shakti-kurta', 'gujarati-delights-menu'],
  'print-packaging': ['choice-chaat-masala', 'snack-wagon-menu', 'ashirwad-transport-billbook', 'dhruvis-creative-hub'],
  invitations: ['invitations-showcase', 'wedding-engagement-cards', 'vastupujan-traditional-cards', 'birthday-milestone-cards'],
};

export default function ServicesPage({ setCursorState, onOpenContact }: ServicesPageProps) {
  const { serviceId } = useParams<{ serviceId?: string }>();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const activeService = servicesData.find((s) => s.id === serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // 10 Creative Services from 03-services-reference.jpeg (5x2 Grid)
  const tenServices = [
    {
      id: 'branding',
      title: 'Branding',
      desc: 'Build a strong brand identity that represents your values and connects with your audience.',
      icon: Compass,
      link: '/services/branding',
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      desc: 'Eye-catching visuals that communicate your message effectively and creatively.',
      icon: Monitor,
      link: '/services/graphic-design',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      desc: 'User-centered design for web and mobile that ensures seamless experiences.',
      icon: Smartphone,
      link: '/services/ui-ux',
    },
    {
      id: 'social-media',
      title: 'Social Media Design',
      desc: 'Engaging posts and banners that boost your brand presence online.',
      icon: Share2,
      link: '/services/social-media',
    },
    {
      id: 'print-packaging',
      title: 'Print Design',
      desc: 'Brochures, flyers, posters and more that leave a lasting impression.',
      icon: Printer,
      link: '/services/print-packaging',
    },
    {
      id: 'invitations',
      title: 'Digital Invitations',
      desc: 'Beautiful digital invites for weddings, events and special occasions.',
      icon: Mail,
      link: '/services/invitations',
    },
    {
      id: 'packaging-design',
      title: 'Packaging Design',
      desc: 'Creative packaging that protects your product and elevates your brand.',
      icon: Package,
      link: '/services/print-packaging',
    },
    {
      id: 'web-design',
      title: 'Web Design',
      desc: 'Modern, responsive websites that are fast, functional and conversion-focused.',
      icon: Code,
      link: '/services/ui-ux',
    },
    {
      id: 'mobile-app-design',
      title: 'Mobile App Design',
      desc: 'Beautiful and intuitive interfaces for apps that users love to interact with.',
      icon: Layout,
      link: '/services/ui-ux',
    },
    {
      id: 'brochure-design',
      title: 'Brochure Design',
      desc: 'Professional brochures that communicate your message with clarity.',
      icon: FileText,
      link: '/services/print-packaging',
    },
  ];

  const featuredIds =
    (activeService && SERVICE_SHOWCASE_IDS[activeService.id]) || [
      'pixelion-brand-identity',
      'ab-perfumes',
      'easypay',
      'invitations-showcase',
    ];
  const showcaseProjects = featuredIds
    .map((id) => pixelionProjects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  return (
    <div className="pb-12">
      <SEOHead
        title={
          activeService
            ? `${activeService.title} Services | Pixelion Design Co.`
            : 'Our Services | Pixelion Design Co.'
        }
        description="Comprehensive design services: Branding, Graphic Design, UI/UX, Social Media, Print, Digital Invitations, Packaging, Web & Mobile Design in Bharuch, Gujarat."
        canonicalPath={serviceId ? `/services/${serviceId}` : '/services'}
      />

      {/* 1. CINEMATIC HERO SECTION */}
      <PageHero
        gradientTheme="midnight-steel"
        backgroundImage="/assets/aistudio/image_19b0d8df.png"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: activeService ? '/services' : undefined },
          ...(activeService ? [{ label: activeService.title }] : []),
        ]}
        eyebrow={activeService ? `SERVICE ${activeService.num} · ${activeService.title.toUpperCase()}` : 'SERVICES & CRAFT'}
        title={activeService ? activeService.heroHeading : "Our Services, Your Brand's"}
        highlightWord={activeService ? undefined : 'Success'}
        description={
          activeService
            ? activeService.fullDesc
            : 'We create powerful design solutions that help your brand stand out, connect with your audience and drive real results.'
        }
        primaryCTA={{
          label: 'Get a Free Quote',
          href: '/get-a-quote',
        }}
        secondaryCTA={{
          label: activeService ? 'View All Work' : 'Explore Categories',
          href: activeService ? '/work' : '/categories',
        }}
        supportingLogosTitle="CORE STUDIO DISCIPLINES"
        supportingLogos={[
          { name: 'BRANDING', subtitle: 'SYSTEMS', symbol: '✦' },
          { name: 'UI / UX', subtitle: 'DIGITAL', symbol: '●' },
          { name: 'PACKAGING', subtitle: 'PRINT', symbol: '◆' },
          { name: 'SOCIAL', subtitle: 'CREATIVES', symbol: '★' },
          { name: 'INVITES', subtitle: 'EVENTS', symbol: '▲' },
          { name: 'GRAPHICS', subtitle: 'EDITORIAL', symbol: '⬡' },
        ]}
        onHoverCursor={(text) => setCursorState({ variant: 'hover', text })}
        onLeaveCursor={() => setCursorState({ variant: 'default' })}
      />

      {/* 1B. SERVICE-SPECIFIC DELIVERABLES & REAL VISUAL SHOWCASE */}
      <section className="py-14 sm:py-20 bg-[#FDFEFE] border-t border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {activeService && (
            <div className="bg-white border border-[#E2E6EE] rounded-3xl p-6 sm:p-10 mb-12 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#E2E6EE]">
                <div>
                  <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-1">
                    INCLUDED DELIVERABLES
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[#2C3D6C]">
                    What We Craft in {activeService.title}
                  </h2>
                </div>
                <Link
                  to="/get-a-quote"
                  className="inline-flex items-center gap-2 bg-[#E31E24] hover:bg-[#C81920] text-white px-5 py-2.5 rounded-full font-cta text-xs font-bold tracking-wider transition-colors self-start md:self-auto"
                >
                  <span>{activeService.ctaText.replace('→', '').trim()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {activeService.servicesList.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-[#F7F9FC] border border-[#E2E6EE] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#2C3D6C]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E31E24] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Real Work Strip */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-1.5">
                {activeService ? `PORTFOLIO · ${activeService.title.toUpperCase()}` : 'SELECTED WORK SAMPLES'}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#2C3D6C] tracking-tight">
                {activeService ? `Recent ${activeService.title} Projects` : 'Real Studio Deliverables'}
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 font-cta text-xs font-bold text-[#E31E24] hover:underline"
            >
              <span>Browse Full Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-white border border-[#E2E6EE] hover:border-[#E31E24] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F5F9] p-1.5">
                  <LazyImage
                    src={proj.heroImage}
                    alt={proj.title}
                    placeholderTone="light"
                    objectFit={proj.aspect === '3:4' ? 'contain' : 'cover'}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#E31E24] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between gap-2 border-t border-[#E2E6EE]/80">
                  <div className="min-w-0">
                    <h3 className="font-display font-extrabold text-sm text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors truncate">
                      {proj.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#46516A] uppercase block truncate mt-0.5">
                      {proj.category}
                    </span>
                  </div>
                  <span className="text-[#E31E24] font-bold text-xs shrink-0">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. "WHAT WE OFFER / Our Creative Services" (10 Services in 5x2 Grid) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 border-t border-[#E2E6EE]/80">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-2">
            WHAT WE OFFER
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight">
            Our Creative Services
          </h2>
          <p className="font-sans-body text-xs sm:text-sm text-[#46516A] mt-2.5 leading-relaxed">
            From concept to creation, we deliver end-to-end design solutions tailored to your business needs.
          </p>
        </div>

        {/* 5x2 Grid (10 Services) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {tenServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white border border-[#E2E6EE] hover:border-[#E31E24] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group text-center"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-base text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="font-sans-body text-xs text-[#46516A] leading-relaxed mb-4">
                    {service.desc}
                  </p>
                </div>

                <Link
                  to={service.link}
                  className="font-sans-body text-xs font-bold text-[#E31E24] hover:underline inline-flex items-center justify-center gap-1 pt-3 border-t border-[#E2E6EE]/80"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. COMBINED: "WHY CHOOSE US?" + "OUR DESIGN PROCESS" */}
      <section className="py-16 sm:py-20 bg-[#FDFEFE] border-t border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-white border border-[#E2E6EE] rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Why Choose Us */}
            <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-[#E2E6EE] pb-8 lg:pb-0 lg:pr-8">
              <span className="font-mono text-xs font-bold text-[#2C3D6C] tracking-widest uppercase block">
                WHY CHOOSE US?
              </span>

              <div className="space-y-3.5 pt-2">
                {[
                  {
                    title: 'Creative & Unique Ideas',
                    desc: 'Original designs tailored to your brand.',
                    icon: Sparkles,
                  },
                  {
                    title: 'On-Time Delivery',
                    desc: 'We value your time and deliver on schedule.',
                    icon: Clock,
                  },
                  {
                    title: 'Unlimited Revisions',
                    desc: 'Your satisfaction is our top priority.',
                    icon: RotateCcw,
                  },
                  {
                    title: 'Affordable Pricing',
                    desc: 'Premium quality within your budget.',
                    icon: DollarSign,
                  },
                  {
                    title: 'Dedicated Support',
                    desc: "We're here to support you at every step.",
                    icon: Headphones,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-xs text-[#2C3D6C]">
                          {item.title}
                        </h4>
                        <p className="font-sans-body text-[11px] text-[#46516A]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Our Design Process 5-Step Timeline */}
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs font-bold text-[#2C3D6C] tracking-widest uppercase block text-center lg:text-left">
                OUR DESIGN PROCESS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
                {[
                  {
                    num: '01',
                    title: 'Discover',
                    desc: 'We understand your needs, goals and target audience.',
                    icon: Search,
                  },
                  {
                    num: '02',
                    title: 'Plan',
                    desc: 'We research and plan the best strategy for your brand.',
                    icon: ClipboardList,
                  },
                  {
                    num: '03',
                    title: 'Design',
                    desc: 'We create concepts that bring your ideas to life.',
                    icon: PenTool,
                  },
                  {
                    num: '04',
                    title: 'Review',
                    desc: 'We refine based on your feedback and suggestions.',
                    icon: MessageSquare,
                  },
                  {
                    num: '05',
                    title: 'Deliver',
                    desc: 'We deliver the final files ready for use and success.',
                    icon: Send,
                  },
                ].map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.num} className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center mb-2">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="w-5 h-5 rounded-full bg-[#E31E24] text-white font-mono text-[10px] font-bold flex items-center justify-center mb-2">
                        {step.num}
                      </span>
                      <h4 className="font-display font-bold text-xs text-[#2C3D6C] mb-1">
                        {step.title}
                      </h4>
                      <p className="font-sans-body text-[10px] text-[#46516A] leading-tight">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRE-FOOTER BANNER */}
      <PreFooterBanner
        title="Ready to bring your"
        highlightWord="ideas"
        titleEnd="to life?"
        subtitle="Let's create something amazing together."
        buttonText="Get a Free Quote"
        buttonLink="/get-a-quote"
      />

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
