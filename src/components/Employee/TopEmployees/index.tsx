import React from 'react';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/Employee/TopEmployees/TopCard/TopCard';
import ExpandableContainer from '@components/ExpandableContainer';
import { getTopEmployees } from '@components/Entry/services/getEmployees';

import cls from './style.module.scss';

const TopEmployees = async () => {
  const topTreeEmployees:IEmployee[] = await getTopEmployees();

  return (
    <ExpandableContainer label="Top Employees" className={cls.expand}>
      {topTreeEmployees.length
        ? (
          topTreeEmployees.map((employee: IEmployee) => (
            <TopCard key={employee.id} employee={employee} />
          ))
        )
        : (
          <span className={cls.no}>
            No one employee💇‍♂️.️
          </span>
        )}
    </ExpandableContainer>
  );
};

export default TopEmployees;
