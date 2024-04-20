import React from 'react';
import { Plus } from 'lucide-react';
import { IClient, IEntries } from '@components/Entry/MiniEntry/entries.type';
import MiniEntry from '@components/Entry/MiniEntry';

import { getClients } from '@/components/Entry/services/getClients';
import { getEmployees } from '@/components/Entry/services/getEmployees';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import Label from '@/components/Label/Label';
import { getTodayEntries } from '@/components/Entry/services/getTodayEntries';

import cls from './style.module.scss';

const TodayEntries = async () => {
  const entries:IEntries[] = await getTodayEntries();
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
        {entries.length
          ? (entries.map((entry) => {
            const {
              employee,
              client,
              time,
              services,
              id,
              date,
            } = entry;
            const currentEmployee = employees.find((element: IEmployee) => element.id === employee);
            const currentClient = clients.find((element: IClient) => element.id === client);
            return (
              <MiniEntry
                currentEntry={entry}
                id={id}
                key={id}
                employee={currentEmployee}
                client={currentClient}
                time={time}
                date={date}
                services={services}
              />
            );
          }))
          : (
            'No recordings today💇‍♂️.️'
          )}
      </div>
    </div>
  );
};

export default TodayEntries;
