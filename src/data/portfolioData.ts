import { UserSettings } from '../types';
import { pixelionProjects, getWhatsAppUrl } from './pixelionData';

export const defaultUserSettings: UserSettings = {
  name: 'Dhruvrajsinh Rana',
  kicker: 'FOUNDER @ PIXELION DESIGN CO.',
  roleLine1: 'Graphic & UI/UX / ',
  roleLine2Serif: 'Designer',
  roleLine2Suffix: ' & Brand Strategist',
  subhead: 'Specialized in UI/UX digital interfaces, brand identity systems, wedding invitations & social media creative direction.',
  location: 'BHARUCH, GUJARAT, INDIA',
  timezone: 'IST (UTC+5:30)',
  email: 'pixeliondesignco.1702@gmail.com',
  phone: '+91 7016131424',
  bio: 'I am Dhruvrajsinh Rana, a Graphic & UI/UX Designer based in Bharuch, Gujarat, India, and the founder of Pixelion Design Co. With expertise spanning digital product interfaces, brand identity systems, custom invitations, and print design, I bridge the gap between creative concepts and impactful visual design.',
  philosophy: 'We bridge the gap between your idea & amazing design. Your brand talks before you do.',
  portraitUrl: '/assets/dhruvrajsinh-rana.jpg',
  footerPortraitUrl: '/assets/dhruvrajsinh-rana.jpg',
  reelVideoUrl: '/assets/aistudio/Slideshow_Main_f54d8c72.mp4',
  reelCaption: 'PIXELION DESIGN CO. — STUDIO REEL & CREATIVE SHOWCASE',
  socials: {
    github: 'https://www.behance.net/ranadhruvr13f6',
    twitter: getWhatsAppUrl(),
    linkedin: 'https://www.linkedin.com/in/rana-dhruvrajsinh-648850221',
    dribbble: 'https://www.behance.net/ranadhruvr13f6',
    instagram: 'https://www.instagram.com/pixeliondesign_1702',
  },
};

// Aliased to canonical verified Pixelion projects
export const sampleProjects = pixelionProjects;

export const clientLogos = [
  'UI/UX DIGITAL PRODUCTS',
  'BRAND IDENTITY SYSTEMS',
  'PACKAGING & LABEL DESIGN',
  'CORPORATE COLLATERAL',
  'SOCIAL MEDIA CAMPAIGNS',
  'CUSTOM WEDDING INVITATIONS',
  'EVENT & FESTIVAL CREATIVES',
  'PRINT PREPRESS SOLUTIONS',
];

export const capabilitiesList = [
  {
    num: '01',
    title: 'Graphic Design & Visuals',
    desc: 'Posters, marketing materials, presentation decks, certificates, digital graphics, and promotional campaign assets.',
  },
  {
    num: '02',
    title: 'Branding & Identity Systems',
    desc: 'Logo design, complete brand guidelines, color systems, typography hierarchy, business stationery, and brand assets.',
  },
  {
    num: '03',
    title: 'UI/UX & Product Design',
    desc: 'User research, wireframing, mobile app & web interface design, interactive prototyping, and accessibility standards.',
  },
  {
    num: '04',
    title: 'Print, Packaging & Events',
    desc: 'Bottle label packaging, corporate letterheads, brochures, custom wedding invitations, and cultural festival creatives.',
  },
];

export const experienceTimeline = [
  {
    period: '2023 — PRESENT',
    role: 'Founder & Designer',
    company: 'Pixelion Design Co.',
    location: 'Bharuch, Gujarat, India',
  },
  {
    period: 'MARCH 2023',
    role: 'UI/UX Design Certification',
    company: 'Teachnook Educational Consultant',
    location: 'India',
  },
  {
    period: 'SEPTEMBER 2022',
    role: 'Entrepreneurship Development',
    company: 'CED Gujarat',
    location: 'Gujarat, India',
  },
  {
    period: '2020 — 2022',
    role: 'Graphic & UI Diploma',
    company: 'Red & White Skill Education',
    location: 'Bharuch, Gujarat, India',
  },
];
