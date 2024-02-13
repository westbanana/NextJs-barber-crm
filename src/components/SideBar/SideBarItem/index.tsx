import React from 'react';
import Link from 'next/link';
import { ISidebarItem } from '@/components/SideBar/types/sidebar-items.type';

import cls from './style.module.scss';
import { classNames } from '@/lib/classNames/classNames';

const SideBarItem = ({
  href, className, Icon, title, collapsed = false,
}:ISidebarItem) => (
  <Link
    href={href}
    className={classNames(cls.SideBarItem, {}, [className])}
  >
    {Icon && <Icon />}
    {!collapsed && <span>{title}</span>}
  </Link>
);

export default SideBarItem;
