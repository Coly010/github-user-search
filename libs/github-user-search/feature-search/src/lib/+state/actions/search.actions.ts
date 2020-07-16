import { createAction, props } from '@ngrx/store';

export const search = createAction(
  '[Search] Search',
  props<{ searchTerm: string }>()
);
