import { IEntries } from '@/components/Entry/entries.type';
import { EntryInfo } from '@/components/Entry/Info/info.type';

export enum EntryCardMode {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface EntryEditCardProps {
  onClose: () => void;
  mode: EntryCardMode;
  entryDates: string[];
}
