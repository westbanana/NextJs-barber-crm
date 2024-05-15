import dayjs from 'dayjs';
import { IEntries } from '@components/Entry/MiniEntry/entries.type';

export const getTodayEntries = () => fetch('http://localhost:4000/entries')
  .then((response) => response.json())
  .then((entries) => {
    const currentDate = dayjs().format('YYYY-M-D');
    const filteredEntries:IEntries[] = entries.filter((entry: IEntries) => entry.date === currentDate);
    return filteredEntries.sort((a, b) => a.time.localeCompare(b.time));
  });

export const getCompletedEntries = () => fetch('http://localhost:4000/entries')
  .then((response) => response.json())
  .then((entries) => entries.filter((entry: IEntries) => entry.completed));
