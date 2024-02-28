import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmployeeList = createAsyncThunk(
  'employee/fetchEmployeeList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/employees');

      if (!response.ok) {
        throw new Error('Server error');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
