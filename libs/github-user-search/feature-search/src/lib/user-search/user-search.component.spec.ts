import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslocoModule } from '@ngneat/transloco';

import { UserSearchComponent } from './user-search.component';

describe('UserSearchComponent', () => {
  let spectator: Spectator<UserSearchComponent>;
  const createComponent = createComponentFactory({
    component: UserSearchComponent,
    imports: [TranslocoModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });
});
