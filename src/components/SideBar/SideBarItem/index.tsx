import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ISidebarItem } from '@/components/SideBar/types/sidebar-items.type';

import cls from './style.module.scss';
import { classNames, Mods } from '@/lib/classNames/classNames';
import { PAGES_LINKS_INSTANCE } from '@/config/links';

const SideBarItem = ({
  href,
  className,
  Icon,
  title,
  collapsed = false,
}:ISidebarItem) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href as string);
  const mods: Mods = {
    [cls.collapsed]: collapsed,
    [cls.active]: isActive,
  };
  return (
    <Link
      href={href}
      className={classNames(cls.SideBarItem, mods, [className])}
    >
      {Icon && <Icon />}
      {!collapsed && <span className={cls.title}>{title}</span>}
    </Link>
  );
};

export default SideBarItem;
