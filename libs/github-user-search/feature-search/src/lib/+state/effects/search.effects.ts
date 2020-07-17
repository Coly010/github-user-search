import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromSearch from './../actions/search.actions';
import { filter, tap, map, mergeMap, switchMap } from 'rxjs/operators';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { SearchUsersGQL } from '../graphql/search-users.graphql';

@Injectable()
export class SearchEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly searchUsersGQL: SearchUsersGQL
  ) {}

  loadSearchResults$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromSearch.search),
        tap(({ searchTerm }) => {
          this.router.navigateByUrl(`/search/${searchTerm}`);
        })
      ),
    { dispatch: false }
  );

  fetchSearchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(({ payload }: RouterNavigatedAction) => {
        const url = payload.event.url;
        return url.includes('/search/') ? url.split('/search/')[1] : '';
      }),
      filter((searchTerm) => searchTerm !== ''),
      mergeMap((searchTerm) => {
        return this.searchUsersGQL
          .fetch({
            searchTerm,
            afterCursor: null,
          })
          .pipe(
            switchMap(({ data }) => [
              fromSearch.search({ searchTerm }),
              fromSearch.searchResults({ searchResults: data }),
            ])
          );
      })
    )
  );
}
