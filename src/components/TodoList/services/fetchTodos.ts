import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { toastDefaultParams } from '@constants/toast-constants';
import { fetchEmployeeListToasts } from '@components/Employee/toasts';
import { fetchTodosToasts } from '@components/TodoList/toasts';

export interface ErrorResponse {
  message: string;
}

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch('http://localhost:4000/todos', { cache: 'no-cache' }),
        fetchTodosToasts,
        toastDefaultParams,
      );

      if (!response.ok) {
        throw new Error('Server error');
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
