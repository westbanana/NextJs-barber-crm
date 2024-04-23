import React from 'react';

import cls from './style.module.scss';

import Page from '@/components/ui/Page/Page';
import EmployeeList from '@/components/Employee/EmployeeList';

const EmployeesPage = () => (
  <Page className={cls.EmployeesPage}>
    <h1 className={cls.pageTitle}>Робітники</h1>
    <EmployeeList />
  </Page>
);

export default EmployeesPage;
