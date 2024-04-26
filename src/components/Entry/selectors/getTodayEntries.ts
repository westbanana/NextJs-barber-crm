import { RootState } from '@/lib/store';

export const getTodayEntries = (state:RootState) => state.entries.todayEntries;
