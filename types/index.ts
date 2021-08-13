import { AxiosResponse } from 'axios';

/* Item Types */

export interface Column {
  id: 'screenshot' | 'title' | 'url' | 'count' | 'description';
  label: string;
  minWidth?: number;
  classes?: string;
  align?: 'right' | 'left' | 'center';
  format?: (value: string) => string | JSX.Element;
}

export interface TextItem {
  id: string;
  pageId: string;
  key: string;
  value: string;
}

export interface PageItem {
  id: string;
  url: string;
  title: string;
  author?: string;
  keywords?: string;
  description: string;
  screenshot?: string;
  count: number;
}

/* Response Types */

export type FetchPagesResponse = AxiosResponse<PageItem[]>;
export type AddPageResponse = AxiosResponse<PageItem>;
export type UpdatePageResponse = AxiosResponse<PageItem>;
export type DeletePageResponse = AxiosResponse<PageItem>;
export type GetPageResponse = AxiosResponse<PageItem>;
export type FetchTextsResponse = AxiosResponse<TextItem[]>;
export type AddTextResponse = AxiosResponse<TextItem>;
export type UpdateTextResponse = AxiosResponse<TextItem>;
export type DeleteTextResponse = AxiosResponse<TextItem>;

/* State Types */

export interface PageState {
  loading: boolean;
  pages: PageItem[];
  page: PageItem | null;
  texts: TextItem[];
  error?: string;
  term: string;
}

export interface RootState {
  pageState: PageState;
}

/* Typescript Utilities */

// https://gist.github.com/NoriSte/936096262be7af6b6bd4cba7a71640d9

/**
 * Check if two types are equal
 */
export type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? A : never) : never;

/**
 * Unwrap type of a Promise
 */
export type PromiseArgType<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any[]) => Promise<infer UU>
  ? UU
  : T;
