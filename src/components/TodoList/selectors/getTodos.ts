import { RootState } from '@lib/store';

export const getTodos = (state: RootState) => state.todos.data;
