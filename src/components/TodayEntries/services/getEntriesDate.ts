import dayjs from 'dayjs';

import { IEntries } from '@/components/Entry/entries.type';

export const getEntriesDates = () => fetch('http://localhost:4000/entries')
  .then((response) => response.json())
  .then((response:IEntries[]) => response.map(({ date, time }) => `${date} ${time}`));
