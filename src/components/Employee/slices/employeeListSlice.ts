import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { EmployeeCardMode } from '@components/Employee/EmployeeCard/employee-card.type';
import { ErrorResponse, fetchEmployeeList } from '@components/Employee/services/fetchEmployeeList';
import { updateEmployee } from '@components/Employee/services/updateEmployee';
import { createEmployee } from '@components/Employee/services/createEmployee';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { deleteEmployee } from '@components/Employee/services/deleteEmployee';

export interface EmployeeListState {
  data: IEmployee[]
  loading: boolean,
  openedCard: EmployeeCardMode | undefined,
  error: string | undefined
}

const initialState: EmployeeListState = {
  data: [],
  loading: false,
  openedCard: undefined,
  error: undefined,
};

export const employeeListSlice = createSlice({
  name: 'employeeList',
  initialState,
  reducers: {
    openCard: (state, action: PayloadAction<EmployeeCardMode | undefined>) => {
      state.openedCard = action.payload;
    },
    closeCard: (state) => {
      state.openedCard = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeList.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchEmployeeList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchEmployeeList.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(updateEmployee.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.data = state.data.map((employee) => {
        if (employee.id === action.payload.id) {
          return action.payload;
        }
        return employee;
      });
      state.loading = false;
      state.openedCard = undefined;
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createEmployee.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.openedCard = undefined;
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteEmployee.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action:PayloadAction<IEmployee>) => {
      state.loading = false;
      state.data = state.data.filter((employee) => employee.id !== action.payload.id);
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchTodayEntries.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchTodayEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.allEmployees;
    });
    builder.addCase(fetchTodayEntries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const {
  openCard,
  closeCard,
} = employeeListSlice.actions;

export default employeeListSlice.reducer;
