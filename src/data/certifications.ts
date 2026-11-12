export interface Certification {
  id: string;
  title: string;
  issuer: string;
  image: string;
  year?: string;
  credentialId?: string;
  description?: string;
}

export const certificationsData: Certification[] = [
  {
    id: 'teachnook-uiux',
    title: 'UI/UX Design Certification',
    issuer: 'Teachnook Educational Consultant',
    image: '/assets/certificates/teachnook-uiux.svg',
    year: '2023',
    credentialId: 'TNINTC22-2961',
    description: 'Specialization in User Research, Figma Component Systems & Digital Product Interfaces.',
  },
  {
    id: 'ced-gujarat',
    title: 'Entrepreneurship Development Program',
    issuer: 'CED Gujarat (Govt. of Gujarat)',
    image: '/assets/certificates/ced-gujarat.svg',
    year: '2022',
    description: 'Design Agency Operations, Client Strategy & Creative Enterprise Leadership.',
  },
  {
    id: 'red-and-white',
    title: 'Graphic & UI Diploma',
    issuer: 'Red & White Skill Education',
    image: '/assets/certificates/red-and-white.svg',
    year: '2020 — 2022',
    description: 'Professional Diploma in Graphic Design Software Suite, Prepress & UI Principles.',
  },
  {
    id: 'blue-prism',
    title: 'Process Logic & Systems Automation',
    issuer: 'SS&C Blue Prism',
    image: '/assets/certificates/blue-prism.svg',
    year: '2022',
    description: 'Process Flow Architecture, Logic Mapping & Systems Interaction.',
  },
];
