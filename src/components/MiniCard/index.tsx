import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

import { classNames, Mods } from '@lib/classNames/classNames';

import cls from './style.module.scss';

interface MiniCardProps extends ComponentPropsWithoutRef<'div'>{
  children: ReactNode;
  className?: string
}
const mods: Mods = {};
const MiniCard = ({ children, className, ...otherProps }: MiniCardProps) => (
  <div
    className={classNames(cls.card, mods, [className])}
    {...otherProps}
  >
    {children}
  </div>
);

export default MiniCard;
