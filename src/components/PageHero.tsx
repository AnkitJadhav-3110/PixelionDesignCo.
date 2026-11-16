import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

export interface PageHeroCTA {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isPrimary?: boolean;
}

export interface PageHeroSupportingLogo {
  name: string;
  subtitle?: string;
  symbol?: string;
  accent?: string;
}

export type HeroGradientTheme =
  | 'charcoal-crimson'
  | 'cinematic-crimson'
  | 'midnight-burgundy'
  | 'midnight-steel'
  | 'ice-white'
  | 'obsidian-bronze';

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  highlightWord?: string;
  titleEnd?: string;
  subtitle?: string;
  description?: string;
  gradientTheme?: HeroGradientTheme;
  backgroundImage?: string;
  mobileBackgroundImage?: string;
  backgroundPosition?: string;
  mobileBackgroundPosition?: string;
  primaryCTA?: PageHeroCTA;
  secondaryCTA?: PageHeroCTA;
  supportingContent?: React.ReactNode;
  supportingLogosTitle?: string;
  supportingLogos?: PageHeroSupportingLogo[];
  overlayIntensity?: 'subtle' | 'medium' | 'dark' | 'cinematic';
  heroHeight?: 'default' | 'tall' | 'compact';
  breadcrumbs?: Array<{ label: string; href?: string }>;
  badge?: string | { label: string; value?: string };
  onHoverCursor?: (text?: string) => void;
  onLeaveCursor?: () => void;
}

