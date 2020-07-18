import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';

import { UserSearchComponent } from './user-search.component';
import { getTranslocoModule } from '@cfe/shared/util/testing-utils';

import {
  search,
  resultsLoading,
  pageSize,
  pageChanged,
} from './../+state/actions/search.actions';
import * as fromSearch from '../+state/reducers/search.reducers';
import * as fromSearchSelectors from '../+state/selectors/search.selectors';

describe('UserSearchComponent', () => {
  let spectator: Spectator<UserSearchComponent>;
  const createComponent = createComponentFactory({
    component: UserSearchComponent,
    imports: [getTranslocoModule()],
    providers: [
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
    ],
    shallow: true,
  });

  let mockStore: MockStore;
  let mockSearchTermSelector: MemoizedSelector<
    { search: fromSearch.UserSearchState },
    string
  >;

  beforeEach(() => {
    spectator = createComponent();
    mockStore = spectator.inject(MockStore);
    mockSearchTermSelector = mockStore.overrideSelector(
      fromSearchSelectors.selectSearchTerm,
      'test'
    );
    mockStore.refreshState();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set the formControls value from store', () => {
    // Arrange
    spectator.detectChanges();

    // Act
    const { searchTerm } = spectator.component.searchForm.value;

    // Assert
    expect(searchTerm).toEqual('test');
  });

  it('should dispatch search term to store on search', () => {
    // Arrange
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    spectator.component.searchForm.setValue({ searchTerm: 'something' });

    // Act
    spectator.component.search();

    // Assert
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      search({ searchTerm: 'something' })
    );
  });

  it('should not dispatch search term to store on search when form invalid', () => {
    // Arrange
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    spectator.component.searchForm.setValue({ searchTerm: '' });
    spectator.component.searchForm.updateValueAndValidity();

    // Act
    spectator.component.search();

    // Assert
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  describe('Pagination', () => {
    it('should dispatch pageSize action on correct pagination event', () => {
      // Arrange
      const dispatchSpy = spyOn(mockStore, 'dispatch');
      // Act
      spectator.component.updatePage(
        { pageSize: 25, previousPageIndex: 0, pageIndex: 0, length: 50 },
        10
      );

      // Assert
      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        1,
        pageSize({ pageSize: 25 })
      );
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        2,
        resultsLoading({ resultsLoading: true })
      );
    });

    it('should dispatch pageChanged next action on correct pagination event', () => {
      // Arrange
      const dispatchSpy = spyOn(mockStore, 'dispatch');
      // Act
      spectator.component.updatePage(
        { pageSize: 10, previousPageIndex: 0, pageIndex: 1, length: 50 },
        10
      );

      // Assert
      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        1,
        pageChanged({ direction: 'next' })
      );
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        2,
        resultsLoading({ resultsLoading: true })
      );
    });

    it('should dispatch pageChanged prev action on correct pagination event', () => {
      // Arrange
      const dispatchSpy = spyOn(mockStore, 'dispatch');
      // Act
      spectator.component.updatePage(
        { pageSize: 10, previousPageIndex: 1, pageIndex: 0, length: 50 },
        10
      );

      // Assert
      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        1,
        pageChanged({ direction: 'prev' })
      );
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        2,
        resultsLoading({ resultsLoading: true })
      );
    });
  });
});
