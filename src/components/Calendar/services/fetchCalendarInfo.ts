import { getAllEmployees } from '@components/Entry/services/getEmployees';
import { getAllEntries } from '@components/Entry/services/getEntries';
import { getAllClients } from '@components/Entry/services/getClients';
import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { barberServices, IBarberServices } from '@constants/barber-services';

export const fetchCalendarInfo = async () => {
  const employees: IEmployee[] = await getAllEmployees();
  const entries: IEntry[] = await getAllEntries();
  const clients: IClient[] = await getAllClients();
  const formattedEntries: IEntry[] = entries.map((entry) => {
    const entryEmployeeInfo = employees.find((employee) => employee.id === entry.employee);
    const entryClientInfo = clients.find((client) => client.id === entry.client);
    const entryServicesInfo = barberServices.filter((serv) => (entry.services as string[]).includes(serv.id));
    return {
      ...entry, client: entryClientInfo, employee: entryEmployeeInfo, services: entryServicesInfo,
    };
  });
  return {
    entries: formattedEntries,
    employees,
    clients,
  };
};
