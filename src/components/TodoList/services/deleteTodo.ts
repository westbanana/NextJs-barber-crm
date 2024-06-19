import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { TodoT } from '@components/TodoList/slice/todoListSlice';
import { toastDefaultParams } from '@constants/toast-constants';
import { deleteEmployeeToasts } from '@components/Employee/toasts';

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todo:TodoT, { rejectWithValue }) => {
    const { id } = todo;
    try {
      const response = await toast.promise(
        fetch(`http://localhost:4000/todos/${id}`, { method: 'DELETE' }),
        deleteEmployeeToasts('q123123'),
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
