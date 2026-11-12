import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ContactDrawer from './components/ContactDrawer';
import CustomizerModal from './components/CustomizerModal';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import CaseStudiesIndexPage from './pages/CaseStudiesIndexPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import ProcessPage from './pages/ProcessPage';
import FounderPage from './pages/FounderPage';
import ContactPage from './pages/ContactPage';
import CategoriesPage from './pages/CategoriesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import GetAQuotePage from './pages/GetAQuotePage';

import { defaultUserSettings } from './data/portfolioData';
import { UserSettings, CursorState } from './types';

export default function App() {
  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('pixelion_design_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return defaultUserSettings;
  });

  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
  });

  const [contactDrawerOpen, setContactDrawerOpen] = useState<boolean>(false);
  const [customizerOpen, setCustomizerOpen] = useState<boolean>(false);

  // Initialize smooth inertia scrolling
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleUpdateSettings = (newSettings: UserSettings) => {
    setUserSettings(newSettings);
    localStorage.setItem('pixelion_design_settings', JSON.stringify(newSettings));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#FDFEFE] text-[#2C3D6C] font-sans-body selection:bg-[#E31E24] selection:text-[#FDFEFE] overflow-x-hidden flex flex-col justify-between">
        {/* Rail Badge Indicator (Only on ultra-wide screens to guarantee zero layout collision) */}
        <div
          className="hidden 2xl:block fixed left-6 top-1/2 -translate-y-1/2 z-30 transform -rotate-180 pointer-events-none"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className="text-[10px] font-bold tracking-[0.3em] opacity-30 uppercase text-[#2C3D6C]">
            PIXELION DESIGN CO. • CREATIVE STUDIO
          </span>
        </div>

        {/* Custom Cursor Dot & Magnet */}
        <CustomCursor cursorState={cursorState} />

        {/* Global Navigation Header */}
        <Navigation
          userSettings={userSettings}
          onOpenContact={() => setContactDrawerOpen(true)}
          onOpenCustomizer={() => setCustomizerOpen(true)}
          setCursorState={setCursorState}
        />

        {/* Main Route Content */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/services"
              element={
                <ServicesPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/services/:serviceId"
              element={
                <ServicesPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/work"
              element={
                <WorkPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/case-studies"
              element={
                <CaseStudiesIndexPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/case-studies/:caseId"
              element={
                <CaseStudyDetailPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/process"
              element={
                <ProcessPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/founder"
              element={
                <FounderPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/categories"
              element={
                <CategoriesPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/portfolio"
              element={
                <WorkPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/testimonials"
              element={
                <TestimonialsPage
                  setCursorState={setCursorState}
                  onOpenContact={() => setContactDrawerOpen(true)}
                />
              }
            />
            <Route
              path="/contact"
              element={<ContactPage setCursorState={setCursorState} />}
            />
            <Route
              path="/get-a-quote"
              element={<GetAQuotePage setCursorState={setCursorState} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer
          setCursorState={setCursorState}
          onOpenContact={() => setContactDrawerOpen(true)}
        />

        {/* Slide-In Quick Contact Drawer */}
        <ContactDrawer
          isOpen={contactDrawerOpen}
          onClose={() => setContactDrawerOpen(false)}
          userSettings={userSettings}
          setCursorState={setCursorState}
        />

        {/* Customizer Drawer Modal */}
        <CustomizerModal
          isOpen={customizerOpen}
          onClose={() => setCustomizerOpen(false)}
          userSettings={userSettings}
          onUpdateSettings={handleUpdateSettings}
          setCursorState={setCursorState}
        />
      </div>
    </BrowserRouter>
  );
}
