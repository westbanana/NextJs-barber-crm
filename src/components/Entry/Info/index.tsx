import React from 'react';
import { Info as InfoIcon } from 'lucide-react';

import cls from './style.module.scss';

import { InfoProps } from '@/components/Entry/Info/info.type';
import Tooltip from '@/components/Tooltip/Tooltip';

const Info = ({ entryInfo, entryId }:InfoProps) => {
  const {
    client, services, time, date, employee,
  } = entryInfo;
  return (
    <>
      <InfoIcon data-tooltip-id={`entry-info-${entryId}`} />
      <Tooltip id={`entry-info-${entryId}`}>
        <ul className={cls.infoList}>
          <li>
            {`Майстер: ${employee.name}`}
          </li>
          <li>
            {`Клієнт: ${client.name}`}
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

export default Info;
