import React from 'react';
import { ArrowBigRight } from 'lucide-react';
import { SidebarToggleProps } from '@/components/SideBar/types/sidebar-toggle.type';

import cls from './style.module.scss';
import { classNames } from '@/lib/classNames/classNames';

const SideBarToggle = ({ onClick, className }: SidebarToggleProps) => (
  <div
    onClick={onClick}
    className={classNames(cls.SideBarToggle, {}, [className])}
  >
    <ArrowBigRight />
  </div>
);

export default SideBarToggle;
