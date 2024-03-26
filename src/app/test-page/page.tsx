import React from 'react';

import { IEmployee } from '@/components/EmployeeCard/employee.type';
import { IClient, IEntries } from '@/components/Entry/entries.type';

import cls from './style.module.scss';

import Entry from '../../components/Entry';

const getEntries = () => fetch('http://localhost:4000/entries')
  .then((response) => response.json());

const getClients = (arr:string[]) => fetch('http://localhost:4000/clients')
  .then((response) => response.json())
  .then((response) => response.filter((client: IClient) => arr.includes(client?.id)));

const getEmployees = (arr:string[]) => fetch('http://localhost:4000/employees')
  .then((response) => response.json())
  .then((response) => response.filter((employee:IEmployee) => arr.includes(employee.id!!)));

const TestPage = async () => {
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
        employee, client, time, services, id,
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
            services={services}
          />
        );
      })}
    </div>
  );
};

export default TestPage;
