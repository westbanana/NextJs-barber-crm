import { IEntries } from '@components/Entry/MiniEntry/entries.type';
import { EntryInfo } from '@components/Entry/MiniEntry/Info/info.type';

export enum EntryCardMode {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface EntryEditCardProps {
  onClose: () => void;
  mode: EntryCardMode;
  entryDates: string[];
}
