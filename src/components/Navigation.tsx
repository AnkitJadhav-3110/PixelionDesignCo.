import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { UserSettings, CursorState } from '../types';
import { MAIN_NAVIGATION, PRIMARY_CTA, NavMenuItem } from '../data/navigationData';
import NavIcon from './NavIcon';

interface NavigationProps {
  userSettings?: UserSettings;
  onOpenContact: () => void;
  onOpenCustomizer?: () => void;
  setCursorState: (state: CursorState) => void;
}

export default function Navigation({
  userSettings,
  onOpenContact,
  onOpenCustomizer,
  setCursorState,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const [expandedMobileAccordions, setExpandedMobileAccordions] = useState<Record<string, boolean>>({
    services: false,
  });

  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  // Detect scroll for header backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDesktopDropdown(null);
  }, [location.pathname]);

  // Handle outside click & Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDesktopDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDesktopDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [mobileMenuOpen]);

  // Desktop Hover Bridge handlers
  const handleMouseEnter = (itemId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDesktopDropdown(itemId);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDesktopDropdown(null);
    }, 150);
  };

  // Toggle mobile accordion
  const toggleMobileAccordion = (id: string) => {
    setExpandedMobileAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <header
        ref={navContainerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDFEFE]/95 backdrop-blur-md border-b border-[#E2E6EE] py-3.5 shadow-2xs'
            : 'bg-[#FDFEFE]/90 backdrop-blur-xs py-4 sm:py-5 border-b border-[#E2E6EE]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo & Wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-hidden shrink-0"
            onMouseEnter={() => setCursorState({ variant: 'hover', text: 'HOME' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            <img
              src="/logo.svg"
              alt="Pixelion Design Co."
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-display font-black text-sm sm:text-lg lg:text-xl tracking-tight text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors whitespace-nowrap">
                PIXELION DESIGN CO.
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#46516A]/70 tracking-wider hidden sm:block whitespace-nowrap">
                CREATIVE STUDIO • BHARUCH, GUJARAT
              </span>
            </div>
          </Link>

          {/* Desktop Primary Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {MAIN_NAVIGATION.map((item) => {
              const hasDropdown = Boolean(item.dropdown);
              const isDropdownActive = activeDesktopDropdown === item.id;
              const isCurrentRouteActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href) ||
                    (item.id === 'services' && location.pathname === '/categories') ||
                    (item.id === 'work' && location.pathname.startsWith('/case-studies'));

              if (!hasDropdown) {
                return (
                  <NavLink
                    key={item.id}
                    to={item.href}
                    end={item.href === '/'}
                    className={`font-sans-body text-xs font-bold tracking-wider px-3 py-2 rounded-xl transition-all duration-200 focus:outline-hidden ${
                      isCurrentRouteActive
                        ? 'text-[#E31E24] bg-[#E31E24]/5'
                        : 'text-[#2C3D6C]/85 hover:text-[#2C3D6C] hover:bg-[#2C3D6C]/5'
                    }`}
                    onMouseEnter={() => setCursorState({ variant: 'hover' })}
                    onMouseLeave={() => setCursorState({ variant: 'default' })}
                  >
                    {item.label}
                  </NavLink>
                );
              }

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDesktopDropdown(isDropdownActive ? null : item.id)}
                    className={`font-sans-body text-xs font-bold tracking-wider px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 focus:outline-hidden ${
                      isCurrentRouteActive || isDropdownActive
                        ? 'text-[#E31E24] bg-[#E31E24]/5'
                        : 'text-[#2C3D6C]/85 hover:text-[#2C3D6C] hover:bg-[#2C3D6C]/5'
                    }`}
                    onMouseEnter={() => setCursorState({ variant: 'hover' })}
                    onMouseLeave={() => setCursorState({ variant: 'default' })}
                    aria-expanded={isDropdownActive}
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 opacity-70 ${
                        isDropdownActive ? 'rotate-180 text-[#E31E24]' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {isDropdownActive && item.dropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className={`${
                            item.id === 'services' ? 'w-[750px]' : 'w-[680px]'
                          } max-w-[calc(100vw-2rem)] bg-white border border-[#E2E6EE] rounded-3xl shadow-2xl p-5 overflow-hidden`}
                        >
                          <div className="grid grid-cols-12 gap-5 items-stretch">
                            {/* Left Column: Featured Highlight Card */}
                            <div className="col-span-4 bg-[#2C3D6C] rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-inner">
                              {/* Ambient decorative glow */}
                              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E31E24]/20 rounded-full blur-2xl pointer-events-none" />

                              <div className="relative z-10 space-y-2.5">
                                <span className="font-mono text-[9px] font-bold text-[#E31E24] tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded-full inline-block">
                                  {item.dropdown.featured.eyebrow}
                                </span>
                                <h4
                                  className="font-display font-black text-base lg:text-lg text-white leading-tight"
                                  style={{ color: '#FFFFFF' }}
                                >
                                  {item.dropdown.featured.title}
                                </h4>
                                <p className="font-sans-body text-[11px] text-white/80 leading-relaxed">
                                  {item.dropdown.featured.description}
                                </p>
                              </div>

                              <div className="relative z-10 pt-4 space-y-2 border-t border-white/15 mt-4">
                                <Link
                                  to={item.dropdown.featured.primaryCta.href}
                                  onClick={() => setActiveDesktopDropdown(null)}
                                  className="w-full bg-[#E31E24] hover:bg-[#C81920] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between group shadow-sm"
                                >
                                  <span>{item.dropdown.featured.primaryCta.label}</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {item.dropdown.featured.secondaryCta && (
                                  <Link
                                    to={item.dropdown.featured.secondaryCta.href}
                                    onClick={() => setActiveDesktopDropdown(null)}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-[11px] font-semibold py-2 px-3 rounded-xl transition-colors flex items-center justify-between group"
                                  >
                                    <span>{item.dropdown.featured.secondaryCta.label}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                  </Link>
                                )}
                              </div>
                            </div>

                            {/* Right Column: Structured Items Grid */}
                            <div className="col-span-8 flex flex-col justify-between py-1">
                              {item.dropdown.sections.map((section) => (
                                <div key={section.title}>
                                  <div className="flex items-center justify-between border-b border-[#E2E6EE] pb-2 mb-3">
                                    <span className="font-mono text-[10px] font-bold text-[#46516A]/75 tracking-wider uppercase">
                                      {section.title}
                                    </span>
                                    <span className="font-mono text-[9px] text-[#E31E24] font-semibold">
                                      {section.items.length} Options
                                    </span>
                                  </div>

                                  <div
                                    className={`grid ${
                                      item.id === 'services' ? 'grid-cols-2 gap-2.5' : 'grid-cols-1 gap-2'
                                    }`}
                                  >
                                    {section.items.map((subItem) => (
                                      <Link
                                        key={subItem.id}
                                        to={subItem.href}
                                        onClick={() => setActiveDesktopDropdown(null)}
                                        className="group p-2.5 rounded-xl border border-transparent hover:border-[#E2E6EE] hover:bg-[#F7F9FC] transition-all flex items-start gap-3"
                                      >
                                        <div className="w-8 h-8 rounded-lg bg-[#2C3D6C]/5 text-[#2C3D6C] group-hover:bg-[#E31E24]/10 group-hover:text-[#E31E24] flex items-center justify-center shrink-0 transition-colors">
                                          <NavIcon name={subItem.iconName} className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center justify-between gap-1">
                                            <h5 className="font-display font-bold text-xs text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors truncate">
                                              {subItem.title}
                                            </h5>
                                            {subItem.badge && (
                                              <span className="font-mono text-[9px] bg-[#2C3D6C]/5 text-[#2C3D6C] px-1.5 py-0.5 rounded font-medium shrink-0">
                                                {subItem.badge}
                                              </span>
                                            )}
                                          </div>
                                          <p className="font-sans-body text-[10px] text-[#46516A] leading-snug line-clamp-1 mt-0.5">
                                            {subItem.description}
                                          </p>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Primary Get a Quote CTA Button */}
            <Link
              to={PRIMARY_CTA.href}
              className="bg-[#E31E24] hover:bg-[#C81920] text-white px-4 sm:px-5 py-2.5 rounded-full font-cta text-xs font-bold tracking-wider transition-all duration-200 shadow-sm flex items-center gap-2 focus:outline-hidden whitespace-nowrap group active:scale-95"
              onMouseEnter={() => setCursorState({ variant: 'hover', text: 'QUOTE' })}
              onMouseLeave={() => setCursorState({ variant: 'default' })}
            >
              <span>{PRIMARY_CTA.label}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-[#2C3D6C] text-[#FDFEFE] hover:bg-[#E31E24] transition-colors focus:outline-hidden flex items-center justify-center shrink-0 shadow-xs"
              aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Redesigned Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation Menu">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#2C3D6C]/50 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[380px] max-w-full bg-white shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="px-5 py-4 border-b border-[#E2E6EE] flex items-center justify-between shrink-0 bg-[#FDFEFE]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 focus:outline-hidden"
                >
                  <img src="/logo.svg" alt="Pixelion" className="w-7 h-7 object-contain" />
                  <div className="flex flex-col">
                    <span className="font-display font-black text-sm tracking-tight text-[#2C3D6C]">
                      PIXELION DESIGN CO.
                    </span>
                    <span className="font-mono text-[9px] text-[#46516A]/70 tracking-wider">
                      CREATIVE STUDIO
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#2C3D6C]/5 text-[#2C3D6C] hover:bg-[#E31E24]/10 hover:text-[#E31E24] flex items-center justify-center transition-colors focus:outline-hidden"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="overflow-y-auto px-4 py-4 space-y-1.5 flex-1">
                {MAIN_NAVIGATION.map((item) => {
                  const hasDropdown = Boolean(item.dropdown);
                  const isExpanded = expandedMobileAccordions[item.id] || false;
                  const isCurrentActive =
                    item.href === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.href) ||
                        (item.id === 'services' && location.pathname === '/categories') ||
                        (item.id === 'work' && location.pathname.startsWith('/case-studies'));

                  if (!hasDropdown) {
                    return (
                      <Link
                        key={item.id}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-display font-bold text-base transition-colors ${
                          isCurrentActive
                            ? 'text-[#E31E24] bg-[#E31E24]/10'
                            : 'text-[#2C3D6C] hover:bg-[#F7F9FC]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-4 h-4 opacity-40" />
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      className="border border-[#E2E6EE]/80 rounded-2xl overflow-hidden bg-white shadow-2xs"
                    >
                      {/* Accordion Header Row */}
                      <div className="flex items-center justify-between p-1">
                        <Link
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex-1 px-3 py-2.5 font-display font-bold text-base transition-colors ${
                            isCurrentActive ? 'text-[#E31E24]' : 'text-[#2C3D6C]'
                          }`}
                        >
                          {item.label}
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleMobileAccordion(item.id)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors focus:outline-hidden ${
                            isExpanded
                              ? 'bg-[#E31E24]/10 text-[#E31E24]'
                              : 'bg-[#2C3D6C]/5 text-[#2C3D6C]'
                          }`}
                          aria-label={isExpanded ? `Collapse ${item.label} menu` : `Expand ${item.label} menu`}
                          aria-expanded={isExpanded}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Accordion Content */}
                      <AnimatePresence>
                        {isExpanded && item.dropdown && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden border-t border-[#E2E6EE] bg-[#F7F9FC] p-3 space-y-1.5"
                          >
                            {/* Primary & Secondary Overview CTAs */}
                            <Link
                              to={item.dropdown.featured.primaryCta.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white text-xs font-bold text-[#2C3D6C] hover:text-[#E31E24] border border-[#E2E6EE] transition-colors shadow-2xs"
                            >
                              <span>{item.dropdown.featured.primaryCta.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#E31E24]" />
                            </Link>

                            {item.dropdown.featured.secondaryCta && (
                              <Link
                                to={item.dropdown.featured.secondaryCta.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white text-xs font-bold text-[#2C3D6C] hover:text-[#E31E24] border border-[#E2E6EE] transition-colors shadow-2xs"
                              >
                                <span>{item.dropdown.featured.secondaryCta.label}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-[#2C3D6C]/60" />
                              </Link>
                            )}

                            <div className="border-t border-[#E2E6EE]/80 my-2 pt-1">
                              <span className="font-mono text-[9px] uppercase tracking-wider text-[#46516A]/70 px-2 block mb-1">
                                {item.dropdown.sections[0]?.title}
                              </span>
                            </div>

                            {/* Sub items list */}
                            {item.dropdown.sections[0]?.items.map((subItem) => (
                              <Link
                                key={subItem.id}
                                to={subItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white text-xs font-sans-body font-medium text-[#46516A] hover:text-[#E31E24] transition-colors"
                              >
                                <div className="w-6 h-6 rounded-md bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center shrink-0">
                                  <NavIcon name={subItem.iconName} className="w-3.5 h-3.5" />
                                </div>
                                <span className="truncate flex-1">{subItem.title}</span>
                                {subItem.badge && (
                                  <span className="font-mono text-[9px] bg-white text-[#2C3D6C] px-1.5 py-0.5 rounded border border-[#E2E6EE] shrink-0">
                                    {subItem.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer with Primary CTA & Quick Contacts */}
              <div className="p-4 border-t border-[#E2E6EE] bg-[#FDFEFE] space-y-3 shrink-0">
                <Link
                  to={PRIMARY_CTA.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#E31E24] hover:bg-[#C81920] text-white py-3 px-4 rounded-xl font-cta text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <span>{PRIMARY_CTA.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between text-[11px] font-sans-body text-[#46516A] pt-1 px-1">
                  <a
                    href="tel:+917016131424"
                    className="flex items-center gap-1.5 hover:text-[#E31E24] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E31E24]" />
                    <span>+91-70161 31424</span>
                  </a>

                  <a
                    href="https://wa.me/917016131424?text=Hello%20Pixelion%20Design%20Co."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors font-medium text-emerald-700"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
