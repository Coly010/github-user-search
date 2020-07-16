import { Action, createReducer, on } from '@ngrx/store';
import * as fromSearch from './../actions/search.actions';
import { SearchUsersResponse } from '../graphql/search-users.graphql';

export const searchFeatureKey = 'search';

export interface UserSearchState {
  searchTerm: string;
  searchResults: SearchUsersResponse;
}

export const initialState: UserSearchState = {
  searchTerm: '',
  searchResults: null,
};

const searchReducer = createReducer(
  initialState,
  on(fromSearch.search, (state, { searchTerm }) => ({ ...state, searchTerm })),
  on(fromSearch.searchResults, (state, { searchResults }) => ({
    ...state,
    searchResults,
  }))
);

export function reducer(state: UserSearchState | undefined, action: Action) {
  return searchReducer(state, action);
}
