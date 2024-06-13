import dayjs from 'dayjs';

import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { barberServices, IBarberServices } from '@constants/barber-services';
import { allMonths } from '@constants/allMonths';

export const getCurrentYearCompletedEntries = (entries:IEntry[]) => {
  const currentYearEntries = entries.filter((entry) => (
    dayjs(entry.date).year() === dayjs().year())
    && entry.completed);

  const currentYearEntriesWithFormattedServices = currentYearEntries.map((entry) => {
    const entryBarberServices = barberServices.filter((service) => (
      (entry.services as string[]).includes(service.id)
    ));
    return ({
      ...entry,
      services: entryBarberServices,
    });
  });
  const groupedByMonth = allMonths.reduce((acc: Record<string, any>, month) => {
    acc[month] = {
      entries: 0,
      earnedMoney: 0,
    };
    return acc;
  }, {});

  currentYearEntriesWithFormattedServices.forEach((entry) => {
    const month = dayjs(entry.date).month();
    groupedByMonth[month].entries += 1;
    groupedByMonth[month].earnedMoney += entry.services.reduce((acc: number, service) => acc + service.price, 0);
  });

  return Object.keys(groupedByMonth).map((month) => ({
    name: dayjs().month(+month).format('MMMM'),
    ...groupedByMonth[month],
  }));
};
