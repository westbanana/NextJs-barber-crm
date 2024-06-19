import { toast } from 'react-toastify';

import { fetchClientListToasts } from '@components/Client/toasts';
import { toastDefaultParams } from '@constants/toast-constants';

export const getAllClients = () => fetch(
  'http://localhost:4000/clients',
)
  .then((response) => response.json())
  .catch((e) => {
    throw new Error(e);
  });
