import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Check,
  Copy, Menu, Phone, UserCheck, X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { IClient } from '@components/Entry/MiniEntry/entries.type';
import UserIcon from '@components/ui/UserIcon/UserIcon';
import { getShortName } from '@helpers/getShortName';
import { classNames, Mods } from '@lib/classNames/classNames';
import { useCopyToClipboard } from '@lib/hooks/useCopyToClipboard';
import Tooltip from '@components/ui/Tooltip/Tooltip';
import { deleteClient } from '@components/Client/services/deleteClient';

import cls from './style.module.scss';

import MiniCard from '../../ui/MiniCard';

interface MiniClientCardProps extends React.HTMLAttributes<HTMLDivElement> {
    client: IClient;
}

const MiniClientCard = ({ client, ...otherProps }: MiniClientCardProps) => {
  const clientShortName = client.name ? getShortName(client?.name) : 'unknown';
  const { copied, copy } = useCopyToClipboard({ timeout: 500 });
  const t = useTranslations();

  const onPhoneNumberClick = () => {
    copy(client.phoneNumber);
  };

  const onClientDelete = async () => {
    deleteClient(client);
  };
  return (
    <MiniCard
      controllers={{
        data: [
          {
            text: <X />,
            onClick: onClientDelete,
            tooltipId: `delete-client-${client.id}`,
          },
          {
            text: <Phone />,
            tooltipId: `tel-client-${client.id}`,
            tagType: 'a',
            tagProps: { href: `tel:${client.phoneNumber}` },
          },
        ],
      }}
      className={classNames(cls.clientCard, {}, [])}
      {...otherProps}
    >
      <div className={cls.borderInfoContainer}>
        <UserIcon
          userName={client?.name}
          value={client?.clientIcon}
          className={cls.iconSize}
        />
        <span
          data-tooltip-id={`client-name-${client.id}`}
          className={classNames(cls.clientName, {}, [cls.withBg])}
        >
          {clientShortName}
        </span>
      </div>
      <div className={cls.clientInfo}>
        <div className={classNames(cls.phoneNumberContainer, {}, [])}>
          <div
            data-tooltip-id={`client-phone-${client.id}`}
            className={cls.fieldIconContainer}
          >
            <Phone />
            :
          </div>
          <span
            data-tooltip-id={`client-copy-${client.id}`}
            onClick={onPhoneNumberClick}
            className={classNames(cls.phoneNumber, {}, [cls.interactField])}
          >
            {client.phoneNumber}
            {!copied
              ? <Copy className={classNames(cls.copyIcon, {}, [])} />
              : <Check className={classNames(cls.copyIcon, {}, [])} />}
          </span>
        </div>
        <div className={cls.visitContainer}>
          <div
            data-tooltip-id={`client-visits-${client.id}`}
            className={cls.fieldIconContainer}
          >
            <UserCheck />
            :
          </div>
          <span className={cls.visits}>
            {client.visits}
          </span>
        </div>
      </div>
      <Tooltip id={`client-name-${client.id}`}>
        <span>{client.name}</span>
      </Tooltip>
      <Tooltip id={`client-copy-${client.id}`}>
        <span>
          {
            copied
              ? `${client.phoneNumber} - ${t('client-page.mini-card.copied')}`
              : client.phoneNumber
          }
        </span>
      </Tooltip>
      <Tooltip id={`client-phone-${client.id}`}>
        <span>{t('client-page.client-card.phone')}</span>
      </Tooltip>
      <Tooltip id={`client-visits-${client.id}`}>
        <span>{t('client-page.mini-card.visits')}</span>
      </Tooltip>
      <Tooltip id={`tel-client-${client.id}`}>
        <span>{t('client-page.mini-card.call')}</span>
      </Tooltip>
      <Tooltip id={`delete-client-${client.id}`}>
        <span>{t('client-page.mini-card.delete')}</span>
      </Tooltip>
    </MiniCard>
  );
};

export default MiniClientCard;
