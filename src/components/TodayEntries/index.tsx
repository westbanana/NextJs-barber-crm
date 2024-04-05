import React from 'react';
import { Plus } from 'lucide-react';

import { IClient, IEntries } from '@/components/Entry/entries.type';
import { getEntries } from '@/components/TodayEntries/services/getEntries';
import { getClients } from '@/components/TodayEntries/services/getClients';
import { getEmployees } from '@/components/TodayEntries/services/getEmployees';
import { IEmployee } from '@/components/EmployeeCard/employee.type';
import Entry from '@/components/Entry';
import Label from '@/components/Label/Label';

import cls from './style.module.scss';

const TodayEntries = async () => {
  const entries:IEntries[] = await getEntries();
  const employeeIds = entries.map((entry) => entry.employee);
  const clientIds = entries.map((entry) => entry.client);
  const clients = await getClients(clientIds);
  const employees = await getEmployees(employeeIds);
  return (
    <div className={cls.mainContainer}>
      <Label label="Today entries" className={cls.todayEntriesLabel} alwaysOnBorder />
      <div className={cls.addEntryContainer}>
        <Plus className={cls.addEntryButton} />
      </div>
      <div
        className={cls.list}
      >
        {entries.map(({
          employee,
          client,
          time,
          services,
          id,
          date,
        }) => {
          const currentEmployee = employees.find((element: IEmployee) => element.id === employee);
          const currentClient = clients.find((element: IClient) => element.id === client);
          return (
            <Entry
              id={id}
              key={id}
              employee={currentEmployee}
              client={currentClient}
              time={time}
              date={date}
              services={services}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodayEntries;
