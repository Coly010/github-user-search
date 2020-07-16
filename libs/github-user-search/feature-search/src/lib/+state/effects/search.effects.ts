import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchActions from './../actions/search.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class SearchEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) {}

  loadSearchResults$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SearchActions.search),
        tap(({ searchTerm }) => {
          this.router.navigateByUrl(`/search/${searchTerm}`);
        })
      ),
    { dispatch: false }
  );
}
