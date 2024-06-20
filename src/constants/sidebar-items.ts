import {
  Home, Scissors, Settings, CalendarDays, AreaChart, Users,
} from 'lucide-react';

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
    title: 'Clients',
    href: PAGES_LINKS_INSTANCE.CLIENTS,
    Icon: Users,
  },
  {
    title: 'Calendar',
    href: PAGES_LINKS_INSTANCE.CALENDAR,
    Icon: CalendarDays,
  },
  {
    title: 'Statistic',
    href: PAGES_LINKS_INSTANCE.STATISTIC,
    Icon: AreaChart,
  },
  {
    title: 'Settings',
    href: PAGES_LINKS_INSTANCE.SETTINGS,
    Icon: Settings,
  },
];
