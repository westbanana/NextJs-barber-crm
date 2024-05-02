import { createAsyncThunk } from '@reduxjs/toolkit';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { getTodayEntries } from '@components/Entry/services/getTodayEntries';
import { getEmployees } from '@components/Entry/services/getEmployees';
import { getClients } from '@components/Entry/services/getClients';
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
      console.log({ employeeIdsArray });
      const employees = await getEmployees(employeeIdsArray as string[]);
      console.log({ employees });
      const clients = await getClients(clientIds as string[]);
      return todayEntries.map((entry) => {
        const {
          employee,
          client,
          services,
        } = entry;
        const currentEmployee = employees?.find((empl: IEmployee) => empl.id === employee);
        const currentClient = clients?.find((cl: IClient) => cl.id === client);
        const selectedServices: IBarberServices[] = barberServices.filter((serv) => services.includes(serv.id));
        return ({
          ...entry,
          client: currentClient,
          employee: currentEmployee,
          services: selectedServices,
        });
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
