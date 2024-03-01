import { LinkProps } from 'next/link';
import { LucideIcon } from 'lucide-react';

import { UrlObject } from 'node:url';

export interface ISidebarItem extends Pick<LinkProps<string | UrlObject>, 'href'>{
  title: string;
  Icon?: LucideIcon;
  collapsed?: boolean;
  className?: string;
  currentPathname?: string;
}
