import React, { FC, ReactNode } from 'react';

import cls from './style.module.scss';

interface SkeletonProps {
  children?: ReactNode
}

const Skeleton:FC<SkeletonProps> = ({ children }) => (
  <div className={cls.mainContainer}>
    <div className={cls.buttons}>
      <div className={cls.button} />
      <div className={cls.button} />
    </div>
    <div className={cls.table} />
  </div>
);

export default Skeleton;
