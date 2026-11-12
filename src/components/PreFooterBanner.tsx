import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Send } from 'lucide-react';

interface PreFooterBannerProps {
  title?: string;
  highlightWord?: string;
  titleEnd?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  icon?: 'phone' | 'rocket' | 'send';
}

export default function PreFooterBanner({
  title = 'Ready to bring your',
  highlightWord = 'ideas',
  titleEnd = 'to life?',
  subtitle = "Let's create something amazing together.",
  buttonText = 'Get a Free Quote',
  buttonLink = '/get-a-quote',
  onButtonClick,
  icon = 'phone',
}: PreFooterBannerProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      <div className="relative bg-[#2C3D6C] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 text-white overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Subtle Decorative Paper Plane Trajectory Graphic */}
        <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden sm:block">
          <svg width="220" height="100" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 80 C 60 90, 110 30, 180 35 C 195 36, 205 32, 210 20"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <polygon points="210,15 218,22 208,27" fill="white" />
          </svg>
        </div>

        {/* Left: Icon Badge + Copy */}
        <div className="flex items-center gap-4 sm:gap-6 relative z-10 w-full md:w-auto">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white shadow-inner">
            {icon === 'phone' && <Phone className="w-5 h-5 sm:w-7 sm:h-7 text-white" />}
            {icon === 'rocket' && (
              <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
            {icon === 'send' && <Send className="w-5 h-5 sm:w-7 sm:h-7 text-white" />}
          </div>
          <div>
            <h3
              className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-tight"
              style={{ color: '#FFFFFF' }}
            >
              {title && <span className="text-white" style={{ color: '#FFFFFF' }}>{title}</span>}{' '}
              {highlightWord && (
                <span className="text-white relative inline-block" style={{ color: '#FFFFFF' }}>
                  {highlightWord}
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#E31E24] rounded-full" />
                </span>
              )}{' '}
              {titleEnd && <span className="text-white" style={{ color: '#FFFFFF' }}>{titleEnd}</span>}
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-white/85 mt-1.5 leading-relaxed max-w-xl" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Red CTA Button */}
        <div className="relative z-10 w-full md:w-auto flex justify-start md:justify-end shrink-0">
          {onButtonClick ? (
            <button
              onClick={onButtonClick}
              className="w-full sm:w-auto bg-[#E31E24] hover:bg-[#C81920] text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-red-900/30 group"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <Link
              to={buttonLink}
              className="w-full sm:w-auto bg-[#E31E24] hover:bg-[#C81920] text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-red-900/30 group"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
