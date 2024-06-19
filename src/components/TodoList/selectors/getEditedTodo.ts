import { RootState } from '@lib/store';

export const getEditedTodo = (state: RootState) => state.todos.editedTodo;
