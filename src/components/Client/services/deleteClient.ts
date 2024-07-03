import { toast } from 'react-toastify';

import { toastDefaultParams } from '@constants/toast-constants';
import { deleteClientToasts } from '@components/Client/toasts';
import { IClient } from '@components/Entry/MiniEntry/entries.type';

export const deleteClient = (client: IClient) => {
  toast.promise(
    fetch(`http://localhost:4000/clients/${client.id}`, {
      method: 'DELETE',
    }),
    deleteClientToasts(client.name),
    toastDefaultParams,
  );
};
