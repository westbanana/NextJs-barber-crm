import { createSelector } from 'reselect';

import { RootState } from '@/lib/store';

export const getClientsAndEmployees = (state: RootState) => state.entries.clientsAndEmployees;
