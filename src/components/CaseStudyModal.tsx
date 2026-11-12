import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { X, ExternalLink, Github, ArrowRight, Play, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Project, CursorState } from '../types';
import { pixelionProjects } from '../data/pixelionData';
import LazyImage from './LazyImage';

interface CaseStudyModalProps {
  project: Project | null;
  projects?: Project[];
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
  onOpenContact?: () => void;
  setCursorState: (state: CursorState) => void;
}

export default function CaseStudyModal({
  project,
  projects = pixelionProjects,
  onClose,
  onSelectProject,
  onOpenContact,
  setCursorState,
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const list = projects && projects.length > 0 ? projects : pixelionProjects;
  const currentIndex = list.findIndex((p) => p.id === project.id);
  const nextProject = list[(currentIndex + 1) % list.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-end">
        {/* Backdrop Click Close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Main Content Container */}
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 32, stiffness: 280 }}
          className="relative z-10 w-full max-w-4xl min-h-screen bg-[#FDFEFE] text-[#2C3D6C] p-6 sm:p-12 lg:p-16 overflow-y-auto shadow-2xl border-l border-[#E2E6EE] flex flex-col justify-between"
        >
          {/* Header Bar */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#E2E6EE] mb-10">
              <div className="flex items-center gap-2.5">
                <span className="font-sans-body text-xs font-bold tracking-widest text-[#E31E24] uppercase">
                  CASE STUDY / {project.category}
                </span>
                {project.conceptLabel && (
                  <span className="bg-[#E31E24]/10 text-[#E31E24] px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider">
                    {project.conceptLabel}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-full hover:bg-[#2C3D6C]/5 transition-colors flex items-center gap-2 font-sans-body text-xs font-bold text-[#2C3D6C]"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'CLOSE' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <span>ESC / CLOSE</span>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Subtitle */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#2C3D6C] tracking-tight mb-4 break-words">
              {project.title}
            </h1>
            <p className="font-sans-body text-lg sm:text-xl text-[#46516A] max-w-2xl font-normal leading-relaxed mb-6">
              {project.subtitle}
            </p>

            <div className="mb-10">
              <Link
                to={`/case-studies/${project.id}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#E31E24] hover:bg-[#C81920] text-white px-6 py-3 rounded-full font-cta text-xs font-bold tracking-widest transition-colors shadow-xs"
              >
                <span>VIEW FULL DEDICATED CASE STUDY PAGE</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Project Meta Info Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-[#E2E6EE] mb-12">
              <div>
                <p className="font-sans-body text-[10px] font-bold tracking-widest text-[#46516A] uppercase mb-1">
                  CLIENT
                </p>
                <p className="font-display font-bold text-sm text-[#2C3D6C]">{project.client}</p>
              </div>
              <div>
                <p className="font-sans-body text-[10px] font-bold tracking-widest text-[#46516A] uppercase mb-1">
                  YEAR
                </p>
                <p className="font-display font-bold text-sm text-[#2C3D6C]">{project.year}</p>
              </div>
              <div>
                <p className="font-sans-body text-[10px] font-bold tracking-widest text-[#46516A] uppercase mb-1">
                  MY ROLE
                </p>
                <p className="font-display font-bold text-sm text-[#2C3D6C]">{project.role}</p>
              </div>
              <div>
                <p className="font-sans-body text-[10px] font-bold tracking-widest text-[#46516A] uppercase mb-1">
                  LINKS
                </p>
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E31E24] hover:underline text-xs font-bold flex items-center gap-1"
                    >
                      LIVE <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2C3D6C] hover:underline text-xs font-bold flex items-center gap-1"
                    >
                      CODE <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Hero Image / Video */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black mb-12 border border-[#E2E6EE] shadow-lg">
              {project.videoUrl ? (
                <video
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={project.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <LazyImage
                  src={project.heroImage}
                  alt={project.title}
                  placeholderTone="dark"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Narrative: Overview, Challenge, Solution */}
            <div className="space-y-12 mb-16">
              <div>
                <h2 className="font-display font-bold text-2xl text-[#2C3D6C] mb-4">
                  Project Overview
                </h2>
                <p className="font-sans-body text-base sm:text-lg text-[#46516A] leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl border border-[#E2E6EE] shadow-xs">
                <div>
                  <h3 className="font-sans-body text-xs font-bold tracking-widest text-[#E31E24] uppercase mb-3">
                    THE CHALLENGE
                  </h3>
                  <p className="font-sans-body text-sm text-[#46516A] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="font-sans-body text-xs font-bold tracking-widest text-[#2C3D6C] uppercase mb-3">
                    THE ARCHITECTURAL SOLUTION
                  </h3>
                  <p className="font-sans-body text-sm text-[#46516A] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Deliverables */}
              <div>
                <h3 className="font-sans-body text-xs font-bold tracking-widest text-[#46516A] uppercase mb-4">
                  KEY DELIVERABLES & SHIPMENTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyDeliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E2E6EE] text-xs font-bold text-[#2C3D6C]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E31E24] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Grid */}
              <div>
                <h3 className="font-sans-body text-xs font-bold tracking-widest text-[#46516A] uppercase mb-6">
                  GALLERY & INTERACTION HIGHLIGHTS
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {project.galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-full rounded-2xl overflow-hidden border border-[#E2E6EE] shadow-xs aspect-video"
                    >
                      <LazyImage
                        src={img}
                        alt={`${project.title} gallery ${idx + 1}`}
                        placeholderTone="light"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Next Project Teaser */}
          <div className="pt-10 border-t border-[#E2E6EE] mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-sans-body text-xs font-bold tracking-widest text-[#46516A] uppercase block mb-1">
                NEXT CASE STUDY
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#2C3D6C]">
                {nextProject.title}
              </h3>
            </div>
            <button
              onClick={() => onSelectProject?.(nextProject)}
              className="bg-[#2C3D6C] hover:bg-[#E31E24] text-white px-6 py-3.5 rounded-full font-sans-body text-xs font-bold tracking-widest transition-colors flex items-center gap-2 group shadow-xs"
            >
              <span>VIEW NEXT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
