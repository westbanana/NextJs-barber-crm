import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IEntries } from '@components/Entry/MiniEntry/entries.type';

import { deleteEmployeeToasts, toastDefaultParams } from '@/constants/toast-constants';
import { EntryInfo } from '@/components/Entry/Info/info.type';

export const deleteEntry = createAsyncThunk(
  'employee/deleteEmployee',
  async (entry:IEntries, { rejectWithValue }) => {
    const { id } = entry;
    try {
      const response = await toast.promise(
        fetch(`http://localhost:4000/entries/${id}`, { method: 'DELETE' }),
        deleteEmployeeToasts('1231'),
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
