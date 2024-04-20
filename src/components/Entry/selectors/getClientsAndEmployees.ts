import { RootState } from '@/lib/store';

export const getClientsAndEmployees = (state:RootState) => (state.entries.clientsAndEmployees ? {
  clients: state.entries.clientsAndEmployees.clients,
  employees: state.entries.clientsAndEmployees.employees,
} : undefined);
