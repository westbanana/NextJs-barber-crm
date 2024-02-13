import React from 'react';
import { QrCode } from 'lucide-react';
import cls from './style.module.scss';
import { sidebarItems } from '@/constants/sidebar-items';
import SideBarItem from '@/components/SideBar/SideBarItem';

const SideBar = () => (
  <div className={cls.SideBar}>
    <QrCode />
    <div className={cls.itemsWrapper}>
      {sidebarItems.map((item) => (
        <SideBarItem
          key={item.title}
          title={item.title}
          href={item.href}
          Icon={item.Icon}
        />
      ))}
    </div>
    <input type="checkbox" />
  </div>
);

export default SideBar;
