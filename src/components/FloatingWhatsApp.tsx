import { studioInfo } from '../data/pixelionData';
import { CursorState } from '../types';
import WhatsAppIcon from './WhatsAppIcon';

interface FloatingWhatsAppProps {
  setCursorState: (state: CursorState) => void;
}

export default function FloatingWhatsApp({ setCursorState }: FloatingWhatsAppProps) {
  return (
    <a
      href={studioInfo.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pixelion Design Co. on WhatsApp"
      title="Chat on WhatsApp"
      onMouseEnter={() => setCursorState({ variant: 'hover', text: 'WHATSAPP' })}
      onMouseLeave={() => setCursorState({ variant: 'default' })}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 group flex items-center gap-2.5 focus:outline-hidden"
    >
      {/* Desktop Hover Label */}
      <span className="hidden md:inline-flex items-center gap-1.5 bg-[#2C3D6C] text-[#FDFEFE] border border-white/15 px-3.5 py-2 rounded-full font-cta text-[11px] font-bold tracking-wider shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        <span>Chat on WhatsApp</span>
      </span>

      {/* Floating Circular Button Matching Pixelion Navy/Crimson Theme */}
      <span className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2C3D6C] group-hover:bg-[#E31E24] text-[#FDFEFE] border-2 border-white/20 shadow-xl group-hover:shadow-red-900/30 flex items-center justify-center transition-all duration-300 group-hover:scale-105 active:scale-95">
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        {/* Subtle Live Status Indicator Dot */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border-2 border-[#FDFEFE]" />
        </span>
      </span>
    </a>
  );
}
