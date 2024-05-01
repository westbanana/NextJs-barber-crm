import { Check, X } from 'lucide-react';
import { IEntries } from '@components/Entry/MiniEntry/entries.type';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { classNames } from '@lib/classNames/classNames';

import cls from './style.module.scss';

export type MiniEntryControllerProps = {entry: IEntries, className?: string}

const MiniEntryController = ({ entry, className }: MiniEntryControllerProps) => {
  const dispatch = useAppDispatch();
  const deleteCurrentEntry = () => {
    dispatch(deleteEntry(entry));
  };
  return (
    <div className={classNames(cls.buttons, {}, [className])}>
      <div
        className={cls.button}
        onClick={deleteCurrentEntry}
      >
        <X />
      </div>
      <div className={cls.button}>
        <Check />
      </div>
    </div>
  );
};

export default MiniEntryController;
