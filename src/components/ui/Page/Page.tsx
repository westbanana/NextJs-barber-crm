import React from 'react';

import { IPageProps } from '@/components/ui/Page/page.type';
import { classNames } from '@/lib/classNames/classNames';

import cls from './style.module.scss';

const Page = ({
  children, className, id, pageLabel,
}: IPageProps) => (
  <div id={id} className={classNames(cls.Page, {}, [className])}>
    {pageLabel && <h1>{pageLabel}</h1>}
    {children}
  </div>
);

export default Page;
