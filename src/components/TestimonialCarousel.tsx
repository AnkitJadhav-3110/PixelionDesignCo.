import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Play, X, Volume2, Sparkles } from 'lucide-react';
import { Testimonial, verifiedTestimonials } from '../data/testimonials';

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  onOpenContact?: () => void;
  hideIfEmpty?: boolean;
}

export default function TestimonialCarousel({
  testimonials = verifiedTestimonials,
  eyebrow = 'CLIENTS LOVE US',
  title = 'Testimonials',
  subtitle = 'Real feedback from founders and organizations who collaborated with Pixelion Design Co.',
  onOpenContact,
  hideIfEmpty = false,
}: TestimonialCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive state
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Carousel sliding state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0); // px offset during active transition
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // Drag / touch interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);

  // Video modal state
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);

  // Accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Update viewport width on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setViewportWidth(containerRef.current.clientWidth);
      } else {
        setViewportWidth(window.innerWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = testimonials?.length || 0;

  // Determine responsive parameters
  // Desktop: >= 1200px (3 prominent cards + adjacent previews)
  // Tablet: 768px - 1199px (2 prominent cards + preview)
  // Mobile: < 768px (1 prominent card)
  const { visibleCount, cardWidth, gap } = useMemo(() => {
    if (viewportWidth >= 1200) {
      return { visibleCount: 3, cardWidth: 360, gap: 28 };
    } else if (viewportWidth >= 768) {
      return { visibleCount: 2, cardWidth: 340, gap: 24 };
    } else {
      // Mobile: 1 card fitting screen comfortably without overflow
      const mobileCardWidth = Math.min(Math.max(viewportWidth - 48, 280), 360);
      return { visibleCount: 1, cardWidth: mobileCardWidth, gap: 16 };
    }
  }, [viewportWidth]);

  const stepDistance = cardWidth + gap;

  // Compute center offset to ensure visible cards are centered within viewportWidth
  const centerOffset = useMemo(() => {
    const activeClusterWidth = visibleCount * cardWidth + (visibleCount - 1) * gap;
    return Math.max(16, (viewportWidth - activeClusterWidth) / 2);
  }, [viewportWidth, visibleCount, cardWidth, gap]);

  // Navigate next with smooth transition and wrap
  const handleNext = useCallback(() => {
    if (isAnimating || total <= 1) return;
    setIsAnimating(true);
    setTransitionEnabled(true);
    setSlideOffset(-stepDistance);

    const duration = prefersReducedMotion ? 50 : 450;
    setTimeout(() => {
      setTransitionEnabled(false);
      setCurrentIndex((prev) => (prev + 1) % total);
      setSlideOffset(0);
      // Re-enable transitions after instant index jump
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setIsAnimating(false);
        });
      });
    }, duration);
  }, [isAnimating, total, stepDistance, prefersReducedMotion]);

  // Navigate prev with smooth transition and wrap
  const handlePrev = useCallback(() => {
    if (isAnimating || total <= 1) return;
    setIsAnimating(true);
    setTransitionEnabled(true);
    setSlideOffset(stepDistance);

    const duration = prefersReducedMotion ? 50 : 450;
    setTimeout(() => {
      setTransitionEnabled(false);
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setSlideOffset(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setIsAnimating(false);
        });
      });
    }, duration);
  }, [isAnimating, total, stepDistance, prefersReducedMotion]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Drag / touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating || total <= 1) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - dragStartX;
    setDragDeltaX(delta);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX < -50) {
      handleNext();
    } else if (dragDeltaX > 50) {
      handlePrev();
    }
    setDragDeltaX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating || total <= 1) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDeltaX(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setDragDeltaX(delta);
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX < -50) {
      handleNext();
    } else if (dragDeltaX > 50) {
      handlePrev();
    }
    setDragDeltaX(0);
  };

  // Helper for rendering client company logos matching Radix reference
  const renderCompanyLogo = (companyLogo?: string) => {
    if (!companyLogo) return null;

    if (companyLogo.toUpperCase().includes('URBAN SPACE')) {
      return (
        <div className="flex items-center gap-1.5" title="Urban Space Interiors">
          <div className="w-5 h-5 bg-[#E31E24] text-white flex items-center justify-center font-display font-black text-[10px] rounded-xs shadow-xs">
            U
          </div>
          <span className="font-display font-extrabold text-xs tracking-wider text-[#2C3D6C]">
            URBAN SPACE
          </span>
        </div>
      );
    }

    if (companyLogo.toUpperCase().includes('AB NATURALS')) {
      return (
        <div className="flex items-center gap-1.5" title="AB Naturals">
          <svg className="w-4 h-4 text-emerald-600 fill-current" viewBox="0 0 24 24">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
          <span className="font-display font-black text-xs tracking-wider text-[#2C3D6C]">
            AB NATURALS
          </span>
        </div>
      );
    }

    if (companyLogo.toUpperCase().includes('HERBIONICS')) {
      return (
        <div className="flex items-center gap-1" title="Herbionics">
          <span className="font-display font-black text-xs tracking-wider text-[#2C3D6C]">
            HERBIONICS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24]" />
        </div>
      );
    }

    if (companyLogo.toUpperCase().includes('FITFUEL')) {
      return (
        <div className="flex items-center gap-0.5" title="FitFuel Nutrition">
          <span className="font-display font-black text-xs tracking-tight text-[#E31E24]">
            FIT
          </span>
          <span className="font-display font-black text-xs tracking-tight text-[#2C3D6C]">
            FUEL
          </span>
        </div>
      );
    }

    return (
      <span className="font-display font-extrabold text-xs tracking-wider text-[#2C3D6C]/80 uppercase">
        {companyLogo}
      </span>
    );
  };

  if (!total && hideIfEmpty) {
    return null;
  }

  // Render slots relative to current index:
  // Slot -1: left peek
  // Slots 0 to visibleCount - 1: prominent active cards
  // Slot visibleCount: right peek
  // Slot visibleCount + 1: transition buffer
  const slotsToRender = useMemo(() => {
    const slots: number[] = [];
    const minSlot = -1;
    const maxSlot = visibleCount + 1;
    for (let s = minSlot; s <= maxSlot; s++) {
      slots.push(s);
    }
    return slots;
  }, [visibleCount]);

  return (
    <section
      aria-label="Testimonials"
      className="py-20 sm:py-28 bg-[#F8FAFC] border-y border-[#E2E6EE] overflow-hidden relative select-none"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-gradient-to-r from-blue-50/50 via-slate-50/30 to-red-50/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Centered Section Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E31E24]" />
            <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#2C3D6C] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="font-sans-body text-xs sm:text-sm text-[#46516A] mt-3 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* 2. Horizontal Testimonial Carousel Viewport */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonial slider"
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing focus:outline-none py-2"
        style={{ minHeight: '480px' }}
      >
        {/* Sliding Track */}
        <div
          className="flex items-stretch"
          style={{
            transform: `translate3d(${centerOffset + slideOffset + dragDeltaX}px, 0, 0)`,
            transition:
              transitionEnabled && !isDragging
                ? 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)'
                : 'none',
            gap: `${gap}px`,
          }}
        >
          {slotsToRender.map((slot) => {
            const itemIndex = (currentIndex + slot + total * 100) % total;
            const item = testimonials[itemIndex];
            if (!item) return null;

            // Determine if card is in the active center group or outer preview
            const isActive = slot >= 0 && slot < visibleCount;
            const isPeek = slot === -1 || slot === visibleCount;
            const isVideo = item.isVideoTestimonial;

            return (
              <div
                key={`slot-${slot}-${item.id}`}
                style={{
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`,
                  maxWidth: `${cardWidth}px`,
                }}
                className={`shrink-0 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? 'opacity-100 scale-100 border-[#CFDFEE] shadow-sm hover:shadow-xl hover:border-[#E31E24] bg-white'
                    : isPeek
                    ? 'opacity-40 scale-[0.98] border-[#CFDFEE]/80 bg-white pointer-events-none'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {/* A. Testimonial Content Area (Speech Bubble) */}
                <div className="relative bg-white p-6 sm:p-8 flex-1 flex flex-col justify-between min-h-[240px] sm:min-h-[260px]">
                  {/* Upper Row: Cyan Quotation Mark + Company Logo */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="text-[#0284c7] shrink-0">
                      <svg className="w-8 h-8 sm:w-9 sm:h-9 fill-current" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {item.companyLogo && (
                      <div className="shrink-0">
                        {renderCompanyLogo(item.companyLogo)}
                      </div>
                    )}
                  </div>

                  {/* Testimonial Quote Text */}
                  <p className="font-sans-body text-xs sm:text-[14px] text-[#2C3D6C] leading-relaxed my-auto font-normal">
                    {item.quote}
                  </p>

                  {/* Downward Speech Bubble Pointer / Notch */}
                  <div
                    className="absolute -bottom-[9px] left-8 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[9px] border-t-white z-20 drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)]"
                    aria-hidden="true"
                  />
                </div>

                {/* B. Client Information Footer */}
                {isVideo ? (
                  /* Dedicated Video Testimonial Card Footer (Radix 3rd Card Reference) */
                  <div className="bg-[#1C2536] text-white p-5 sm:p-6 flex items-center justify-between gap-4 relative z-10 border-t border-[#1C2536]">
                    {/* Video Thumbnail with Centered Play Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideo(item);
                      }}
                      className="relative w-16 h-16 sm:w-20 sm:h-16 rounded-xl overflow-hidden shrink-0 group/video cursor-pointer border border-white/20 shadow-md focus:outline-none"
                      aria-label={`Watch video testimonial by ${item.clientName}`}
                    >
                      <img
                        src={item.videoThumbnail || item.avatar}
                        alt={item.clientName}
                        className="w-full h-full object-cover group-hover/video:scale-108 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white text-[#1C2536] flex items-center justify-center shadow-lg group-hover/video:bg-[#E31E24] group-hover/video:text-white transition-all transform group-hover/video:scale-110">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </button>

                    {/* Contrasting Author Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm sm:text-base text-white truncate">
                        {item.clientName}
                      </h4>
                      <p className="font-sans-body text-xs text-white/80 truncate mt-0.5 font-medium">
                        {item.company}
                      </p>
                      {item.role && (
                        <p className="font-sans-body text-[11px] text-white/50 truncate">
                          {item.role}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard Testimonial Card Footer */
                  <div className="bg-[#EEF4F9] p-5 sm:p-6 flex items-center gap-4 relative z-10 border-t border-[#DDE8F2]">
                    {/* Client Profile Image */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#DCE7F2] shadow-2xs bg-white">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.clientName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#2C3D6C] text-white flex items-center justify-center font-display font-black text-lg">
                          {item.clientName.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Client Name & Designation */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#2C3D6C] truncate">
                        {item.clientName}
                      </h4>
                      <p className="font-sans-body text-xs text-[#46516A] truncate mt-0.5 font-medium">
                        {item.company}
                      </p>
                      {item.role && (
                        <p className="font-sans-body text-[11px] text-[#46516A]/75 truncate">
                          {item.role}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Centered Circular Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-10 sm:mt-12">
        <button
          type="button"
          onClick={handlePrev}
          disabled={total <= 1 || isAnimating}
          aria-label="Previous testimonial"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2C3D6C] text-white hover:bg-[#E31E24] shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={total <= 1 || isAnimating}
          aria-label="Next testimonial"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2C3D6C] text-white hover:bg-[#E31E24] shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* 4. Interactive Video Testimonial Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-[#2C3D6C]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#1C2536] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E31E24] text-white flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">
                    {activeVideo.clientName} • Client Review
                  </h3>
                  <p className="font-sans-body text-[11px] text-white/70">
                    {activeVideo.company} ({activeVideo.projectScope})
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Viewport Simulated Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeVideo.videoThumbnail || activeVideo.avatar}
                alt={activeVideo.clientName}
                className="w-full h-full object-cover opacity-85"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 flex flex-col justify-between p-6">
                <div className="flex items-center justify-between text-white text-xs">
                  <span className="bg-red-600/90 text-white px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Verified Video Testimonial
                  </span>
                  <div className="flex items-center gap-2 text-white/80">
                    <Volume2 className="w-4 h-4" />
                    <span>HD 1080p</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <blockquote className="text-white font-sans-body text-xs sm:text-sm italic leading-relaxed max-w-xl bg-black/40 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
                    "{activeVideo.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span>Pixelion Design Co. Partner Interview</span>
                    <span>1:42 / 1:42</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E31E24] w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#46516A]">
                <Sparkles className="w-4 h-4 text-[#E31E24]" />
                <span>Verified Client Collaboration with <strong>Pixelion Design Co.</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-full sm:w-auto bg-[#2C3D6C] hover:bg-[#E31E24] text-white px-6 py-2.5 rounded-full font-cta text-xs font-bold tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
