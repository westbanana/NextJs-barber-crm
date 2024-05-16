'use client';

import React, { useEffect, useState } from 'react';
import MiniEntry from '@components/Entry/MiniEntry';
import { classNames, Mods } from '@lib/classNames/classNames';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getTodayEntries } from '@components/Entry/selectors/getTodayEntries';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { getEntryList } from '@components/Entry/selectors/getEntryList';
import EntryOpener from '@components/Entry/EntryOpener';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import { Plus } from 'lucide-react';
import Accordion from '@components/ui/Accordion/Accordion';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import Skeleton from '@components/ui/Skeleton/Skeleton';

import cls from './style.module.scss';

import Label from '@/components/Label/Label';

const TodayEntries = () => {
  const dispatch = useAppDispatch();
  const todayEntries = useAppSelector(getTodayEntries);
  const loading = useAppSelector(getEntriesLoading);
  const entryList = useAppSelector(getEntryList);
  const [listOpened, setListOpened] = useState<boolean>(false);
  const listMods: Mods = {
    [cls.emptyList]: !todayEntries.length,
    [cls.openedList]: listOpened,
  };

  useEffect(() => {
    dispatch(fetchTodayEntries());
  }, [dispatch, entryList]);

  const toggleList = () => {
    setListOpened((prev) => !prev);
  };
  return loading
    ? (<Skeleton rounded height="135px" />)
    : (
      <div className={classNames(cls.mainContainer, {}, ['afterLoading'])}>
        <Label label="Today entries" className={cls.todayEntriesLabel} alwaysOnBorder />
        <EntryOpener mode={EntryCardMode.CREATE}>
          <div className={cls.addEntryContainer}>
            <Plus className={cls.addEntryButton} />
          </div>
        </EntryOpener>
        <Accordion
          callback={toggleList}
          opened={listOpened}
          className={cls.todayEntriesAccordion}
        />
        <div
          className={classNames(cls.list, listMods, [])}
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
        </div>
      </div>
    );
};

export default TodayEntries;
