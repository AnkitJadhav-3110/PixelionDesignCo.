import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Users,
  Trophy,
  Heart,
  Star,
  Quote,
  ArrowRight,
} from 'lucide-react';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PreFooterBanner from '../components/PreFooterBanner';

interface TestimonialsPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function TestimonialsPage({ setCursorState }: TestimonialsPageProps) {
  const testimonials = [
    {
      quote:
        'PixelionDesignCo completely understood our brand vision and delivered a design that exceeded our expectations. Professional, creative, and on time!',
      name: 'Jay Patel',
      role: 'Marketing Head',
      company: 'AB Naturals',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'Amazing experience! The team is super responsive and talented. Our social media designs have never looked better. Highly recommended!',
      name: 'Riya Shah',
      role: 'Founder',
      company: 'Shine Beauty Studio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'They designed our website and branding with such creativity and attention to detail. The final output has helped us attract more customers.',
      name: 'Ketan Mehta',
      role: 'CEO',
      company: 'Urban Space Interiors',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'From logo to packaging, everything was designed perfectly. PixelionDesignCo is our go-to design partner! Excellent work and support.',
      name: 'Neha Desai',
      role: 'Brand Manager',
      company: 'Herbionics',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'Their creativity and design sense are outstanding. They delivered high-quality designs that truly represent our brand identity.',
      name: 'Dhruv Raval',
      role: 'Co-founder',
      company: 'FitFuel Nutrition',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'Very professional team with a strong understanding of branding and UI/UX. We loved the experience working with them.',
      name: 'Pooja Parmar',
      role: 'Product Manager',
      company: 'EdTech Solutions',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'PixelionDesignCo turned our rough ideas into a cohesive visual identity that exceeded expectations—spot-on creative direction, delivered right on schedule.',
      name: 'Elena Vance',
      role: 'Founder',
      company: 'Vance & Co. Consulting',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'They approached our branding and website with an unmatched level of creativity and precision. The final site just look incredible—it actively brings in new clients every week.',
      name: 'Julian Mercer',
      role: 'CEO & Founder',
      company: 'Apex Logistics',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'From the smallest UI detail to our overarching brand aesthetic, their work was thoughtful and inventive. Our refreshed website has directly helped us stand out in a crowded market and win more customers.',
      name: 'Hannah Cho',
      role: 'Co-Founder',
      company: 'BentoBoxed',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'It’s rare to find a design partner that balances high-level creativity with strict professionalism. PixelionDesignCo nailed our brand vision on the first try and delivered ahead of our launch deadline.',
      name: 'Priya Nair',
      role: 'Co-Founder',
      company: 'Lumina Botanicals',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const trustedBrands = [
    { name: 'AB NATURALS', subtitle: 'ORGANICS' },
    { name: 'Herbionics', subtitle: 'HEALTHCARE' },
    { name: 'FITFUEL', subtitle: 'NUTRITION' },
    { name: 'Urban Space', subtitle: 'INTERIORS' },
    { name: 'Shine', subtitle: 'BEAUTY STUDIO' },
    { name: 'EdTech', subtitle: 'SOLUTIONS' },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-12">
      <SEOHead
        title="Client Testimonials | Pixelion Design Co."
        description="Read client testimonials and verified reviews from businesses across Gujarat and India who trust Pixelion Design Co."
        canonicalPath="/testimonials"
      />

      {/* 1. HERO SECTION (Matching additional-testimonials-reference.jpeg) */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Headline, Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                TESTIMONIALS
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2C3D6C] tracking-tight leading-[1.08] break-words">
              Trusted by Clients, <br />
              <span className="text-[#E31E24]">Driven by Results.</span>
            </h1>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#46516A] leading-relaxed max-w-xl">
              We take pride in delivering creative design solutions that help businesses grow. Here's what our amazing clients have to say about working with us.
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
                  src="/assets/concepts/concept-uiux-dashboard-01.webp"
                  alt="Pixelion Design Co. — Client Reviews & Project Showcase"
                  priority={true}
                  placeholderTone="light"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                {/* 5-Star Floating Badges */}
                <div className="absolute top-3 left-3 bg-[#E31E24] text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1 text-xs font-bold">
                  <span>★★★★★</span>
                  <span className="text-[10px] ml-1">5.0</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-[#2C3D6C] text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1 text-xs font-bold">
                  <span>98% Client Satisfaction</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. 4-CARD STATS BAR */}
      <section className="py-8 sm:py-10 border-t border-[#E2E6EE]/80 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: '120+', label: 'Happy Clients', icon: Users },
              { num: '250+', label: 'Projects Completed', icon: Trophy },
              { num: '98%', label: 'Client Satisfaction', icon: Heart },
              { num: '5.0', label: 'Average Rating', icon: Star },
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

      {/* 3. 6 TESTIMONIAL CARDS IN 3x2 GRID */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 border-t border-[#E2E6EE]/80">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-2">
            WHAT OUR CLIENTS SAY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight">
            Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => {
            const isVideo = idx === 2; // Ketan Mehta Urban Space as video feature
            return (
              <div
                key={`${t.name}-${t.company}-${idx}`}
                className="bg-white border border-[#CFDFEE] rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl hover:border-[#E31E24] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Upper Speech Bubble Box */}
                <div className="relative bg-white p-6 sm:p-7 flex-1 flex flex-col justify-between min-h-[190px]">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="text-[#0284c7] group-hover:text-[#E31E24] transition-colors">
                      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    {t.company && (
                      <span className="font-display font-extrabold text-[11px] tracking-wider text-[#2C3D6C]/80 uppercase">
                        {t.company}
                      </span>
                    )}
                  </div>

                  <p className="font-sans-body text-xs sm:text-[13.5px] text-[#2C3D6C] leading-relaxed my-auto">
                    {t.quote}
                  </p>

                  {/* Speech bubble notch */}
                  <div
                    className="absolute -bottom-[8px] left-7 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white z-20"
                    aria-hidden="true"
                  />
                </div>

                {/* Bottom Author Box */}
                {isVideo ? (
                  <div className="bg-[#1C2536] text-white p-4 sm:p-5 flex items-center justify-between gap-3 border-t border-[#1C2536]">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/20">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-white text-[#1C2536] flex items-center justify-center shadow-sm">
                          <span className="text-[10px] ml-0.5">▶</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs sm:text-sm text-white truncate">
                        {t.name}
                      </h4>
                      <p className="font-sans-body text-[11px] text-white/80 truncate mt-0.5 font-medium">
                        {t.company}
                      </p>
                      <p className="font-sans-body text-[10px] text-white/50 truncate">
                        {t.role}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#EEF4F9] p-4 sm:p-5 flex items-center gap-3.5 border-t border-[#DDE8F2]">
                    <div className="w-13 h-13 rounded-xl overflow-hidden shrink-0 border border-[#DCE7F2] bg-white">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs sm:text-sm text-[#2C3D6C] truncate">
                        {t.name}
                      </h4>
                      <p className="font-sans-body text-[11px] text-[#46516A] truncate mt-0.5 font-medium">
                        {t.company}
                      </p>
                      <p className="font-sans-body text-[10px] text-[#46516A]/75 truncate">
                        {t.role}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. "BRANDS THAT TRUST US" RIBBON */}
      <section className="py-12 border-t border-[#E2E6EE]/80 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="font-mono text-xs font-bold text-[#46516A]/70 uppercase tracking-[0.2em] text-center mb-8">
            BUSINESSES THAT TRUST US
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-75">
            {trustedBrands.map((b) => (
              <div key={b.name} className="text-center group">
                <div className="font-display font-black text-sm text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors">
                  {b.name}
                </div>
                <div className="font-mono text-[8px] text-[#46516A] tracking-wider uppercase">
                  {b.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRE-FOOTER BANNER */}
      <PreFooterBanner
        title="Join Our"
        highlightWord="120+ Happy Clients"
        titleEnd=""
        subtitle="Let's create something amazing for your brand."
        buttonText="Start Your Project"
        buttonLink="/get-a-quote"
      />
    </div>
  );
}
