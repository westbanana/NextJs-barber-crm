import React from 'react';
import Link from 'next/link';
import { ISidebarItem } from '@/components/SideBar/types/sidebar-items.type';

import cls from './style.module.scss';
import { classNames, Mods } from '@/lib/classNames/classNames';

const SideBarItem = ({
  href, className, Icon, title, collapsed = false,
}:ISidebarItem) => {
  const mods: Mods = {
    [cls.collapsed]: collapsed,
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
