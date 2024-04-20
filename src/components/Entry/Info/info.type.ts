import { IClient } from '@components/Entry/MiniEntry/entries.type';

import { IBarberServices } from '@/constants/barber-services';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';

export type EntryInfo = {
  id: string | number;
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
