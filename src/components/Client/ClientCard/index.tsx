import React from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import Card from '@components/ui/Card/Card';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import cls from '@components/Entry/EntryCard/style.module.scss';
import Input from '@components/ui/Input/Input';
import UserIcon from '@components/ui/UserIcon/UserIcon';
import { deleteClient } from '@components/Client/services/deleteClient';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import Form from '@components/Form';

export enum ClientCardMode {
    CREATE = 'create',
    EDIT = 'edit',
    READ_ONLY = 'read-only',
}

interface ClientCardProps {
  client: IClient,
  onClose: () => void;
  mode: ClientCardMode | undefined;
}

const ClientCard = ({ mode, client, onClose }: ClientCardProps) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const { refresh } = useRouter();
  const onSubmitHandler = (values: IClient) => {
    // console.log(values);
  };
  const onDeleteHandler = () => {
    deleteClient(client);
    refresh();
  };
  return (
    <Card onClose={onClose}>
      <Form<IClient> initialState={client}>
        {({ control, handleSubmit, errors }) => (
          <>
            <Card.Closer />
            <div className={cls.userIconContainer}>
              <Controller
                render={({ field }) => (
                  <UserIcon
                    userName={client?.name}
                    withUpload
                    id="userIcon"
                    value={field.value as string}
                    onChange={field.onChange}
                  />
                )}
                name="clientIcon"
                control={control}
              />
            </div>
            <div className={cls.inputsWrapper}>
              <div className={cls.nameInputs}>
                <Controller
                  render={({ field }) => (
                    <Input
                      id="name"
                      label={t('client-page.client-card.name')}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                  name="name"
                  control={control}
                />
              </div>
              <div className={cls.nameInputs}>
                <Controller
                  render={({ field }) => (
                    <Input
                      id="phoneNumber"
                      label={t('client-page.client-card.phone')}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                  name="phoneNumber"
                />
              </div>
            </div>
            <div className={cls.buttonsWrapper}>
              {mode === 'edit' && (
                <>
                  <Card.Button onClick={handleSubmit(onSubmitHandler)}>
                    {t('client-page.client-card.save')}
                  </Card.Button>
                  <Card.Button onClick={onDeleteHandler}>
                    <Trash2 />
                  </Card.Button>
                </>
              )}
              {mode === 'create' && (
                <Card.Button
                  onClick={handleSubmit(onSubmitHandler)}
                >
                  {t('client-page.client-card.create')}
                </Card.Button>
              )}
            </div>
          </>

        )}
      </Form>
    </Card>
  );
};

export default ClientCard;
