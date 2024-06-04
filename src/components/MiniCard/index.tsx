import React, { ReactNode } from 'react';

import { classNames, Mods } from '@lib/classNames/classNames';

import cls from './style.module.scss';

interface MiniCardProps {
  children: ReactNode;
  className?: string
}
const mods: Mods = {};
const MiniCard = ({ children, className }: MiniCardProps) => (
  <div
    className={classNames(cls.card, mods, [className])}
  >
    {children}
  </div>
);

export default MiniCard;
