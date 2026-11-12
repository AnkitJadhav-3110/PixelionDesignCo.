export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  company?: string;
  role?: string;
  avatar?: string;
  projectScope?: string;
  rating?: number;
  companyLogo?: string;
  isVideoTestimonial?: boolean;
  videoThumbnail?: string;
  videoUrl?: string;
}

/**
 * Demo testimonials showcasing client collaboration across Pixelion Design Co.'s
 * core capabilities (Branding, UI/UX, Packaging, Print, Social Media, and Invitations).
 */
export const demoTestimonials: Testimonial[] = [
  {
    id: 'demo-1',
    quote:
      'We experienced immediate brand elevation and customer engagement after Pixelion Design Co. revamped our packaging. They delivered on schedule and provided outstanding creative direction.',
    clientName: 'Jay Patel',
    company: 'AB Naturals',
    role: 'Marketing Head',
    projectScope: 'Brand Identity & Packaging',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    companyLogo: 'AB Naturals',
  },
  {
    id: 'demo-2',
    quote:
      "Pixelion's above-industry design standards resulted in an improved market perception of our studio. Out of all creative agencies we've partnered with, their team is by far the most professional.",
    clientName: 'Riya Shah',
    company: 'Shine Beauty Studio',
    role: 'Founder',
    projectScope: 'Social Media & Brand Assets',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'demo-3',
    quote:
      'They gave us technical and creative advantage with tremendous efficiency. They work exceptionally well under tight launch deadlines and step up when our internal team needs design leadership.',
    clientName: 'Ketan Mehta',
    company: 'Urban Space Interiors',
    role: 'CEO & Founder',
    projectScope: 'Website & Brand System',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    companyLogo: 'URBAN SPACE',
    isVideoTestimonial: true,
    videoThumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'demo-4',
    quote:
      'From identity formulation to sustainable packaging guidelines, everything was executed with architectural precision. Pixelion Design Co. is our indispensable long-term creative partner.',
    clientName: 'Neha Desai',
    company: 'Herbionics Health',
    role: 'Brand Director',
    projectScope: 'Logo & Packaging Design',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    companyLogo: 'Herbionics',
  },
  {
    id: 'demo-5',
    quote:
      'Their visual storytelling and design instincts are extraordinary. They delivered high-converting e-commerce assets and packaging that stand out distinctly on retail shelves.',
    clientName: 'Dhruv Raval',
    company: 'FitFuel Nutrition',
    role: 'Co-founder & COO',
    projectScope: 'Brand Identity & Digital Assets',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    companyLogo: 'FitFuel',
  },
  {
    id: 'demo-6',
    quote:
      'The UI/UX design and design tokens they delivered allowed our engineering team to ship 2x faster. Pixelion combines deep aesthetic taste with pragmatic usability.',
    clientName: 'Pooja Parmar',
    company: 'EdTech Solutions',
    role: 'Senior Product Manager',
    projectScope: 'Branding & UI/UX Design',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
  },
];

// Set default testimonials to demoTestimonials for live presentation
export const verifiedTestimonials: Testimonial[] = demoTestimonials;
