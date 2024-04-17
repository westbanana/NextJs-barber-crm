import { IEmployee } from '@/components/EmployeeCard/employee.type';

export const getEmployees = (arr:string[]) => fetch('http://localhost:4000/employees')
  .then((response) => response.json())
  .then((response) => response.filter((employee:IEmployee) => arr.includes(employee.id!!)));

export const getAllEmployees = () => fetch('http://localhost:4000/employees')
  .then((response) => response.json());
