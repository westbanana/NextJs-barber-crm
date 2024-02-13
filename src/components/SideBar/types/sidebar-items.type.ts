import { LucideIcon } from 'lucide-react';

export interface ISidebarItem {
  href: string;
  title: string;
  Icon?: LucideIcon;
  collapsed?: boolean;
  className?: string;
}
