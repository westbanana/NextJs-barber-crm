import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import { classNames } from '@lib/classNames/classNames';

import cls from './style.module.scss';

interface SkeletonProps extends ComponentPropsWithoutRef<'div'>{
  className?: string
  width?: string
  height?: string | number
  rounded?: boolean
}

const Skeleton: FC<SkeletonProps> = ({
  className, width = '100%', height = '100%', rounded = false,
}) => (
  <div
    className={classNames(cls.mainContainer, {}, [className])}
    style={{
      display: 'flex',
      width,
      height,
      borderRadius: rounded ? '10px' : '0',
    }}
  />
);

export default Skeleton;
