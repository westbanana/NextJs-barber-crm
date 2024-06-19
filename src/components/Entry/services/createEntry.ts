import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { createEntryToasts } from '@components/Entry/toasts';
import { toastDefaultParams } from '@constants/toast-constants';

export const createEntry = createAsyncThunk(
  'entries/createEntry',
  async (entry:IEntry, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch('http://localhost:4000/entries', {
          method: 'POST',
          body: JSON.stringify(entry),
        }),
        createEntryToasts,
        toastDefaultParams,
      );

      if (!response.ok) {
        throw new Error('Server error');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
