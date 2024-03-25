import { IEmployee } from '@/components/EmployeeCard/employee.type';

export type IEntries = {
  id: string,
  employee: string,
  client: string,
  services: string[],
  time: string,
  date: string
}

export type IClient = {
  id: string,
  name: string,
  visits: number,
  phoneNumber: string,
  clientIcon: string
}

export type EntriesProps = {
  employee: IEmployee,
  client: IClient,
  date?: string,
  time: string
  services: string[]
}
