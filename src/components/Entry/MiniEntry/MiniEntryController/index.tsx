import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';

import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { classNames } from '@lib/classNames/classNames';
import { completeEntry } from '@components/Entry/services/completeEntry';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';

import cls from './style.module.scss';

export type MiniEntryControllerProps = {entry: IEntry, className?: string, id: string}

const MiniEntryController = ({ entry, className, id }: MiniEntryControllerProps) => {
  const dispatch = useAppDispatch();
  const { refresh } = useRouter();
  const completeCurrentEntry = async () => {
    await dispatch(completeEntry(entry));
    // mb
    await dispatch(fetchTodayEntries());
    refresh();
  };
  const deleteCurrentEntry = async () => {
    if (entry) {
      await dispatch(deleteEntry(entry));
      // mb
      await dispatch(fetchTodayEntries());
      refresh();
    }
  };
  return (
    <div className={classNames(cls.buttons, {}, [className])}>
      <div
        className={cls.button}
        onClick={deleteCurrentEntry}
        data-tooltip-id={`delete-entry-${id}`}
      >
        <X />
      </div>
      <div
        className={cls.button}
        onClick={completeCurrentEntry}
        data-tooltip-id={`complete-entry-${id}`}
      >
        <Check />
      </div>
    </div>
  );
};

export default MiniEntryController;
