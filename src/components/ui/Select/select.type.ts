import { IEmployee } from '@/components/EmployeeCard/employee.type';
import { IClient } from '@/components/Entry/entries.type';
import { IBarberServices } from '@/constants/barber-services';

export type SelectItem = string | IEmployee | IClient | IBarberServices
export enum SelectMode {
  MULTISELECT = 'multiselect',
  SINGLESELECT = 'singleselect'
}
export interface SelectProps {
  data: SelectItem[];
  callback?: (result:SelectItem[]) => void;
  label:string;
  className?: string;
  defaultValue: SelectItem[];
  selectMode?: SelectMode;
}
