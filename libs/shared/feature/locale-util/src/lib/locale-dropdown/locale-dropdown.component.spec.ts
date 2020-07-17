import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { getTranslocoModule } from '@cfe/shared/util/testing-utils';
import { LocaleDropdownComponent } from './locale-dropdown.component';

describe('LocaleDropdownComponent', () => {
  let spectator: Spectator<LocaleDropdownComponent>;
  const createComponent = createComponentFactory({
    component: LocaleDropdownComponent,
    imports: [getTranslocoModule()],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set the active lang', () => {
    // Arrange
    const setActiveLangSpy = spyOn(
      spectator.component['translocoService'],
      'setActiveLang'
    );

    // Act
    spectator.component.setActiveLang('es');

    // Assert
    expect(setActiveLangSpy).toHaveBeenCalledWith('es');
  });
});
