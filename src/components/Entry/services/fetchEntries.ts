import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/entries');
      if (!response.ok) {
        throw new Error('Server error');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
