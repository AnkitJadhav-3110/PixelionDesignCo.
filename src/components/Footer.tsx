import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Linkedin, MessageCircle, ExternalLink } from 'lucide-react';
import { studioInfo } from '../data/pixelionData';
import { CursorState } from '../types';

interface FooterProps {
  setCursorState: (state: CursorState) => void;
  onOpenContact?: () => void;
}

export default function Footer({ setCursorState, onOpenContact }: FooterProps) {
  return (
    <footer className="bg-[#2C3D6C] text-[#FDFEFE] pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Red Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#E31E24]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Top Section: Brand + Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group font-display font-black text-2xl sm:text-3xl tracking-tight text-[#FDFEFE] hover:text-[#E31E24] transition-colors"
              onMouseEnter={() => setCursorState({ variant: 'hover', text: 'PIXELION' })}
              onMouseLeave={() => setCursorState({ variant: 'default' })}
            >
              <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <img
                  src="/logo.svg"
                  alt="Pixelion Design Co."
                  className="w-full h-full object-contain"
                />
              </div>
              <span>PIXELION DESIGN CO.</span>
            </Link>

            <p className="font-sans-body text-xs sm:text-sm text-white/80 max-w-sm leading-relaxed">
              {studioInfo.positioning}
            </p>

            <div className="pt-2 font-mono text-xs text-[#E31E24] font-bold">
              "{studioInfo.tagline}"
            </div>

            <div className="pt-4 flex items-center gap-3">
              <a
                href={studioInfo.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E31E24] hover:text-white transition-all text-white/80"
                title="Instagram"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'INSTA' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={studioInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E31E24] hover:text-white transition-all text-white/80"
                title="LinkedIn"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'LINKEDIN' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={studioInfo.behance}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E31E24] hover:text-white transition-all text-white/80"
                title="Behance"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'BEHANCE' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                Bē
              </a>
              <a
                href={studioInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E31E24] hover:text-white transition-all text-white/80"
                title="WhatsApp"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'WHATSAPP' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white tracking-wide mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-sans-body text-xs text-white/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-white transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-display font-bold text-sm text-white tracking-wide mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 font-sans-body text-xs text-white/80">
              <li>
                <Link to="/services/branding" className="hover:text-white transition-colors">Branding</Link>
              </li>
              <li>
                <Link to="/services/print-packaging" className="hover:text-white transition-colors">Print Design</Link>
              </li>
              <li>
                <Link to="/services/ui-ux" className="hover:text-white transition-colors">UI/UX Design</Link>
              </li>
              <li>
                <Link to="/services/social-media" className="hover:text-white transition-colors">Social Media Design</Link>
              </li>
              <li>
                <Link to="/services/print-packaging" className="hover:text-white transition-colors">Packaging Design</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#E31E24] transition-colors font-medium">All Services →</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="font-display font-bold text-sm text-white tracking-wide mb-4">
              Contact Info
            </h4>
            <div className="space-y-3 font-sans-body text-xs text-white/80">
              <p className="flex items-center gap-2">
                <span className="text-[#E31E24]">📞</span>
                <a href={studioInfo.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  +91-70161 31424
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#E31E24]">✉️</span>
                <a href={`mailto:${studioInfo.email}`} className="hover:text-white transition-colors truncate">
                  pixeliondesignco.1702@gmail.com
                </a>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#E31E24]">📍</span>
                <span>{studioInfo.location}</span>
              </p>
            </div>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="font-display font-bold text-sm text-white tracking-wide mb-4">
              Newsletter
            </h4>
            <p className="font-sans-body text-xs text-white/80 mb-3 leading-relaxed">
              Stay updated with our latest designs and creative offers.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white text-[#2C3D6C] px-3.5 py-2.5 rounded-l-xl text-xs font-sans-body placeholder:text-gray-400 focus:outline-hidden"
              />
              <button
                type="submit"
                className="bg-[#E31E24] hover:bg-[#C81920] text-white p-2.5 rounded-r-xl transition-colors shrink-0"
                aria-label="Subscribe to newsletter"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/60">
          <div>
            © 2025 PixelionDesignCo. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</span>
            <span>•</span>
            <Link to="/founder" className="text-[#E31E24] hover:underline">
              Founded by Dhruvrajsinh Rana
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
