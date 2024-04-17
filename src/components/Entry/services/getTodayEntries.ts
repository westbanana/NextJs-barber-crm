import dayjs from 'dayjs';

import { IEntries } from '@/components/Entry/entries.type';

export const getTodayEntries = () => fetch('http://localhost:4000/entries')
  .then((response) => response.json())
  .then((entries) => {
    const currentDate = dayjs().format('YYYY-M-D');
    return entries.filter((entry:IEntries) => entry.date === currentDate);
  });
