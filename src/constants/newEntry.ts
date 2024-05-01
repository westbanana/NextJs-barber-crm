import { IEntries } from '@components/Entry/MiniEntry/entries.type';

export const newEntry:IEntries = {
  time: '',
  completed: false,
  client: '',
  services: [],
  id: `${Date.now()}`,
  employee: '',
  date: '',
};
