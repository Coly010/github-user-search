import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { GithubUserSearchUiShellModule } from '@cfe/github-user-search/ui-shell';
import { getTranslocoModule } from '@cfe/shared/util/testing-utils';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      MaterialCssVarsModule.forRoot(),
      RouterTestingModule,
      GithubUserSearchUiShellModule,
      getTranslocoModule(),
    ],
  });
  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
