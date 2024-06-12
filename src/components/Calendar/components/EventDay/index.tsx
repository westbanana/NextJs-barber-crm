import React from 'react';
import { Event, EventProps } from 'react-big-calendar';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';

interface EntriesEventsReturn extends Event {
  data?: IEntry
}
const EventDay = ({ event }: EventProps<EntriesEventsReturn>) => {
  const { data } = event;
  const {
    client,
    employee,
    services,
  } = data || {};
  const employeeInfo = employee as IEmployee;
  const clientInfo = client as IClient;
  return (
    <div>
      <p>{`Майстер: ${employeeInfo.name}`}</p>
      <p>{`Клієнт: ${clientInfo.name}`}</p>
      <ul>
        {services?.map(({ name, price }) => <li>{`${name}: ${price}`}</li>)}
      </ul>
    </div>
  );
};

export default EventDay;
