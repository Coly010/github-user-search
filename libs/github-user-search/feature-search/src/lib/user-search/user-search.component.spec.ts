import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';

import { UserSearchComponent } from './user-search.component';
import { getTranslocoModule } from '@cfe/shared/util/testing-utils';

import * as fromSearch from '../+state/reducers/search.reducers';
import * as fromSearchSelectors from '../+state/selectors/search.selectors';

describe('UserSearchComponent', () => {
  let spectator: Spectator<UserSearchComponent>;
  const createComponent = createComponentFactory({
    component: UserSearchComponent,
    imports: [getTranslocoModule()],
    providers: [provideMockStore()],
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
});