export default function PageHero({
  eyebrow,
  title,
  highlightWord,
  titleEnd,
  subtitle,
  description,
  gradientTheme = 'charcoal-crimson',
  backgroundImage,
  backgroundPosition = 'center center',
  primaryCTA,
  secondaryCTA,
  supportingContent,
  supportingLogosTitle,
  supportingLogos,
  heroHeight = 'default',
  breadcrumbs,
  badge,
  onHoverCursor,
  onLeaveCursor,
}: PageHeroProps) {
  const hasBackgroundImage = Boolean(backgroundImage);
  const isLightTheme = !hasBackgroundImage && gradientTheme === 'ice-white';
  const isCrimsonTheme = !hasBackgroundImage && gradientTheme === 'cinematic-crimson';

  // Determine height classes based on configuration
  const heightClasses = {
    tall: 'min-h-[90vh] sm:min-h-[92vh] lg:min-h-[94vh] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-28',
    default: 'min-h-[85vh] sm:min-h-[88vh] lg:min-h-[90vh] pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24',
    compact: 'min-h-[65vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20',
  }[heroHeight];

  const gradientClassMap: Record<HeroGradientTheme, string> = {
    'charcoal-crimson': 'hero-gradient-charcoal-crimson',
    'cinematic-crimson': 'hero-gradient-cinematic-crimson',
    'midnight-burgundy': 'hero-gradient-midnight-burgundy',
    'midnight-steel': 'hero-gradient-midnight-steel',
    'ice-white': 'hero-gradient-ice-white',
    'obsidian-bronze': 'hero-gradient-obsidian-bronze',
  };

  const primaryButtonClass = isCrimsonTheme
    ? 'w-full sm:w-auto bg-[#E31E24] hover:bg-[#C81920] text-white border border-white/35 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_12px_30px_rgba(15,0,4,0.45)] group active:scale-95'
    : isLightTheme
    ? 'w-full sm:w-auto bg-[#E31E24] hover:bg-[#C81920] text-white px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-[#E31E24]/25 group active:scale-95'
    : 'w-full sm:w-auto bg-[#E31E24] hover:bg-[#C81920] text-white px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl hover:shadow-red-900/30 group active:scale-95';

  const secondaryButtonClass = isLightTheme
    ? 'w-full sm:w-auto bg-white/90 hover:bg-white text-[#2C3D6C] border border-[#2C3D6C]/20 hover:border-[#2C3D6C] hover:text-[#E31E24] px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xs active:scale-95'
    : 'w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/50 backdrop-blur-xs px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 active:scale-95';

  return (
    <section
      aria-label="Hero"
      className={`relative isolate w-full overflow-hidden flex flex-col justify-center items-center text-center ${
        hasBackgroundImage ? 'bg-[#08111E]' : gradientClassMap[gradientTheme]
      } ${
        isLightTheme ? 'text-[#2C3D6C] border-b border-[#E2E6EE]' : 'text-white'
      } ${heightClasses}`}
    >
      {/* Optional Full-Bleed Background Image with Subtle Contrast Scrim */}
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none select-none"
            style={{ objectPosition: backgroundPosition }}
            loading="eager"
          />
          <div
            className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#07101D]/45 via-[#07101D]/25 to-[#07101D]/55"
            aria-hidden="true"
          />
        </>
      )}

      {/* Centered Content Container (Vertically & Horizontally Balanced, Immediately Visible) */}
      <div className="relative z-10 w-full max-w-4xl sm:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        {/* Optional Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={`flex flex-wrap items-center justify-center gap-1.5 font-mono text-[11px] sm:text-xs mb-5 ${
              isLightTheme ? 'text-[#46516A]' : 'text-white/80'
            }`}
          >
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.label}>
                {idx > 0 && (
                  <ChevronRight
                    className={`w-3 h-3 ${
                      isLightTheme ? 'text-[#2C3D6C]/40' : 'text-white/45'
                    }`}
                  />
                )}
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className={`transition-colors underline-offset-2 hover:underline ${
                      isLightTheme ? 'hover:text-[#2C3D6C]' : 'hover:text-white'
                    }`}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={`font-bold ${
                      isCrimsonTheme
                        ? 'text-white underline decoration-white/50 underline-offset-4'
                        : 'text-[#E31E24]'
                    }`}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Optional Badge */}
        {badge && (
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider mb-4 border ${
              isLightTheme
                ? 'bg-white/85 backdrop-blur-xs border-[#E2E6EE] text-[#2C3D6C] shadow-xs'
                : isCrimsonTheme
                ? 'bg-black/25 backdrop-blur-md border-white/25 text-white shadow-sm'
                : 'bg-white/10 backdrop-blur-md border-white/20 text-white shadow-sm'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCrimsonTheme ? 'bg-white' : 'bg-[#E31E24]'
              }`}
            />
            {typeof badge === 'string' ? (
              <span>{badge}</span>
            ) : (
              <>
                <span>{badge.label}</span>
                {badge.value && (
                  <span
                    className={`pl-1 font-extrabold ${
                      isCrimsonTheme ? 'text-white' : 'text-[#E31E24]'
                    }`}
                  >
                    {badge.value}
                  </span>
                )}
              </>
            )}
          </div>
        )}

        {/* 1. Eyebrow Text / Small Section Identifier */}
        {eyebrow && (
          <div className="mb-3">
            <span
              className={`font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase inline-flex items-center gap-2 ${
                isCrimsonTheme ? 'text-[#FFE4E6]' : 'text-[#E31E24]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCrimsonTheme ? 'bg-white' : 'bg-[#E31E24]'
                }`}
              />
              {eyebrow}
            </span>
          </div>
        )}

        {/* 2. Main Heading (Dominant Visual Element with Clamp Scaling) */}
        <h1
          className={`font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] max-w-4xl break-words ${
            isLightTheme ? 'text-[#2C3D6C]' : 'text-white drop-shadow-md'
          }`}
          style={{
            fontSize: 'clamp(2rem, 5vw + 1rem, 4.5rem)',
          }}
        >
          {title}{' '}
          {highlightWord && (
            <span
              className={`inline-block ${
                isCrimsonTheme
                  ? 'text-[#FFE8EA] underline decoration-white/50 decoration-2 sm:decoration-[3px] underline-offset-[6px]'
                  : 'text-[#E31E24]'
              }`}
            >
              {highlightWord}
            </span>
          )}{' '}
          {titleEnd && <span>{titleEnd}</span>}
        </h1>

        {/* 3. Supporting Subtitle (Optional) */}
        {subtitle && (
          <p
            className={`font-display font-medium text-base sm:text-xl md:text-2xl mt-3 sm:mt-4 max-w-2xl leading-snug ${
              isLightTheme ? 'text-[#2C3D6C]/90' : 'text-white/95 drop-shadow-xs'
            }`}
          >
            {subtitle}
          </p>
        )}

        {/* 4. Descriptive Paragraph */}
        {description && (
          <p
            className={`font-sans-body text-xs sm:text-sm md:text-base lg:text-lg mt-3 sm:mt-4 max-w-2xl leading-relaxed ${
              isLightTheme ? 'text-[#46516A]' : 'text-white/85 drop-shadow-xs'
            }`}
          >
            {description}
          </p>
        )}

        {/* 5. Dual CTA Buttons */}
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-7 sm:mt-8 w-full sm:w-auto">
            {primaryCTA && (
              primaryCTA.href ? (
                primaryCTA.href.startsWith('http') ? (
                  <a
                    href={primaryCTA.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={primaryButtonClass}
                    onMouseEnter={() => onHoverCursor?.(primaryCTA.label)}
                    onMouseLeave={() => onLeaveCursor?.()}
                  >
                    <span>{primaryCTA.label}</span>
                    {primaryCTA.icon || (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </a>
                ) : primaryCTA.href.startsWith('#') ? (
                  <a
                    href={primaryCTA.href}
                    className={primaryButtonClass}
                    onMouseEnter={() => onHoverCursor?.(primaryCTA.label)}
                    onMouseLeave={() => onLeaveCursor?.()}
                  >
                    <span>{primaryCTA.label}</span>
                    {primaryCTA.icon || (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </a>
                ) : (
                  <Link
                    to={primaryCTA.href}
                    className={primaryButtonClass}
                    onMouseEnter={() => onHoverCursor?.(primaryCTA.label)}
                    onMouseLeave={() => onLeaveCursor?.()}
                  >
                    <span>{primaryCTA.label}</span>
                    {primaryCTA.icon || (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Link>
                )
              ) : (
                <button
                  type="button"
                  onClick={primaryCTA.onClick}
                  className={primaryButtonClass}
                  onMouseEnter={() => onHoverCursor?.(primaryCTA.label)}
                  onMouseLeave={() => onLeaveCursor?.()}
                >
                  <span>{primaryCTA.label}</span>
                  {primaryCTA.icon || (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              )
            )}

            {secondaryCTA && (
              secondaryCTA.href ? (
                secondaryCTA.href.startsWith('http') ? (
                  <a
                    href={secondaryCTA.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={secondaryButtonClass}
                    onMouseEnter={() => onHoverCursor?.(secondaryCTA.label)}
                    onMouseLeave={() => onLeaveCursor?.()}
                  >
                    {secondaryCTA.icon}
                    <span>{secondaryCTA.label}</span>
                    {!secondaryCTA.icon && <ArrowRight className="w-4 h-4" />}
                  </a>
                ) : secondaryCTA.href.startsWith('#') ? (
                  <a
                    href={secondaryCTA.href}
                    className={secondaryButtonClass}
                    onMouseEnter={() => onHoverCursor?.(secondaryCTA.label)}
                    onMouseLeave={() => onLeaveCursor?.()}
                  >
                    {secondaryCTA.icon}
                    <span>{secondaryCTA.label}</span>
                    {!secondaryCTA.icon && <ArrowRight className="w-4 h-4" />}
                  </a>
                ) : (
                  <Link
                    to={secondaryCTA.href}
                    className={secondaryButtonClass}
                    onMouseEnter={() => onHoverCursor?.(secondaryCTA.label)}
                    onMouseLeave={() => onLeaveCursor?.()}
                  >
                    <span>{secondaryCTA.label}</span>
                    {secondaryCTA.icon || (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Link>
                )
              ) : (
                <button
                  type="button"
                  onClick={secondaryCTA.onClick}
                  className={secondaryButtonClass}
                  onMouseEnter={() => onHoverCursor?.(secondaryCTA.label)}
                  onMouseLeave={() => onLeaveCursor?.()}
                >
                  <span>{secondaryCTA.label}</span>
                  {secondaryCTA.icon || (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              )
            )}
          </div>
        )}

        {/* 6. Custom Supporting Content (Trust strip, client review avatars, stats) */}
        {supportingContent && (
          <div className="mt-10 sm:mt-12 w-full flex justify-center">
            {supportingContent}
          </div>
        )}

        {/* 7. Supporting Brand Strip / Partner Logos (When configured) */}
        {supportingLogos && supportingLogos.length > 0 && (
          <div
            className={`mt-10 sm:mt-12 pt-8 border-t w-full max-w-5xl mx-auto ${
              isLightTheme ? 'border-[#E2E6EE]' : 'border-white/15'
            }`}
          >
            {supportingLogosTitle && (
              <p
                className={`font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-center mb-5 ${
                  isLightTheme ? 'text-[#46516A]' : 'text-white/70'
                }`}
              >
                {supportingLogosTitle}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 opacity-90 hover:opacity-100 transition-opacity">
              {supportingLogos.map((brand) => (
                <div
                  key={brand.name}
                  className={`flex items-center gap-2 group select-none transition-colors ${
                    isLightTheme
                      ? 'text-[#2C3D6C]/85 hover:text-[#2C3D6C]'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {brand.symbol && (
                    <span
                      className={`font-black text-xs sm:text-sm ${
                        isCrimsonTheme ? 'text-white/90' : 'text-[#E31E24]'
                      }`}
                    >
                      {brand.symbol}
                    </span>
                  )}
                  <div className="flex flex-col text-left">
                    <span
                      className={`font-display font-extrabold text-xs sm:text-sm tracking-tight leading-tight ${
                        isLightTheme ? 'text-[#2C3D6C]' : 'text-white'
                      }`}
                    >
                      {brand.name}
                    </span>
                    {brand.subtitle && (
                      <span
                        className={`font-mono text-[8px] tracking-wider leading-none ${
                          isLightTheme ? 'text-[#46516A]' : 'text-white/65'
                        }`}
                      >
                        {brand.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
