import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Project, CursorState } from '../types';
import LazyImage from './LazyImage';

interface WorkSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  setCursorState: (state: CursorState) => void;
}

const categories = ['ALL', 'Branding', 'UI/UX', 'Graphic Design', 'Social Media', 'Print & Packaging', 'Invitations'];

export default function WorkSection({
  projects,
  onSelectProject,
  setCursorState,
}: WorkSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProjects = projects.filter((p) =>
    selectedCategory === 'ALL' ? true : p.category === selectedCategory
  );

  return (
    <section id="work" className="py-20 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[#E2E6EE] pb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-[#E31E24]" />
            <span className="font-sans-body text-xs font-bold tracking-widest text-[#E31E24] uppercase">
              01 / SELECTED PROJECTS
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#2C3D6C] tracking-tight break-words">
            Recent Work
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-sans-body text-xs font-bold tracking-wider transition-all duration-300 focus:outline-hidden ${
                  isActive
                    ? 'bg-[#E31E24] text-white shadow-sm'
                    : 'bg-[#2C3D6C]/5 text-[#2C3D6C]/70 hover:bg-[#2C3D6C]/10 hover:text-[#2C3D6C]'
                }`}
                onMouseEnter={() => setCursorState({ variant: 'hover' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                {cat.toUpperCase()}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Staggered Masonry Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
        <AnimatePresence>
          {filteredProjects.map((project, index) => {
            // Determine column span and height aspect for staggered editorial feel
            const isEven = index % 2 === 0;
            const colSpanClass =
              project.aspect === '16:9'
                ? 'lg:col-span-12'
                : project.aspect === '3:4'
                ? 'lg:col-span-6'
                : project.aspect === '1:1'
                ? 'lg:col-span-6'
                : 'lg:col-span-6';

            const aspectClass =
              project.aspect === '16:9'
                ? 'aspect-[16/9]'
                : project.aspect === '3:4'
                ? 'aspect-[3/4]'
                : project.aspect === '1:1'
                ? 'aspect-square'
                : 'aspect-[4/3]';

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectProject(project)}
                className={`${colSpanClass} group cursor-pointer ${
                  isEven && project.aspect !== '16:9' ? 'lg:-translate-y-6' : ''
                }`}
                onMouseEnter={() =>
                  setCursorState({ variant: 'project', text: 'VIEW CASE' })
                }
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                {/* Thumbnail Container */}
                <div
                  className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE] shadow-sm transition-all duration-500 group-hover:shadow-xl`}
                >
                  <LazyImage
                    src={project.heroImage}
                    alt={project.title}
                    placeholderTone="light"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Video Badge preview if available */}
                  {project.videoUrl && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2.5 rounded-full text-white border border-white/20">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  )}

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-sans-body font-bold tracking-widest text-[#2C3D6C] uppercase border border-[#E2E6EE]">
                    {project.category}
                  </div>

                  {/* Hover Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 sm:p-8">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-end w-full">
                      <div>
                        <p className="font-sans-body text-xs font-medium tracking-widest opacity-80 uppercase mb-1">
                          {project.client} • {project.year}
                        </p>
                        <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#E31E24] text-white flex items-center justify-center shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-text details under thumbnail */}
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#2C3D6C] group-hover:text-[#E31E24] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans-body text-xs text-[#46516A] font-medium mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="font-sans-body text-xs font-bold text-[#46516A]/60 tracking-wider">
                    {project.year}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
