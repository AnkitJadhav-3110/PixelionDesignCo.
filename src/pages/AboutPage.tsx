import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Eye,
  Diamond,
  Briefcase,
  Users,
  Trophy,
  Layers,
  CheckCircle2,
  Linkedin,
  Instagram,
  ExternalLink,
  Sparkles,
  Clock,
  DollarSign,
  RotateCcw,
  Headphones,
} from 'lucide-react';
import { studioInfo } from '../data/pixelionData';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';
import PreFooterBanner from '../components/PreFooterBanner';
import WhatsAppIcon from '../components/WhatsAppIcon';

interface AboutPageProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact: () => void;
}

export default function AboutPage({ setCursorState, onOpenContact }: AboutPageProps) {
  return (
    <div className="pb-12">
      <SEOHead
        title="About Us | Pixelion Design Co."
        description="Learn about Pixelion Design Co., founded by Rana Dhruvrajsinh in Bharuch, Gujarat. Our story, mission, vision, values, and creative team."
        canonicalPath="/about"
      />

      {/* 1. CINEMATIC HERO SECTION */}
      <PageHero
        gradientTheme="midnight-steel"
        eyebrow="ABOUT US"
        title="We Design More Than Just Graphics,"
        highlightWord="We Design Trust."
        description="We are a creative design agency dedicated to helping businesses stand out, connect with their audience and achieve real results through powerful design."
        primaryCTA={{
          label: "Let's Work Together",
          href: '/contact',
        }}
        secondaryCTA={{
          label: 'Meet Our Founder',
          href: '/founder',
        }}
        supportingLogosTitle="PIXELION STUDIO METRICS"
        supportingLogos={[
          { name: '3+ YEARS', subtitle: 'EXPERIENCE', symbol: '★' },
          { name: '250+ PROJECTS', subtitle: 'COMPLETED', symbol: '✦' },
          { name: '120+ CLIENTS', subtitle: 'GLOBAL REACH', symbol: '●' },
          { name: '98% RETENTION', subtitle: 'SATISFACTION', symbol: '◆' },
        ]}
        onHoverCursor={(text) => setCursorState({ variant: 'hover', text })}
        onLeaveCursor={() => setCursorState({ variant: 'default' })}
      />

      {/* 2. "OUR STORY / The Story Behind PixelionDesignCo" */}
      <section className="py-16 sm:py-20 bg-[#FDFEFE] border-y border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Authentic Studio Brand & Stationery Visual Showcase */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E6EE] shadow-lg group bg-white">
                <LazyImage
                  src="/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.23_PM_1a129a33.jpeg"
                  alt="Pixelion Design Co. Official Letterhead & Stationery Suite"
                  placeholderTone="light"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-xl overflow-hidden border border-[#E2E6EE] bg-[#F4F6FA] p-1.5 shadow-2xs">
                  <LazyImage
                    src="/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.45.02_PM_cf2a78a4.jpeg"
                    alt="Pixelion Design Co. Master Brand Identity Sheet"
                    placeholderTone="light"
                    objectFit="contain"
                    className="w-full aspect-[4/3]"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-[#E2E6EE] bg-white shadow-2xs">
                  <LazyImage
                    src="/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.26_PM_1503fc47.jpeg"
                    alt="Pixelion Design Co. Business Card Design"
                    placeholderTone="light"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Story Copy + 4 Stats Cards */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block">
                OUR STORY
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#2C3D6C] tracking-tight">
                The Story Behind PixelionDesignCo
              </h2>
              <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
                PixelionDesignCo was founded with a simple idea - to deliver creative, modern and result-driven design solutions for businesses of all sizes. From startups to established brands, we help turn ideas into visuals that leave a lasting impact.
              </p>
              <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
                Our passion for design, attention to detail and commitment to quality drive everything we do. We don't just design, we create experiences.
              </p>

              {/* 4 Stat Cards in 4 Columns */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
                {[
                  { num: '250+', label: 'Projects Completed', icon: Briefcase },
                  { num: '120+', label: 'Happy Clients', icon: Users },
                  { num: '5+', label: 'Years Experience', icon: Trophy },
                  { num: '20+', label: 'Industries Served', icon: Layers },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-white border border-[#E2E6EE] rounded-xl p-4 text-center shadow-2xs hover:border-[#E31E24] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="font-display font-black text-xl text-[#2C3D6C]">
                        {stat.num}
                      </div>
                      <div className="font-sans-body text-[10px] text-[#46516A] mt-0.5 font-medium leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "OUR MISSION, VISION & VALUES" (3 Distinct Pillar Cards) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-2">
            OUR MISSION, VISION & VALUES
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight">
            Guiding Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Mission */}
          <div className="bg-white border border-[#E2E6EE] rounded-2xl p-7 hover:border-[#E31E24] transition-colors shadow-2xs text-center flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center mx-auto mb-5">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#2C3D6C] mb-3">
                Our Mission
              </h3>
              <div className="w-8 h-[2px] bg-[#E31E24] mx-auto mb-4" />
              <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
                To deliver innovative and impactful design solutions that help brands grow, communicate and succeed in a competitive world.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white border border-[#E2E6EE] rounded-2xl p-7 hover:border-[#E31E24] transition-colors shadow-2xs text-center flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#2C3D6C]/10 text-[#2C3D6C] flex items-center justify-center mx-auto mb-5">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#2C3D6C] mb-3">
                Our Vision
              </h3>
              <div className="w-8 h-[2px] bg-[#2C3D6C] mx-auto mb-4" />
              <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed">
                To become a globally trusted creative design agency known for quality, creativity and client satisfaction.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white border border-[#E2E6EE] rounded-2xl p-7 hover:border-[#E31E24] transition-colors shadow-2xs text-left flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center mx-auto mb-5">
                <Diamond className="w-7 h-7" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#2C3D6C] mb-3 text-center">
                Our Values
              </h3>
              <div className="w-8 h-[2px] bg-[#E31E24] mx-auto mb-4" />
              <div className="space-y-2.5 font-sans-body text-xs text-[#46516A]">
                {[
                  'Creativity in every idea',
                  'Commitment to quality',
                  'Honesty and transparency',
                  'Client success is our priority',
                  'Continuous learning and growth',
                ].map((val) => (
                  <div key={val} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E31E24] shrink-0" />
                    <span className="font-medium text-[#2C3D6C]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "MEET THE FOUNDER & OUR CREATIVE TEAM" */}
      <section className="py-16 sm:py-20 bg-[#FDFEFE] border-y border-[#E2E6EE]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left: Founder Card */}
            <div className="lg:col-span-5">
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-4">
                MEET THE FOUNDER
              </span>

              <div className="bg-white border border-[#E2E6EE] rounded-3xl p-6 sm:p-7 shadow-sm hover:border-[#E31E24] transition-colors flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                <img
                  src="/assets/dhruvrajsinh-rana.jpg"
                  alt="Rana Dhruvrajsinh — Founder of Pixelion Design Co."
                  className="w-32 h-40 sm:w-36 sm:h-44 rounded-2xl object-cover shrink-0 shadow-md border border-[#E2E6EE]"
                />
                <div className="space-y-2.5">
                  <h3 className="font-display font-black text-xl text-[#2C3D6C]">
                    Rana Dhruvrajsinh
                  </h3>
                  <div className="font-mono text-xs font-bold text-[#E31E24]">
                    Founder & Creative Designer
                  </div>
                  <p className="font-sans-body text-xs text-[#46516A] leading-relaxed">
                    A passionate designer with a vision to help brands tell their story through design. With years of experience and a keen eye for detail, he leads PixelionDesignCo with creativity, dedication and purpose.
                  </p>

                  {/* Social links */}
                  <div className="pt-2 flex items-center justify-center sm:justify-start gap-2.5 text-[#2C3D6C]">
                    <a
                      href={studioInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2C3D6C]/5 hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                      title="LinkedIn"
                    >
                      in
                    </a>
                    <a
                      href={studioInfo.behance}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2C3D6C]/5 hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                      title="Behance"
                    >
                      Bē
                    </a>
                    <a
                      href={studioInfo.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2C3D6C]/5 hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-xs"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={studioInfo.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2C3D6C]/5 hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors"
                      title="WhatsApp"
                      aria-label="WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Link to Full Profile & Credentials */}
                  <div className="pt-3 border-t border-[#E2E6EE]">
                    <Link
                      to="/founder"
                      className="inline-flex items-center gap-1.5 font-sans-body text-xs font-bold text-[#2C3D6C] hover:text-[#E31E24] transition-colors"
                    >
                      <span>View Full Bio & Credentials</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Creative Collaboration Team */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase block mb-4">
                Our Collaboration
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    name: 'Pranshu Patel',
                    role: 'UI/UX Designer',
                    image: '/assets/team/pranshu-patel.jpg',
                  },
                  {
                    name: 'Ankit Jadhav',
                    role: 'Developer',
                    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
                  },
                  {
                    name: 'Harshil Amin',
                    role: 'Social Media Designer',
                    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
                  },
                  {
                    name: 'Mayank Joshi',
                    role: 'Web Designer',
                    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
                  },
                ].map((member) => (
                  <div
                    key={member.name}
                    className="bg-white border border-[#E2E6EE] rounded-2xl p-4 text-center hover:border-[#E31E24] transition-colors shadow-2xs group flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={member.image}
                        alt={member.name}
                        onError={(e) => {
                          if (member.name === 'Pranshu Patel') {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1770096951056-c94a812e9fd4?w=300&auto=format&fit=crop&q=80';
                          }
                        }}
                        className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl object-cover mx-auto mb-3 border border-[#E2E6EE]"
                      />
                      <h4 className="font-display font-bold text-xs sm:text-sm text-[#2C3D6C]">
                        {member.name}
                      </h4>
                      <p className="font-sans-body text-[10px] text-[#46516A] mt-0.5">
                        {member.role}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-3 border-t border-[#E2E6EE] mt-3">
                      <span className="w-6 h-6 rounded-full bg-[#2C3D6C]/5 text-[#2C3D6C] text-[10px] font-bold flex items-center justify-center cursor-pointer hover:bg-[#E31E24] hover:text-white transition-colors">
                        in
                      </span>
                      <span className="w-6 h-6 rounded-full bg-[#2C3D6C]/5 text-[#2C3D6C] text-[10px] font-bold flex items-center justify-center cursor-pointer hover:bg-[#E31E24] hover:text-white transition-colors">
                        Bē
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "WHY CHOOSE US?" (5 Inline Feature Cards) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold text-[#2C3D6C] tracking-widest uppercase block mb-2">
            WHY CHOOSE US?
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#2C3D6C] tracking-tight">
            Our Studio Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {[
            {
              title: 'Creative & Unique Ideas',
              desc: 'We bring fresh and innovative ideas to every project.',
              icon: Sparkles,
            },
            {
              title: 'On-Time Delivery',
              desc: 'We value your time and deliver on schedule.',
              icon: Clock,
            },
            {
              title: 'Affordable Pricing',
              desc: 'Quality design solutions that fit your budget.',
              icon: DollarSign,
            },
            {
              title: 'Unlimited Revisions',
              desc: 'Your satisfaction is our top priority.',
              icon: RotateCcw,
            },
            {
              title: 'Dedicated Support',
              desc: 'We are here to support you at every step.',
              icon: Headphones,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-[#E2E6EE] rounded-2xl p-5 sm:p-6 text-center hover:border-[#E31E24] transition-colors shadow-2xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#2C3D6C] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans-body text-xs text-[#46516A] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. PRE-FOOTER BANNER */}
      <PreFooterBanner
        title="Have a"
        highlightWord="Project"
        titleEnd="in Mind?"
        subtitle="Let's work together and create something amazing."
        buttonText="Get a Free Quote"
        buttonLink="/get-a-quote"
      />
    </div>
  );
}
