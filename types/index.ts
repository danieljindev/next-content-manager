// ==============================================================================
// Items
// ==============================================================================
export interface TextItem {
  id: string;
  pageId: string;
  key: string;
  text: string;
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

// ==============================================================================
// State
// ==============================================================================

export interface PageState {
  loading: boolean;
  pages: PageItem[];
  error?: string;
  term: string;
}

export interface RootState {
  pageState: PageState;
}
