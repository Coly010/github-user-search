import { Action, createReducer, on } from '@ngrx/store';
import * as fromSearch from './../actions/search.actions';
import { SearchUsersResponse } from '../graphql/search-users.graphql';

export const searchFeatureKey = 'search';

export interface UserSearchState {
  searchTerm: string;
  searchResults: SearchUsersResponse;
  pageSize: number;
  currentIndex: number;
  resultsLoading: boolean;
}

export const initialState: UserSearchState = {
  searchTerm: '',
  searchResults: null,
  pageSize: 10,
  currentIndex: 0,
  resultsLoading: false,
};

const searchReducer = createReducer(
  initialState,
  on(fromSearch.search, (state, { searchTerm }) => ({ ...state, searchTerm })),
  on(fromSearch.searchResults, (state, { searchResults }) => ({
    ...state,
    searchResults,
  })),
  on(fromSearch.pageSize, (state, { pageSize }) => ({
    ...state,
    pageSize,
  })),
  on(fromSearch.resultsLoading, (state, { resultsLoading }) => ({
    ...state,
    resultsLoading,
  }))
);

export function reducer(state: UserSearchState | undefined, action: Action) {
  return searchReducer(state, action);
}
