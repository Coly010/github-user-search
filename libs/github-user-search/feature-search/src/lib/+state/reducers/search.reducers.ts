import { Action, createReducer, on } from '@ngrx/store';
import { search } from './../actions/search.actions';

export const searchFeatureKey = 'search';

export interface State {
  searchTerm: string;
  searchResults: any[];
}

export const initialState: State = {
  searchTerm: '',
  searchResults: [],
};

const searchReducer = createReducer(
  initialState,
  on(search, (state, { searchTerm }) => ({ ...state, searchTerm }))
);

export function reducer(state: State | undefined, action: Action) {
  return searchReducer(state, action);
}
