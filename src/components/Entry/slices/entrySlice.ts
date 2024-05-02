import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IClient, IEntries } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { updateEntry } from '@components/Entry/services/updateEntry';
import { fetchEntries } from '@components/Entry/services/fetchEntries';
import dayjs from 'dayjs';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { fetchClientsAndEmployees, fetchEntryDates } from '@components/Entry/services/fetchEntryDates';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { createEntry } from '@components/Entry/services/createEntry';
import { completeEntry } from '@components/Entry/services/completeEntry';
import { EntryInfo } from '@components/Entry/MiniEntry/Info/info.type';

import { EntryCardMode } from '@/components/Entry/EntryCard/entry-card.type';
import { ErrorResponse } from '@/components/Employee/EmployeeList/services/fetchEmployeeList';

export interface EntriesState {
  entryList: IEntries[],
  todayEntries: IEntries[],
  loading: boolean,
  openedEntry: IEntries | undefined
  entriesDates: string[];
  error: string | undefined;
  mode: EntryCardMode | undefined
  clientsAndEmployees: {
    clients: IClient[],
    employees: IEmployee[]
  }
}

const initialState: EntriesState = {
  entryList: [],
  todayEntries: [],
  loading: false,
  openedEntry: undefined,
  entriesDates: [],
  error: undefined,
  mode: undefined,
  clientsAndEmployees: {
    clients: [],
    employees: [],
  },
};
export const entrySlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    changeOpenedEntry: (state, action:PayloadAction<IEntries>) => {
      state.openedEntry = action.payload;
    },
    clearOpenedEntry: (state) => {
      state.openedEntry = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEntryDates.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchEntryDates.fulfilled, (state, action) => {
      state.loading = false;
      state.entriesDates = action.payload;
    });
    builder.addCase(fetchEntryDates.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(fetchEntries.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.entryList = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchEntries.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(fetchTodayEntries.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchTodayEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.todayEntries = action.payload;
    });
    builder.addCase(fetchTodayEntries.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(fetchClientsAndEmployees.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchClientsAndEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.clientsAndEmployees = action.payload;
    });
    builder.addCase(fetchClientsAndEmployees.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(updateEntry.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(updateEntry.fulfilled, (state, action:PayloadAction<IEntries>) => {
      state.loading = false;
      state.entryList = state.entryList.map((entry) => {
        if (entry.id === action.payload.id) {
          return action.payload;
        }
        return entry;
      });
      state.openedEntry = undefined;
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
    builder.addCase(deleteEntry.fulfilled, (state, action:PayloadAction<IEntries>) => {
      state.loading = false;
      state.entryList = state.entryList.filter((entry) => entry.id !== action.payload.id);
      state.todayEntries = state.todayEntries.filter((entry) => entry.id !== action.payload.id);
      state.openedEntry = undefined;
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
    builder.addCase(createEntry.fulfilled, (state, action:PayloadAction<IEntries>) => {
      state.loading = false;
      state.entryList = [...state.entryList, action.payload];
      state.openedEntry = undefined;
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
    builder.addCase(completeEntry.fulfilled, (state, action:PayloadAction<IEntries>) => {
      console.log(action.payload);
      state.entryList = state.entryList.map((entry) => (entry.id === action.payload.id ? action.payload : entry));
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
