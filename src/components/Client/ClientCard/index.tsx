import React from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

import Card from '@components/ui/Card/Card';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import cls from '@components/Entry/EntryCard/style.module.scss';
import Input from '@components/ui/Input/Input';
import UserIcon from '@components/ui/UserIcon/UserIcon';
import { deleteClient } from '@components/Client/services/deleteClient';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';

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
  const { refresh } = useRouter();
  const onSubmitHandler = (values: IClient) => {
    console.log(values);
  };
  const onDeleteHandler = () => {
    deleteClient(client);
    refresh();
  };
  return (
    <Card
      initialValues={client}
      onSubmit={onSubmitHandler}
      onClose={onClose}
    >
      {({
        values,
        handleChange,
        handleSubmit,
      }) => (
        <>
          <Card.Closer />
          <div className={cls.userIconContainer}>
            <UserIcon
              userName={client?.name}
              withUpload
              id="userIcon"
              value={values?.userIcon}
              onChange={handleChange}
            />
          </div>
          <div className={cls.inputsWrapper}>
            <div className={cls.nameInputs}>
              <Input
                id="name"
                label="Ім'я"
                value={values?.name}
                onChange={handleChange}
              />
            </div>
            <div className={cls.nameInputs}>
              <Input
                id="phoneNumber"
                label="Номер телефону"
                value={values?.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={cls.buttonsWrapper}>
            {mode === 'edit' && (
              <>
                <Card.Button onClick={handleSubmit}>
                  Зберегти
                </Card.Button>
                <Card.Button onClick={onDeleteHandler}>
                  <Trash2 />
                </Card.Button>
              </>
            )}
            {mode === 'create' && (
              <Card.Button
                onClick={handleSubmit}
              >
                Створити
              </Card.Button>
            )}
          </div>
        </>

      )}

    </Card>
  );
};

export default ClientCard;
