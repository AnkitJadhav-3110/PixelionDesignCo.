import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ImageOff } from 'lucide-react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  blurColor?: string;
  placeholderTone?: 'light' | 'dark' | 'auto';
  objectFit?: 'cover' | 'contain';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

/**
 * LazyImage Component:
 * - Always renders <img> with native lazy loading + decoding="async" so mobile
 *   and slow networks never get stuck on missed IntersectionObserver thresholds.
 * - Synchronous cached-image check on ref mount & src change prevents infinite
 *   shimmer skeletons or blank cards at the bottom of long portfolio grids.
 * - Graceful error fallback only when an image genuinely fails to load.
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  placeholderTone = 'auto',
  objectFit = 'cover',
  referrerPolicy = 'no-referrer',
  ...rest
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const attachImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node;
      if (node && node.complete) {
        if (node.naturalWidth > 0) {
          setIsLoaded(true);
          setHasError(false);
        }
      }
    },
    []
  );

  // Reset states cleanly when src updates and check cache immediately
  useEffect(() => {
    setHasError(false);
    const node = imgRef.current;
    if (node && node.complete && node.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  const handleLoad = () => {
    setHasError(false);
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const toneClasses = {
    light: 'bg-[#F3F5F9] text-[#2C3D6C]/30',
    dark: 'bg-white/5 text-white/30',
    auto: 'bg-[#F3F5F9] text-[#2C3D6C]/30',
  }[placeholderTone];

  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center ${toneClasses} ${containerClassName}`}
    >
      {/* Subtle Shimmer Placeholder while fetching */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-[shimmer_1.6s_infinite]" />
        </div>
      )}

      {/* Fallback state if image URL genuinely fails */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#FDFEFE]">
          <ImageOff className="w-8 h-8 text-[#E31E24]/60 mb-2" />
          <span className="font-mono text-[11px] font-bold text-[#46516A] uppercase tracking-wider">
            {alt || 'Visual preview'}
          </span>
        </div>
      ) : (
        <img
          ref={attachImgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy={referrerPolicy}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${fitClass} object-center transition-opacity duration-300 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...rest}
        />
      )}
    </div>
  );
}
