import { TranslocoModule } from '@ngneat/transloco';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { LocaleDropdownComponent } from './locale-dropdown.component';

describe('LocaleDropdownComponent', () => {
  let spectator: Spectator<LocaleDropdownComponent>;
  const createComponent = createComponentFactory({
    component: LocaleDropdownComponent,
    imports: [TranslocoModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
