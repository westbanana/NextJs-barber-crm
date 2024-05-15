import React, { Suspense } from 'react';
import Label from '@components/Label/Label';
import { getTopEmployees } from '@components/Entry/services/getEmployees';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/TopCard/TopCard';
import { classNames } from '@lib/classNames/classNames';
import Skeleton from '@components/ui/Skeleton/Skeleton';

import cls from './style.module.scss';

const TopEmployees = async () => {
  const employees:IEmployee[] = await getTopEmployees();
  const topTreeEmployees = employees.slice(0, 3);
  return (
    <div className={classNames(cls.mainContainer, {}, ['afterLoading'])}>
      <Label label="MORE COMPLETED ENTRIES" alwaysOnBorder />
      <div className={cls.list}>
        {topTreeEmployees.map((employee: IEmployee, idx: number) => (
          <TopCard key={employee.id} employee={employee} place={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default TopEmployees;
