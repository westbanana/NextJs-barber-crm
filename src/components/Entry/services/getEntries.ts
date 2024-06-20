import { toast } from 'react-toastify';

import { fetchEntryListToasts } from '@components/Entry/toasts';
import { toastDefaultParams } from '@constants/toast-constants';

export const getAllEntries = () => fetch(
  'http://localhost:4000/entries',
  {
    cache: 'no-store',
    next: {
      revalidate: 0,
    },
  },
)
  .then((response) => response.json());
