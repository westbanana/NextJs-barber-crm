import React, { FC } from 'react';

import SideBar from '@/components/SideBar';
import { IMainLayoutTypes } from '@/components/MainLayout/main-layout.types';
import StoreProvider from '@app/[locale]/StoreProvider';

import cls from './style.module.scss';

const MainLayout:FC<IMainLayoutTypes> = ({ children }) => (
  <StoreProvider>
    <div className={cls.MainLayout}>
      <SideBar />
      {children}
    </div>
  </StoreProvider>
);

export default MainLayout;
