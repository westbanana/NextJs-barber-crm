import React from 'react';

import Card from '@components/ui/Card/Card';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import cls from '@components/Entry/EntryCard/style.module.scss';
import Input from '@components/ui/Input/Input';
import UserIcon from '@components/ui/UserIcon/UserIcon';

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
  console.log('1');
  const onSubmitHandler = () => {};
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
          {/* <div className={cls.buttonsWrapper}> */}
          {/*   {mode === 'edit' && ( */}
          {/*     <> */}
          {/*       <Card.Button onClick={handleSubmit} loading={loading}> */}
          {/*         Зберегти */}
          {/*       </Card.Button> */}
          {/*       <Card.Button onClick={deleteCurrentEmployee}> */}
          {/*         <Trash2 /> */}
          {/*       </Card.Button> */}
          {/*     </> */}
          {/*   )} */}
          {/*   {mode === 'create' && ( */}
          {/*     <Card.Button */}
          {/*       onClick={handleSubmit} */}
          {/*       loading={loading} */}
          {/*     > */}
          {/*       Створити */}
          {/*     </Card.Button> */}
          {/*   )} */}
          {/* </div> */}
        </>

      )}

    </Card>
  );
};

export default ClientCard;
