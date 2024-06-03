import React from 'react';

import { getTopEmployees } from '@components/Entry/services/getEmployees';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/TopCard/TopCard';
import ExpandableContainer from '@components/ExpandableContainer';

const TopEmployees = async () => {
  const topTreeEmployees:IEmployee[] = await getTopEmployees();
  return (
    <ExpandableContainer label="Top Employees">
      {topTreeEmployees.map((employee: IEmployee) => (
        <TopCard key={employee.id} employee={employee} />
      ))}
    </ExpandableContainer>

  );
};

export default TopEmployees;
