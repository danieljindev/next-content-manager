import { all, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchPages, fetchPagesSuccess, fetchPagesError } from '../slices/page';
import { PageItem } from '../types';

function* fetchPagesSaga(): any {
  let pages: PageItem[] = [];

  try {
    pages = (yield axios('API_URL_TO_GET_PAGE')).data;

    yield put(fetchPagesSuccess(pages));
  } catch (error) {
    yield put(fetchPagesError(error.message));
  }
}

function* rootSaga() {
  yield all([takeLatest(fetchPages.type, fetchPagesSaga)]);
}

export default rootSaga;
