import { loadWebpackHook } from 'next/dist/server/config-utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { getAllEntries } from '@components/Entry/services/getEntries';
import { getAllEmployees } from '@components/Entry/services/getEmployees';
import { getAllClients } from '@components/Entry/services/getClients';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { barberServices } from '@constants/barber-services';

export const fetchTodayEntries = createAsyncThunk(
  'entries/fetchTodayEntries',
  async (_, { rejectWithValue }) => {
    try {
      const allEntries:IEntry[] = await getAllEntries();
      const allEmployees = await getAllEmployees();
      const allClients = await getAllClients();
      const entriesDates = allEntries.map(({
        date,
        time,
      }) => `${date} ${time}`);

      const currentDate = dayjs().format('YYYY-M-D');

      const todayEntries:IEntry[] = allEntries
        .filter((entry: IEntry) => entry.date === currentDate)
        .sort((a:IEntry, b:IEntry) => a.time.localeCompare(b.time));

      const employeeIds = Array.from(new Set(todayEntries.map((entry) => entry.employee)));

      const clientIds = todayEntries.map((entry) => entry.client);
      const todayEmployees = allEmployees.filter((employee:IEmployee) => employeeIds.includes(employee.id!!));
      const todayClients = allClients.filter((client:IClient) => clientIds.includes(client.id!!));

      const formattedTodayEntries = todayEntries.map((entry) => {
        const {
          employee,
          client,
          services,
        } = entry;
        const currentEmployee = todayEmployees?.find((empl: IEmployee) => empl.id === employee);
        const currentClient = todayClients?.find((cl: IClient) => cl.id === client);
        const selectedServices = barberServices.filter((serv) => (services as string[]).includes(serv.id));
        return ({
          ...entry,
          client: currentClient,
          employee: currentEmployee,
          services: selectedServices,
        });
      });
      return {
        allEntries,
        entriesDates,
        todayEntries: formattedTodayEntries,
        allClients,
        allEmployees,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
