import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { toastDefaultParams } from '@constants/toast-constants';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { updateEmployeeToasts } from '@components/Employee/toasts';
import { updateEntryToasts } from '@components/Entry/toasts';

export const updateEntry = createAsyncThunk(
  'entries/updateEntry',
  async (entry:IEntry, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch(`http://localhost:4000/entries/${entry.id}`, {
          method: 'PUT',
          body: JSON.stringify(entry),
        }),
        updateEntryToasts,
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
