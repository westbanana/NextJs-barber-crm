import React, { FC } from 'react';
import SideBar from '@/components/SideBar';
import { IMainLayoutTypes } from '@/components/MainLayout/main-layout.types';

import cls from './style.module.scss';

const MainLayout:FC<IMainLayoutTypes> = ({ children }) => (
  <div className={cls.MainLayout}>
    <SideBar />
    {children}
  </div>
);

export default MainLayout;
