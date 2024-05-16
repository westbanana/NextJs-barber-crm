import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { classNames } from '@lib/classNames/classNames';
import { convertObjectToIds } from '@helpers/convertObjectToIds';
import { completeEntry } from '@components/Entry/services/completeEntry';
import Tooltip from '@components/Tooltip/Tooltip';

import cls from './style.module.scss';

export type MiniEntryControllerProps = {entry: IEntry, className?: string, id: string}

const MiniEntryController = ({ entry, className, id }: MiniEntryControllerProps) => {
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
