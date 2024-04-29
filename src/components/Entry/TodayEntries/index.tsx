'use client';

import React, { useEffect } from 'react';
import MiniEntry from '@components/Entry/MiniEntry';
import { classNames, Mods } from '@lib/classNames/classNames';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getTodayEntries } from '@components/Entry/selectors/getTodayEntries';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import { getEntryList } from '@components/Entry/selectors/getEntryList';
import { fetchEntries } from '@components/Entry/services/fetchEntries';
import EntryOpener from '@components/Entry/EntryOpener';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import { Plus } from 'lucide-react';
import { IEntriesForEntry } from '@components/Entry/MiniEntry/entries.type';

import cls from './style.module.scss';

import Label from '@/components/Label/Label';

const TodayEntries = () => {
  const dispatch = useAppDispatch();
  const todayEntries = useAppSelector(getTodayEntries);
  const entryList = useAppSelector(getEntryList);
  const loading = useAppSelector(getEntriesLoading);
  const listMods: Mods = {
    [cls.emptyList]: !todayEntries.length,
  };
  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTodayEntries());
  }, [dispatch, entryList]);

  const createEntry = () => {

  };

  return (
    <div className={cls.mainContainer}>
      <Label label="Today entries" className={cls.todayEntriesLabel} alwaysOnBorder />
      <EntryOpener mode={EntryCardMode.CREATE}>
        <div className={cls.addEntryContainer}>
          <Plus className={cls.addEntryButton} onClick={createEntry} />
        </div>
      </EntryOpener>
      <div
        className={classNames(cls.list, listMods, [])}
      >
        {(todayEntries.length)
          ? (todayEntries.map((entry) => (
            <MiniEntry
              currentEntry={(entry as IEntriesForEntry)}
              key={entry.id}
            />
          )))
          : (
            'No recordings today💇‍♂️.️'
          )}
      </div>
    </div>
  );
};

export default TodayEntries;