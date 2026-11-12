import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Award, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { CursorState } from '../types';

interface TimelineEntry {
  period: string;
  title: string;
  organization: string;
  location: string;
  type: 'work' | 'education' | 'certification';
  credentialId?: string;
  description: string;
  highlights: string[];
}

const timelineData: TimelineEntry[] = [
  {
    period: '2023 — PRESENT',
    title: 'Founder & Lead Designer',
    organization: 'Pixelion Design Co.',
    location: 'Bharuch, Gujarat, India',
    type: 'work',
    description: 'Founded and managing Pixelion Design Co., providing high-quality UI/UX design, branding systems, social media graphics, and custom print solutions.',
    highlights: [
      'Delivered brand identity kits, custom invitations, and UI/UX case studies',
      'Designed custom wedding invitations and digital event assets',
      'Led client projects across Gujarat, India & global clients',
    ],
  },
  {
    period: 'MARCH 2023',
    title: 'UI/UX Design Course Certification',
    organization: 'Teachnook Educational Consultant',
    location: 'Online / India',
    type: 'certification',
    credentialId: 'TNINTC22-2961',
    description: 'Comprehensive certification in User Experience & Interface design, covering design thinking, user research, wireframing, interactive prototyping, and usability testing.',
    highlights: [
      'Mastered Figma component libraries & auto-layout 3.0',
      'Executed end-to-end mobile app case studies (Expert Connect, EasyPay)',
    ],
  },
  {
    period: 'SEPTEMBER 2022',
    title: 'Entrepreneurship Development Program',
    organization: 'CED Gujarat - Centre For Entrepreneurship Development',
    location: 'Gujarat, India',
    type: 'certification',
    description: 'Completed government-recognized business & creative agency leadership program focusing on client management, financial planning, and design studio operation.',
    highlights: [
      'Strategic studio positioning & client pitching framework',
      'Brand management & service operations',
    ],
  },
  {
    period: 'JULY 2022',
    title: 'Blue Prism Automation Certification',
    organization: 'SS&C Blue Prism',
    location: 'Bharuch, India',
    type: 'certification',
    description: 'Certified in process logic workflow automation and software systems interaction.',
    highlights: ['Process flow mapping & logic structuring'],
  },
  {
    period: '2020 — 2022',
    title: 'Graphic Design & UI Education',
    organization: 'Red & White Skill Education Official',
    location: 'Bharuch, Gujarat, India',
    type: 'education',
    description: 'Specialized diploma in graphic design software suite (Photoshop, Illustrator, InDesign, CorelDRAW, After Effects) and print production techniques.',
    highlights: [
      'Hands-on expertise in Adobe Creative Suite & CorelDRAW',
      'Print prepress production, color theory & typography math',
    ],
  },
];

interface CareerTimelineProps {
  setCursorState: (state: CursorState) => void;
}

export default function CareerTimeline({ setCursorState }: CareerTimelineProps) {
  return (
    <div className="my-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-[#E2E6EE] pb-6">
        <div>
          <span className="font-sans-body text-xs font-bold tracking-widest text-[#E31E24] uppercase block mb-1">
            CAREER JOURNEY & CREDENTIALS
          </span>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2C3D6C] tracking-tight">
            Dhruvrajsinh Rana's Timeline
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-sans-body font-bold text-[#46516A]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#E31E24]" /> Work Experience
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2C3D6C]" /> Education & Certs
          </span>
        </div>
      </div>

      <div className="relative border-l-2 border-[#E2E6EE] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {timelineData.map((item, idx) => {
          const isWork = item.type === 'work';
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Point */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-0.5 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center transition-transform group-hover:scale-125 ${
                  isWork ? 'border-[#E31E24] text-[#E31E24]' : 'border-[#2C3D6C] text-[#2C3D6C]'
                }`}
              >
                {item.type === 'work' && <Briefcase className="w-3 h-3" />}
                {item.type === 'certification' && <Award className="w-3 h-3" />}
                {item.type === 'education' && <GraduationCap className="w-3 h-3" />}
              </div>

              {/* Card Container */}
              <div
                className="bg-[#FDFEFE] border border-[#E2E6EE] rounded-2xl p-6 sm:p-8 hover:border-[#E31E24] hover:shadow-md transition-all duration-300 shadow-xs"
                onMouseEnter={() => setCursorState({ variant: 'hover', text: 'TIMELINE' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        isWork
                          ? 'bg-[#E31E24]/10 text-[#E31E24]'
                          : 'bg-[#2C3D6C]/10 text-[#2C3D6C]'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="font-mono text-xs text-[#46516A] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                  </div>

                  {item.credentialId && (
                    <span className="font-mono text-[10px] text-[#46516A] border border-[#E2E6EE] px-2 py-0.5 rounded-md">
                      ID: {item.credentialId}
                    </span>
                  )}
                </div>

                <h4 className="font-display font-extrabold text-xl sm:text-2xl text-[#2C3D6C] mb-1">
                  {item.title}
                </h4>

                <div className="flex items-center gap-3 font-sans-body text-xs font-bold text-[#46516A] mb-4">
                  <span>{item.organization}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-normal text-[#46516A]">
                    <MapPin className="w-3 h-3 text-[#E31E24]" />
                    {item.location}
                  </span>
                </div>

                <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed font-normal mb-4">
                  {item.description}
                </p>

                {/* Bullet Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-[#E2E6EE]">
                  {item.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs font-sans-body text-[#46516A]">
                      <span className="text-[#E31E24] font-bold mt-0.5">•</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
