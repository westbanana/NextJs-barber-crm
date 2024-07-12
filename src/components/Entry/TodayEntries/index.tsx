'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import MiniEntry from '@components/Entry/MiniEntry';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getTodayEntries } from '@components/Entry/selectors/getTodayEntries';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import { getOpenedEntry } from '@components/Entry/selectors/getOpenedEntry';
import EntryCard from '@components/Entry/EntryCard';
import { getEntryDates } from '@components/Entry/selectors/getEntriesDates';
import { clearOpenedEntry } from '@components/Entry/slices/entrySlice';
import EntryCreator from '@components/Entry/EntryCreator';
import { getEmployeeList } from '@components/Employee/selectors/getEmployeeList';
import { getClientList } from '@components/Client/selectors/getClientList';

import ExpandableContainer from '../../ui/ExpandableContainer';

const TodayEntries = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const todayEntries = useAppSelector(getTodayEntries);
  const openedEntry = useAppSelector(getOpenedEntry);
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
        label={t('today-entries.label')}
        loading={loading}
        controlPanel={{
          element: <EntryCreator />,
          tooltip: `${t('today-entries.create')}`,
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
            `${t('today-entries.empty')}💇‍♂️.️`
          )}
      </ExpandableContainer>
      {(openedEntry.entry && openedEntry.mode) && (
        <EntryCard
          onClose={onCloseHandler}
          mode={openedEntry.mode}
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
