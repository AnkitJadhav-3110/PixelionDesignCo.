import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Check, FileText, ArrowDownRight, ShieldCheck } from 'lucide-react';
import { CursorState, UserSettings } from '../types';

interface ResumeDownloadButtonProps {
  userSettings?: UserSettings;
  setCursorState: (state: CursorState) => void;
}

export default function ResumeDownloadButton({
  userSettings,
  setCursorState,
}: ResumeDownloadButtonProps) {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleDownload = () => {
    setDownloading(true);

    setTimeout(() => {
      // Create a formatted text/PDF mock document content
      const resumeContent = `
================================================================================
                    DHRUVRAJSINH RANA — RESUME & PORTFOLIO
                        PIXELION DESIGN CO. FOUNDER
================================================================================
Location: Bharuch, Gujarat, India | WhatsApp/Phone: +91 7016131424
Email: pixeliondesignco.1702@gmail.com | Portfolio: https://pixeliondesign.co
LinkedIn: linkedin.com/in/rana-dhruvrajsinh-648850221
Behance: behance.net/ranadhruvr13f6
Instagram: @pixeliondesign_1702

--------------------------------------------------------------------------------
PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
Lead Graphic & UI/UX Designer with over 4 years of experience bridging user-centered
interface design, brand identity systems, social media creative direction, and
print production. Founder of Pixelion Design Co., serving startups and enterprises
across India and internationally.

--------------------------------------------------------------------------------
CORE COMPETENCIES & SKILLS
--------------------------------------------------------------------------------
• UI/UX & Digital Product: UI/UX Design, Mobile App Interfaces, User Research,
  Wireframing & Prototyping, Accessibility in UX Design, Design Systems.
• Branding & Identity: Logo Design, Brand Identity Kits, Packaging, Catalogs,
  Brochures, Brand Strategy.
• Graphic & Print: Event/Wedding Invitations, Festival Posts, Social Media Kits,
  Banner & Poster Design, GST Invoices.
• Software Suite: Figma, Adobe Photoshop (Ps), Adobe Illustrator (Ai), Adobe
  InDesign (Id), Adobe After Effects (Ae), CorelDRAW, Blue Prism Automation.

--------------------------------------------------------------------------------
WORK EXPERIENCE
--------------------------------------------------------------------------------
Pixelion Design Co. | Founder & Lead Designer
2023 — PRESENT | Bharuch, Gujarat, India
• Directed end-to-end creative solutions for 40+ brand identity kits and UI/UX projects.
• Created digital payment, guidance, and e-commerce mobile app interface case studies.
• Managed graphic, print, and social media production workflows.

--------------------------------------------------------------------------------
EDUCATION & CERTIFICATIONS
--------------------------------------------------------------------------------
• UI/UX Design Course Certification — Teachnook Educational Consultant
  Credential ID: TNINTC22-2961 (Issued Mar 2023)
• Entrepreneurship Development Program — CED Gujarat (Issued Sep 2022)
  Centre For Entrepreneurship Development
• Blue Prism Automation Certification — SS&C Blue Prism (Issued Jul 2022)
• Graphic & UI Design Diploma — Red & White Skill Education Official

--------------------------------------------------------------------------------
SELECTED CASE STUDIES
--------------------------------------------------------------------------------
1. Expert Connect Mobile App & Web UI/UX
2. EasyPay Payment Application UX Case Study
3. FreshSip Minimal Juice Brand & Packaging
4. Google Gemini Interface Redesign Concept

================================================================================
              DOCUMENT VERIFIED — PIXELION DESIGN CO. 2026
================================================================================
`;

      const link = document.createElement('a');
      link.href = '/assets/Dhruvrajsinh_Rana_Graphic_CV.pdf';
      link.download = 'Dhruvrajsinh_Rana_Graphic_CV_PixelionDesignCo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
      setDownloaded(true);

      setTimeout(() => {
        setDownloaded(false);
      }, 4000);
    }, 800);
  };

  return (
    <div className="bg-[#2C3D6C] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden my-16 shadow-xl border border-white/10">
      {/* Geometric Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E31E24] opacity-10 rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-full bg-[#E31E24]" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#E31E24]" />
            <span className="font-mono text-xs font-bold tracking-widest text-[#E31E24] uppercase">
              GEOMETRIC BALANCE CV SPECIFICATION
            </span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
            Curriculum Vitae & Verified Credentials
          </h3>

          <p className="font-sans-body text-xs sm:text-sm text-white/80 leading-relaxed">
            Download Dhruvrajsinh Rana's complete profile document containing verified credentials, software proficiencies, project records, and contact details from Pixelion Design Co.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 font-mono text-[11px] text-white/60">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#E31E24]" /> FORMAT: TEXT/PDF CV
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-white/80" /> VERIFIED 2026
            </span>
          </div>
        </div>

        {/* Geometric Balance Action Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <motion.button
            onClick={handleDownload}
            disabled={downloading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`relative group w-full sm:w-auto overflow-hidden px-8 py-5 rounded-2xl font-cta text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-4 border shadow-2xl ${
              downloaded
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-[#E31E24] hover:bg-[#C81920] border-[#E31E24] text-white'
            }`}
            onMouseEnter={() => setCursorState({ variant: 'hover', text: downloaded ? 'SAVED' : 'DOWNLOAD' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            {/* Corner Geometric Frame lines */}
            <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-white/60 pointer-events-none" />
            <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-white/60 pointer-events-none" />

            <div className="flex items-center gap-3">
              {downloading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : downloaded ? (
                <Check className="w-5 h-5 text-white animate-bounce" />
              ) : (
                <Download className="w-5 h-5 text-white group-hover:translate-y-0.5 transition-transform" />
              )}

              <span className="uppercase">
                {downloading
                  ? 'GENERATING RESUME...'
                  : downloaded
                  ? 'RESUME DOWNLOADED!'
                  : 'DOWNLOAD RESUME (CV)'}
              </span>

              <ArrowDownRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
