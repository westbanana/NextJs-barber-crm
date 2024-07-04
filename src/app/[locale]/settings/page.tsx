'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Page from '@components/ui/Page/Page';
import Select from '@components/ui/Select/Select';
import { locales } from '@i18n';
import { SelectMode } from '@components/ui/Select/select.type';

interface Language {
  id: string
  name: string,
  locale: string,
}
export type LANGs = 'en' | 'uk' | 'ru';
const SettingsPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocal = pathname
    .split('/')
    .slice(1)[0] as LANGs;
  const currentLanguage = {
    id: t(`languages.${currentLocal}`),
    name: t(`languages.${currentLocal}`),
    locale: currentLocal,
  };
  const changeLanguage = (language: Language[]) => {
    const newPathname = pathname.split('/').slice(2).join('/');
    const newRoute = `/${language[0].locale}/${newPathname}`;
    router.push(newRoute as any);
    router.refresh();
  };
  const languages = locales.map((item) => {
    const foo: LANGs = item as LANGs;
    const name = t(`languages.${foo}`);
    return {
      id: name,
      name,
      locale: item,
    };
  });
  return (
    <Page>
      <div>
        <Select<Language>
          data={languages}
          label={t('settings-page.change-language')}
          defaultValue={[currentLanguage]}
          callback={changeLanguage}
        />
      </div>
    </Page>
  );
};

export default SettingsPage;
