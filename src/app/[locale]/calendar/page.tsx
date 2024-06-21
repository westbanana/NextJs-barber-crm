import React from 'react';

import Page from '@components/ui/Page/Page';
import { fetchCalendarInfo } from '@components/Calendar/services/fetchCalendarInfo';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';

import CalendarWrapper from './CalendarWrapper';

export const revalidate = 0;
const CalendarPage = async () => {
  const { entries, clients, employees } = await fetchCalendarInfo();
  const entryList = entries as IEntry[];
  return (
    <Page>
      <CalendarWrapper
        entries={entryList}
        clients={clients}
        employees={employees}
      />
    </Page>
  );
};

export default CalendarPage;
