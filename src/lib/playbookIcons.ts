import {
  Users,
  TrendingUp,
  Target,
  Mail,
  MessageSquare,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Map of icon names to Lucide icon components
 * Used to map string icon names from markdown frontmatter to actual icon components
 */
export const iconMap: Record<string, LucideIcon> = {
  Users,
  TrendingUp,
  Target,
  Mail,
  MessageSquare,
  Zap,
};

/**
 * Get icon component by name, with fallback to default
 */
export function getIconByName(iconName: string): LucideIcon {
  return iconMap[iconName] || Zap; // Default to Zap if icon not found
}
