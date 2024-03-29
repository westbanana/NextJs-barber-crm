import React from 'react';

import { IClient, IEntries } from '@/components/Entry/entries.type';
import { getEntries } from '@/app/(todayEntries)/services/getEntries';
import { getClients } from '@/app/(todayEntries)/services/getClients';
import { getEmployees } from '@/app/(todayEntries)/services/getEmployees';
import cls from '@/app/test-page/style.module.scss';
import { IEmployee } from '@/components/EmployeeCard/employee.type';
import Entry from '@/components/Entry';

const TodayEntries = async () => {
  const entries:IEntries[] = await getEntries();
  const employeeIds = entries.map((entrie) => entrie.employee);
  const clientIds = entries.map((entrie) => entrie.client);
  const clients = await getClients(clientIds);
  const employees = await getEmployees(employeeIds);
  return (
    <div
      className={cls.test}
    >
      {entries.map(({
        employee, client, time, services, id, date,
      }) => {
        const currentEmployee = employees.find((empl:IEmployee) => empl.id === employee);
        const currentClient = clients.find((cl:IClient) => cl.id === client);
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
  );
};

export default TodayEntries;
