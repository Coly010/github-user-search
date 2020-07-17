import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { GitHubUser } from './../+models/github-user.model';
import {
  selectSearchResults,
  selectPageSize,
  selectResultsLoading,
} from './../+state/selectors/search.selectors';
import { SearchUsersResponse } from '../+state/graphql/search-users.graphql';

import * as fromSearch from '../+state/actions/search.actions';

@Component({
  selector: 'cfe-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit {
  searchResults$: Observable<SearchUsersResponse>;
  resultsLoading$: Observable<boolean>;
  pageSize$: Observable<number>;
  pageSizeOptions = [10, 25, 50];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.searchResults$ = this.store.pipe(select(selectSearchResults));
    this.pageSize$ = this.store.pipe(select(selectPageSize));
    this.resultsLoading$ = this.store.pipe(select(selectResultsLoading));
  }

  trackByFn(item: GitHubUser, index: number) {
    return item.id;
  }

  updatePage({ pageSize, pageIndex, previousPageIndex }: PageEvent) {
    if (pageIndex !== previousPageIndex) {
      const direction = pageIndex > previousPageIndex ? 'next' : 'prev';
      this.store.dispatch(fromSearch.pageChanged({ direction }));
    } else {
      this.store.dispatch(fromSearch.pageSize({ pageSize }));
    }
    this.store.dispatch(fromSearch.resultsLoading({ resultsLoading: true }));
  }
}
