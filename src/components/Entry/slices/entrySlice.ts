import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IClient, IEntries } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { updateEmployee } from '@components/Employee/EmployeeCard/services/updateEmployee';
import { updateEntry } from '@components/Entry/services/updateEntry';
import { fetchEntries } from '@components/Entry/services/fetchEntries';

import { EntryCardMode } from '@/components/Entry/EntryCard/entry-card.type';
import { ErrorResponse } from '@/components/Employee/EmployeeList/services/fetchEmployeeList';
import { fetchClientsAndEmployees, fetchEntriesDates } from '@/components/Entry/services/fetchEntriesDates';
import { EntryInfo } from '@/components/Entry/Info/info.type';

export interface EntriesState {
  entryList: IEntries[],
  loading: boolean,
  openedEntry: EntryInfo | undefined
  entriesDates: string[];
  error: string | undefined;
  mode: EntryCardMode | undefined
  clientsAndEmployees: {
    clients: IClient[],
    employees: IEmployee[]
  } | undefined
}

const initialState: EntriesState = {
  entryList: [],
  loading: false,
  openedEntry: undefined,
  entriesDates: [],
  error: undefined,
  mode: undefined,
  clientsAndEmployees: undefined,
};

export const entrySlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    changeOpenedEntry: (state, action:PayloadAction<EntryInfo>) => {
      state.openedEntry = action.payload;
    },
    clearOpenedEntry: (state) => {
      state.openedEntry = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEntriesDates.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchEntriesDates.fulfilled, (state, action) => {
      state.loading = false;
      state.entriesDates = action.payload;
    });
    builder.addCase(fetchEntriesDates.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(fetchEntries.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.entryList = action.payload;
    });
    builder.addCase(fetchEntries.rejected, (state, action) => {
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
    });
    builder.addCase(updateEntry.rejected, (state, action) => {
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
