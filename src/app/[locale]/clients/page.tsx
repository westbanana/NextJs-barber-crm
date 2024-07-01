'use client';

import React, { useEffect } from 'react';

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

const ClientsPage = () => {
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
      {clients.map((client) => (
        <Button key={client.id} onClick={() => openClient(client)}>
          {`${client.name} - ${client.phoneNumber}`}
        </Button>
      ))}
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
