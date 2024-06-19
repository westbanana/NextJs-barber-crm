'use client';

import React, { useCallback } from 'react';

import Calendar from '@components/Calendar/Calendar';
import EntryCard from '@components/Entry/EntryCard';
import { clearOpenedEntry } from '@components/Entry/slices/entrySlice';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getOpenedEntry } from '@components/Entry/selectors/getOpenedEntry';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';

interface CalendarWrapperProps {
  entries: IEntry[],
  employees: IEmployee[],
  clients: IClient[]
}

const CalendarWrapper = ({ entries, clients, employees }: CalendarWrapperProps) => {
  const dispatch = useAppDispatch();
  const openedEntry = useAppSelector(getOpenedEntry);
  const entriesDates = entries.map(({
    date,
    time,
  }) => `${date} ${time}`);
  const onCloseCardHandler = useCallback(() => {
    dispatch(clearOpenedEntry());
  }, [dispatch]);
  return (
    <>
      <Calendar entries={entries} />
      {(openedEntry.mode && openedEntry.entry) && (
        <EntryCard
          disableFetchTodayEntries
          onClose={onCloseCardHandler}
          mode={openedEntry.mode}
          entryDates={entriesDates!!}
          data={{
            clients,
            employees,
          }}
        />
      )}
    </>
  );
};

export default CalendarWrapper;
