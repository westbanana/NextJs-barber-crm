import React from 'react';
import { Info as InfoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { InfoProps } from '@components/Entry/MiniEntry/Info/info.type';
import Tooltip from '@components/ui/Tooltip/Tooltip';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { IBarberServices } from '@constants/barber-services';

import cls from './style.module.scss';

const MiniEntryInfo = ({ entryInfo, entryId }:InfoProps) => {
  const t = useTranslations();
  const { name: employeeName } = entryInfo.employee as IEmployee;
  const { name: clientName } = entryInfo.client as IClient;
  const services = entryInfo.services as IBarberServices[];
  const {
    time, date,
  } = entryInfo;
  return (
    <>
      <InfoIcon data-tooltip-id={`entry-info-${entryId}`} />
      <Tooltip id={`entry-info-${entryId}`} disabled={entryInfo.completed}>
        <ul className={cls.infoList}>
          <li>
            {`${t('today-entries.info.employee')}: ${employeeName}`}
          </li>
          <li>
            {`${t('today-entries.info.client')}: ${clientName}`}
          </li>
          <li>
            {`${t('today-entries.info.date')}: ${time}/${date}`}
          </li>
          <li>
            {`${t('today-entries.info.services')}: ${services.map((serv) => serv.name).join(', ')}.`}
          </li>
        </ul>
      </Tooltip>
    </>
  );
};

export default MiniEntryInfo;
