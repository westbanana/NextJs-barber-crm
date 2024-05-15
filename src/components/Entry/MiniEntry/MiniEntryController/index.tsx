import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { IEntries } from '@components/Entry/MiniEntry/entries.type';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { classNames } from '@lib/classNames/classNames';
import { convertObjectToIds } from '@helpers/convertObjectToIds';
import { completeEntry } from '@components/Entry/services/completeEntry';

import cls from './style.module.scss';

export type MiniEntryControllerProps = {entry: IEntries, className?: string}

const MiniEntryController = ({ entry, className }: MiniEntryControllerProps) => {
  const dispatch = useAppDispatch();
  const { refresh } = useRouter();
  const completeCurrentEntry = () => {
    const convertedEntry = convertObjectToIds(entry); // reconvertObjectToIds(entry)
    dispatch(completeEntry(convertedEntry));
    refresh();
  };
  const deleteCurrentEntry = () => {
    if (entry) {
      dispatch(deleteEntry(entry));
    }
  };
  return (
    <div className={classNames(cls.buttons, {}, [className])}>
      <div
        className={cls.button}
        onClick={deleteCurrentEntry}
      >
        <X />
      </div>
      <div className={cls.button} onClick={completeCurrentEntry}>
        <Check />
      </div>
    </div>
  );
};

export default MiniEntryController;
