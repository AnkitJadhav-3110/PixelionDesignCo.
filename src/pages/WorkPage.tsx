import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowUpRight,
  Briefcase,
  Users,
  Award,
  Layers,
  ChevronDown,
  Images,
} from 'lucide-react';
import { pixelionProjects } from '../data/pixelionData';
import { CursorState, Project } from '../types';
import CaseStudyModal from '../components/CaseStudyModal';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';
import PreFooterBanner from '../components/PreFooterBanner';

interface WorkPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  filterGroups: string[];
  image: string;
  objectFit: 'cover' | 'contain';
  orientation: 'portrait' | 'square' | 'landscape';
  featuredOrder: number;
  desc: string;
  galleryCount?: number;
}

export default function WorkPage({ setCursorState, onOpenContact }: WorkPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Works';
  const [activeTab, setActiveTab] = useState<string>(initialCategory);
  const [sortMode, setSortMode] = useState<'Latest' | 'Featured' | 'A–Z'>('Latest');
  const [sortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
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

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat && filterTabs.includes(paramCat)) {
      setActiveTab(paramCat);
    }
  }, [searchParams]);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'All Works') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', tab);
    }
    setSearchParams(searchParams, { replace: true });
  };

  // Curated showcase cards populated with real Pixelion Design Co. portfolio assets
  const showcaseProjects: ShowcaseItem[] = [
    {
      id: 'pixelion-brand-identity',
      title: 'Pixelion Design Co. Identity',
      category: 'Branding & Stationery',
      filterGroups: ['Branding', 'Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.45.02_PM_cf2a78a4.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 1,
      galleryCount: 5,
      desc: 'Master brand sheet, business cards, corporate letterhead, mailing envelopes & merchandise.',
    },
    {
      id: 'ab-perfumes',
      title: 'AB Perfumes Luxury Identity',
      category: 'Branding & Packaging',
      filterGroups: ['Branding', 'Packaging'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.37_PM__1__f7955d9d.jpeg',
      objectFit: 'contain',
      orientation: 'square',
      featuredOrder: 2,
      desc: 'Bespoke gold & matte obsidian monogram, perfume flacon, rigid box, blade sign & gift bag.',
    },
    {
      id: 'easypay',
      title: 'Easy Pay Mobile App UI/UX',
      category: 'UI/UX Design',
      filterGroups: ['UI/UX Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.35_PM__1__c40d6da4.jpeg',
      objectFit: 'contain',
      orientation: 'landscape',
      featuredOrder: 3,
      desc: 'UPI mobile wallet, scan-to-pay QR flows, and integrated daily life expense analytics.',
    },
    {
      id: 'gemini-redesign',
      title: 'Google Gemini UI Redesign',
      category: 'UI/UX & Web Design',
      filterGroups: ['UI/UX Design', 'Web Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.36_PM__1__5a3335bb.jpeg',
      objectFit: 'contain',
      orientation: 'landscape',
      featuredOrder: 4,
      desc: 'Cross-device mobile dark mode & minimal desktop conversational AI workspace exploration.',
    },
    {
      id: 'expert-connect',
      title: 'Expert Connect Healthcare UX',
      category: 'UI/UX & Web Design',
      filterGroups: ['UI/UX Design', 'Web Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.35_PM_6b406127.jpeg',
      objectFit: 'contain',
      orientation: 'landscape',
      featuredOrder: 5,
      desc: '5-stage UX methodology, specialist booking web portal & synchronized mobile screens.',
    },
    {
      id: 'freshsip-branding',
      title: 'FreshSip Beverage Identity',
      category: 'Branding & Packaging',
      filterGroups: ['Branding', 'Packaging'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.36_PM_6836c314.jpeg',
      objectFit: 'contain',
      orientation: 'landscape',
      featuredOrder: 6,
      galleryCount: 2,
      desc: 'Minimalist citrus slice logo mark, cold-pressed bottle label & dual-tone stationery.',
    },
    {
      id: 'choice-chaat-masala',
      title: 'Choice+ Chaat Masala Box',
      category: 'Packaging Design',
      filterGroups: ['Packaging', 'Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.21_PM__2__e7360007.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 7,
      desc: 'Retail 100gm FMCG spice carton packaging with bilingual callouts & side specs panel.',
    },
    {
      id: 'invitations-showcase',
      title: 'Custom Invitations Collection',
      category: 'Digital Invitations',
      filterGroups: ['Digital Invitations', 'Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.57.38_PM_b27bdadd.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 8,
      galleryCount: 6,
      desc: 'Wedding, Engagement, Vastupujan, Seemant, Mundan & Birthday invitation stationery showcase.',
    },
    {
      id: 'snack-wagon-menu',
      title: 'Snack Wagon Food Menu',
      category: 'Print Design',
      filterGroups: ['Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.21_PM__1__a93080cc.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 9,
      galleryCount: 2,
      desc: 'Two-sided table-tent food menu design with dish medallions and clear price columns.',
    },
    {
      id: 'starbucks-poster',
      title: 'Starbucks Campaign Poster',
      category: 'Social Media & Ad',
      filterGroups: ['Social Media', 'Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.57.01_PM_7638da18.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 10,
      desc: 'Commercial cold-coffee splash composite campaign poster for social & cafe walls.',
    },
    {
      id: 'modique-poster',
      title: 'MODIQUE Fashion Poster',
      category: 'Advertising & Print',
      filterGroups: ['Print Design', 'Social Media'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.57.00_PM__1__c09efeee.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 11,
      desc: 'Editorial ivory and champagne mall display poster for seasonal apparel promotions.',
    },
    {
      id: 'institutional-certificates',
      title: 'Institutional Certificates Suite',
      category: 'Print & Editorial',
      filterGroups: ['Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_9.25.50_PM__1__cb29287d.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 12,
      galleryCount: 5,
      desc: 'NMMSS Merit, Kala Mahakumbh, Khel Mahakumbh & Viksit Bharat award certificates.',
    },
    {
      id: 'shree-rang-creation',
      title: 'Shree Rang Boutique Rollout',
      category: 'Branding & Signage',
      filterGroups: ['Branding', 'Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_9.16.06_PM__1__69df060f.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 13,
      galleryCount: 3,
      desc: 'Boutique facade fascia signage, promotional poster & Gujarati visiting card.',
    },
    {
      id: 'ashirwad-transport-billbook',
      title: 'Ashirwad Transport Tax Invoice',
      category: 'Bill Book & Print',
      filterGroups: ['Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.43.51_PM_0e19fe53.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 14,
      desc: 'Structured GST tax invoice bill book for logistics & earthmoving contractor in Dahej.',
    },
    {
      id: 'dharvi-beauty-care',
      title: 'Dharvi Beauty Care Suite',
      category: 'Branding & Stationery',
      filterGroups: ['Branding', 'Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.03_PM_a4e560f4.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 15,
      desc: 'Blush-pink luxury salon invoice book paired with matte black & gold visiting cards.',
    },
    {
      id: 'accessibility-ux',
      title: 'Accessibility in UX Study',
      category: 'UI/UX & Web Design',
      filterGroups: ['UI/UX Design', 'Web Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.37_PM_90866565.jpeg',
      objectFit: 'contain',
      orientation: 'landscape',
      featuredOrder: 16,
      desc: 'Inclusive UX standards focused on WCAG visual clarity, ease, and reachability.',
    },
    {
      id: 'wedding-engagement-cards',
      title: 'Wedding & Sagai Cards',
      category: 'Digital Invitations',
      filterGroups: ['Digital Invitations'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.27_PM_5293278e.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 17,
      galleryCount: 5,
      desc: 'Floral watercolor wedding invites, burgundy Sagai Vidhi & custom wedding envelopes.',
    },
    {
      id: 'vastupujan-traditional-cards',
      title: 'Vastupujan & Sacred Invites',
      category: 'Digital Invitations',
      filterGroups: ['Digital Invitations'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.33_PM__1__5c0469f6.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 18,
      galleryCount: 7,
      desc: 'Gujarati Vastupujan, Mundan Sanskar Vidhi, Guru Purnima & cultural ceremony invitations.',
    },
    {
      id: 'birthday-milestone-cards',
      title: 'Birthday & Seemant Invites',
      category: 'Digital Invitations',
      filterGroups: ['Digital Invitations'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.26_PM__2__91be272f.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 19,
      galleryCount: 2,
      desc: 'First Birthday milestone card & traditional Gujarati Seemant Sanskar baby shower suite.',
    },
    {
      id: 'rang-creation-jewelry',
      title: 'Rang Creation by Ekta Card',
      category: 'Branding & Stationery',
      filterGroups: ['Branding'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.26_PM__1__b132eda8.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 20,
      desc: 'Wine red & gold luxury business card with integrated WhatsApp catalog QR code.',
    },
    {
      id: 'aspee-prayas-card',
      title: 'Aspee Prayas Business Card',
      category: 'Branding & Stationery',
      filterGroups: ['Branding'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.25_PM__1__dc030cb6.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 21,
      desc: 'Double-sided corporate card with agricultural machinery lineup for Bharuch distributor.',
    },
    {
      id: 'crafinex-stationery',
      title: 'Letterheads & Enterprise Cards',
      category: 'Branding & Stationery',
      filterGroups: ['Branding', 'Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.23_PM__1__96c1caef.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 22,
      galleryCount: 4,
      desc: 'Crafinex minimalist letterhead, Sahajanand Insurance & institutional stationery suite.',
    },
    {
      id: 'dhruvis-creative-hub',
      title: "Dhruvi's Creative Hub Standee",
      category: 'Banner & Exhibition',
      filterGroups: ['Print Design', 'Social Media'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.57.00_PM_aa188531.jpeg',
      objectFit: 'contain',
      orientation: 'portrait',
      featuredOrder: 23,
      desc: 'Roll-up retail standee showcase with multi-photo gifting grid for Zadeshwar studio.',
    },
    {
      id: 'furniture-sale-banner',
      title: 'Furniture Gallery Backdrop',
      category: 'Banner & Print Design',
      filterGroups: ['Print Design', 'Social Media'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.56.59_PM_9cda0e57.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 24,
      desc: 'Freestanding large-format exhibition backdrop with curved interior showcase.',
    },
    {
      id: 'shree-shakti-kurta',
      title: 'Shree Shakti Kurta Billboard',
      category: 'Outdoor Advertising',
      filterGroups: ['Print Design', 'Social Media'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_9.25.50_PM_28ec2ecb.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 25,
      galleryCount: 2,
      desc: 'High-impact street hoarding banner & business card for Kurta House in Zadeshwar.',
    },
    {
      id: 'science-exhibition-banner',
      title: 'Stage & Educational Banners',
      category: 'Event & Print Design',
      filterGroups: ['Print Design'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.02_PM__1__49961833.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 26,
      galleryCount: 2,
      desc: 'Ganit Vigyan Pradarshan & Kala Mahakumbh cultural auditorium backdrop banners.',
    },
    {
      id: 'gujarati-delights-menu',
      title: 'Gujarati Delights Lightbox',
      category: 'Food Signage & Print',
      filterGroups: ['Print Design', 'Social Media'],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-18_at_9.08.45_PM_3091c4a0.jpeg',
      objectFit: 'cover',
      orientation: 'landscape',
      featuredOrder: 27,
      desc: 'Illuminated bilingual snack menu wall display for cafe and street-food counters.',
    },
  ];

  const filteredProjects = (
    activeTab === 'All Works'
      ? showcaseProjects
      : showcaseProjects.filter((p) => p.filterGroups.includes(activeTab))
  )
    .slice()
    .sort((a, b) => {
      if (sortMode === 'A–Z') return a.title.localeCompare(b.title);
      if (sortMode === 'Featured') return a.featuredOrder - b.featuredOrder;
      return a.featuredOrder - b.featuredOrder;
    });

  return (
    <div className="pb-12">
      <SEOHead
        title="Portfolio & Work | Pixelion Design Co."
        description="Explore our creative design portfolio: Branding, UI/UX, Print, Packaging, Social Media, Certificates, Banners, Menus, and Event Stationery in Bharuch, Gujarat."
        canonicalPath="/work"
      />

      {/* Cinematic Hero */}
      <PageHero
        gradientTheme="obsidian-bronze"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Portfolio & Work' }]}
        badge="250+ CLIENT DELIVERIES"
        title="Work That Speaks"
        highlightWord="Creativity & Results"
        subtitle="Precision craft across physical print, packaging, digital experiences, and brand systems."
        description="Explore our curated portfolio of completed client projects, stationery suites, invitations, packaging, and in-depth UI/UX case studies crafted for ambitious brands."
        primaryCTA={{
          label: 'Start a Project',
          onClick: onOpenContact,
          isPrimary: true,
        }}
        secondaryCTA={{
          label: 'Explore Services',
          href: '/services',
        }}
        supportingLogosTitle="FEATURED INDUSTRIES & CLIENT CATEGORIES"
        supportingLogos={[
          { name: 'Fintech & Payments', accent: '#E31E24' },
          { name: 'Hospitality & F&B' },
          { name: 'Healthcare & SaaS' },
          { name: 'Retail & Apparel' },
          { name: 'Ceremonial & Institutions' },
        ]}
      />

      {/* 2. FILTER PILLS & SHOWCASE GRID */}
      <section className="py-12 sm:py-16 border-t border-[#E2E6EE]/80 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Filter Bar with Working Sort Selector */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleSelectTab(tab)}
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

            <div className="relative">
              <button
                type="button"
                onClick={() => setSortMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 text-xs font-bold text-[#46516A] bg-white border border-[#E2E6EE] px-4 py-2 rounded-full cursor-pointer hover:border-[#2C3D6C]"
              >
                <span>{sortMode}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {sortMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-[#E2E6EE] rounded-2xl shadow-lg py-1.5 z-20">
                  {(['Latest', 'Featured', 'A–Z'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => {
                        setSortMode(mode);
                        setSortMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                        sortMode === mode
                          ? 'text-[#E31E24] bg-[#E31E24]/5'
                          : 'text-[#2C3D6C] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Responsive Portfolio Grid: 1 col mobile (320-767px), 2 col tablet (768-1023px), 3 col desktop (1024px+) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {filteredProjects.map((proj, idx) => {
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
                    const match = pixelionProjects.find((p) => p.id === proj.id) || pixelionProjects[0];
                    setSelectedProject(match);
                  }}
                  className="bg-white border border-[#E2E6EE] hover:border-[#E31E24] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
                >
                  <div
                    className={`relative w-full ${aspectClass} overflow-hidden flex items-center justify-center ${
                      proj.objectFit === 'contain' ? 'bg-[#F3F5F9] p-2.5 sm:p-3' : 'bg-[#2C3D6C]/5'
                    }`}
                  >
                    <LazyImage
                      src={proj.image}
                      alt={proj.title}
                      priority={idx < 3}
                      placeholderTone="light"
                      objectFit={proj.objectFit}
                      className={
                        proj.objectFit === 'contain'
                          ? 'transition-transform duration-500 group-hover:scale-[1.03]'
                          : 'transition-transform duration-700 group-hover:scale-105'
                      }
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex items-center justify-between gap-3 border-t border-[#E2E6EE]/80 bg-white">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-extrabold text-sm sm:text-base text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors truncate">
                        {proj.title}
                      </h3>
                      <span className="font-mono text-[10px] sm:text-[11px] text-[#46516A] uppercase block truncate mt-0.5">
                        {proj.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {proj.galleryCount && proj.galleryCount > 1 && (
                        <span className="inline-flex items-center gap-1 bg-[#2C3D6C]/8 text-[#2C3D6C] px-2.5 py-1 rounded-full font-mono text-[10px] font-bold border border-[#E2E6EE]">
                          <Images className="w-3 h-3 text-[#E31E24]" />
                          <span>{proj.galleryCount} Views</span>
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className="w-8 h-8 rounded-full border border-[#E2E6EE] bg-[#F7F9FC] text-[#2C3D6C] group-hover:bg-[#E31E24] group-hover:text-white group-hover:border-[#E31E24] flex items-center justify-center transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. INTEGRATED STATS BAR */}
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
          onSelectProject={(next) => setSelectedProject(next)}
          onOpenContact={onOpenContact}
          setCursorState={setCursorState}
        />
      )}
    </div>
  );
}
