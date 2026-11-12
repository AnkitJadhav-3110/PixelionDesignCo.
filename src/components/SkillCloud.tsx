import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, Cpu, Palette, PenTool } from 'lucide-react';
import { CursorState } from '../types';

interface Skill {
  name: string;
  category: 'uiux' | 'branding' | 'print' | 'tools';
  level: number; // 1-5 or percentage
  highlight?: boolean;
}

const skillsData: Skill[] = [
  // UI/UX & Digital
  { name: 'UI/UX Design', category: 'uiux', level: 95, highlight: true },
  { name: 'User Experience (UED)', category: 'uiux', level: 90 },
  { name: 'Wireframing & Prototyping', category: 'uiux', level: 92, highlight: true },
  { name: 'Mobile App Interfaces', category: 'uiux', level: 88 },
  { name: 'Accessibility in UX', category: 'uiux', level: 85, highlight: true },
  { name: 'Design Systems', category: 'uiux', level: 90 },

  // Branding & Identity
  { name: 'Brand Identity', category: 'branding', level: 95, highlight: true },
  { name: 'Logo Design', category: 'branding', level: 98, highlight: true },
  { name: 'Packaging & Catalog', category: 'branding', level: 88 },
  { name: 'Brand Strategy & Kits', category: 'branding', level: 90 },

  // Graphic & Print
  { name: 'Graphic Design', category: 'print', level: 96, highlight: true },
  { name: 'Wedding & Event Invitations', category: 'print', level: 95, highlight: true },
  { name: 'Social Media Posts', category: 'print', level: 94 },
  { name: 'Banner & Poster Design', category: 'print', level: 90 },
  { name: 'GST Invoices & Forms', category: 'print', level: 85 },

  // Tools & Software
  { name: 'Figma', category: 'tools', level: 95, highlight: true },
  { name: 'Photoshop (Ps)', category: 'tools', level: 95, highlight: true },
  { name: 'Illustrator (Ai)', category: 'tools', level: 96, highlight: true },
  { name: 'InDesign (Id)', category: 'tools', level: 88 },
  { name: 'After Effects (Ae)', category: 'tools', level: 82 },
  { name: 'CorelDRAW', category: 'tools', level: 90 },
  { name: 'Blue Prism', category: 'tools', level: 80 },
];

interface SkillCloudProps {
  setCursorState: (state: CursorState) => void;
}

export default function SkillCloud({ setCursorState }: SkillCloudProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'ALL SKILLS', icon: Sparkles },
    { id: 'uiux', label: 'UI/UX & DIGITAL', icon: Layers },
    { id: 'branding', label: 'BRANDING', icon: Palette },
    { id: 'print', label: 'GRAPHIC & PRINT', icon: PenTool },
    { id: 'tools', label: 'TOOLS & SOFTWARE', icon: Cpu },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <div className="bg-[#FDFEFE] border border-[#E2E6EE] rounded-3xl p-6 sm:p-10 relative overflow-hidden my-16 shadow-xs">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E31E24]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E2E6EE]">
        <div>
          <span className="font-sans-body text-xs font-bold tracking-widest text-[#E31E24] uppercase block mb-1">
            INTERACTIVE EXPERIENCE
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2C3D6C] tracking-tight">
            Dynamic Skill Cloud
          </h3>
        </div>
        <p className="font-sans-body text-xs text-[#46516A] max-w-xs">
          Hover over individual skill tokens to view expertise density & tools used by Dhruvrajsinh Rana.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans-body text-xs font-bold tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-[#2C3D6C] text-white shadow-xs'
                  : 'bg-white border border-[#E2E6EE] text-[#46516A] hover:border-[#E31E24] hover:text-[#2C3D6C]'
              }`}
              onMouseEnter={() => setCursorState({ variant: 'hover', text: 'FILTER' })}
              onMouseLeave={() => setCursorState({ variant: 'default' })}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E31E24]' : 'text-[#46516A]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Interactive Skill Cloud */}
      <motion.div
        layout
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 min-h-[220px] py-4"
      >
        {filteredSkills.map((skill, index) => {
          const isHovered = hoveredSkill === skill.name;
          // Calculate subtle floating offset timing based on index
          const floatDelay = (index % 5) * 0.4;
          const floatDuration = 3 + (index % 3);

          return (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, index % 2 === 0 ? -6 : 6, 0],
              }}
              transition={{
                y: {
                  duration: floatDuration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: floatDelay,
                },
                layout: { duration: 0.3 },
              }}
              whileHover={{
                scale: 1.12,
                rotate: index % 2 === 0 ? 2 : -2,
                transition: { duration: 0.2 },
              }}
              onMouseEnter={() => {
                setHoveredSkill(skill.name);
                setCursorState({ variant: 'hover', text: `${skill.level}%` });
              }}
              onMouseLeave={() => {
                setHoveredSkill(null);
                setCursorState({ variant: 'default' });
              }}
              className={`relative cursor-pointer group px-5 py-3 rounded-2xl font-sans-body text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border ${
                skill.highlight
                  ? 'bg-white border-[#E31E24]/40 text-[#2C3D6C] shadow-xs hover:border-[#E31E24] hover:shadow-md'
                  : 'bg-white border-[#E2E6EE] text-[#46516A] hover:border-[#2C3D6C] hover:text-[#2C3D6C]'
              }`}
            >
              <div className="flex items-center gap-2">
                {skill.highlight && (
                  <span className="w-2 h-2 rounded-full bg-[#E31E24] animate-pulse" />
                )}
                <span>{skill.name}</span>
              </div>

              {/* Tooltip Level Bar on Hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#2C3D6C] text-white text-[10px] font-mono px-3 py-1 rounded-md shadow-xl whitespace-nowrap z-20 flex items-center gap-2 pointer-events-none"
                >
                  <span className="text-[#E31E24] font-bold">PROFICIENCY</span>
                  <span>{skill.level}%</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer hint */}
      <div className="mt-8 pt-4 border-t border-[#E2E6EE] flex items-center justify-between text-[11px] font-sans-body text-[#46516A]">
        <span className="flex items-center gap-1.5 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24]" />
          PIXELION DESIGN CO. • CORE CAPABILITIES
        </span>
        <span className="hidden sm:inline font-mono">FRAMER MOTION DYNAMIC CANVAS</span>
      </div>
    </div>
  );
}
