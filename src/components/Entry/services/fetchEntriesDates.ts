import { createAsyncThunk } from '@reduxjs/toolkit';

import { IEntries } from '@/components/Entry/entries.type';

export const fetchEntriesDates = createAsyncThunk(
  'entries/fetchEntriesDates',
  async (_, { rejectWithValue }) => {
    console.log('start');
    try {
      const response = await fetch('http://localhost:4000/entries');
      if (!response.ok) {
        throw new Error('Server error');
      }
      return response.json()
        .then((response: IEntries[]) => response.map(({
          date,
          time,
        }) => `${date} ${time}`));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
