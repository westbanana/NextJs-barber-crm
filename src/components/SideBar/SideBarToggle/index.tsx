import React from 'react';
import { ArrowBigRight, ChevronRight } from 'lucide-react';

import { SidebarToggleProps } from '@/components/SideBar/types/sidebar-toggle.type';
import { classNames } from '@/lib/classNames/classNames';

import cls from './style.module.scss';

const SideBarToggle = ({ onClick, className }: SidebarToggleProps) => (
  <div
    onClick={onClick}
    className={classNames(cls.SideBarToggle, {}, [className])}
  >
    <ChevronRight />
  </div>
);

export default SideBarToggle;
