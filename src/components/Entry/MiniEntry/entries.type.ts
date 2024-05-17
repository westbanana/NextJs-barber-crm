import { ComponentPropsWithoutRef } from 'react';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IBarberServices } from '@constants/barber-services';

export type IClient = {
  id: string,
  name: string,
  visits: number,
  phoneNumber: string,
  clientIcon: string
}

export type IEntry = {
  id: string,
  completed: boolean,
  employee: IEmployee | string,
  client: IClient | string,
  services: IBarberServices[] & string[],
  time: string,
  date: string
}

export interface EntryProps extends ComponentPropsWithoutRef<'div'>{
  currentEntry: IEntry
}
