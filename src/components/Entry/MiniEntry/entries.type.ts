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
  employee: IEmployee | string | undefined,
  client: IClient | string | undefined,
  services: IBarberServices[] | string[],
  time: string,
  date: string
}

export type StrictEntry = Omit<IEntry, 'employee' | 'client' | 'services'> & {
  employee: IEmployee;
  client: IClient;
  services: IBarberServices[];
};

export interface EntryProps extends ComponentPropsWithoutRef<'div'>{
  currentEntry: IEntry
}
