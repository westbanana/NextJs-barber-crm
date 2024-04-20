import { configureStore } from '@reduxjs/toolkit';

import employeeListReducer from '@/components/Employee/EmployeeList/slices/employeeListSlice';
import entriesReducer from '@/components/Entry/slices/entrySlice';

export const makeStore = () => configureStore({
  reducer: {
    employeeList: employeeListReducer,
    entries: entriesReducer,
  },
});

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
