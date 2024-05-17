import { createAsyncThunk } from '@reduxjs/toolkit';

import { IEntry } from '@components/Entry/MiniEntry/entries.type';

export const fetchEntryDates = createAsyncThunk(
  'entries/fetchEntriesDates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/entries');
      if (!response.ok) {
        throw new Error('Server error');
      }
      return response.json()
        .then((response: IEntry[]) => response.map(({
          date,
          time,
        }) => `${date} ${time}`));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
