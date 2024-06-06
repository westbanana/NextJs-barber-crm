'use client';

import React, { useEffect } from 'react';
import { Plus } from 'lucide-react';

import MiniEntry from '@components/Entry/MiniEntry';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getTodayEntries } from '@components/Entry/selectors/getTodayEntries';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import EntryOpener from '@components/Entry/EntryOpener';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import Skeleton from '@components/ui/Skeleton/Skeleton';
import ExpandableContainer from '@components/ExpandableContainer';

import cls from './style.module.scss';

const TodayEntries = () => {
  const dispatch = useAppDispatch();
  const todayEntries = useAppSelector(getTodayEntries);
  const loading = useAppSelector(getEntriesLoading);

  useEffect(() => {
    dispatch(fetchTodayEntries());
  }, [dispatch]);

  return loading
    ? (<Skeleton rounded height="135px" />)
    : (
      <ExpandableContainer
        label="Today Entries"
        controlPanel={(
          <EntryOpener mode={EntryCardMode.CREATE}>
            <div className={cls.addEntryContainer}>
              <Plus className={cls.addEntryButton} />
            </div>
          </EntryOpener>
        )}
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
    );
};

export default TodayEntries;
