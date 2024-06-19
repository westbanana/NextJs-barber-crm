import { toast } from 'react-toastify';

import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import { fetchEmployeeListToasts } from '@components/Employee/toasts';
import { toastDefaultParams } from '@constants/toast-constants';

export const getAllEmployees = () => fetch(
  'http://localhost:4000/employees',
).then((response) => response.json())
  .catch((e) => {
    throw new Error(e);
  });

export const getTopEmployees = async () => fetch(
  'http://localhost:4000/employees',
  { next: { revalidate: 0 }, cache: 'no-store' },
)
  .then((response) => response.json())
  .then((employees) => employees.sort((a: IEmployee, b: IEmployee) => (
    b.completedEntries.length - a.completedEntries.length
  )))
  .catch((e) => {
    throw new Error(e);
  });
