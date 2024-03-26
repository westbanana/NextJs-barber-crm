'use client';

import React from 'react';
import { Info as InfoIcon } from 'lucide-react';

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
        <div>
          <ul>
            <li>
              {`Майстер:${employee.name}`}
            </li>
            <li>
              {`Клієнт:${client.name}`}
            </li>
            <li>
              {`Дата:${date}/${time}`}
            </li>
            <li>
              {`Послуги:${services.map((serv) => serv.serviceName).join(',')}.`}
            </li>

          </ul>
        </div>
      </Tooltip>
    </>
  );
};

export default Info;
