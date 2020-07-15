import { TranslocoModule } from '@ngneat/transloco';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let spectator: Spectator<LayoutComponent>;
  const createComponent = createComponentFactory({
    component: LayoutComponent,
    imports: [TranslocoModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });
});
