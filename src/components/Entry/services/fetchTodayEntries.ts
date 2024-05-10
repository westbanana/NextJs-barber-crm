import { createAsyncThunk } from '@reduxjs/toolkit';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { getTodayEntries } from '@components/Entry/services/getTodayEntries';
import { getAllEmployees, getEmployees } from '@components/Entry/services/getEmployees';
import { getAllClients, getClients } from '@components/Entry/services/getClients';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { barberServices, IBarberServices } from '@constants/barber-services';

export const fetchTodayEntries = createAsyncThunk(
  'entries/fetchTodayEntries',
  async (_, { rejectWithValue }) => {
    try {
      const todayEntries = await getTodayEntries();
      const employeeIds = new Set(todayEntries.map((entry) => entry.employee));
      const employeeIdsArray = Array.from(employeeIds);
      const clientIds = todayEntries.map((entry) => entry.client);
      // const employees = await getEmployees(employeeIdsArray as string[]);
      // const clients = await getClients(clientIds as string[]);
      const allEmployees = await getAllEmployees();
      const allClients = await getAllClients();
      const todayEmployees = allEmployees.filter((employee:IEmployee) => employeeIdsArray.includes(employee.id!!));
      const todayClients = allClients.filter((client:IClient) => clientIds.includes(client.id!!));
      const neededEntries = todayEntries.map((entry) => {
        const {
          employee,
          client,
          services,
        } = entry;
        const currentEmployee = todayEmployees?.find((empl: IEmployee) => empl.id === employee);
        const currentClient = todayClients?.find((cl: IClient) => cl.id === client);
        const selectedServices: IBarberServices[] = barberServices.filter((serv) => services.includes(serv.id));
        return ({
          ...entry,
          client: currentClient,
          employee: currentEmployee,
          services: selectedServices,
        });
      });
      return {
        neededEntries,
        allClients,
        allEmployees,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
