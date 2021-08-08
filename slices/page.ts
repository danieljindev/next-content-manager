import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageItem, PageState } from '../types';

export const initialState: PageState = {
  loading: false,
  pages: [],
  error: '',
  term: '',
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    fetchPages: (state) => {
      state.loading = true;
    },

    fetchPagesSuccess: (state, { payload }: PayloadAction<PageItem[]>) => {
      state.pages = payload;
      state.loading = false;
    },

    fetchPagesError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { fetchPages, fetchPagesSuccess, fetchPagesError } = pageSlice.actions;

export default pageSlice.reducer;
