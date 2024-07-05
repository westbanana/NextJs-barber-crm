import React, { memo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { ISidebarItem } from '@/components/SideBar/types/sidebar-items.type';
import { classNames, Mods } from '@/lib/classNames/classNames';
import Tooltip from '@components/ui/Tooltip/Tooltip';
import animations from '@/variables/animations/animations.module.scss';

import cls from './style.module.scss';

const SideBarItem = memo(({
  href,
  className,
  Icon,
  title,
  collapsed = false,
}:ISidebarItem) => {
  const locale = useLocale();
  const pathname = usePathname();
  // @ts-ignore
  const isActive = pathname === `/${locale}${href.pathname}`;
  const mods: Mods = {
    [cls.collapsed]: collapsed,
    [cls.active]: isActive,
  };
  return (
    <>
      <Link
        href={href}
        data-tooltip-id={`sidebar-item-${title}`}
        className={classNames(cls.SideBarItem, mods, [className, animations.slowShow])}
      >
        {Icon && <Icon />}
        {!collapsed && <span className={cls.title}>{title}</span>}
      </Link>
      {collapsed && (
        <Tooltip id={`sidebar-item-${title}`}>
          <span>{title}</span>
        </Tooltip>
      )}
    </>
  );
});

export default SideBarItem;
