// ==============================================================================
// Items
// ==============================================================================
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
