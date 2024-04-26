import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IBarberServices } from '@constants/barber-services';

export type IClient = {
  id: string,
  name: string,
  visits: number,
  phoneNumber: string,
  clientIcon: string
}

export type IEntries = {
  id: string,
  employee: IEmployee | string,
  client: IClient | string,
  services: IBarberServices[] | string[],
  time: string,
  date: string
}

export type IEntriesForEntry = Omit<IEntries, 'employee' | 'client' | 'services'> & {
  employee: IEmployee,
  client: IClient,
  services: IBarberServices[]
}

export type EntryProps = {
  currentEntry: IEntriesForEntry
}
