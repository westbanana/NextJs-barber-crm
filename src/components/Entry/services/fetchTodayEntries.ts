import { createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { getAllEntries } from '@components/Entry/services/getTodayEntries';
import { getAllEmployees } from '@components/Entry/services/getEmployees';
import { getAllClients } from '@components/Entry/services/getClients';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { barberServices, IBarberServices } from '@constants/barber-services';

// fetchMainPageInfo
export const fetchTodayEntries = createAsyncThunk(
  'entries/fetchTodayEntries',
  async (_, { rejectWithValue }) => {
    try {
      // Все записи
      const allEntries = await getAllEntries();
      // Все работники
      const allEmployees = await getAllEmployees();
      // Все клиенты
      const allClients = await getAllClients();

      // Дата (сегодня)
      const currentDate = dayjs().format('YYYY-M-D');
      // Записи у которых дата равна сегодняшней дате + сортировка по возрастанию
      const todayEntries:IEntry[] = allEntries
        .filter((entry: IEntry) => entry.date === currentDate)
        .sort((a:IEntry, b:IEntry) => a.time.localeCompare(b.time));

      // Id работников без дубликатов
      const employeeIds = Array.from(new Set(todayEntries.map((entry) => entry.employee)));

      // Id клиентов (дубликатов быть не может, так как клиент всегда один)
      const clientIds = todayEntries.map((entry) => entry.client);

      // Получаем сущности с информацией работников
      const todayEmployees = allEmployees.filter((employee:IEmployee) => employeeIds.includes(employee.id!!));
      // Получаем сущности с информацией клиентов
      const todayClients = allClients.filter((client:IClient) => clientIds.includes(client.id!!));

      // Меняем id сущностей на их данные в самой записи
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
        allEntries,
        todayEntries: neededEntries,
        allClients,
        allEmployees,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
