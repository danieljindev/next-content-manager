import { PageItem, RootState } from '../types';

export const getPageStates = (state: RootState) => state.pageState;

export const getFilteredPages = (state: RootState): PageItem[] => {
  const { pages, term } = state.pageState;

  const filtered = pages
    .slice()
    .filter(
      (page: PageItem) =>
        page.title.toLowerCase().includes(term.toLowerCase()) ||
        page.description.toLowerCase().includes(term.toLowerCase())
    );

  return filtered;
};
