import { RootState } from '@lib/store';

export const getClientList = (state: RootState) => state.clients.clientList;
