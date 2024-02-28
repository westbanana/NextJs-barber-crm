import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id:string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/employees/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Server error');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
