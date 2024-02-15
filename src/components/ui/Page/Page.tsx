import React from 'react';

import cls from './style.module.scss';
import { IPageProps } from '@/components/ui/Page/page.type';
import { classNames } from '@/lib/classNames/classNames';

const Page = ({ children, className }: IPageProps) => (
  <div className={classNames(cls.Page, {}, [className])}>
    {children}
  </div>
);

export default Page;
