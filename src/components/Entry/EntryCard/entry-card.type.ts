import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { EntryInfo } from '@components/Entry/MiniEntry/Info/info.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';

export enum EntryCardMode {
  CREATE = 'create',
  EDIT = 'edit',
  READ_ONLY = 'read-only',
}

export interface EntryEditCardProps {
  onClose: () => void;
  mode: EntryCardMode | undefined;
  entryDates: string[];
  data: {
    employees: IEmployee[],
    clients: IClient[]
  }
}
