import React from 'react';
import Link from 'next/link';

import Page from '@components/ui/Page/Page';
import animations from '@/variables/animations/animations.module.scss';
import { PAGES_LINKS_INSTANCE } from '@config/links';
import Button from '@components/ui/Button/Button';

import cls from './style.module.scss';

const ErrorPage = () => (
  <Page className={cls.errorPage}>
    <span className={animations.growIn}>ERROR 404</span>
    <Button>
      <Link href={PAGES_LINKS_INSTANCE.HOME}>Home</Link>
    </Button>
  </Page>
);

export default ErrorPage;
