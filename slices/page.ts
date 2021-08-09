import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageItem, PageState, TextItem } from '../types';

export const initialState: PageState = {
  loading: false,
  pages: [],
  page: null,
  texts: [],
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

    addPage: (state, { payload }: PayloadAction<PageItem>) => {
      state.pages.push(payload);
    },

    updatePage: (state, { payload }: PayloadAction<PageItem>) => {
      state.pages = state.pages.map((page) =>
        page.id === payload.id
          ? { ...page, title: payload.title, description: payload.description }
          : page
      );
    },

    deletePage: (state, { payload }: PayloadAction<PageItem>) => {
      state.pages = state.pages.filter((text) => text.id !== payload.id);
    },

    setPage: (state, { payload }: PayloadAction<string>) => {
      state.loading = true;
    },

    setPageSuccess: (state, { payload }: PayloadAction<PageItem>) => {
      state.page = payload;
      state.loading = false;
    },

    setPageError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },

    fetchPageTexts: (state, { payload }: PayloadAction<string>) => {
      state.loading = true;
    },

    fetchPageTextsSuccess: (state, { payload }: PayloadAction<TextItem[]>) => {
      state.texts = payload;
      state.loading = false;
    },

    fetchPageTextsError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },

    addText: (state, { payload }: PayloadAction<TextItem>) => {
      state.texts.push(payload);
      if (state.page) {
        state.page.count = state.page.count + 1;
      }
    },

    updateText: (state, { payload }: PayloadAction<TextItem>) => {
      state.texts = state.texts.map((text) =>
        text.id === payload.id ? { ...text, key: payload.key, value: payload.value } : text
      );
    },

    deleteText: (state, { payload }: PayloadAction<TextItem>) => {
      state.texts = state.texts.filter((text) => text.id !== payload.id);
      if (state.page) {
        state.page.count = state.page.count - 1;
      }
    },

    changeTerm: (state, { payload }: PayloadAction<string>) => {
      state.term = payload;
    },
  },
});

export const {
  fetchPages,
  fetchPagesSuccess,
  fetchPagesError,
  addPage,
  updatePage,
  deletePage,
  setPage,
  setPageSuccess,
  setPageError,
  fetchPageTexts,
  fetchPageTextsSuccess,
  fetchPageTextsError,
  addText,
  updateText,
  deleteText,
  changeTerm,
} = pageSlice.actions;

export default pageSlice.reducer;
