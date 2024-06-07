import React, { Suspense } from 'react';

import { getTopEmployees } from '@components/Entry/services/getEmployees';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/Employee/TopEmployees/TopCard/TopCard';
import ExpandableContainer from '@components/ExpandableContainer';
import Skeleton from '@components/ui/Skeleton/Skeleton';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';

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
