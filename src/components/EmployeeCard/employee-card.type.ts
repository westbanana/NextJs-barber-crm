import { IEmployee } from '@/components/EmployeeList/EmployeeItem/employee.type';

export enum EmployeeCardMode {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface EmployeeEditCardProps {
  employeeData?: IEmployee;
  onClose: () => void;
  mode: EmployeeCardMode
}
