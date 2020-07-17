import {
  selectSearchTerm,
  selectPageSize,
  selectResultsLoading,
  selectSearchResults,
} from './../+state/selectors/search.selectors';
import { search } from './../+state/actions/search.actions';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import * as fromSearch from '../+state/actions/search.actions';
import { SearchUsersResponse } from '../+state/graphql/search-users.graphql';

@Component({
  selector: 'cfe-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent implements OnInit {
  searchForm: FormGroup;
  formSubmitted = false;

  searchResults$: Observable<SearchUsersResponse>;
  resultsLoading$: Observable<boolean>;
  pageSize$: Observable<number>;
  pageSizeOptions = [10, 25, 50];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectSearchTerm)).subscribe((searchTerm) => {
      this.searchForm.setValue({ searchTerm });
      this.formSubmitted = searchTerm !== '';
    });

    this.searchResults$ = this.store.pipe(select(selectSearchResults));
    this.pageSize$ = this.store.pipe(select(selectPageSize));
    this.resultsLoading$ = this.store.pipe(select(selectResultsLoading));
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }

    const { searchTerm } = this.searchForm.value;

    this.store.dispatch(search({ searchTerm }));
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
