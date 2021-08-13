import { all, put, takeLatest, select, call } from 'redux-saga/effects';
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
import {
  Equals,
  FetchPagesResponse,
  FetchTextsResponse,
  GetPageResponse,
  PageItem,
  PromiseArgType,
  TextItem,
} from '../types';
import { API_URL } from '../config';
import { getPageStates } from '../selectors';
import API from '../utils/apis';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchPagesSaga() {
  try {
    let typeguard: Equals<Promise<FetchPagesResponse>, ReturnType<typeof API.fetchPages>>;
    const { data: pages }: PromiseArgType<typeof typeguard> = yield call(API.fetchPages);

    yield put(fetchPagesSuccess(pages));
  } catch (error) {
    yield put(fetchPagesError(error.message));
  }
}

function* addPageSaga({ payload }: PayloadAction<PageItem>) {
  try {
    yield call(API.addPage, payload);
  } catch (error) {}
}

function* updatePageSaga({ payload }: PayloadAction<PageItem>) {
  try {
    yield call(API.updatePage, payload);
  } catch (error) {}
}

function* deletePageSaga({ payload }: PayloadAction<PageItem>) {
  try {
    yield call(API.deletePage, payload);
  } catch (error) {}
}

function* setPageSaga({ payload }: PayloadAction<string>) {
  if (!payload) return;

  try {
    let typeguard: Equals<Promise<GetPageResponse>, ReturnType<typeof API.getPage>>;
    const { data: page }: PromiseArgType<typeof typeguard> = yield call(API.getPage, payload);

    yield put(setPageSuccess(page));
  } catch (error) {
    yield put(setPageError(error.message));
  }
}

function* fetchTextsSaga({ payload }: PayloadAction<string>) {
  try {
    let typeguard: Equals<Promise<FetchTextsResponse>, ReturnType<typeof API.fetchTexts>>;
    const { data: texts }: PromiseArgType<typeof typeguard> = yield call(API.fetchTexts, payload);

    yield put(fetchPageTextsSuccess(texts));
  } catch (error) {
    yield put(fetchPageTextsError(error.message));
  }
}

function* addTextSaga({ payload }: PayloadAction<TextItem>) {
  try {
    yield call(API.addText, payload);
    const { page } = yield select(getPageStates);

    if (page) {
      yield call(API.updatePage, page);
    }
  } catch (error) {}
}

function* updateTextSaga({ payload }: PayloadAction<TextItem>) {
  try {
    yield call(API.updateText, payload);
  } catch (error) {}
}

function* deleteTextSaga({ payload }: PayloadAction<TextItem>) {
  try {
    yield call(API.deleteText, payload);
    const { page } = yield select(getPageStates);
    if (page) {
      yield call(API.updatePage, page);
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
