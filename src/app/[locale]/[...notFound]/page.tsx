import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Page from '@components/ui/Page/Page';
import animations from '@variables/animations/animations.module.scss';
import { PAGES_LINKS_INSTANCE } from '@config/links';
import Button from '@components/ui/Button/Button';
import { classNames } from '@lib/classNames/classNames';

import cls from '../style.module.scss';

const ErrorPage = () => {
  const t = useTranslations();
  return (
    <Page className={cls.notFoundPage}>
      <span
        className={classNames(cls.notFoundText, {}, [animations.growIn])}
      >
        {t('not-found-page.title')}
      </span>
      <Button className={cls.homeButton}>
        <Link href={PAGES_LINKS_INSTANCE.HOME} replace>{t('buttons.home')}</Link>
      </Button>
    </Page>
  );
};

export default ErrorPage;
