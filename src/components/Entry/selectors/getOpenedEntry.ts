import { RootState } from '@/lib/store';

export const getOpenedEntry = (state:RootState) => state.entries.openedEntry;
