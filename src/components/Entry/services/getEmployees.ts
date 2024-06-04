import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';

export const getAllEmployees = () => fetch(
  'http://localhost:4000/employees',
)
  .then((response) => response.json())
  .catch((e) => {
    throw new Error(e);
  });

export const getTopEmployees = async () => fetch(
  'http://localhost:4000/employees',
  { next: { revalidate: 0 } },
)
  .then((response) => response.json())
  .then((employees) => employees.sort((a: IEmployee, b: IEmployee) => (
    b.completedEntries.length - a.completedEntries.length
  )))
  .catch((e) => {
    throw new Error(e);
  });
