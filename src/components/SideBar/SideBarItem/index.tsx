import React, { memo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { ISidebarItem } from '@/components/SideBar/types/sidebar-items.type';
import { classNames, Mods } from '@/lib/classNames/classNames';

import cls from './style.module.scss';

const SideBarItem = memo(({
  href,
  className,
  Icon,
  title,
  collapsed = false,
}:ISidebarItem) => {
  const pathname = usePathname();
  // @ts-ignore
  const isActive = pathname === href.pathname;
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
});

export default SideBarItem;
