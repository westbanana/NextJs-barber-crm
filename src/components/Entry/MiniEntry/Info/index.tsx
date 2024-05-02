import React from 'react';
import { Info as InfoIcon } from 'lucide-react';
import { InfoProps } from '@components/Entry/MiniEntry/Info/info.type';
import Tooltip from '@components/Tooltip/Tooltip';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { IBarberServices } from '@constants/barber-services';

import cls from './style.module.scss';

const MiniEntryInfo = ({ entryInfo, entryId }:InfoProps) => {
  const { name: employeeName } = entryInfo.employee as IEmployee;
  const { name: clientName } = entryInfo.client as IClient;
  const services = entryInfo.services as IBarberServices[];
  const {
    time, date,
  } = entryInfo;

  return (
    <>
      <InfoIcon data-tooltip-id={`entry-info-${entryId}`} />
      <Tooltip id={`entry-info-${entryId}`}>
        <ul className={cls.infoList}>
          <li>
            {`Майстер: ${employeeName}`}
          </li>
          <li>
            {`Клієнт: ${clientName}`}
          </li>
          <li>
            {`Дата: ${time}/${date}`}
          </li>
          <li>
            {`Послуги: ${services.map((serv) => serv.name).join(', ')}.`}
          </li>
        </ul>
      </Tooltip>
    </>
  );
};

export default MiniEntryInfo;
