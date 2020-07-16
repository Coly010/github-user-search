import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSearchResults } from './../+state/selectors/search.selectors';
import { SearchUsersResponse } from '../+state/graphql/search-users.graphql';

@Component({
  selector: 'cfe-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchResults$: Observable<SearchUsersResponse>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.searchResults$ = this.store.pipe(select(selectSearchResults));
  }
}
