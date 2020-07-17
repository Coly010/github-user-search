import {
  selectSearchTerm,
  selectPageSize,
  selectSearchResultsAndPageInfo,
} from './../selectors/search.selectors';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as fromSearch from './../actions/search.actions';
import { filter, tap, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { SearchUsersGQL } from '../graphql/search-users.graphql';
import { from } from 'rxjs';

@Injectable()
export class SearchEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly searchUsersGQL: SearchUsersGQL,
    private readonly store: Store
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
            beforeCursor: null,
          })
          .pipe(
            switchMap(({ data, loading }) => [
              fromSearch.search({ searchTerm }),
              fromSearch.searchResults({ searchResults: data }),
              fromSearch.resultsLoading({ resultsLoading: loading }),
            ])
          );
      })
    )
  );

  updatePageSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSearch.pageSize),
      mergeMap(({ pageSize }) =>
        this.store.pipe(
          select(selectSearchTerm),
          mergeMap((searchTerm) =>
            this.searchUsersGQL
              .fetch({
                searchTerm,
                afterCursor: null,
                beforeCursor: null,
                first: pageSize,
              })
              .pipe(
                switchMap(({ data, loading }) => [
                  fromSearch.searchResults({ searchResults: data }),
                  fromSearch.resultsLoading({ resultsLoading: loading }),
                ])
              )
          )
        )
      )
    )
  );

  updatePageIndex$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSearch.pageChanged),
      mergeMap(({ direction }) => {
        return this.store.pipe(
          select(selectSearchResultsAndPageInfo),
          take(1),
          mergeMap(({ searchTerm, searchResults, pageSize }) => {
            const paginationInfo =
              direction === 'next'
                ? {
                    last: null,
                    first: pageSize,
                    afterCursor: searchResults.search.pageInfo.endCursor,
                    beforeCursor: null,
                  }
                : {
                    first: null,
                    last: pageSize,
                    beforeCursor: searchResults.search.pageInfo.startCursor,
                    afterCursor: null,
                  };
            return this.searchUsersGQL
              .fetch({
                searchTerm,
                first: pageSize,
                ...paginationInfo,
              })
              .pipe(
                switchMap(({ data, loading }) => [
                  fromSearch.searchResults({ searchResults: data }),
                  fromSearch.resultsLoading({ resultsLoading: loading }),
                ])
              );
          })
        );
      })
    )
  );
}
