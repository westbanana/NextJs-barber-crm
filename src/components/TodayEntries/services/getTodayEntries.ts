import { IEntries } from '@/components/Entry/entries.type';

export const getTodayEntries = () => fetch('http://localhost:4000/entries')
  .then((response) => response.json())
  .then((entries) => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Добавляем 1, так как месяцы индексируются с 0
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return entries.filter((entry:IEntries) => entry.date === formattedDate);
  });
