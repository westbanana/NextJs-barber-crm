import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface ErrorResponse {
  message: string;
}

export const fetchEmployeeList = createAsyncThunk(
  'employee/fetchEmployeeList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch('http://localhost:4000/employees'),
        {
          pending: 'Отримання робітників... 🤔',
          success: 'Робітники отримані! 🎉',
          error: 'Щось пішло не так... 😔',
        },
        {
          closeOnClick: true,
          autoClose: 1500,
          pauseOnHover: true,
        },
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
