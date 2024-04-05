import React from 'react';

import { IPageProps } from '@/components/ui/Page/page.type';
import { classNames } from '@/lib/classNames/classNames';

import cls from './style.module.scss';

const Page = ({ children, className, id }: IPageProps) => (
  <div id={id} className={classNames(cls.Page, {}, [className])}>
    {children}
  </div>
);

export default Page;
