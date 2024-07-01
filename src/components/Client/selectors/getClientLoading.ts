import { RootState } from '@lib/store';

export const getClientLoading = (state: RootState) => state.clients.loading;
