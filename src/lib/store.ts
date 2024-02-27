import { configureStore } from '@reduxjs/toolkit';

import employeeListReducer from '@/components/EmployeeList/slices/employeeListSlice';

export const makeStore = () => configureStore({
  reducer: {
    employeeList: employeeListReducer,
  },
});

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
