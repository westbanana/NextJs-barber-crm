import React from 'react';
import { getTranslations } from 'next-intl/server';

import Page from '@components/ui/Page/Page';
import EmployeeList from '@components/Employee/EmployeeList';

import cls from './style.module.scss';

const EmployeesPage = async () => {
  const t = await getTranslations();
  return (
    <Page className={cls.EmployeesPage} pageLabel={t('pages.employees')}>
      <EmployeeList />
    </Page>
  );
};

export default EmployeesPage;
