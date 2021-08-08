// ==============================================================================
// Items
// ==============================================================================
export interface TextRes {
  resId: string;
  key: string;
  text: string;
}

export interface PageItem {
  pageID: string;
  title: string;
  keywords: string;
  description: string;
  screenshot: string;
  texts: TextRes[];
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
