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
