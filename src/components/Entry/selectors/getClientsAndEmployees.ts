import { createSelector } from 'reselect';

import { RootState } from '@/lib/store';

const getClientsAndEmployeesSelector = (state: RootState) => state.entries.clientsAndEmployees;
export const getClientsAndEmployees = createSelector(
  [getClientsAndEmployeesSelector],
  (clientsAndEmployees) => (clientsAndEmployees
    ? {
      clients: clientsAndEmployees.clients,
      employees: clientsAndEmployees.employees,
    }
    : undefined),
);
