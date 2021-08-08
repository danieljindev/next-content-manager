import { combineReducers, Reducer } from 'redux';
import pageReducer from '../slices/page';
import { RootState } from '../types';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  pageState: pageReducer,
});

export default rootReducer;
