import { createSlice } from '@reduxjs/toolkit';

import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { ErrorResponse, fetchEmployeeList } from '@/components/Employee/EmployeeList/services/fetchEmployeeList';
import { fetchClientList } from '@components/Client/services/fetchClientList';

export interface ClientsState {
  error: string | undefined;
  loading: boolean;
  clientList: IClient[]
}

const initialState: ClientsState = {
  error: undefined,
  loading: true,
  clientList: [],
};
export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
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

export default clientSlice.reducer;
