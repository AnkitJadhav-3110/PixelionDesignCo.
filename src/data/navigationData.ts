export interface NavSubItem {
  id: string;
  title: string;
  href: string;
  description: string;
  badge?: string;
  iconName: 'palette' | 'sparkles' | 'layout' | 'smartphone' | 'package' | 'mail' | 'bookOpen' | 'layers' | 'grid' | 'award';
}

export interface NavDropdownSection {
  title: string;
  items: NavSubItem[];
}

export interface NavDropdownData {
  featured: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta?: {
      label: string;
      href: string;
    };
    badge?: string;
  };
  sections: NavDropdownSection[];
}

export interface NavMenuItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  dropdown?: NavDropdownData;
}

export const MAIN_NAVIGATION: NavMenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    dropdown: {
      featured: {
        eyebrow: 'WHAT WE OFFER',
        title: 'Creative Agency Services',
        description:
          'From complete visual identities to high-conversion UI/UX and bespoke print packaging, we craft systems that drive measurable brand growth.',
        primaryCta: {
          label: 'All Services Overview',
          href: '/services',
        },
        secondaryCta: {
          label: 'Explore Design Categories',
          href: '/categories',
        },
        badge: '6 Disciplines',
      },
      sections: [
        {
          title: 'Core Disciplines',
          items: [
            {
              id: 'graphic-design',
              title: 'Graphic Design & Creatives',
              href: '/services/graphic-design',
              description: 'Brand collateral, promotional marketing visuals & vector illustrations',
              iconName: 'sparkles',
            },
            {
              id: 'branding',
              title: 'Branding & Visual Identity',
              href: '/services/branding',
              description: 'Memorable brand logos, typography systems & identity guidelines',
              iconName: 'palette',
            },
            {
              id: 'ui-ux',
              title: 'UI/UX & Digital Product',
              href: '/services/ui-ux',
              description: 'Mobile applications, responsive web design & SaaS dashboards',
              iconName: 'layout',
            },
            {
              id: 'social-media',
              title: 'Social Media Design',
              href: '/services/social-media',
              description: 'High-engagement feeds, ad campaign visuals & motion graphics',
              iconName: 'smartphone',
            },
            {
              id: 'print-packaging',
              title: 'Print & Packaging',
              href: '/services/print-packaging',
              description: 'Luxury packaging boxes, product labels, brochures & stationery',
              iconName: 'package',
            },
            {
              id: 'invitations',
              title: 'Invitation & Event Design',
              href: '/services/invitations',
              description: 'Bespoke digital & printed invitations for weddings and corporate events',
              iconName: 'mail',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'work',
    label: 'Portfolio & Work',
    href: '/work',
  },
  {
    id: 'about',
    label: 'About Us',
    href: '/about',
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    href: '/testimonials',
  },
  {
    id: 'contact',
    label: 'Contact Us',
    href: '/contact',
  },
];

export const PRIMARY_CTA = {
  label: 'Get a Quote',
  href: '/get-a-quote',
};
