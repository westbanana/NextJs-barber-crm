import React from 'react';
import { Plus } from 'lucide-react';
import { IClient, IEntries } from '@components/Entry/MiniEntry/entries.type';
import MiniEntry from '@components/Entry/MiniEntry';
import { classNames, Mods } from '@lib/classNames/classNames';

import cls from './style.module.scss';

import { getClients } from '@/components/Entry/services/getClients';
import { getEmployees } from '@/components/Entry/services/getEmployees';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import Label from '@/components/Label/Label';
import { getTodayEntries } from '@/components/Entry/services/getTodayEntries';

const TodayEntries = async () => {
  const entries:IEntries[] = await getTodayEntries();
  const employeeIds = entries.map((entry) => entry.employee);
  const clientIds = entries.map((entry) => entry.client);
  const clients = await getClients(clientIds);
  const employees = await getEmployees(employeeIds);
  const listMods: Mods = {
    [cls.emptyList]: !entries.length,
  };
  return (
    <div className={cls.mainContainer}>
      <Label label="Today entries" className={cls.todayEntriesLabel} alwaysOnBorder />
      <div className={cls.addEntryContainer}>
        <Plus className={cls.addEntryButton} />
      </div>
      <div
        className={classNames(cls.list, listMods, [])}
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
            const currentEmployee = employees.find((empl: IEmployee) => empl.id === employee);
            const currentClient = clients.find((element: IClient) => element.id === client[0] || client);
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
