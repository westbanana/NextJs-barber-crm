import { ComponentPropsWithoutRef } from 'react';
import { LiteralUnion } from 'react-hook-form';

import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import { IBarberServices } from '@/constants/barber-services';

export type SelectItem = string | IEmployee | IClient | IBarberServices
export enum SelectMode {
  MULTISELECT = 'multiselect',
  SINGLESELECT = 'singleselect'
}
export interface SelectProps<T> extends Omit<ComponentPropsWithoutRef<'select'>, 'defaultValue'>{
  data: T[];
  callback?: (result:T[]) => void;
  label:string;
  className?: string;
  defaultValue: T[];
  selectMode?: SelectMode;
  error?: LiteralUnion<'pattern' |
    'value' |
    'required' |
    'minLength' |
    'maxLength' |
    'disabled' |
    'max' |
    'min' |
    'onChange' |
    'onBlur' |
    'shouldUnregister' |
    'valueAsNumber' |
    'valueAsDate' |
    'setValueAs' |
    'validate' |
    'deps', string> | undefined
}
