import React from 'react';

import Page from '@/components/ui/Page/Page';
import EmployeeList from '@/components/Employee/EmployeeList';

import cls from './style.module.scss';

const EmployeesPage = () => (
  <Page className={cls.EmployeesPage}>
    <h1 className={cls.pageTitle}>Employees</h1>
    <EmployeeList />
  </Page>
);

export default EmployeesPage;
