import { ApolloModule } from 'apollo-angular';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { Observable, of } from 'rxjs';
import { Action, MemoizedSelector } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { hot, cold } from 'jasmine-marbles';

import { SearchEffects } from './search.effects';
import {
  search,
  resultsLoading,
  pageSize,
  pageChanged,
  fetchSearchResults,
  searchResults,
} from './../actions/search.actions';
import {
  SearchUsersGQL,
  SearchUsersResponse,
} from '../graphql/search-users.graphql';
import * as fromSearch from '../reducers/search.reducers';
import * as fromSearchSelectors from '../selectors/search.selectors';
import * as mockGqlResponse from '../graphql/data/mock-response.json';

describe('SearchEffects', () => {
  let actions$: Observable<Action>;

  let spectator: SpectatorService<SearchEffects>;
  const createService = createServiceFactory({
    service: SearchEffects,
    imports: [],
    providers: [
      provideMockActions(() => actions$),
      provideMockStore({
        initialState: {
          search: {
            searchTerm: null,
            searchResults: null,
            pageSize: null,
            currentIndex: null,
            resultsLoading: false,
          },
        },
      }),
      {
        provide: SearchUsersGQL,
        useValue: {
          fetch: () => of(mockGqlResponse),
        },
      },
    ],
  });

  let mockStore: MockStore;
  let mockSearchTermSelector: MemoizedSelector<
    { search: fromSearch.UserSearchState },
    string
  >;
  let mockSearchResultsAndPageInfoSelector: MemoizedSelector<
    { search: fromSearch.UserSearchState },
    {
      searchTerm: string;
      searchResults: SearchUsersResponse;
      pageSize: number;
    }
  >;

  beforeEach(() => {
    spectator = createService();
    mockStore = spectator.inject(MockStore);
    mockSearchTermSelector = mockStore.overrideSelector(
      fromSearchSelectors.selectSearchTerm,
      'test'
    );
    mockSearchResultsAndPageInfoSelector = mockStore.overrideSelector(
      fromSearchSelectors.selectSearchResultsAndPageInfo,
      { searchTerm: 'test', searchResults: undefined, pageSize: 10 }
    );
    mockStore.refreshState();
  });

  it('should dispatch action to load search results on search', () => {
    // Arrange
    actions$ = hot('-a', { a: search({ searchTerm: 'test' }) });

    const expected = cold('-(bc)', {
      b: resultsLoading({ resultsLoading: true }),
      c: fetchSearchResults(),
    });

    // Act
    // Assert
    expect(spectator.service.loadSearchResults$).toBeObservable(expected);
  });

  it('should dispatch actions to store gql response for search results on fetch', () => {
    // Arrange
    actions$ = hot('-a', { a: fetchSearchResults() });

    const expected = cold('-(bc)', {
      b: searchResults({ searchResults: mockGqlResponse.data as any }),
      c: resultsLoading({ resultsLoading: undefined }),
    });

    // Act
    // Assert
    expect(spectator.service.fetchSearchResults$).toBeObservable(expected);
  });

  it('should dispatch actions to update gql response for search results on page size change', () => {
    // Arrange

    actions$ = hot('-a', { a: pageSize({ pageSize: 10 }) });

    const expected = cold('-(bc)', {
      b: searchResults({ searchResults: mockGqlResponse.data as any }),
      c: resultsLoading({ resultsLoading: undefined }),
    });

    // Act
    // Assert
    expect(spectator.service.updatePageSize$).toBeObservable(expected);
  });

  it('should dispatch actions to update gql response for search results on page index next change', () => {
    // Arrange
    mockSearchResultsAndPageInfoSelector.setResult({
      searchTerm: 'test',
      searchResults: {
        search: {
          pageInfo: {
            endCursor: 'abc',
          },
        },
      } as any,
      pageSize: 10,
    });
    mockStore.refreshState();

    actions$ = hot('-a', { a: pageChanged({ direction: 'next' }) });

    const expected = cold('-(bc)', {
      b: searchResults({ searchResults: mockGqlResponse.data as any }),
      c: resultsLoading({ resultsLoading: undefined }),
    });

    // Act
    // Assert
    expect(spectator.service.updatePageIndex$).toBeObservable(expected);
  });

  it('should dispatch actions to update gql response for search results on page index prev change', () => {
    // Arrange
    mockSearchResultsAndPageInfoSelector.setResult({
      searchTerm: 'test',
      searchResults: {
        search: {
          pageInfo: {
            startCursor: 'abc',
          },
        },
      } as any,
      pageSize: 10,
    });
    mockStore.refreshState();

    actions$ = hot('-a', { a: pageChanged({ direction: 'prev' }) });

    const expected = cold('-(bc)', {
      b: searchResults({ searchResults: mockGqlResponse.data as any }),
      c: resultsLoading({ resultsLoading: undefined }),
    });

    // Act
    // Assert
    expect(spectator.service.updatePageIndex$).toBeObservable(expected);
  });
});
