import { useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
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
import { servicesData, ServiceDetail } from '../data/pixelionData';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PreFooterBanner from '../components/PreFooterBanner';

interface ServicesPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function ServicesPage({ setCursorState, onOpenContact }: ServicesPageProps) {
  const { serviceId } = useParams<{ serviceId?: string }>();
  const location = useLocation();

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

  return (
    <div className="pt-24 sm:pt-28 pb-12">
      <SEOHead
        title={
          activeService
            ? `${activeService.title} Services | Pixelion Design Co.`
            : 'Our Services | Pixelion Design Co.'
        }
        description="Comprehensive design services: Branding, Graphic Design, UI/UX, Social Media, Print, Digital Invitations, Packaging, Web & Mobile Design in Bharuch, Gujarat."
        canonicalPath={serviceId ? `/services/${serviceId}` : '/services'}
      />

      {/* 1. HERO SECTION (Matching 03-services-reference.jpeg) */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Breadcrumb, Headline, Paragraph, Red CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Breadcrumb */}
            <div className="font-mono text-xs text-[#46516A] flex items-center gap-2">
              <Link to="/" className="hover:text-[#E31E24]">Home</Link>
              <span>&gt;</span>
              <span className="text-[#E31E24] font-bold">
                {activeService ? activeService.title : 'Services'}
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2C3D6C] tracking-tight leading-[1.08] break-words">
              Our Services, <br />
              <span className="text-[#2C3D6C]">Your Brand's </span>
              <span className="text-[#E31E24]">Success</span>
            </h1>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#46516A] leading-relaxed max-w-xl">
              {activeService
                ? activeService.fullDesc
                : 'We create powerful design solutions that help your brand stand out, connect with your audience and drive real results.'}
            </p>

            <div className="pt-2">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2.5 bg-[#E31E24] hover:bg-[#C81920] text-white px-8 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 shadow-md group"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'QUOTE' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg bg-white border border-[#E2E6EE] rounded-3xl p-3 sm:p-4 shadow-xl overflow-hidden group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE]/80">
                <LazyImage
                  src="/assets/concepts/concept-uiux-dashboard-01.webp"
                  alt="Pixelion Design Co. — Multidisciplinary Design Studio Showcase"
                  priority={true}
                  placeholderTone="light"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute bottom-3 inset-x-3 bg-[#2C3D6C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="font-display font-extrabold text-xs">
                    PRODUCT & INTERFACE
                  </span>
                  <span className="font-mono text-[9px] text-[#E31E24] bg-white px-2 py-0.5 rounded-md font-bold uppercase">
                    SHOWCASE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
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

      {/* 3. COMBINED: "WHY CHOOSE US?" + "OUR DESIGN PROCESS" (From 03-services-reference.jpeg) */}
      <section className="py-16 sm:py-20 bg-[#FDFEFE] border-t border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-white border border-[#E2E6EE] rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Why Choose Us (approx 35%) */}
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

            {/* Right Column: Our Design Process 5-Step Timeline (approx 65%) */}
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
    </div>
  );
}
