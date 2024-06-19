import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { updateEntry } from '@components/Entry/services/updateEntry';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { createEntry } from '@components/Entry/services/createEntry';
import { completeEntry } from '@components/Entry/services/completeEntry';
import { EntryCardMode } from '@/components/Entry/EntryCard/entry-card.type';
import { ErrorResponse } from '@components/Employee/services/fetchEmployeeList';

export interface EntriesState {
  entryList: IEntry[],
  todayEntries: IEntry[],
  loading: boolean,
  openedEntry: {
    entry: IEntry | undefined
    mode: EntryCardMode | undefined
  }
  entriesDates: string[];
  error: string | undefined;
  mode: EntryCardMode | undefined
}

const initialState: EntriesState = {
  entryList: [],
  todayEntries: [],
  loading: true,
  openedEntry: {
    entry: undefined,
    mode: undefined,
  },
  entriesDates: [],
  error: undefined,
  mode: undefined,
};
export const entrySlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    changeOpenedEntry: (
      state,
      action:PayloadAction<{
        entry: IEntry | undefined,
        mode: EntryCardMode | undefined
      }>,
    ) => {
      state.openedEntry = action.payload;
    },
    clearOpenedEntry: (state) => {
      state.openedEntry = { entry: undefined, mode: undefined };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodayEntries.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchTodayEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.todayEntries = action.payload.todayEntries as IEntry[];
      state.entryList = action.payload.allEntries as IEntry[];
      state.entriesDates = action.payload.entriesDates;
    });
    builder.addCase(fetchTodayEntries.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(updateEntry.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(updateEntry.fulfilled, (state, action:PayloadAction<IEntry>) => {
      state.loading = false;
      // state.entryList = state.entryList.map((entry) => {
      //   if (entry.id === action.payload.id) {
      //     return action.payload;
      //   }
      //   return entry;
      // });
      state.openedEntry = { entry: undefined, mode: undefined };
    });
    builder.addCase(updateEntry.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(deleteEntry.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(deleteEntry.fulfilled, (state, action:PayloadAction<IEntry>) => {
      state.loading = false;
      // state.entryList = state.entryList.filter((entry) => entry.id !== action.payload.id);
      // state.todayEntries = state.todayEntries.filter((entry) => entry.id !== action.payload.id);
      state.openedEntry = { entry: undefined, mode: undefined };
    });
    builder.addCase(deleteEntry.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(createEntry.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(createEntry.fulfilled, (state, action:PayloadAction<IEntry>) => {
      state.loading = false;
      state.entryList = [...state.entryList, action.payload];
      state.openedEntry = { entry: undefined, mode: undefined };
    });
    builder.addCase(createEntry.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(completeEntry.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(completeEntry.fulfilled, (state, action:PayloadAction<IEntry>) => {
      // state.entryList = state.entryList.map((entry) => (entry.id === action.payload.id ? action.payload : entry));
      // state.todayEntries = state.todayEntries.map((entry) => (entry.id === action.payload.id ? action.payload : entry));
      state.loading = false;
    });
    builder.addCase(completeEntry.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
  },
});
export const {
  clearOpenedEntry,
  changeOpenedEntry,
} = entrySlice.actions;

export default entrySlice.reducer;
