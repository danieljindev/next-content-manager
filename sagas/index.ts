import { all, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchPages,
  fetchPagesSuccess,
  fetchPagesError,
  fetchPageTexts,
  fetchPageTextsSuccess,
  fetchPageTextsError,
  addText,
  updateText,
  deleteText,
  setPage,
  setPageSuccess,
  setPageError,
  addPage,
  updatePage,
  deletePage,
} from '../slices/page';
import { PageItem, TextItem } from '../types';
import { API_URL } from '../config';
import { getPageStates } from '../selectors';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchPagesSaga(): any {
  let pages: PageItem[] = [];

  try {
    pages = (yield axios(`${API_URL}/pages`)).data;

    yield put(fetchPagesSuccess(pages));
  } catch (error) {
    yield put(fetchPagesError(error.message));
  }
}

function* addPageSaga({ payload }: PayloadAction<PageItem>): any {
  try {
    yield axios.post(`${API_URL}/pages`, payload);
  } catch (error) {}
}

function* updatePageSaga({ payload }: PayloadAction<PageItem>): any {
  try {
    yield axios.put(`${API_URL}/pages/${payload.id}`, payload);
  } catch (error) {}
}

function* deletePageSaga({ payload }: PayloadAction<PageItem>): any {
  try {
    yield axios.delete(`${API_URL}/pages/${payload.id}`);
  } catch (error) {}
}

function* setPageSaga({ payload }: PayloadAction<string>): any {
  if (!payload) return;
  let page: PageItem;
  try {
    page = (yield axios(`${API_URL}/pages/${payload}`)).data;
    yield put(setPageSuccess(page));
  } catch (error) {
    yield put(setPageError(error.message));
  }
}

function* fetchTextsSaga({ payload }: PayloadAction<string>): any {
  let texts: TextItem[] = [];
  try {
    texts = (yield axios(`${API_URL}/texts?pageId=${payload}`)).data;
    yield put(fetchPageTextsSuccess(texts));
  } catch (error) {
    yield put(fetchPageTextsError(error.message));
  }
}

function* addTextSaga({ payload }: PayloadAction<TextItem>): any {
  try {
    yield axios.post(`${API_URL}/texts`, payload);
    const { page } = yield select(getPageStates);
    if (page) {
      yield axios.put(`${API_URL}/pages/${page.id}`, { ...page, count: page.count });
    }
  } catch (error) {}
}

function* updateTextSaga({ payload }: PayloadAction<TextItem>): any {
  try {
    yield axios.put(`${API_URL}/texts/${payload.id}`, payload);
  } catch (error) {}
}

function* deleteTextSaga({ payload }: PayloadAction<TextItem>): any {
  try {
    yield axios.delete(`${API_URL}/texts/${payload.id}`);
    const { page } = yield select(getPageStates);
    if (page) {
      yield axios.put(`${API_URL}/pages/${page.id}`, { ...page, count: page.count });
    }
  } catch (error) {}
}

function* rootSaga() {
  yield all([
    takeLatest(fetchPages.type, fetchPagesSaga),
    takeLatest(addPage.type, addPageSaga),
    takeLatest(updatePage.type, updatePageSaga),
    takeLatest(deletePage.type, deletePageSaga),
    takeLatest(setPage.type, setPageSaga),
    takeLatest(fetchPageTexts.type, fetchTextsSaga),
    takeLatest(addText.type, addTextSaga),
    takeLatest(updateText.type, updateTextSaga),
    takeLatest(deleteText.type, deleteTextSaga),
  ]);
}

export default rootSaga;
