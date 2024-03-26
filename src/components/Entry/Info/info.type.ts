import { IBarberServices } from '@/constants/barber-services';
import { IEmployee } from '@/components/EmployeeCard/employee.type';
import { IClient } from '@/components/Entry/entries.type';

export type EntryInfo = {
  employee: IEmployee;
  client: IClient;
  date: string;
  time: string;
  services: IBarberServices[];
}

export type InfoProps = {
  entryInfo: EntryInfo;
  entryId: string;
}
