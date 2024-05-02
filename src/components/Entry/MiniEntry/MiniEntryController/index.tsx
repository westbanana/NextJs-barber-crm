import { Check, X } from 'lucide-react';
import { IEntries } from '@components/Entry/MiniEntry/entries.type';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { classNames } from '@lib/classNames/classNames';
import EntryRemover from '@components/Entry/EntryRemover';
import { convertObjectToIds } from '@helpers/convertObjectToIds';
import { completeEntry } from '@components/Entry/services/completeEntry';

import cls from './style.module.scss';

export type MiniEntryControllerProps = {entry: IEntries, className?: string}

const MiniEntryController = ({ entry, className }: MiniEntryControllerProps) => {
  const dispatch = useAppDispatch();
  // add entry to employee completeEntryList
  // add entry to
  // delete from entryList
  const completeCurrentEntry = () => {
    const convertedEntry = convertObjectToIds(entry); // reconvertObjectToIds(entry)
    dispatch(completeEntry(convertedEntry));
  };

  return (
    <div className={classNames(cls.buttons, {}, [className])}>
      <EntryRemover entry={entry}>
        <div
          className={cls.button}
        >
          <X />
        </div>
      </EntryRemover>
      <div className={cls.button} onClick={completeCurrentEntry}>
        <Check />
      </div>
    </div>
  );
};

export default MiniEntryController;