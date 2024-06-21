import {
  Home, Scissors, Settings, CalendarDays, AreaChart, Users,
} from 'lucide-react';
import i18next from 'i18next';
import { useTranslations } from 'next-intl';

import { PAGES_LINKS_INSTANCE } from '@/config/links';
import type { ISidebarItem } from '@/components/SideBar/types/sidebar-items.type';

export const sidebarItems: ISidebarItem[] = [
  {
    title: 'pages.main',
    href: PAGES_LINKS_INSTANCE.HOME,
    Icon: Home,
  },
  {
    title: 'pages.employees',
    href: PAGES_LINKS_INSTANCE.EMPLOYEES,
    Icon: Scissors,
  },
  {
    title: 'pages.clients',
    href: PAGES_LINKS_INSTANCE.CLIENTS,
    Icon: Users,
  },
  {
    title: 'pages.calendar',
    href: PAGES_LINKS_INSTANCE.CALENDAR,
    Icon: CalendarDays,
  },
  {
    title: 'pages.statistic',
    href: PAGES_LINKS_INSTANCE.STATISTIC,
    Icon: AreaChart,
  },
  {
    title: 'pages.settings',
    href: PAGES_LINKS_INSTANCE.SETTINGS,
    Icon: Settings,
  },
];
