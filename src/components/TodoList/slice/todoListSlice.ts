import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ErrorResponse } from '@components/Employee/services/fetchEmployeeList';
import { createTodo } from '@components/TodoList/services/createTodo';
import { fetchTodos } from '@components/TodoList/services/fetchTodos';
import { deleteTodo } from '@components/TodoList/services/deleteTodo';
import { updateTodo } from '@components/TodoList/services/updateTodo';

export interface TodoT {
  id: string,
  description: string,
  completed: boolean,
  createdAt: string,
  completedAt: string | undefined,
}

export interface TodoListState {
  data: TodoT[]
  loading: boolean,
  editedTodo: TodoT | undefined,
  error: string | undefined
}

const initialState: TodoListState = {
  data: [],
  loading: false,
  editedTodo: undefined,
  error: undefined,
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    changeEditedTodo: (state, action: PayloadAction<TodoT | undefined>) => {
      state.editedTodo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTodo.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(createTodo.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action: PayloadAction<TodoT>) => {
      state.data = [action.payload, ...state.data];
      state.loading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(fetchTodos.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<TodoT[]>) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(deleteTodo.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<TodoT>) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
      state.loading = false;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      const { message } = action.payload as ErrorResponse;
      state.loading = false;
      state.error = message;
    });
    builder.addCase(updateTodo.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action: PayloadAction<TodoT>) => {
      state.data = state.data.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
      state.loading = false;
    });
  },
});
export const { changeEditedTodo } = todoListSlice.actions;

export default todoListSlice.reducer;
