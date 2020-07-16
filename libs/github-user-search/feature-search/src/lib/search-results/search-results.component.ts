import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CurrentUserForProfile = gql`
  query CurrentUserForProfile {
    currentUser {
      login
      avatar_url
    }
  }
`;

@Component({
  selector: 'cfe-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  currentUser: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: CurrentUserForProfile,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.currentUser = data.currentUser;
        console.log(`test`, data);
      });
  }
}
