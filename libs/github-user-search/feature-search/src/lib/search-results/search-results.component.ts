import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
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
  @Input() searchResults: SearchUsersResponse;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  trackByFn(item: GitHubUser, index: number) {
    return item.id;
  }
}
