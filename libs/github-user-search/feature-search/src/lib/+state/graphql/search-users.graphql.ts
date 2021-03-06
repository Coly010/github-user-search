import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface SearchUsersResponse {
  search: {
    edges: Array<{
      node: {
        avatarUrl: string;
        bio: string;
        createdAt: string;
        followers: { totalCount: number };
        id: string;
        location: string;
        email: string;
        login: string;
        name: string;
        repositories: { totalCount: number };
        starredRepositories: { totalCount: number };
        url: string;
      };
    }>;
    userCount: number;
    pageInfo: {
      startCursor: string;
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class SearchUsersGQL extends Query<SearchUsersResponse> {
  document = gql`
    query searchUsers(
      $searchTerm: String!
      $afterCursor: String
      $beforeCursor: String
      $last: Int
      $first: Int = 10
    ) {
      search(
        type: USER
        query: $searchTerm
        first: $first
        last: $last
        after: $afterCursor
        before: $beforeCursor
      ) {
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
              avatarUrl
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
              description
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
}
