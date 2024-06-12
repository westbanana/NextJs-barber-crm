import React from 'react';
import { Plus } from 'lucide-react';

import { changeOpenedEntry } from '@components/Entry/slices/entrySlice';
import { newEntry } from '@constants/newEntry';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import cls from '@components/Entry/TodayEntries/style.module.scss';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';

const EntryCreator = ({ mode = EntryCardMode.CREATE }: {mode?: EntryCardMode}) => {
  const dispatch = useAppDispatch();
  const onClickHandler = () => {
    dispatch(changeOpenedEntry({ entry: newEntry, mode }));
  };
  return (
    <div
      onClick={onClickHandler}
      className={cls.addEntryContainer}
    >
      <Plus className={cls.addEntryButton} />
    </div>
  );
};

export default EntryCreator;
