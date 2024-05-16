import { createSlice } from '@reduxjs/toolkit';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';

import { ErrorResponse } from '@/components/Employee/EmployeeList/services/fetchEmployeeList';

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
  },
});

export default clientSlice.reducer;
