import React from 'react';
import Label from '@components/Label/Label';
import { getTopEmployees } from '@components/Entry/services/getEmployees';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/testTopCard/TopCard';

import cls from './style.module.scss';

const TopEmployees = async () => {
  const employees = await getTopEmployees();
  const topTreeEmployees = employees.slice(0, 3);
  return (
    <div className={cls.mainContainer}>
      <Label label="TOP EMPLOYEES" alwaysOnBorder />
      <div className={cls.list}>
        {topTreeEmployees.map((employee: IEmployee, idx: number) => (
          <TopCard key={employee.id} employee={employee} place={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default TopEmployees;
