import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { toastDefaultParams } from '@/constants/toast-constants';
import { fetchEmployeeListToasts } from '@components/Employee/toasts';
import { fetchClientListToasts } from '@components/Client/toasts';

export interface ErrorResponse {
  message: string;
}

export const fetchClientList = createAsyncThunk(
  'clients/fetchClientList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch('http://localhost:4000/clients', { cache: 'no-cache' }),
        fetchClientListToasts,
        toastDefaultParams,
      );

      if (!response.ok) {
        throw new Error('Server error');
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
