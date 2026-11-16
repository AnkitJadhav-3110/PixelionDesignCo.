import { trustedBrands } from '../data/pixelionData';

interface TrustedByRibbonProps {
  title?: string;
  variant?: 'worldwide' | 'clients' | 'compact';
}

export default function TrustedByRibbon({
  title = 'TRUSTED BY 250+ BRANDS WORLDWIDE',
  variant = 'worldwide',
}: TrustedByRibbonProps) {
  return (
    <section className="py-8 sm:py-10 border-y border-[#E2E6EE]/80 bg-[#FDFEFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <p className="font-mono text-[10px] sm:text-xs font-bold text-[#46516A]/70 uppercase tracking-[0.25em] text-center mb-6 sm:mb-8">
          {title}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-5 sm:gap-x-10 opacity-85 hover:opacity-100 transition-opacity">
          {trustedBrands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2 group select-none text-[#2C3D6C] hover:text-[#E31E24] transition-colors"
            >
              <span className="text-[#E31E24] font-black text-xs sm:text-sm group-hover:scale-110 transition-transform">
                {brand.symbol}
              </span>
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-xs sm:text-sm tracking-tight leading-tight">
                  {brand.name}
                </span>
                <span className="font-mono text-[8px] text-[#46516A] tracking-wider leading-none">
                  {brand.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
