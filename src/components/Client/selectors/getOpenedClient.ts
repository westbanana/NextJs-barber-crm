import { RootState } from '@lib/store';

export const getOpenedClient = (state: RootState) => state.clients.openedClient;
