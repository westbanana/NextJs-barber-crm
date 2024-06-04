import React, { Suspense } from 'react';

import { getTopEmployees } from '@components/Entry/services/getEmployees';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/Employee/TopEmployees/TopCard/TopCard';
import ExpandableContainer from '@components/ExpandableContainer';
import Skeleton from '@components/ui/Skeleton/Skeleton';

const TopEmployees = async () => {
  const topTreeEmployees:IEmployee[] = await getTopEmployees();
  return (
    <Suspense fallback={(
      <Skeleton
        rounded
        height={135}
      />
    )}
    >
      <ExpandableContainer label="Top Employees">
        {topTreeEmployees.map((employee: IEmployee) => (
          <TopCard key={employee.id} employee={employee} />
        ))}
      </ExpandableContainer>
    </Suspense>
  );
};

export default TopEmployees;
