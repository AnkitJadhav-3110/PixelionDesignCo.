export type AspectRatio = '16:9' | '3:4' | '1:1' | '4:3';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'UI/UX' | 'Branding' | 'Graphic Design' | 'Social Media' | 'Print & Packaging' | 'Invitations' | 'Digital' | '3D & Motion' | 'Brand Systems' | 'AI Utilities' | string;
  client: string;
  year: string;
  role: string;
  heroImage: string;
  conceptLabel?: string;
  videoUrl?: string;
  aspect: AspectRatio;
  featured: boolean;
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  galleryImages: string[];
  liveUrl?: string;
  githubUrl?: string;
  keyDeliverables: string[];
}

export interface UserSettings {
  name: string;
  kicker: string;
  roleLine1: string;
  roleLine2Serif: string;
  roleLine2Suffix: string;
  subhead: string;
  location: string;
  timezone: string;
  email: string;
  phone?: string;
  bio: string;
  philosophy: string;
  portraitUrl: string;
  footerPortraitUrl: string;
  reelVideoUrl: string;
  reelCaption: string;
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    dribbble: string;
    instagram: string;
  };
}

export type CursorVariant = 'default' | 'hover' | 'project' | 'reel' | 'drag' | 'copy';

export interface CursorState {
  variant: CursorVariant;
  text?: string;
}
