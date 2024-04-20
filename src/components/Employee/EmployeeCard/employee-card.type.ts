import { IEmployee } from './employee.type';

export enum EmployeeCardMode {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface EmployeeEditCardProps {
  employeeData?: IEmployee;
  onClose: () => void;
  mode: EmployeeCardMode
}
