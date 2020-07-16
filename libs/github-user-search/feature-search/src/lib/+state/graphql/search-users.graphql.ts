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
    query searchUsers($searchTerm: String!, $afterCursor: String) {
      search(type: USER, query: $searchTerm, first: 10, after: $afterCursor) {
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
}
