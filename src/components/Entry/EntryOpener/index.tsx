'use client';

import React, { ReactNode, useState } from 'react';
import { getAllClients, getClients } from '@components/Entry/services/getClients';
import { getAllEmployees } from '@components/Entry/services/getEmployees';

import EntryCard from '../EntryCard';

import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { EntryCardMode } from '@/components/Entry/EntryCard/entry-card.type';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { getEntriesDates } from '@/components/Entry/selectors/getEntriesDates';
import { fetchEntriesDates } from '@/components/Entry/services/fetchEntriesDates';
import { EntryInfo } from '@/components/Entry/Info/info.type';
import { changeOpenedEntry, clearOpenedEntry } from '@/components/Entry/slices/entrySlice';

export type EntryOpenerProps = {
  children: ReactNode,
  currentEntry: EntryInfo
}

const EntryOpener = ({ children, currentEntry }:EntryOpenerProps) => {
  const [cardIsOpened, setCardIsOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const entriesDates = useAppSelector(getEntriesDates);

  const openEntryCard = () => {
    if (!cardIsOpened) {
      dispatch(fetchEntriesDates());
      dispatch(changeOpenedEntry(currentEntry));
      setCardIsOpened(true);
    }
  };
  const onCloseHandler = () => {
    setCardIsOpened(false);
    dispatch(clearOpenedEntry());
  };
  return (
    <div
      onDoubleClick={openEntryCard}
    >
      {children}
      {cardIsOpened && (
        <EntryCard
          onClose={onCloseHandler}
          mode={EntryCardMode.EDIT}
          entryDates={entriesDates}
        />
      )}
    </div>
  );
};

export default EntryOpener;
