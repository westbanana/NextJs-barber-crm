'use client';

import React, { useEffect } from 'react';

import MiniEntry from '@components/Entry/MiniEntry';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getTodayEntries } from '@components/Entry/selectors/getTodayEntries';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import ExpandableContainer from '@components/ExpandableContainer';
import { getOpenedEntry } from '@components/Entry/selectors/getOpenedEntry';
import EntryCard from '@components/Entry/EntryCard';
import { getEntryDates } from '@components/Entry/selectors/getEntriesDates';
import { clearOpenedEntry } from '@components/Entry/slices/entrySlice';
import EntryCreator from '@components/Entry/EntryCreator';
import { getEmployeeList } from '@components/Employee/selectors/getEmployeeList';
import { getClientList } from '@components/Client/selectors/getClientList';

const TodayEntries = () => {
  const dispatch = useAppDispatch();
  const todayEntries = useAppSelector(getTodayEntries);
  const openedEntry = useAppSelector(getOpenedEntry);
  const entryDates = useAppSelector(getEntryDates);
  const loading = useAppSelector(getEntriesLoading);
  const employees = useAppSelector(getEmployeeList);
  const clients = useAppSelector(getClientList);

  useEffect(() => {
    dispatch(fetchTodayEntries());
  }, [dispatch]);

  const onCloseHandler = () => {
    dispatch(clearOpenedEntry());
  };
  return (
    <>
      <ExpandableContainer
        label="Today Entries"
        loading={loading}
        controlPanel={{
          element: <EntryCreator />,
          tooltip: 'Create Entry',
        }}
      >
        {(todayEntries.length)
          ? (todayEntries.map((entry) => (
            <MiniEntry
              currentEntry={entry}
              key={entry.id}
            />
          )))
          : (
            'No recordings today💇‍♂️.️'
          )}
      </ExpandableContainer>
      {(openedEntry.entry && openedEntry.mode) && (
        <EntryCard
          onClose={onCloseHandler}
          mode={openedEntry.mode}
          entryDates={entryDates}
          data={{
            clients,
            employees,
          }}
        />
      )}
    </>
  );
};

export default TodayEntries;
