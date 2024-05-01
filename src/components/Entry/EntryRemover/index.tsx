import React from 'react';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { IEntries } from '@components/Entry/MiniEntry/entries.type';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';

const EntryRemover = ({ children, entry }: {children: React.ReactNode, entry: IEntries | undefined}) => {
  const dispatch = useAppDispatch();
  const deleteCurrentEntry = () => {
    if (entry) {
      dispatch(deleteEntry(entry));
    }
  };
  return (
    <div onClick={deleteCurrentEntry}>
      {children}
    </div>
  );
};

export default EntryRemover;
