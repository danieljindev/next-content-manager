import { PageItem, RootState } from '../types';

export const getPageStates = (state: RootState) => state.pageState;

export const getSelectdPage = (state: RootState): PageItem | undefined => {
  const { pages, page: current } = state.pageState;

  const selected = pages.find((page) => page.id === current?.id);

  return selected;
};
