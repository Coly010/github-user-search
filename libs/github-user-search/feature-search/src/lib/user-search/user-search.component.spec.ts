import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslocoModule } from '@ngneat/transloco';
import { provideMockStore } from '@ngrx/store/testing';

import { UserSearchComponent } from './user-search.component';

describe('UserSearchComponent', () => {
  let spectator: Spectator<UserSearchComponent>;
  const createComponent = createComponentFactory({
    component: UserSearchComponent,
    imports: [TranslocoModule],
    providers: [provideMockStore({ initialState: { searchTerm: '' } })],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });
});
