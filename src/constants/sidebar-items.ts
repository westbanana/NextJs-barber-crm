import { Home, Scissors, Settings } from 'lucide-react';

import { PAGES_LINKS_INSTANCE } from '@/config/links';
import type { ISidebarItem } from '@/components/SideBar/types/sidebar-items.type';

export const sidebarItems: ISidebarItem[] = [
  {
    title: 'Home',
    href: PAGES_LINKS_INSTANCE.HOME,
    Icon: Home,
  },
  {
    title: 'Employees',
    href: PAGES_LINKS_INSTANCE.EMPLOYEES,
    Icon: Scissors,
  },
  {
    title: 'Settings',
    href: PAGES_LINKS_INSTANCE.SETTINGS,
    Icon: Settings,
  },
];
