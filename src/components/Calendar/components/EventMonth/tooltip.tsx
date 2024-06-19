import React from 'react';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { IBarberServices } from '@constants/barber-services';
import Tooltip from '@components/Tooltip/Tooltip';

import cls from './style.module.scss';

interface MonthEventTooltipProps {
  id: string
  employee: IEmployee
  client: IClient
  time: string
  date: string
  services: IBarberServices[]
}
const MonthEventTooltip = ({
  id, client, employee, time, services, date,
}:MonthEventTooltipProps) => (
  <Tooltip id={`month-event-tooltip-${id}`}>
    <ul className={cls.infoList}>
      <li>
        {`Майстер: ${(employee as IEmployee).name}`}
      </li>
      <li>
        {`Клієнт: ${(client as IClient).name}`}
      </li>
      <li>
        {`Дата: ${time}/${date}`}
      </li>
      <li>
        {`Послуги: ${(services as IBarberServices[]).map((serv) => serv.name).join(', ')}.`}
      </li>
    </ul>
  </Tooltip>
);

export default MonthEventTooltip;
