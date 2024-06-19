import { RootState } from '@lib/store';

export const getTodoLoading = (state: RootState) => state.todos.loading;
