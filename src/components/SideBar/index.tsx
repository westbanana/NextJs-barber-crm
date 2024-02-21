'use client';

import React, { memo, useState } from 'react';
import { QrCode } from 'lucide-react';

import { sidebarItems } from '@/constants/sidebar-items';
import SideBarItem from '@/components/SideBar/SideBarItem';
import SideBarToggle from '@/components/SideBar/SideBarToggle';
import { classNames, Mods } from '@/lib/classNames/classNames';
import ThemeSwitcher from '@/components/SideBar/ThemeSwitcher';

import cls from './style.module.scss';

const SideBar = memo(() => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleToggle = () => setIsCollapsed((prev) => !prev);
  const mods: Mods = {
    [cls.collapsed]: isCollapsed,
  };
  return (
    <div className={classNames(cls.SideBar, mods, [])}>
      <div className={cls.logoWrapper}>
        <QrCode className={cls.logo} />
      </div>
      <div className={cls.itemsWrapper}>
        {sidebarItems.map((item) => (
          <SideBarItem
            key={item.title}
            title={item.title}
            href={item.href}
            Icon={item.Icon}
            collapsed={isCollapsed}
          />
        ))}
        <SideBarToggle onClick={handleToggle} className={cls.toggle} />
      </div>
      <ThemeSwitcher />
    </div>
  );
});

export default SideBar;
