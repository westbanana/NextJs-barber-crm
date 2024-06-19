import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { TodoT } from '@components/TodoList/slice/todoListSlice';
import { createTodosToasts } from '@components/TodoList/toasts';
import { toastDefaultParams } from '@constants/toast-constants';

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo:TodoT, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch('http://localhost:4000/todos', {
          method: 'POST',
          body: JSON.stringify(todo),
        }),
        createTodosToasts,
        toastDefaultParams,
      );

      if (!response.ok) {
        throw new Error('Server error');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
