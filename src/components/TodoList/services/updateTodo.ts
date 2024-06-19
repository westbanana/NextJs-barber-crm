import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { TodoT } from '@components/TodoList/slice/todoListSlice';
import { updateTodosToasts } from '@components/TodoList/toasts';
import { toastDefaultParams } from '@constants/toast-constants';

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todo:TodoT, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch(`http://localhost:4000/todos/${todo.id}`, {
          method: 'PUT',
          body: JSON.stringify(todo),
        }),
        updateTodosToasts,
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
