import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { ErrorResponse, fetchEmployeeList } from '@components/Employee/services/fetchEmployeeList';
import { fetchClientList } from '@components/Client/services/fetchClientList';
import { ClientCardMode } from '@components/Client/ClientCard';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';

export interface ClientsState {
  error: string | undefined;
  loading: boolean;
  clientList: IClient[];
  openedClient: {
    client: IClient | undefined,
    mode: ClientCardMode | undefined
  };
}

const initialState: ClientsState = {
  error: undefined,
  loading: true,
  clientList: [],
  openedClient: {
    client: undefined,
    mode: undefined,
  },
};
export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    changeOpenedClient: (
      state,
      action:PayloadAction<{
        client: IClient | undefined,
        mode: ClientCardMode | undefined
      }>,
    ) => {
      state.openedClient = action.payload;
    },
    clearOpenedClient: (state) => {
      state.openedClient = { client: undefined, mode: undefined };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodayEntries.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchTodayEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.clientList = action.payload.allClients;
    });
    builder.addCase(fetchTodayEntries.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(fetchClientList.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchClientList.fulfilled, (state, action) => {
      state.loading = false;
      state.clientList = action.payload;
    });
    builder.addCase(fetchClientList.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
  },
});
export const { changeOpenedClient, clearOpenedClient } = clientSlice.actions;
export default clientSlice.reducer;
