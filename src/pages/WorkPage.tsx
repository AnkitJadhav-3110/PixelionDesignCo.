import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Users,
  Award,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { pixelionProjects } from '../data/pixelionData';
import { CursorState, Project } from '../types';
import CaseStudyModal from '../components/CaseStudyModal';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PreFooterBanner from '../components/PreFooterBanner';

interface WorkPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function WorkPage({ setCursorState, onOpenContact }: WorkPageProps) {
  const [activeTab, setActiveTab] = useState<string>('All Works');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterTabs = [
    'All Works',
    'Branding',
    'Print Design',
    'UI/UX Design',
    'Social Media',
    'Packaging',
    'Web Design',
    'Digital Invitations',
  ];

  // 12 Projects for the 4x3 Reference Grid
  const showcaseProjects = [
    {
      id: 'architectura',
      title: 'Brand Identity Design',
      category: 'Branding',
      filterGroup: 'Branding',
      image: '/assets/concepts/concept-brand-identity-01.webp',
      desc: 'Corporate stationery suite, gold foil monogram stamping, and executive collateral.',
    },
    {
      id: 'luna-leaf',
      title: 'Perfume Packaging',
      category: 'Packaging',
      filterGroup: 'Packaging',
      image: '/assets/concepts/concept-packaging-01.webp',
      desc: 'Frosted amber glass bottle, tactile debossed box, and botanicals label system.',
    },
    {
      id: 'swiss-type',
      title: 'Corporate Brochure',
      category: 'Print Design',
      filterGroup: 'Print Design',
      image: '/assets/concepts/concept-print-editorial-01.webp',
      desc: 'Architectural monograph, multi-page editorial spread, and grid typography.',
    },
    {
      id: 'easypay',
      title: 'Mobile App UI/UX',
      category: 'UI/UX Design',
      filterGroup: 'UI/UX Design',
      image: '/assets/concepts/concept-uiux-mobile-01.webp',
      desc: 'Modern dual smartphone screens for contactless payments and analytics.',
    },
    {
      id: 'social-campaign',
      title: 'Social Media Campaign',
      category: 'Social Media',
      filterGroup: 'Social Media',
      image: '/assets/concepts/concept-campaign-social-01.webp',
      desc: 'Curated 3-tile promotional Instagram campaign grid with bold typography.',
    },
    {
      id: 'food-flyer',
      title: 'Food Flyer Design',
      category: 'Print Design',
      filterGroup: 'Print Design',
      image: '/assets/concepts/concept-graphic-poster-01.webp',
      desc: 'High-contrast promotional flyer with modular geometric layout.',
    },
    {
      id: 'aether-analytics',
      title: 'E-commerce Website',
      category: 'Web Design',
      filterGroup: 'Web Design',
      image: '/assets/concepts/concept-uiux-dashboard-01.webp',
      desc: 'Responsive web application dashboard with telemetry metrics cards.',
    },
    {
      id: 'wedding-invite',
      title: 'Wedding Invitation',
      category: 'Digital Invitations',
      filterGroup: 'Digital Invitations',
      image: '/assets/concepts/concept-invitation-suite-01.webp',
      desc: 'Gold foil deckle-edge wedding stationery suite and custom wax seal.',
    },
    {
      id: 'aethel-lifestyle',
      title: 'Product Label Design',
      category: 'Packaging',
      filterGroup: 'Packaging',
      image: '/assets/concepts/concept-brand-identity-02.webp',
      desc: 'Bespoke lifestyle brand packaging, garment tags, and luxury gift boxes.',
    },
    {
      id: 'outdoor-banner',
      title: 'Outdoor Banner',
      category: 'Print Design',
      filterGroup: 'Print Design',
      image: '/assets/concepts/concept-creative-campaign-01.webp',
      desc: 'Large-scale advertising exhibition poster with sculptural geometry.',
    },
    {
      id: 'letterhead-design',
      title: 'Letterhead Design',
      category: 'Branding',
      filterGroup: 'Branding',
      image: '/assets/concepts/concept-visual-identity-details-01.webp',
      desc: 'Macro foil stamped stationery and Pantone color matching system.',
    },
    {
      id: 'restaurant-menu',
      title: 'Restaurant Menu',
      category: 'Print Design',
      filterGroup: 'Print Design',
      image: '/assets/concepts/concept-print-editorial-01.webp',
      desc: 'Editorial food menu layout with structured columns and warm typography.',
    },
  ];

