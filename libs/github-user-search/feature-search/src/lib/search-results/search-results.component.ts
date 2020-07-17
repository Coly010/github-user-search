import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { GitHubUser } from './../+models/github-user.model';

import { SearchUsersResponse } from '../+state/graphql/search-users.graphql';

@Component({
  selector: 'cfe-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  @Input() searchResults: SearchUsersResponse;
  @Input() isLoading: boolean;

  constructor() {}

  trackByFn(item: GitHubUser, index: number) {
    return item.id;
  }
}
