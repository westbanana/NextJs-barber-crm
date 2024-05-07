import { fetchEntries } from '@components/Entry/services/fetchEntries';
import { getCompletedEntries } from '@components/Entry/services/getTodayEntries';

import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';

export const getEmployees = (arr:string[]) => fetch('http://localhost:4000/employees')
  .then((response) => response.json())
  .then((response) => response.filter((employee:IEmployee) => arr.includes(employee.id!!)));

export const getAllEmployees = () => fetch(
  'http://localhost:4000/employees',
  {
    cache: 'no-store',
    next: { revalidate: 0 },
  },
)
  .then((response) => response.json())
  .catch((e) => {
    throw new Error(e);
  });

export const getTopEmployees = async () => {
  const employees = await getAllEmployees();
  return employees.sort((a:IEmployee, b:IEmployee) => b.completedEntries.length - a.completedEntries.length);
};
