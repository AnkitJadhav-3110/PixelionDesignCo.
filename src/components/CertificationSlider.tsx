import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Award, ShieldCheck, ExternalLink, X, ZoomIn } from 'lucide-react';
import { Certification, certificationsData } from '../data/certifications';

interface CertificationSliderProps {
  certifications?: Certification[];
}

export default function CertificationSlider({
  certifications = certificationsData,
}: CertificationSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Quadruple items to guarantee a wide seamless infinite loop across any viewport width
  const loopedItems = [...certifications, ...certifications, ...certifications, ...certifications];

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Keyboard Escape and body scroll lock for active certificate inspection modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCert) {
        setActiveCert(null);
      }
    };
    if (activeCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [activeCert]);

  // Continuous animation loop using requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let lastTimestamp = performance.now();
    const speedPixelsPerSecond = 32; // refined, steady editorial pace

    const step = (now: number) => {
      const elapsed = Math.min(now - lastTimestamp, 100); // clamp delta
      lastTimestamp = now;

      const container = containerRef.current;
      const track = trackRef.current;

      if (container && track && !isPaused && !isHovered && !isDragging) {
        // Calculate single set width
        const totalItems = loopedItems.length;
        const singleSetWidth = track.scrollWidth / (totalItems / certifications.length);

        if (singleSetWidth > 0) {
          const moveBy = (speedPixelsPerSecond * elapsed) / 1000;
          container.scrollLeft += moveBy;

          // Seamless loop reset when scrolling past the single set width
          if (container.scrollLeft >= singleSetWidth * 2) {
            container.scrollLeft -= singleSetWidth;
          }
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isHovered, isDragging, prefersReducedMotion, certifications.length, loopedItems.length]);

  // Center initial scroll offset on mount so backward scroll is immediately available
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (container && track) {
      const singleSetWidth = track.scrollWidth / 4;
      if (singleSetWidth > 0) {
        container.scrollLeft = singleSetWidth;
      }
    }
  }, []);

  const getStepDistance = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 320;
    // Advance by roughly one card width plus gap
    const containerWidth = container.clientWidth;
    if (window.innerWidth < 640) {
      return containerWidth * 0.85; // Mobile: ~1.2 cards visible
    } else if (window.innerWidth < 1024) {
      return containerWidth / 2.5; // Tablet: ~2-3 cards
    } else {
      return containerWidth / 4.1; // Desktop: ~4 cards
    }
  }, []);

  const handlePrev = () => {
    setHasUserInteracted(true);
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const singleSetWidth = track.scrollWidth / 4;
    // If approaching start, jump forward by singleSetWidth seamlessly first
    if (container.scrollLeft <= singleSetWidth * 0.5) {
      container.scrollLeft += singleSetWidth;
    }

    const step = getStepDistance();
    container.scrollBy({ left: -step, behavior: 'smooth' });
  };

  const handleNext = () => {
    setHasUserInteracted(true);
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const singleSetWidth = track.scrollWidth / 4;
    // If approaching end, jump back by singleSetWidth seamlessly first
    if (container.scrollLeft >= singleSetWidth * 2.5) {
      container.scrollLeft -= singleSetWidth;
    }

    const step = getStepDistance();
    container.scrollBy({ left: step, behavior: 'smooth' });
  };

  // Keyboard navigation on slider container
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch and Mouse drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollStart(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollStart - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - container.offsetLeft);
    setScrollStart(container.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 1.2;
    container.scrollLeft = scrollStart - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section
      aria-label="Dhruvrajsinh Rana & Pixelion Design Co. Verified Certifications"
      className="py-16 bg-[#FDFEFE] border-b border-[#E2E6EE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" />
            <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
              VERIFIED CREDENTIALS & ACCREDITATION
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#2C3D6C] tracking-tight">
            Professional Certifications
          </h2>
          <p className="font-sans-body text-xs sm:text-sm text-[#46516A] mt-1 max-w-xl">
            Official accreditations in UI/UX design, graphic design education, and enterprise operations awarded to Dhruvrajsinh Rana.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous certifications"
            className="w-11 h-11 rounded-full bg-white border border-[#E2E6EE] hover:border-[#E31E24] hover:text-[#E31E24] text-[#2C3D6C] shadow-2xs flex items-center justify-center transition-all focus:outline-hidden focus:ring-2 focus:ring-[#E31E24] focus:ring-offset-2 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next certifications"
            className="w-11 h-11 rounded-full bg-white border border-[#E2E6EE] hover:border-[#E31E24] hover:text-[#E31E24] text-[#2C3D6C] shadow-2xs flex items-center justify-center transition-all focus:outline-hidden focus:ring-2 focus:ring-[#E31E24] focus:ring-offset-2 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Carousel Track */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Certifications carousel"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUpOrLeave();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full overflow-x-auto scrollbar-none scroll-smooth select-none cursor-grab active:cursor-grabbing focus:outline-hidden focus:ring-1 focus:ring-[#E31E24]/30 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 px-4 sm:px-6 lg:px-10 w-max"
        >
          {loopedItems.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              onClick={() => setActiveCert(cert)}
              className="group relative w-[270px] sm:w-[320px] lg:w-[340px] shrink-0 bg-white border border-[#E2E6EE] rounded-2xl p-5 shadow-2xs hover:shadow-xl hover:border-[#E31E24] transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Top ambient highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E31E24] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Visual Certificate Card / Image Preview */}
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#FDFEFE] border border-[#E2E6EE] mb-4 group-hover:border-[#E31E24]/30 transition-colors">
                  <img
                    src={cert.image}
                    alt={`${cert.title} awarded by ${cert.issuer}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* Subtle Zoom Overlay Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-sans-body text-xs font-bold tracking-wider">
                    <ZoomIn className="w-4 h-4" />
                    <span>VIEW CERTIFICATE</span>
                  </div>
                  {cert.year && (
                    <span className="absolute top-2.5 right-2.5 bg-[#2C3D6C]/90 backdrop-blur-xs text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider">
                      {cert.year}
                    </span>
                  )}
                </div>

                {/* Issuer & Title Info */}
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E31E24] shrink-0" />
                  <span className="font-mono text-[11px] font-bold text-[#E31E24] uppercase tracking-wider line-clamp-1">
                    {cert.issuer}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-base text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors leading-snug line-clamp-2 mb-2">
                  {cert.title}
                </h3>

                {cert.description && (
                  <p className="font-sans-body text-xs text-[#46516A] leading-relaxed line-clamp-2 mb-3">
                    {cert.description}
                  </p>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-[#E2E6EE] flex items-center justify-between text-xs font-mono text-[#46516A]">
                {cert.credentialId ? (
                  <span className="font-semibold text-[10px] text-[#46516A]">
                    ID: {cert.credentialId}
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-bold text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified Official
                  </span>
                )}
                <span className="font-sans-body text-[11px] font-bold text-[#E31E24] group-hover:translate-x-0.5 transition-transform">
                  Inspect →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal Viewer for Full Inspection */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E2E6EE] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E2E6EE] mb-6">
              <div>
                <span className="font-mono text-xs font-bold text-[#E31E24] uppercase tracking-wider block mb-1">
                  OFFICIAL VERIFIED CERTIFICATION
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#2C3D6C]">
                  {activeCert.title}
                </h3>
                <p className="font-sans-body text-xs sm:text-sm text-[#46516A]">
                  Awarded to Dhruvrajsinh Rana by {activeCert.issuer}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close certificate dialog"
                className="w-10 h-10 rounded-full bg-[#2C3D6C]/5 hover:bg-[#2C3D6C]/10 text-[#2C3D6C] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Certificate Graphic */}
            <div className="rounded-2xl overflow-hidden border border-[#E2E6EE] bg-white shadow-inner mb-6">
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Credential Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FDFEFE] border border-[#E2E6EE] p-4 rounded-2xl text-xs font-sans-body">
              <div>
                <span className="font-mono text-[10px] text-[#46516A] uppercase block font-bold">
                  ISSUING BODY
                </span>
                <span className="font-semibold text-[#2C3D6C]">{activeCert.issuer}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#46516A] uppercase block font-bold">
                  CREDENTIAL STATUS
                </span>
                <span className="font-semibold text-emerald-700">Verified & Active</span>
              </div>
              {activeCert.credentialId && (
                <div>
                  <span className="font-mono text-[10px] text-[#46516A] uppercase block font-bold">
                    CREDENTIAL ID
                  </span>
                  <span className="font-mono font-bold text-[#2C3D6C]">
                    {activeCert.credentialId}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
