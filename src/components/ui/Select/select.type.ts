import { ComponentPropsWithoutRef } from 'react';

import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import { IBarberServices } from '@/constants/barber-services';

export type SelectItem = string | IEmployee | IClient | IBarberServices
export enum SelectMode {
  MULTISELECT = 'multiselect',
  SINGLESELECT = 'singleselect'
}
export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'defaultValue'>{
  data: SelectItem[];
  callback?: (result:SelectItem[] | SelectItem) => void;
  label:string;
  className?: string;
  defaultValue: SelectItem[];
  selectMode?: SelectMode;
}
