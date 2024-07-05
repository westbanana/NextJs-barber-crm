import React from 'react';
import { Event, EventProps } from 'react-big-calendar';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { EntriesEventsReturn } from '@components/Calendar/Calendar';
import { IBarberServices } from '@constants/barber-services';

const EventAgenda = ({ event }: EventProps<EntriesEventsReturn>) => {
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
        {(services as IBarberServices[])?.map(({ name, price }) => <li>{`${name}: ${price}`}</li>)}
      </ul>
    </div>
  );
};
export default EventAgenda;
