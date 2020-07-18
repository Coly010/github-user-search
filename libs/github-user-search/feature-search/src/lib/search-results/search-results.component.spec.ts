import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { getTranslocoModule } from '@cfe/shared/util/testing-utils';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let spectator: Spectator<SearchResultsComponent>;
  const createComponent = createComponentFactory({
    component: SearchResultsComponent,
    imports: [getTranslocoModule()],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
