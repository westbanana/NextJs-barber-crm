import React from 'react';

import cls from './style.module.scss';
import Page from '@/components/ui/Page/Page';
import EmployeeList from '@/components/EmployeeList';

const EmployeesPage = () => (
  <Page className={cls.EmployeesPage}>
    <h1 className={cls.pageTitle}>Employees</h1>
    <EmployeeList />
  </Page>
);

export default EmployeesPage;
