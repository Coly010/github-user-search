import { createSelector } from '@ngrx/store';
import { searchFeatureKey, UserSearchState } from '../reducers/search.reducers';

export const selectUserSearchFeature = (state) => state[searchFeatureKey];

export const selectSearchTerm = createSelector(
  selectUserSearchFeature,
  (state: UserSearchState) => state.searchTerm
);

export const selectSearchResults = createSelector(
  selectUserSearchFeature,
  (state: UserSearchState) => state.searchResults
);
