import { SearchUsersResponse } from './../graphql/search-users.graphql';
import { createAction, props } from '@ngrx/store';

export const search = createAction(
  '[Search] Search',
  props<{ searchTerm: string }>()
);

export const searchResults = createAction(
  '[Search] Load Search Results',
  props<{ searchResults: SearchUsersResponse }>()
);

export const resultsLoading = createAction(
  '[Search] Loading Search Results',
  props<{ resultsLoading: boolean }>()
);

export const pageSize = createAction(
  '[Pagination] Update Page Size',
  props<{ pageSize: number }>()
);

export const pageChanged = createAction(
  '[Pagination] Update Page Direction',
  props<{ direction: 'prev' | 'next' }>()
);
