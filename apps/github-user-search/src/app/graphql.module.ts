import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { environment } from './../environments/environment';
import { introspectionQueryResultData } from './graphql/introspection.schema';

const uri = 'https://api.github.com/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri });
  const authToken = environment.githubAuthToken;
  const auth = setContext((_, { headers }) => {
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${authToken}`),
    };
  });

  return {
    link: auth.concat(http),
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData,
      }),
    }),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
