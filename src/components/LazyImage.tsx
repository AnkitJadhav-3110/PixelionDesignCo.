import React, { useState, useRef, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  blurColor?: string;
  placeholderTone?: 'light' | 'dark' | 'auto';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

/**
 * LazyImage Component:
 * - Intersection Observer-based lazy loading with 250px rootMargin prefetch
 * - CSS progressive blur-up placeholder effect upon load
 * - Cached image instant-display handling to avoid flash
 * - High-fidelity fallback on network failures
 * - Preserves responsive aspect ratios and hover zoom effects
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  placeholderTone = 'auto',
  referrerPolicy = 'no-referrer',
  ...rest
}: LazyImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(priority);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Intersection Observer for viewport detection
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        rootMargin: '250px 0px', // Begin loading 250px before entering viewport for seamless UX
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  // Check if image is already cached by browser
  useEffect(() => {
    if (isInView && imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [isInView, src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const toneClasses = {
    light: 'bg-[#E2E6EE]/50 text-[#2C3D6C]/30',
    dark: 'bg-white/5 text-white/30',
    auto: 'bg-[#2C3D6C]/5 text-[#2C3D6C]/30',
  }[placeholderTone];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${toneClasses} ${containerClassName}`}
    >
      {/* CSS Blur-Up Placeholder Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-10">
          {/* Ambient blurred backdrop aura */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E31E24]/10 via-[#2C3D6C]/5 to-transparent blur-md" />
          
          {/* Animated subtle shimmer wave */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          
          {/* Subtle center brand glow */}
          <div className="w-16 h-16 rounded-full bg-[#E31E24]/10 blur-xl" />
        </div>
      )}

      {/* Fallback state if image URL fails */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#FDFEFE]">
          <ImageOff className="w-8 h-8 text-[#E31E24]/60 mb-2" />
          <span className="font-mono text-[11px] font-bold text-[#46516A] uppercase tracking-wider">
            {alt || 'Visual preview'}
          </span>
        </div>
      ) : isInView ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy={referrerPolicy}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded
              ? 'opacity-100 filter blur-0 scale-100'
              : 'opacity-0 filter blur-xl scale-110'
          } ${className}`}
          {...rest}
        />
      ) : (
        /* Empty placeholder prior to intersection observer trigger */
        <div className="w-full h-full bg-transparent" />
      )}
    </div>
  );
}
