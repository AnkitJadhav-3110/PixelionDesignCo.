import React from 'react';
import {
  Palette,
  Sparkles,
  Layout,
  Smartphone,
  Package,
  Mail,
  BookOpen,
  Layers,
  Grid,
  Award,
} from 'lucide-react';

interface NavIconProps {
  name: string;
  className?: string;
}

export default function NavIcon({ name, className = 'w-4 h-4' }: NavIconProps) {
  switch (name) {
    case 'palette':
      return <Palette className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'layout':
      return <Layout className={className} />;
    case 'smartphone':
      return <Smartphone className={className} />;
    case 'package':
      return <Package className={className} />;
    case 'mail':
      return <Mail className={className} />;
    case 'bookOpen':
      return <BookOpen className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'grid':
      return <Grid className={className} />;
    case 'award':
      return <Award className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
