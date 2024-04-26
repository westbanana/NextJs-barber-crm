import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEntries } from '@components/Entry/MiniEntry/entries.type';

export const createEntry = createAsyncThunk(
  'entries/createEntry',
  async (entry:IEntries, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/entries', {
        method: 'POST',
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
