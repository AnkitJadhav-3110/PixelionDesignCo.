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
import PageHero from '../components/PageHero';
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
      link: '/work?category=Branding',
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      desc: 'Creative visuals for print and digital communication.',
      filterGroup: 'Print Design',
      icon: Monitor,
      link: '/work?category=Print+Design',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      desc: 'User-centered UI/UX design for web and mobile apps.',
      filterGroup: 'Web & UI/UX',
      icon: Smartphone,
      link: '/work?category=UI%2FUX+Design',
    },
    {
      id: 'social-media',
      title: 'Social Media Design',
      desc: 'Eye-catching posts and banners for social platforms.',
      filterGroup: 'Social Media',
      icon: Share2,
      link: '/work?category=Social+Media',
    },
    {
      id: 'print-design',
      title: 'Print Design',
      desc: 'Brochures, flyers, posters and other print materials.',
      filterGroup: 'Print Design',
      icon: Printer,
      link: '/work?category=Print+Design',
    },
    {
      id: 'digital-invitations',
      title: 'Digital Invitations',
      desc: 'Elegant digital invites for weddings, events & parties.',
      filterGroup: 'Digital',
      icon: Mail,
      link: '/work?category=Digital+Invitations',
    },
    {
      id: 'packaging-design',
      title: 'Packaging Design',
      desc: 'Creative packaging that protects and promotes.',
      filterGroup: 'Packaging',
      icon: Package,
      link: '/work?category=Packaging',
    },
    {
      id: 'web-design',
      title: 'Web Design',
      desc: 'Modern, responsive websites that grow your business.',
      filterGroup: 'Web & UI/UX',
      icon: Code,
      link: '/work?category=Web+Design',
    },
    {
      id: 'mobile-app-design',
      title: 'Mobile App Design',
      desc: 'Beautiful and functional mobile app interfaces.',
      filterGroup: 'Web & UI/UX',
      icon: Layout,
      link: '/work?category=UI%2FUX+Design',
    },
    {
      id: 'brochure-design',
      title: 'Brochure Design',
      desc: 'Informative brochures that communicate your value.',
      filterGroup: 'Print Design',
      icon: FileText,
      link: '/work?category=Print+Design',
    },
    {
      id: 'business-card-design',
      title: 'Business Card Design',
      desc: 'Professional business cards that leave a lasting impression.',
      filterGroup: 'Branding',
      icon: CreditCard,
      link: '/work?category=Branding',
    },
    {
      id: 'letterhead-design',
      title: 'Letterhead Design',
      desc: 'Corporate letterheads that represent your brand.',
      filterGroup: 'Branding',
      icon: FileSpreadsheet,
      link: '/work?category=Branding',
    },
    {
      id: 'menu-design',
      title: 'Menu Design',
      desc: 'Creative menu designs for restaurants and cafes.',
      filterGroup: 'Print Design',
      icon: Utensils,
      link: '/work?category=Print+Design',
    },
    {
      id: 'banner-design',
      title: 'Banner Design',
      desc: 'High-impact banners for ads and promotions.',
      filterGroup: 'Others',
      icon: Flag,
      link: '/work?category=Print+Design',
    },
    {
      id: 'bill-book-design',
      title: 'Bill Book Design',
      desc: 'Professional bill books for your business.',
      filterGroup: 'Others',
      icon: Receipt,
      link: '/work?category=Print+Design',
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
    <div className="pb-12">
      <SEOHead
        title="Design Categories | Pixelion Design Co."
        description="Explore our 15 creative design categories: Branding, Graphic Design, UI/UX, Print, Packaging, Invitations, Brochures, Stationery and more."
        canonicalPath="/categories"
      />

      {/* Cinematic Hero */}
      <PageHero
        gradientTheme="charcoal-crimson"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Categories' }]}
        badge="15 SPECIALIZED DISCIPLINES"
        title="Explore Our"
        highlightWord="Design Categories"
        subtitle="Crafted for impact, precision, and lasting recognition."
        description="From brand strategy to tactile print and immersive digital products — explore our 15 tailored creative disciplines engineered to scale your market presence."
        primaryCTA={{
          label: 'Request Custom Category',
          href: '/get-a-quote',
          isPrimary: true,
        }}
        secondaryCTA={{
          label: 'View Client Work',
          href: '/work',
        }}
        supportingLogosTitle="FEATURED DISCIPLINES ACROSS CLIENT ENGAGEMENTS"
        supportingLogos={[
          { name: 'Branding & Identity', accent: '#E31E24' },
          { name: 'Print & Packaging' },
          { name: 'UI/UX & Digital' },
          { name: 'Social Systems' },
          { name: 'Editorial & Collateral' },
        ]}
      />

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
