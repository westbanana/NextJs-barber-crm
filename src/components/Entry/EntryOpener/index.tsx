'use client';

import React, { ReactNode } from 'react';
import { getOpenedEntry } from '@components/Entry/selectors/getOpenedEntry';
import { IEntries } from '@components/Entry/MiniEntry/entries.type';
import { fetchEntryDates } from '@components/Entry/services/fetchEntryDates';
import { newEntry } from '@constants/newEntry';

import EntryCard from '../EntryCard';

import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { EntryCardMode } from '@/components/Entry/EntryCard/entry-card.type';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { getEntryDates } from '@/components/Entry/selectors/getEntriesDates';
import { changeOpenedEntry, clearOpenedEntry } from '@/components/Entry/slices/entrySlice';

export type EntryOpenerProps = {
  children: ReactNode,
  currentEntry?: IEntries
  mode: EntryCardMode
}

const EntryOpener = ({ children, currentEntry, mode }:EntryOpenerProps) => {
  const dispatch = useAppDispatch();
  const entriesDates = useAppSelector(getEntryDates);
  const openedEntry = useAppSelector(getOpenedEntry);
  const editModeCondition = (currentEntry?.id === openedEntry?.id) && openedEntry;
  const createModeCondition = (mode === EntryCardMode.CREATE) && openedEntry?.id === newEntry.id;
  const onDoubleClickHandler = () => {
    if (!editModeCondition) {
      dispatch(fetchEntryDates());
      dispatch(changeOpenedEntry(currentEntry));
    }
  };
  const onClickHandler = () => {
    if (mode === EntryCardMode.CREATE && !currentEntry?.completed) {
      if (!openedEntry) {
        dispatch(fetchEntryDates());
        dispatch(changeOpenedEntry(newEntry));
      }
    }
  };
  const onCloseHandler = () => {
    dispatch(clearOpenedEntry());
  };

  return (
    <div
      onDoubleClick={onDoubleClickHandler}
      onClick={onClickHandler}
    >
      {children}
      {(editModeCondition || createModeCondition) && (
        <EntryCard
          onClose={onCloseHandler}
          mode={mode}
          entryDates={entriesDates}
        />
      )}
    </div>
  );
};

export default EntryOpener;
