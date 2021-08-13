import axios from 'axios';
import { API_URL } from '../config';
import {
  AddPageResponse,
  AddTextResponse,
  DeletePageResponse,
  FetchPagesResponse,
  FetchTextsResponse,
  GetPageResponse,
  PageItem,
  TextItem,
  UpdatePageResponse,
} from '../types';

const fetchPages = (): Promise<FetchPagesResponse> => axios.get(`${API_URL}/pages`);

const addPage = (payload: PageItem): Promise<AddPageResponse> =>
  axios.post(`${API_URL}/pages`, payload);

const updatePage = (payload: PageItem): Promise<UpdatePageResponse> =>
  axios.put(`${API_URL}/pages/${payload.id}`, payload);

const deletePage = (payload: PageItem): Promise<DeletePageResponse> =>
  axios.delete(`${API_URL}/pages/${payload.id}`);

const getPage = (payload: string): Promise<GetPageResponse> => axios(`${API_URL}/pages/${payload}`);

const fetchTexts = (payload: string): Promise<FetchTextsResponse> =>
  axios.get(`${API_URL}/texts?pageId=${payload}`);

const addText = (payload: TextItem): Promise<AddTextResponse> =>
  axios.post(`${API_URL}/texts`, payload);

const updateText = (payload: TextItem): Promise<AddTextResponse> =>
  axios.put(`${API_URL}/texts/${payload.id}`, payload);

const deleteText = (payload: TextItem): Promise<AddTextResponse> =>
  axios.delete(`${API_URL}/texts/${payload.id}`);

export default {
  fetchPages,
  addPage,
  updatePage,
  deletePage,
  getPage,
  fetchTexts,
  addText,
  updateText,
  deleteText,
};
