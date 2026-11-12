import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  schemaData?: Record<string, any>;
}

export default function SEOHead({
  title,
  description,
  canonicalPath,
  ogImage = '/assets/aistudio/WhatsApp_Image_2026-10-18_at_8.44.20_PM__1__dba6b25e.jpeg',
  ogType = 'website',
  schemaData,
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector(`meta[${attr}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);

    const canonicalUrl = `https://pixeliondesignco.vercel.app${canonicalPath || window.location.pathname}`;
    setMeta('property', 'og:url', canonicalUrl);

    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Dynamic Schema script if provided
    let schemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (schemaData) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaData);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [title, description, canonicalPath, ogImage, ogType, schemaData]);

  return null;
}
