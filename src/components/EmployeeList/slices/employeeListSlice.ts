import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IEmployee } from '@/components/EmployeeList/EmployeeItem/employee.type';

export interface EmployeeListState {
  data: IEmployee[]
}

const initialState: EmployeeListState = {
  data: [{
    id: 1,
    name: 'Петро Петров',
    position: 'Барбер',
    userIcon: undefined,
    work_schedule: 'Пн-Пт 10:00-19:00',
    services_provided: [],
  },
  {
    id: 2,
    name: 'Ілля Вінівітін',
    userIcon: undefined,
    position: 'Прибиральник',
    work_schedule: 'Пн-Нд 10:00-12:00',
    services_provided: [],
  }],
};

export const employeeListSlice = createSlice({
  name: 'employeeList',
  initialState,
  reducers: {
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((employee) => employee.id !== action.payload);
    },
    createEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.data.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.data = state.data.map((employee) => {
        if (employee.id === action.payload.id) {
          return action.payload;
        }
        return employee;
      });
    },
  },
});

export const {
  deleteEmployee, updateEmployee,
} = employeeListSlice.actions;

export default employeeListSlice.reducer;
