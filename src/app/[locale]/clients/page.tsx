'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import Page from '@components/ui/Page/Page';
import { fetchClientList } from '@components/Client/services/fetchClientList';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getClientList } from '@components/Client/selectors/getClientList';
import { getClientLoading } from '@components/Client/selectors/getClientLoading';
import { getOpenedClient } from '@components/Client/selectors/getOpenedClient';
import ClientCard, { ClientCardMode } from '@components/Client/ClientCard';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { changeOpenedClient, clearOpenedClient } from '@components/Client/slice/clientSlice';
import Button from '@components/ui/Button/Button';
import MiniClientCard from '@components/Client/MiniClientCard';

import ExpandableContainer from '../../../components/ui/ExpandableContainer';

const ClientsPage = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const clients = useAppSelector(getClientList);
  const loading = useAppSelector(getClientLoading);
  const openedClient = useAppSelector(getOpenedClient);
  useEffect(() => {
    dispatch(fetchClientList());
  }, [dispatch]);

  const openClient = (client: IClient) => {
    dispatch(changeOpenedClient({
      client,
      mode: ClientCardMode.EDIT,
    }));
  };
  const onCloseHandler = () => {
    dispatch(clearOpenedClient());
  };
  return (
    <Page>
      <ExpandableContainer label={t('client-page.title')}>
        {clients.map((client) => (
          <MiniClientCard
            key={client.id}
            client={client}
            onDoubleClick={() => openClient(client)}
          />
        ))}
      </ExpandableContainer>
      {(openedClient.mode && openedClient.client) && (
        <ClientCard
          client={openedClient.client}
          mode={openedClient.mode}
          onClose={onCloseHandler}
        />
      )}
    </Page>
  );
};

export default ClientsPage;
