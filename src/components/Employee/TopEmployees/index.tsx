import React, { Suspense } from 'react';

import Label from '@components/Label/Label';
import { getTopEmployees } from '@components/Entry/services/getEmployees';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/TopCard/TopCard';
import { classNames } from '@lib/classNames/classNames';

import cls from './style.module.scss';

const TopEmployees = async () => {
  const employees:IEmployee[] = await getTopEmployees();
  const topTreeEmployees = employees.slice(0, 3);
  return (
    <Suspense fallback={<h1>LOADING.........................</h1>}>
      <div className={classNames(cls.mainContainer, {}, ['afterLoading'])}>
        <Label label="MORE COMPLETED ENTRIES" alwaysOnBorder />
        <div className={cls.list}>
          {topTreeEmployees.map((employee: IEmployee) => (
            <TopCard key={employee.id} employee={employee} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default TopEmployees;