  const filteredProjects =
    activeTab === 'All Works'
      ? showcaseProjects
      : showcaseProjects.filter((p) => p.filterGroup === activeTab);

  return (
    <div className="pt-24 sm:pt-28 pb-12">
      <SEOHead
        title="Portfolio & Work | Pixelion Design Co."
        description="Explore our creative design portfolio: Branding, UI/UX, Print, Packaging, Social Media, and Event Stationery in Bharuch, Gujarat."
        canonicalPath="/work"
      />

      {/* 1. HERO SECTION (Matching 05-case-study-reference.jpeg) */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Headline, Subtitle, 2 CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                OUR PORTFOLIO
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2C3D6C] tracking-tight leading-[1.08] break-words">
              Work That Speaks <br />
              <span className="text-[#E31E24]">Creativity & Results.</span>
            </h1>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#46516A] leading-relaxed max-w-xl">
              Explore our creative work that helps brands stand out, connect with their audience and achieve real success.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOpenContact}
                className="bg-[#E31E24] hover:bg-[#C81920] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-red-900/20 group"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'START' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/services"
                className="border border-[#2C3D6C]/30 hover:border-[#2C3D6C] bg-white text-[#2C3D6C] hover:text-[#E31E24] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'SERVICES' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg bg-white border border-[#E2E6EE] rounded-3xl p-3 sm:p-4 shadow-xl overflow-hidden group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE]/80">
                <LazyImage
                  src="/assets/concepts/concept-uiux-mobile-01.webp"
                  alt="Pixelion Design Co. — Digital Product & Portfolio Work"
                  priority={true}
                  placeholderTone="light"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute bottom-3 inset-x-3 bg-[#2C3D6C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="font-display font-extrabold text-xs">
                    FEATURED SHOWCASE
                  </span>
                  <span className="font-mono text-[9px] text-[#E31E24] bg-white px-2 py-0.5 rounded-md font-bold uppercase">
                    12 PROJECTS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER PILLS & 12-CARD SHOWCASE GRID (4x3) */}
      <section className="py-12 sm:py-16 border-t border-[#E2E6EE]/80 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Filter Bar with Sort Selector */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-2 rounded-full font-sans-body text-xs font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-[#E31E24] text-white shadow-sm'
                      : 'bg-white border border-[#E2E6EE] text-[#46516A] hover:border-[#2C3D6C] hover:text-[#2C3D6C]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#46516A] bg-white border border-[#E2E6EE] px-4 py-2 rounded-full cursor-pointer hover:border-[#2C3D6C]">
              <span>Latest</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 12-Card Showcase Grid (4x3 on large screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredProjects.map((proj) => (
              <div
                key={proj.title}
                onClick={() => {
                  const match = pixelionProjects.find((p) => p.id === proj.id) || pixelionProjects[0];
                  setSelectedProject(match);
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
        </div>
      </section>

      {/* 3. INTEGRATED STATS BAR (From 05-case-study-reference.jpeg) */}
      <section className="py-10 border-t border-[#E2E6EE]/80 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: '250+', label: 'Projects Completed', icon: Briefcase },
              { num: '120+', label: 'Happy Clients', icon: Users },
              { num: '5+', label: 'Years Experience', icon: Award },
              { num: '20+', label: 'Industries Served', icon: Layers },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white border border-[#E2E6EE] rounded-2xl p-5 text-center shadow-2xs hover:border-[#E31E24] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-display font-black text-2xl text-[#2C3D6C]">
                    {stat.num}
                  </div>
                  <div className="font-sans-body text-xs text-[#46516A] mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRE-FOOTER BANNER */}
      <PreFooterBanner
        title="Have a"
        highlightWord="Project"
        titleEnd="in Mind?"
        subtitle="Let's create something amazing together."
        buttonText="Get a Free Quote"
        buttonLink="/get-a-quote"
      />

      {/* Case Study Quick Preview Modal */}
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
