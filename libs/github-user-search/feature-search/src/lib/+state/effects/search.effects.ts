import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { tap, mergeMap, switchMap, take } from 'rxjs/operators';
import { SearchUsersGQL } from '../graphql/search-users.graphql';
import {
  selectSearchTerm,
  selectSearchResultsAndPageInfo,
} from './../selectors/search.selectors';
import * as fromSearch from './../actions/search.actions';

@Injectable()
export class SearchEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly searchUsersGQL: SearchUsersGQL,
    private readonly store: Store
  ) {}

  loadSearchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSearch.search),
      switchMap(() => [
        fromSearch.resultsLoading({ resultsLoading: true }),
        fromSearch.fetchSearchResults(),
      ])
    )
  );

  fetchSearchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSearch.fetchSearchResults),
      mergeMap(() => this.store.pipe(select(selectSearchTerm), take(1))),
      mergeMap((searchTerm) => {
        return this.searchUsersGQL
          .fetch({
            searchTerm,
            afterCursor: null,
            beforeCursor: null,
          })
          .pipe(
            switchMap(({ data, loading }) => [
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
