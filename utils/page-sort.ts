import { PageItem } from '../types';

import { PagesSortKey } from './enums';

export interface PagesSortStrategy {
  sort: (a: PageItem, b: PageItem) => number;
}

const pageID: PagesSortStrategy = {
  sort: (a: PageItem, b: PageItem): number => {
    const dateA = a.id.toUpperCase();
    const dateB = b.id.toUpperCase();

    if (dateA === dateB) return 0;

    return dateA > dateB ? 1 : -1;
  },
};

const title: PagesSortStrategy = {
  sort: (a: PageItem, b: PageItem): number => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    if (titleA === titleB) return 0;

    return titleA > titleB ? 1 : -1;
  },
};

const count: PagesSortStrategy = {
  sort: (a: PageItem, b: PageItem): number => {
    const titleA = a.count;
    const titleB = b.count;

    if (titleA === titleB) return 0;

    return titleA > titleB ? 1 : -1;
  },
};

export const sortStrategyMap: { [key in PagesSortKey]: PagesSortStrategy } = {
  [PagesSortKey.PAGEID]: pageID,
  [PagesSortKey.TITLE]: title,
  [PagesSortKey.TEXT_COUNT]: count,
};

export const getNotesSorter = (notesSortKey: PagesSortKey) => sortStrategyMap[notesSortKey].sort;
