import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { fetchEmployeeListToasts, toastDefaultParams } from '@/constants/toast-constants';

export interface ErrorResponse {
  message: string;
}

export const fetchEmployeeList = createAsyncThunk(
  'employee/fetchEmployeeList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch('http://localhost:4000/employees'),
        fetchEmployeeListToasts,
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
