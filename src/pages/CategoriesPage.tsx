import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
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
  CreditCard,
  FileSpreadsheet,
  Utensils,
  Flag,
  Receipt,
} from 'lucide-react';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PreFooterBanner from '../components/PreFooterBanner';

interface CategoriesPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function CategoriesPage({ setCursorState }: CategoriesPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All Categories');

  const categories = [
    {
      id: 'branding',
      title: 'Branding',
      desc: 'Logo, brand identity, guidelines and brand strategy design.',
      filterGroup: 'Branding',
      icon: Compass,
      link: '/work',
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      desc: 'Creative visuals for print and digital communication.',
      filterGroup: 'Print Design',
      icon: Monitor,
      link: '/work',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      desc: 'User-centered UI/UX design for web and mobile apps.',
      filterGroup: 'Web & UI/UX',
      icon: Smartphone,
      link: '/work',
    },
    {
      id: 'social-media',
      title: 'Social Media Design',
      desc: 'Eye-catching posts and banners for social platforms.',
      filterGroup: 'Social Media',
      icon: Share2,
      link: '/work',
    },
    {
      id: 'print-design',
      title: 'Print Design',
      desc: 'Brochures, flyers, posters and other print materials.',
      filterGroup: 'Print Design',
      icon: Printer,
      link: '/work',
    },
    {
      id: 'digital-invitations',
      title: 'Digital Invitations',
      desc: 'Elegant digital invites for weddings, events & parties.',
      filterGroup: 'Digital',
      icon: Mail,
      link: '/work',
    },
    {
      id: 'packaging-design',
      title: 'Packaging Design',
      desc: 'Creative packaging that protects and promotes.',
      filterGroup: 'Packaging',
      icon: Package,
      link: '/work',
    },
    {
      id: 'web-design',
      title: 'Web Design',
      desc: 'Modern, responsive websites that grow your business.',
      filterGroup: 'Web & UI/UX',
      icon: Code,
      link: '/work',
    },
    {
      id: 'mobile-app-design',
      title: 'Mobile App Design',
      desc: 'Beautiful and functional mobile app interfaces.',
      filterGroup: 'Web & UI/UX',
      icon: Layout,
      link: '/work',
    },
    {
      id: 'brochure-design',
      title: 'Brochure Design',
      desc: 'Informative brochures that communicate your value.',
      filterGroup: 'Print Design',
      icon: FileText,
      link: '/work',
    },
    {
      id: 'business-card-design',
      title: 'Business Card Design',
      desc: 'Professional business cards that leave a lasting impression.',
      filterGroup: 'Branding',
      icon: CreditCard,
      link: '/work',
    },
    {
      id: 'letterhead-design',
      title: 'Letterhead Design',
      desc: 'Corporate letterheads that represent your brand.',
      filterGroup: 'Branding',
      icon: FileSpreadsheet,
      link: '/work',
    },
    {
      id: 'menu-design',
      title: 'Menu Design',
      desc: 'Creative menu designs for restaurants and cafes.',
      filterGroup: 'Print Design',
      icon: Utensils,
      link: '/work',
    },
    {
      id: 'banner-design',
      title: 'Banner Design',
      desc: 'High-impact banners for ads and promotions.',
      filterGroup: 'Others',
      icon: Flag,
      link: '/work',
    },
    {
      id: 'bill-book-design',
      title: 'Bill Book Design',
      desc: 'Professional bill books for your business.',
      filterGroup: 'Others',
      icon: Receipt,
      link: '/work',
    },
  ];

  const filterTabs = [
    'All Categories',
    'Branding',
    'Print Design',
    'Digital',
    'Packaging',
    'Web & UI/UX',
    'Social Media',
    'Others',
  ];

  const filteredCategories =
    activeFilter === 'All Categories'
      ? categories
      : categories.filter((c) => c.filterGroup === activeFilter);

  return (
    <div className="pt-24 sm:pt-28 pb-12">
      <SEOHead
        title="Design Categories | Pixelion Design Co."
        description="Explore our 15 creative design categories: Branding, Graphic Design, UI/UX, Print, Packaging, Invitations, Brochures, Stationery and more."
        canonicalPath="/categories"
      />

      {/* 1. HERO SECTION (Matching 04-work-reference.jpeg) */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Breadcrumb, Headline, Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="font-mono text-xs text-[#46516A] flex items-center gap-2">
              <Link to="/" className="hover:text-[#E31E24]">Home</Link>
              <span>&gt;</span>
              <span className="text-[#E31E24] font-bold">Categories</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2C3D6C] tracking-tight leading-[1.08] break-words">
              Explore Our <br />
              <span className="text-[#E31E24]">Design Categories</span>
            </h1>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#46516A] leading-relaxed max-w-xl">
              Choose from a wide range of creative design categories crafted to elevate your brand and make a lasting impact.
            </p>
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
                  src="/assets/concepts/concept-print-editorial-01.webp"
                  alt="Pixelion Design Co. — Design Categories & Stationery Spread"
                  priority={true}
                  placeholderTone="light"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute bottom-3 inset-x-3 bg-[#2C3D6C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="font-display font-extrabold text-xs">
                    DESIGN PORTFOLIO
                  </span>
                  <span className="font-mono text-[9px] text-[#E31E24] bg-white px-2 py-0.5 rounded-md font-bold uppercase">
                    15 CATEGORIES
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER TABS & 15-CATEGORY GRID (5x3) */}
      <section className="py-12 sm:py-20 border-t border-[#E2E6EE]/80 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 sm:px-5 py-2 rounded-full font-sans-body text-xs font-bold transition-all ${
                  activeFilter === tab
                    ? 'bg-[#E31E24] text-white shadow-sm'
                    : 'bg-white border border-[#E2E6EE] text-[#46516A] hover:border-[#2C3D6C] hover:text-[#2C3D6C]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 15 Category Cards Grid (5x3 on large screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            {filteredCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="bg-white border border-[#E2E6EE] hover:border-[#E31E24] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group text-center"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-base text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <p className="font-sans-body text-xs text-[#46516A] leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                  </div>

                  <Link
                    to={cat.link}
                    className="font-sans-body text-xs font-bold text-[#E31E24] hover:underline inline-flex items-center justify-center gap-1 pt-3 border-t border-[#E2E6EE]/80"
                  >
                    <span>View Designs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PRE-FOOTER BANNER */}
      <PreFooterBanner
        title="Have a Custom"
        highlightWord="Design"
        titleEnd="in Mind?"
        subtitle="Let's bring your ideas to life with creativity and precision."
        buttonText="Get a Free Quote"
        buttonLink="/get-a-quote"
      />
    </div>
  );
}
