import { configureStore } from '@reduxjs/toolkit';

import employeeListReducer from '@components/Employee/slices/employeeListSlice';
import entriesReducer from '@/components/Entry/slices/entrySlice';
import clientReducer from '@/components/Client/slice/clientSlice';
import todoReducer from '@/components/TodoList/slice/todoListSlice';

export const makeStore = () => configureStore({
  reducer: {
    employeeList: employeeListReducer,
    entries: entriesReducer,
    clients: clientReducer,
    todos: todoReducer,
  },
});
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
