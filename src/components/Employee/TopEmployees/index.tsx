import React from 'react';
import Label from '@components/Label/Label';
import { getTopEmployees } from '@components/Entry/services/getEmployees';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/testTopCard/TopCard';
import { classNames } from '@lib/classNames/classNames';
import { Skeleton as MUISkeleton } from '@mui/material';

import cls from './style.module.scss';

const TopEmployees = async () => {
  const employees:IEmployee[] = await getTopEmployees();
  const topTreeEmployees = employees.slice(0, 3);
  return (!employees.length
    ? <MUISkeleton variant="rectangular" width="100%" height={135} />
    : (
      <div className={classNames(cls.mainContainer, {}, ['afterLoading'])}>
        <Label label="TOP EMPLOYEES" alwaysOnBorder />
        <div className={cls.list}>
          {topTreeEmployees.map((employee: IEmployee, idx: number) => (
            <TopCard key={employee.id} employee={employee} place={idx + 1} />
          ))}
        </div>
      </div>
    )
  );
};

export default TopEmployees;
