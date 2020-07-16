import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export const SEARCH_USERS_QUERY = gql`
  query searchUsers($searchVal: String!, $afterCursor: String) {
    search(type: USER, query: $searchVal, first: 10, after: $afterCursor) {
      userCount
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on User {
            id
            login
            name
            url
            email
            bio
            location
            avatarUrl
            createdAt
            followers {
              totalCount
            }
            repositories {
              totalCount
            }
            starredRepositories {
              totalCount
            }
          }
          ... on Organization {
            id
            login
            name
            url
            avatarUrl
            repositories {
              totalCount
            }
          }
        }
      }
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
        query: SEARCH_USERS_QUERY,
        variables: {
          searchVal: 'Coly010',
          afterCursor: null,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.currentUser = data.currentUser;
        console.log(`test`, data);
      });
  }
}
