import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { toastDefaultParams } from '@/constants/toast-constants';
import { deleteEmployeeToasts } from '@components/Employee/toasts';
import { deleteEntryToasts } from '@components/Entry/toasts';

export const deleteEntry = createAsyncThunk(
  'employee/deleteEmployee',
  async (entry:IEntry, { rejectWithValue }) => {
    const { id } = entry;
    try {
      const response = await toast.promise(
        fetch(`http://localhost:4000/entries/${id}`, { method: 'DELETE' }),
        deleteEntryToasts,
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
