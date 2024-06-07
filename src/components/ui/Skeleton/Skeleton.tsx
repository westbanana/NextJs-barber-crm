import React, { ComponentPropsWithoutRef } from 'react';

import { classNames } from '@lib/classNames/classNames';

import { Style } from 'node:util';

import cls from './style.module.scss';

interface SkeletonProps extends ComponentPropsWithoutRef<'div'>{
  className?: string
  width?: string
  height?: string | number
  rounded?: boolean
}

const Skeleton = ({
  className, width = '100%', height = '100%', rounded = false, style,
}: SkeletonProps) => (
  <div
    className={classNames(cls.mainContainer, {}, [className])}
    style={{
      display: 'flex',
      width,
      minHeight: height,
      maxHeight: height,
      flex: 1,
      borderRadius: rounded ? '10px' : '0',
      ...style,
    }}
  />
);

export default Skeleton;
